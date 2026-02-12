from fastapi import APIRouter, Query
from datetime import date
from app.database import database
from app.services.ai_service import call_gemini
from app.services.insight_builder import (
    build_insight_prompt,
    build_collaboration_prompt,
)
import json

router = APIRouter(prefix="/dashboard", tags=["AI Insight"])


# =========================
# AI INSIGHT DASHBOARD (JANGAN DIUBAH)
# =========================
@router.get("/ai-insight")
async def get_ai_insight():
    today = date.today()

    cache = await database.fetch_one(
        "SELECT insight FROM ai_insight_cache WHERE insight_date = :d", {"d": today}
    )
    if cache:
        return json.loads(cache["insight"])

    stats = await database.fetch_one(
        """
        SELECT 
            COUNT(*) AS total_inovasi,
            COUNT(*) FILTER (WHERE jenis = 'Digital') AS inovasi_digital,
            COUNT(*) FILTER (
                WHERE EXTRACT(YEAR FROM tanggal_penerapan) = EXTRACT(YEAR FROM CURRENT_DATE)
            ) AS inovasi_tahun_ini,
            ROUND(AVG(kematangan)::numeric, 1) AS rata_kematangan
        FROM data_inovasi;
        """
    )

    trend = await database.fetch_all(
        """
        SELECT 
            EXTRACT(YEAR FROM tanggal_penerapan)::int AS tahun,
            jenis,
            COUNT(*) AS jumlah
        FROM data_inovasi
        WHERE tanggal_penerapan IS NOT NULL
            AND EXTRACT(YEAR FROM tanggal_penerapan) >= 2022
        GROUP BY tahun, jenis
        ORDER BY tahun, jenis;
        """
    )

    top_opd = await database.fetch_all(
        """
        SELECT admin_opd, COUNT(*) AS jumlah
        FROM data_inovasi
        GROUP BY admin_opd
        ORDER BY jumlah DESC
        LIMIT 5;
        """
    )

    tahap_dist = await database.fetch_all(
        """
        SELECT tahapan_inovasi, COUNT(*) AS jumlah
        FROM data_inovasi
        GROUP BY tahapan_inovasi
        ORDER BY jumlah DESC;
        """
    )

    top_urusan = await database.fetch_all(
        """
        SELECT urusan_utama, COUNT(*) AS jumlah
        FROM data_inovasi
        GROUP BY urusan_utama
        ORDER BY jumlah DESC
        LIMIT 5;
        """
    )

    prompt = build_insight_prompt(stats, trend, top_opd, tahap_dist, top_urusan)

    try:
        ai_text = call_gemini(prompt, mode="insight")

        ai_text_clean = ai_text.strip()
        if ai_text_clean.startswith("```"):
            ai_text_clean = ai_text_clean.replace("```json", "").replace("```", "")

        insights = json.loads(ai_text_clean)

        await database.execute(
            """
            INSERT INTO ai_insight_cache (insight_date, insight)
            VALUES (:d, :i)
            ON CONFLICT (insight_date)
            DO UPDATE SET insight = :i
            """,
            {"d": today, "i": json.dumps(insights)},
        )

        return insights

    except Exception as e:
        print("AI Error:", e)
        return []


# =========================
# AI ANALISIS TOP REKOMENDASI KOLABORASI
# =========================
@router.get("/ai-collaboration")
async def ai_collaboration_insight(inovasi_1: int, inovasi_2: int):
    # ✅ FIXED: Gunakan nama kolom yang benar dari database
    query = """
    SELECT
        s.similarity,
        a.judul_inovasi AS inovasi_1,
        b.judul_inovasi AS inovasi_2,
        a.admin_opd AS opd_1,
        b.admin_opd AS opd_2,
        a.urusan_utama AS urusan,
        a.tahapan_inovasi AS tahap
    FROM similarity_result s
    JOIN data_inovasi a ON a.id = s.inovasi_id_1
    JOIN data_inovasi b ON b.id = s.inovasi_id_2
    WHERE s.inovasi_id_1 = :i1
      AND s.inovasi_id_2 = :i2
    """

    data = await database.fetch_one(query, {"i1": inovasi_1, "i2": inovasi_2})

    if not data:
        return {"status": "empty", "message": "Data kolaborasi tidak ditemukan"}

    prompt = build_collaboration_prompt(
        {
            "inovasi_1": data["inovasi_1"],
            "opd_1": data["opd_1"],
            "inovasi_2": data["inovasi_2"],
            "opd_2": data["opd_2"],
            "urusan": data["urusan"],
            "tahap": data["tahap"],
            "similarity": data["similarity"],
        }
    )

    try:
        ai_text = call_gemini(prompt, mode="recommendation")
        ai_text = ai_text.strip().replace("```json", "").replace("```", "")
        return json.loads(ai_text)

    except Exception as e:
        print("AI Collaboration Error:", e)
        return {"status": "error", "message": "Gagal menghasilkan analisis kolaborasi"}
