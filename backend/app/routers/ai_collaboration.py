from fastapi import APIRouter, HTTPException
from app.services.collaboration_scorer import calculate_collaboration_score
from app.services.ai_service import call_gemini
from app.services.insight_builder import build_input_collaboration_prompt
from app.database import database
import json

router = APIRouter(prefix="/ai-input-collaboration", tags=["AI Input Collaboration"])


@router.get("/simulate")
async def simulate_ai_collaboration(inovasi_1_id: int, inovasi_2_id: int):

    inovasi_1 = await database.fetch_one(
        "SELECT * FROM data_inovasi WHERE id = :id",
        {"id": inovasi_1_id},
    )

    inovasi_2 = await database.fetch_one(
        "SELECT * FROM data_inovasi WHERE id = :id",
        {"id": inovasi_2_id},
    )

    if not inovasi_1 or not inovasi_2:
        raise HTTPException(status_code=404, detail="Data inovasi tidak ditemukan")

    # 🔥 INI PENTING
    inn1 = dict(inovasi_1)
    inn2 = dict(inovasi_2)

    score = calculate_collaboration_score(inn1, inn2)

    prompt = build_input_collaboration_prompt(inn1, inn2, score)

    ai_response = call_gemini(prompt, mode="collaboration")

    try:
        ai_result = json.loads(
            ai_response.strip().replace("```json", "").replace("```", "")
        )
    except Exception:
        raise HTTPException(status_code=500, detail="Format respon AI tidak valid")

    return {
        "inovasi_1": {
            "id": inn1["id"],
            "judul": inn1.get("judul_inovasi"),
            "opd": inn1.get("admin_opd") or inn1.get("opd") or "-",
        },
        "inovasi_2": {
            "id": inn2["id"],
            "judul": inn2.get("judul_inovasi"),
            "opd": inn2.get("admin_opd") or inn2.get("opd") or "-",
        },
        "skor_kecocokan": score,
        "hasil_ai": ai_result,
    }
