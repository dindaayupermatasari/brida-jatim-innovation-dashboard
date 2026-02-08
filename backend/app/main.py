from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import dashboard
from app.routers.ai_insight import router as ai_router
from app.routers import recommendations
from app.routers import dashboard, recommendations, ai_insight, ai_collaboration
from app.database import connect_to_db, close_db_connection
from app.services.clustering_service import (
    load_cache_from_database,
    check_and_auto_run_clustering,
)  # ✅ TAMBAHAN

app = FastAPI(title="Backend BRIDA Jatim")

# ================== ROUTERS ==================
app.include_router(dashboard.router)
app.include_router(ai_router)
app.include_router(
    recommendations.router, prefix="/api/recommendations", tags=["Recommendations"]
)
app.include_router(ai_insight.router)
app.include_router(ai_collaboration.router)

# ================== CORS ==================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ================== DB CONNECTION ==================
@app.on_event("startup")
async def startup():
    await connect_to_db()

    # ✅ Load existing cache from database
    await load_cache_from_database()

    # ✅ Check for new data and auto-run clustering if needed (threshold: 50)
    await check_and_auto_run_clustering(threshold=50)


@app.on_event("shutdown")
async def shutdown():
    await close_db_connection()


# ================== ROOT ==================
@app.get("/")
def root():
    return {"status": "Backend FastAPI BRIDA Jatim running"}
