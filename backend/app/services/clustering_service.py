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
# LOAD DATA (BATCHED)
# ===============================
async def load_data_inovasi(batch_size=50, offset=0) -> pd.DataFrame:
    rows = await database.fetch_all(
        """
        SELECT
            id,
            judul_inovasi,
            urusan_utama,
            tahapan_inovasi,
            label_kematangan
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
# HITUNG AI INSIGHT PER CLUSTER
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
                },
                "inovasi_2": {
                    "id": int(df.at[b, "id"]),
                    "judul": df.at[b, "judul_inovasi"],
                    "urusan": df.at[b, "urusan_utama"],
                    "tahap": df.at[b, "tahapan_inovasi"],
                    "kematangan": df.at[b, "label_kematangan"],
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

    model = AgglomerativeClustering(n_clusters=k_clusters)
    labels = model.fit_predict(embeddings)

    model_name = f"Agglomerative_k={k_clusters}"

    await save_clustering_result(df, labels, model_name)
    await save_similarity(embeddings, df, labels)

    insights = calculate_cluster_insights(df, embeddings, labels)
    set_cluster_cache(insights)

    return {
        "status": "ok",
        "total_data": len(df),
        "clusters": k_clusters,
        "model": model_name,
        "total_insight": len(insights),
        "sample": insights[:5],
    }
