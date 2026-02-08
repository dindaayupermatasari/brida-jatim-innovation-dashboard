from fastapi import APIRouter, Query, BackgroundTasks
from app.services.clustering_service import run_clustering_pipeline, get_cluster_cache
from app.services.recommendation_service import (
    recommend_for_inovasi,
    get_top_collaboration_recommendations,
)

# ✅ FIXED: Removed prefix here because it's already added in main.py
router = APIRouter(tags=["Recommendations"])


# ===============================
# JALANKAN CLUSTERING (BACKGROUND)
# ===============================
@router.post("/run")
async def run_pipeline(background_tasks: BackgroundTasks):
    background_tasks.add_task(run_clustering_pipeline)
    return {
        "status": "processing",
        "message": "Clustering sedang berjalan di background",
    }


# ===============================
# TOP REKOMENDASI KOLABORASI (DARI CLUSTERING CACHE)
# ===============================
@router.get("/top-clusters")
async def top_cluster_collaborations(limit: int = Query(5, ge=1, le=20)):
    # get_cluster_cache() returns tuple: (data, last_run)
    insights, last_run = get_cluster_cache()

    if not insights or len(insights) == 0:
        return {
            "status": "empty",
            "message": "Clustering belum dijalankan atau masih diproses",
            "data": [],
        }

    return {
        "status": "ok",
        "total": len(insights[:limit]),
        "last_run": last_run.isoformat() if last_run else None,
        "data": insights[:limit],
    }


# ===============================
# TOP REKOMENDASI KOLABORASI (DARI DATABASE)
# ===============================
@router.get("/top")
async def top_collaboration_db(
    limit: int = Query(5, ge=1, le=20),
    min_similarity: float = Query(0.3, ge=0, le=1),
):
    data = await get_top_collaboration_recommendations(
        limit=limit, min_similarity=min_similarity
    )

    return {
        "status": "ok",
        "total": len(data),
        "data": data,
    }
