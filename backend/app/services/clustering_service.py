import pandas as pd
import numpy as np
from itertools import combinations
from sentence_transformers import SentenceTransformer
from sklearn.cluster import AgglomerativeClustering
from sklearn.metrics.pairwise import cosine_similarity
from app.database import database
from datetime import datetime
from typing import List, Dict

# ===============================
# MODEL
# ===============================
embedding_model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")

# ===============================
# CACHE (IN-MEMORY)
# ===============================
_cluster_insight_cache: List[Dict] = []
_cluster_last_run: datetime | None = None


def set_cluster_cache(data: List[Dict]):
    global _cluster_insight_cache, _cluster_last_run
    _cluster_insight_cache = data
    _cluster_last_run = datetime.utcnow()


def get_cluster_cache():
    return _cluster_insight_cache, _cluster_last_run


# ===============================
# AUTO-LOAD CACHE FROM DATABASE
# ===============================
async def load_cache_from_database():
    """
    Load clustering results from database and rebuild cache.
    Called automatically on startup or manually when needed.
    """
    try:
        print("📄 Loading clustering cache from database...")

        # Get last clustering timestamp
        last_run_row = await database.fetch_one(
            "SELECT MAX(processed_at) as last_run FROM clustering_result"
        )

        if not last_run_row or not last_run_row["last_run"]:
            print("⚠️ No clustering results found in database")
            return

        # Get all clustering results
        clusters_data = await database.fetch_all(
            """
            SELECT DISTINCT cluster_id 
            FROM clustering_result 
            ORDER BY cluster_id
            """
        )

        if not clusters_data:
            print("⚠️ No clusters found in database")
            return

        insights = []

        # For each cluster, find best pair from similarity_result
        for cluster_row in clusters_data:
            cluster_id = cluster_row["cluster_id"]

            # ✅ OPTIMIZED: Get top similarity pair with OPD data
            top_pair = await database.fetch_one(
                """
                SELECT 
                    s.inovasi_id_1,
                    s.inovasi_id_2,
                    s.similarity,
                    a.judul_inovasi as judul_1,
                    a.urusan_utama as urusan_1,
                    a.tahapan_inovasi as tahap_1,
                    a.label_kematangan as kematangan_1,
                    a.admin_opd as opd_1,
                    b.judul_inovasi as judul_2,
                    b.urusan_utama as urusan_2,
                    b.tahapan_inovasi as tahap_2,
                    b.label_kematangan as kematangan_2,
                    b.admin_opd as opd_2
                FROM similarity_result s
                JOIN data_inovasi a ON a.id = s.inovasi_id_1
                JOIN data_inovasi b ON b.id = s.inovasi_id_2
                WHERE s.cluster_id = :cluster_id
                ORDER BY s.similarity DESC
                LIMIT 1
                """,
                {"cluster_id": cluster_id},
            )

            if not top_pair:
                continue

            # Count items in cluster
            count = await database.fetch_val(
                "SELECT COUNT(*) FROM clustering_result WHERE cluster_id = :cluster_id",
                {"cluster_id": cluster_id},
            )

            # ✅ OPTIMIZED: Include OPD in cache
            insights.append(
                {
                    "cluster_id": cluster_id,
                    "skor_kolaborasi": round(top_pair["similarity"], 4),
                    "jumlah_inovasi": count,
                    "inovasi_1": {
                        "id": top_pair["inovasi_id_1"],
                        "judul": top_pair["judul_1"],
                        "urusan": top_pair["urusan_1"],
                        "tahap": top_pair["tahap_1"],
                        "kematangan": top_pair["kematangan_1"],
                        "opd": top_pair["opd_1"],  # ✅ ADDED
                    },
                    "inovasi_2": {
                        "id": top_pair["inovasi_id_2"],
                        "judul": top_pair["judul_2"],
                        "urusan": top_pair["urusan_2"],
                        "tahap": top_pair["tahap_2"],
                        "kematangan": top_pair["kematangan_2"],
                        "opd": top_pair["opd_2"],  # ✅ ADDED
                    },
                }
            )

        # Sort by similarity score
        insights = sorted(insights, key=lambda x: x["skor_kolaborasi"], reverse=True)

        # Update cache
        global _cluster_insight_cache, _cluster_last_run
        _cluster_insight_cache = insights
        _cluster_last_run = last_run_row["last_run"]

        print(f"✅ Cache loaded: {len(insights)} clusters from {_cluster_last_run}")

    except Exception as e:
        print(f"❌ Error loading cache from database: {e}")
        import traceback

        traceback.print_exc()


# ===============================
# AUTO-DETECT NEW DATA & TRIGGER CLUSTERING
# ===============================
async def check_and_auto_run_clustering(threshold: int = 50):
    """
    Check if there are new data that haven't been clustered.
    Auto-run clustering if new data >= threshold.

    Args:
        threshold: Minimum new data count to trigger clustering (default: 50)
    """
    try:
        print(f"🔍 Checking for new data (threshold: {threshold})...")

        # Get total current data
        total_data = await database.fetch_val(
            "SELECT COUNT(*) FROM data_inovasi WHERE judul_inovasi IS NOT NULL"
        )

        # Get total data in last clustering
        clustered_data = await database.fetch_val(
            "SELECT COUNT(*) FROM clustering_result"
        )

        if clustered_data is None:
            clustered_data = 0

        new_data_count = total_data - clustered_data

        print(
            f"📊 Total data: {total_data}, Clustered: {clustered_data}, New: {new_data_count}"
        )

        # Check if need to run clustering
        if new_data_count >= threshold:
            print(f"🚀 AUTO-TRIGGERING clustering ({new_data_count} new data detected)")
            result = await run_clustering_pipeline()
            print(f"✅ Auto-clustering completed: {result}")
            return True
        else:
            print(f"✅ No need to re-cluster ({new_data_count} < {threshold})")
            return False

    except Exception as e:
        print(f"❌ Error in auto-check clustering: {e}")
        import traceback

        traceback.print_exc()
        return False


# ===============================
# LOAD DATA (BATCHED) - ✅ WITH OPD
# ===============================
async def load_data_inovasi(batch_size=50, offset=0) -> pd.DataFrame:
    rows = await database.fetch_all(
        """
        SELECT
            id,
            judul_inovasi,
            urusan_utama,
            tahapan_inovasi,
            label_kematangan,
            admin_opd
        FROM data_inovasi
        WHERE judul_inovasi IS NOT NULL
        ORDER BY id
        LIMIT :limit OFFSET :offset
        """,
        {"limit": batch_size, "offset": offset},
    )

    if not rows:
        return pd.DataFrame()

    return pd.DataFrame([dict(r) for r in rows])


# ===============================
# EMBEDDING
# ===============================
def build_embeddings(df: pd.DataFrame) -> np.ndarray:
    df["teks_fitur"] = (
        "Judul: " + df["judul_inovasi"].fillna("") + ". "
        "Urusan: " + df["urusan_utama"].fillna("") + ". "
        "Tahapan: " + df["tahapan_inovasi"].fillna("") + ". "
        "Kematangan: " + df["label_kematangan"].fillna("")
    )

    return embedding_model.encode(df["teks_fitur"].tolist(), show_progress_bar=False)


# ===============================
# SAVE CLUSTER RESULT
# ===============================
async def save_clustering_result(df, labels, model_name):
    await database.execute("DELETE FROM clustering_result")

    records = []
    now = datetime.utcnow()

    for i in range(len(df)):
        records.append(
            {
                "id": int(df.at[i, "id"]),
                "cluster": int(labels[i]),
                "model": model_name,
                "version": "v2",
                "ts": now,
            }
        )

    await database.execute_many(
        """
        INSERT INTO clustering_result
        (id_inovasi, cluster_id, model_name, model_version, processed_at)
        VALUES (:id, :cluster, :model, :version, :ts)
        """,
        records,
    )


# ===============================
# SAVE SIMILARITY (INTRA CLUSTER)
# ===============================
async def save_similarity(embeddings, df, labels):
    sim_matrix = cosine_similarity(embeddings)
    await database.execute("DELETE FROM similarity_result")

    records = []
    now = datetime.utcnow()

    for i in range(len(df)):
        for j in range(i + 1, len(df)):
            if labels[i] != labels[j]:
                continue

            similarity = float(sim_matrix[i, j])

            # threshold diturunkan (lebih realistis)
            if similarity < 0.2:
                continue

            records.append(
                {
                    "cluster": int(labels[i]),
                    "a": int(df.at[i, "id"]),
                    "b": int(df.at[j, "id"]),
                    "s": similarity,
                    "ts": now,
                }
            )

    if records:
        await database.execute_many(
            """
            INSERT INTO similarity_result
            (cluster_id, inovasi_id_1, inovasi_id_2, similarity, processed_at)
            VALUES (:cluster, :a, :b, :s, :ts)
            """,
            records,
        )


# ===============================
# HITUNG AI INSIGHT PER CLUSTER - ✅ WITH OPD
# ===============================
def calculate_cluster_insights(df, embeddings, labels) -> List[Dict]:
    sim_matrix = cosine_similarity(embeddings)
    results = []

    for cluster_id in sorted(set(labels)):
        idxs = [i for i, l in enumerate(labels) if l == cluster_id]
        if len(idxs) < 2:
            continue

        best_score = 0.0
        best_pair = None

        for i, j in combinations(idxs, 2):
            score = float(sim_matrix[i, j])
            if score > best_score:
                best_score = score
                best_pair = (i, j)

        if not best_pair:
            continue

        a, b = best_pair

        # ✅ OPTIMIZED: Include OPD in insights
        results.append(
            {
                "cluster_id": int(cluster_id),
                "skor_kolaborasi": round(best_score, 4),
                "jumlah_inovasi": len(idxs),
                "inovasi_1": {
                    "id": int(df.at[a, "id"]),
                    "judul": df.at[a, "judul_inovasi"],
                    "urusan": df.at[a, "urusan_utama"],
                    "tahap": df.at[a, "tahapan_inovasi"],
                    "kematangan": df.at[a, "label_kematangan"],
                    "opd": df.at[a, "admin_opd"],  # ✅ ADDED
                },
                "inovasi_2": {
                    "id": int(df.at[b, "id"]),
                    "judul": df.at[b, "judul_inovasi"],
                    "urusan": df.at[b, "urusan_utama"],
                    "tahap": df.at[b, "tahapan_inovasi"],
                    "kematangan": df.at[b, "label_kematangan"],
                    "opd": df.at[b, "admin_opd"],  # ✅ ADDED
                },
            }
        )

    return sorted(results, key=lambda x: x["skor_kolaborasi"], reverse=True)


# ===============================
# MAIN PIPELINE (FIXED & STABLE)
# ===============================
async def run_clustering_pipeline(k_clusters: int = 4):
    all_df = []
    all_embeddings = []

    offset = 0
    batch_size = 50

    while True:
        df_batch = await load_data_inovasi(batch_size, offset)
        if df_batch.empty:
            break

        emb_batch = build_embeddings(df_batch)

        all_df.append(df_batch)
        all_embeddings.append(emb_batch)

        offset += batch_size

    if not all_df:
        set_cluster_cache([])
        return {
            "status": "skipped",
            "reason": "Data inovasi kosong",
        }

    df = pd.concat(all_df, ignore_index=True)
    embeddings = np.vstack(all_embeddings)

    if len(df) < 2:
        set_cluster_cache([])
        return {
            "status": "skipped",
            "reason": "Data tidak cukup untuk clustering",
        }

    # ✅ FIX: Auto-adjust k_clusters if data is too small
    actual_k = min(k_clusters, len(df) // 2)  # Each cluster needs at least 2 items
    if actual_k < 2:
        actual_k = 2

    print(f"🔍 Clustering: {len(df)} items with k={actual_k} (requested: {k_clusters})")

    model = AgglomerativeClustering(n_clusters=actual_k)
    labels = model.fit_predict(embeddings)

    model_name = f"Agglomerative_k={actual_k}"

    await save_clustering_result(df, labels, model_name)
    await save_similarity(embeddings, df, labels)

    insights = calculate_cluster_insights(df, embeddings, labels)

    # ✅ FIX: Add logging to debug cache
    print(f"✅ Generated {len(insights)} cluster insights")
    if insights:
        print(
            f"✅ Top insight: Cluster {insights[0]['cluster_id']} with score {insights[0]['skor_kolaborasi']}"
        )
        print(
            f"   - Inovasi 1: {insights[0]['inovasi_1']['judul']} (OPD: {insights[0]['inovasi_1'].get('opd', 'N/A')})"
        )
        print(
            f"   - Inovasi 2: {insights[0]['inovasi_2']['judul']} (OPD: {insights[0]['inovasi_2'].get('opd', 'N/A')})"
        )
    else:
        print(f"⚠️ WARNING: No insights generated! This will result in empty cache.")

    set_cluster_cache(insights)
    print(f"✅ Cache updated with {len(insights)} clusters")

    return {
        "status": "ok",
        "total_data": len(df),
        "clusters": actual_k,
        "model": model_name,
        "total_insight": len(insights),
        "sample": insights[:5],
    }
