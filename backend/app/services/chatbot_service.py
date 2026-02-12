"""
Enhanced Chatbot Service with Hybrid Search (Vector + SQL)
IMPROVED: Better typo tolerance and vector search fallback
IMPROVED: Friendly and natural conversation style for general users
IMPROVED: Complete data field extraction from database
"""

from app.services.ai_service import call_gemini
from app.database import database
from app.services.vector_search_service import (
    hybrid_search_inovasi,
    vector_search_collaboration,
    vector_search_inovasi,
)
from typing import Optional, Dict, List
import json
import re


# EXtraction Keyword
def extract_keywords(question: str) -> List[str]:
    """
    Extract potential inovasi names from question.
    IMPROVED: More aggressive keyword extraction for better typo tolerance
    """
    keywords = []

    # 1. Extract quoted text (highest priority)
    quoted = re.findall(r'"([^"]+)"', question)
    keywords.extend(quoted)

    # 2. Extract text in single quotes
    single_quoted = re.findall(r"'([^']+)'", question)
    keywords.extend(single_quoted)

    # 3. Extract uppercase words (likely acronyms or names)
    uppercase_words = re.findall(r"\b[A-Z]{2,}(?:\s+[A-Z]+)*\b", question)
    keywords.extend(uppercase_words)

    # 4. Extract capitalized phrases (Title Case)
    title_case = re.findall(r"\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b", question)
    keywords.extend(title_case)

    # Extract all words after "apa itu", "tentang", etc.
    query_patterns = [
        r"apa itu\s+([A-Z\s]+?)(?:\?|$)",
        r"tentang\s+([A-Z\s]+?)(?:\?|$)",
        r"jelaskan\s+([A-Z\s]+?)(?:\?|$)",
        r"info\s+([A-Z\s]+?)(?:\?|$)",
    ]

    for pattern in query_patterns:
        matches = re.findall(pattern, question, re.IGNORECASE)
        keywords.extend([m.strip() for m in matches])

    # 5. Remove duplicates, keep order
    seen = set()
    unique_keywords = []
    for kw in keywords:
        kw_clean = kw.strip()
        kw_lower = kw_clean.lower()
        if kw_lower not in seen and len(kw_clean) > 2:
            seen.add(kw_lower)
            unique_keywords.append(kw_clean)

    # If no keywords found, use the question itself
    if not unique_keywords:
        caps_sequences = re.findall(r"\b[A-Z][A-Z\s]+\b", question)
        if caps_sequences:
            unique_keywords.append(max(caps_sequences, key=len).strip())

    return unique_keywords


# Detect query
def detect_query_type(question: str) -> str:
    """
    Deteksi jenis pertanyaan user.
    Returns: 'inovasi' | 'kolaborasi' | 'statistik' | 'general'
    """
    question_lower = question.lower()

    # Kolaborasi keywords
    kolaborasi_keywords = [
        "kolaborasi",
        "kerja sama",
        "kerjasama",
        "sinergi",
        "rekomendasi",
        "pasangan",
        "mirip",
        "similarity",
        "clustering",
        "cocok",
        "sesuai",
    ]
    if any(kw in question_lower for kw in kolaborasi_keywords):
        return "kolaborasi"

    # Statistik keywords
    stat_keywords = ["berapa", "jumlah", "total", "statistik", "data", "banyak"]
    if any(kw in question_lower for kw in stat_keywords):
        return "statistik"

    # Inovasi keywords (specific innovation search)
    inovasi_keywords = ["inovasi", "apa itu", "jelaskan", "tentang", "info", "detail"]
    if any(kw in question_lower for kw in inovasi_keywords):
        return "inovasi"

    return "general"


# DATABASE RETRIEVAL FUNCTIONS (WITH ERROR HANDLING)
async def get_collaboration_data(
    inovasi_id: Optional[int] = None, limit: int = 3
) -> List[Dict]:
    """
    Ambil data kolaborasi dari similarity_result.
    Jika inovasi_id ada, cari kolaborasi untuk inovasi tersebut.
    Jika tidak, ambil top kolaborasi.
    """
    try:
        if not database.is_connected:
            print("⚠️ Database not connected, skipping collaboration data fetch")
            return []

        if inovasi_id:
            query = """
            SELECT 
                s.similarity,
                a.judul_inovasi AS inovasi_1,
                b.judul_inovasi AS inovasi_2,
                a.admin_opd AS opd_1,
                b.admin_opd AS opd_2,
                a.urusan_utama AS urusan,
                s.cluster_id
            FROM similarity_result s
            JOIN data_inovasi a ON a.id = s.inovasi_id_1
            JOIN data_inovasi b ON b.id = s.inovasi_id_2
            WHERE s.inovasi_id_1 = :id OR s.inovasi_id_2 = :id
            ORDER BY s.similarity DESC
            LIMIT :limit
            """
            results = await database.fetch_all(
                query, {"id": inovasi_id, "limit": limit}
            )

            if results:
                return [dict(r) for r in results]

            print(
                f"🔄 No clustering results for inovasi {inovasi_id}, using vector search..."
            )
            try:
                vector_results = await vector_search_collaboration(
                    inovasi_id, top_k=limit, min_similarity=0.3
                )

                if vector_results:
                    converted_results = []
                    for vr in vector_results:
                        converted_results.append(
                            {
                                "similarity": vr["similarity_score"],
                                "inovasi_1": "Target Inovasi",
                                "inovasi_2": vr["judul_inovasi"],
                                "opd_1": "-",
                                "opd_2": vr.get("admin_opd", "-"),
                                "urusan": vr.get("urusan_utama", "-"),
                                "cluster_id": None,
                            }
                        )
                    return converted_results
            except Exception as ve:
                print(f"⚠️ Vector search failed: {ve}")

            return []
        else:
            query = """
            SELECT 
                s.similarity,
                a.judul_inovasi AS inovasi_1,
                b.judul_inovasi AS inovasi_2,
                a.admin_opd AS opd_1,
                b.admin_opd AS opd_2,
                a.urusan_utama AS urusan,
                s.cluster_id
            FROM similarity_result s
            JOIN data_inovasi a ON a.id = s.inovasi_id_1
            JOIN data_inovasi b ON b.id = s.inovasi_id_2
            WHERE a.admin_opd != b.admin_opd
            ORDER BY s.similarity DESC
            LIMIT :limit
            """
            results = await database.fetch_all(query, {"limit": limit})

            return [dict(r) for r in results] if results else []

    except Exception as e:
        print(f"❌ Error in get_collaboration_data: {e}")
        return []


async def get_statistics() -> Dict:
    """Ambil statistik umum dari database"""
    try:
        if not database.is_connected:
            print("⚠️ Database not connected, skipping statistics fetch")
            return {}

        query = """
        SELECT 
            COUNT(*) AS total_inovasi,
            COUNT(*) FILTER (WHERE jenis = 'Digital') AS inovasi_digital,
            COUNT(*) FILTER (
                WHERE EXTRACT(YEAR FROM tanggal_penerapan) = EXTRACT(YEAR FROM CURRENT_DATE)
            ) AS inovasi_tahun_ini,
            ROUND(AVG(kematangan)::numeric, 1) AS rata_kematangan
        FROM data_inovasi
        """

        result = await database.fetch_one(query)
        return dict(result) if result else {}

    except Exception as e:
        print(f"❌ Error in get_statistics: {e}")
        return {}


async def get_cached_dashboard_insight() -> Optional[str]:
    """Ambil cached AI insight dari dashboard (hemat token)"""
    try:
        if not database.is_connected:
            return None

        from datetime import date

        today = date.today()

        cache = await database.fetch_one(
            "SELECT insight FROM ai_insight_cache WHERE insight_date = :d", {"d": today}
        )

        if cache:
            insights = json.loads(cache["insight"])
            return " ".join([item["text"] for item in insights[:3]])

        return None

    except Exception as e:
        print(f"⚠️ Failed to get cached insight: {e}")
        return None


# MAIN CHATBOT FUNCTION
async def chatbot_answer(question: str) -> str:
    """
    Main chatbot logic dengan strategi pencarian bertingkat:
    IMPROVED: Multi-stage search with vector fallback
    IMPROVED: Friendly conversation style

    1. Extract keywords dari pertanyaan
    2. Detect tipe query (inovasi/kolaborasi/statistik/general)
    3. Stage 1: Hybrid search (SQL + Vector)
    4. Stage 2: Pure vector search with lower threshold (if Stage 1 fails)
    5. Call AI dengan context
    """

    print(f"\n{'='*60}")
    print(f"CHATBOT QUERY: {question}")
    print(f"{'='*60}")

    if not database.is_connected:
        print("❌ Database not connected!")
        return (
            "Maaf, sistem sedang dalam pemeliharaan. Silakan coba beberapa saat lagi."
        )

    try:
        # Step 1: Extract keywords
        keywords = extract_keywords(question)
        print(f"🔍 Extracted keywords: {keywords}")

        # Step 2: Detect query type
        query_type = detect_query_type(question)
        print(f"🔍 Query type: {query_type}")

        context_data = {"found_in_db": False, "data_type": query_type, "content": {}}

        # Step 3: Search database based on type
        if query_type == "kolaborasi":
            inovasi = None

            if keywords:
                try:
                    inovasi = await hybrid_search_inovasi(question, keywords, top_k=3)
                except Exception as e:
                    print(f"⚠️ Hybrid search failed: {e}")
                    inovasi = None

            if inovasi:
                collab_data = await get_collaboration_data(inovasi_id=inovasi["id"])
                context_data["found_in_db"] = True
                context_data["content"] = {
                    "inovasi": inovasi,
                    "kolaborasi": collab_data,
                }

                if "match_type" in inovasi:
                    context_data["content"]["search_method"] = inovasi["match_type"]
                    context_data["content"]["match_score"] = inovasi.get(
                        "match_score", 0
                    )
            else:
                collab_data = await get_collaboration_data(limit=5)
                if collab_data:
                    context_data["found_in_db"] = True
                    context_data["content"] = {"kolaborasi": collab_data}

        elif query_type == "inovasi":
            inovasi = None

            # STAGE 1: Hybrid search
            if keywords or question:
                try:
                    search_query = question if not keywords else " ".join(keywords)
                    print(f"🔍 Stage 1: Hybrid search for '{search_query}'")
                    inovasi = await hybrid_search_inovasi(
                        search_query, keywords, top_k=3
                    )
                except Exception as e:
                    print(f"⚠️ Hybrid search failed: {e}")

            # STAGE 2: Pure vector search with lower threshold
            if not inovasi and (keywords or question):
                try:
                    search_query = question if not keywords else " ".join(keywords)
                    print(
                        f"🔍 Stage 2: Vector search for '{search_query}' (lower threshold)"
                    )

                    vector_results = await vector_search_inovasi(
                        search_query,
                        top_k=3,
                        min_similarity=0.15,
                    )

                    if vector_results:
                        inovasi = vector_results[0]
                        inovasi["match_type"] = "semantic_fuzzy"
                        inovasi["match_score"] = inovasi["similarity_score"]
                        print(
                            f"✅ Found via fuzzy vector search: {inovasi['judul_inovasi']} (score: {inovasi['similarity_score']:.4f})"
                        )

                except Exception as e:
                    print(f"⚠️ Vector search failed: {e}")

            if inovasi:
                context_data["found_in_db"] = True
                context_data["content"] = {"inovasi": inovasi}

                if "match_type" in inovasi:
                    context_data["content"]["search_method"] = inovasi["match_type"]
                    context_data["content"]["match_score"] = inovasi.get(
                        "match_score", 0
                    )

                print(f"✅ Found inovasi: {inovasi['judul_inovasi']}")
            else:
                print(f"❌ Inovasi not found")

        elif query_type == "statistik":
            stats = await get_statistics()
            if stats:
                context_data["found_in_db"] = True
                context_data["content"] = {"statistik": stats}

        # Step 4: Try to get cached dashboard insight
        dashboard_insight = await get_cached_dashboard_insight()
        if dashboard_insight:
            context_data["content"]["dashboard_insight"] = dashboard_insight

        # Step 5: Build prompt with context
        prompt = build_chatbot_prompt(question, context_data)

        # Step 6: Call AI
        try:
            answer = call_gemini(prompt, mode="chatbot")
            return answer.strip()
        except Exception as e:
            print(f"❌ Chatbot AI Error: {e}")
            return "Maaf, terjadi kesalahan saat memproses pertanyaan kamu. Silakan coba lagi ya! 😊"

    except Exception as e:
        print(f"❌ FATAL ERROR in chatbot_answer: {e}")
        import traceback

        traceback.print_exc()
        return "Wah, ada kesalahan sistem nih. Coba lagi ya, atau hubungi admin kalau masih bermasalah! 🙏"


# PROMPT BUILDER
def build_chatbot_prompt(question: str, context_data: Dict) -> str:
    """
    Build prompt yang friendly dan natural untuk user umum.
    IMPROVED: Casual and friendly conversation style
    IMPROVED: Complete data field information
    """

    system_role = """
Kamu adalah AI Assistant BRIDA (Badan Riset dan Inovasi Daerah) Provinsi Jawa Timur.
Tugas kamu adalah membantu masyarakat umum memahami inovasi daerah di Jawa Timur dengan cara:

GAYA KOMUNIKASI:
- Ramah dan mudah dipahami (seperti berbicara dengan teman)
- Akurat berdasarkan data yang ada
- Gunakan bahasa yang natural dan tidak kaku
- Boleh pakai emoji yang relevan (💡, ✨, 📊, 🚀, 🏥, 🎓, dll) untuk membuat lebih menarik
- Hindari bahasa terlalu formal seperti "Yang Terhormat", "Hormat kami", "Atas perhatiannya"
- Jika data tidak lengkap, sampaikan dengan jujur tapi tetap membantu
- Jika hasil pencarian tidak exact match, jelaskan dengan ramah
- Rapikan kalimat dan paragrafnya

ATURAN BAHASA:
- Gunakan "Anda" 
- Sapa dengan ramah: "Halo!", "Hai!", atau langsung jawab
- Akhiri dengan encouraging: "Semoga membantu!", "Ada yang ingin ditanyakan lagi?", "Mau tahu lebih lanjut?"
- JANGAN gunakan penutup formal seperti "Hormat kami", "Terima kasih atas perhatiannya", "Yang Terhormat"
- Singkat tapi lengkap, tapi tidak terlalu singkat, sampaikan apa saja yang bisa disampaikan
- Gunakan format list dengan emoji untuk data yang banyak

CONTOH GAYA JAWABAN:
❌ SALAH (Terlalu Formal):
"Yang terhormat Bapak/Ibu, berdasarkan data yang kami miliki... Hormat kami, Asisten Virtual BRIDA"

✅ BENAR (Friendly):
"Hai! POP SURGA itu singkatan dari Penghantaran Obat Pasien Sumberglagah 💊
Inovasi ini dari Dinas Kesehatan Mojokerto dan termasuk inovasi pelayanan digital yang udah diterapkan lho!
Semoga membantu ya! Ada yang mau ditanyakan lagi? 😊"
"""

    # Build context dari database
    db_context = ""

    if context_data["found_in_db"]:
        content = context_data["content"]

        # Search quality indicator
        search_info = ""
        if "search_method" in content:
            method = content["search_method"]
            score = content.get("match_score", 0)

            if method == "exact":
                search_info = "(✅ Exact match)"
            elif method == "semantic":
                search_info = f"(🔍 Pencarian semantik - kesesuaian {score:.0%})"
            elif method == "semantic_fuzzy":
                search_info = f"⚠️ CATATAN: Ini hasil terdekat yang ditemukan (kesesuaian {score:.0%}). Sampaikan ke user dengan cara yang friendly bahwa ini mungkin bukan exact match, tapi hasil terdekat. Tanyakan apakah ini yang mereka cari."
            elif method == "hybrid":
                search_info = f"(🎯 Pencarian gabungan - kesesuaian {score:.0%})"

        # Inovasi data - IMPROVED: Complete field extraction
        if "inovasi" in content:
            inv = content["inovasi"]
            db_context += f"""
DATA INOVASI {search_info}:
- Judul: {inv.get('judul_inovasi', '-')}
- Pemerintah Daerah: {inv.get('pemda', '-')}
- OPD/Admin: {inv.get('admin_opd', '-')}
- Inisiator: {inv.get('inisiator', '-')}
- Nama Inisiator: {inv.get('nama_inisiator', '-')}
- Bentuk Inovasi: {inv.get('bentuk_inovasi', '-')}
- Jenis: {inv.get('jenis', '-')}
- Asta Cipta: {inv.get('asta_cipta', '-')}
- Urusan Utama: {inv.get('urusan_utama', '-')}
- Urusan Lain yang Beririsan: {inv.get('urusan_lain_yang_beririsan', '-')}
- Tahapan Inovasi: {inv.get('tahapan_inovasi', '-')}
- Tingkat Kematangan: {inv.get('label_kematangan', '-')} (Skor: {inv.get('kematangan', '-')})
- Tanggal Penerapan: {inv.get('tanggal_penerapan', '-')}
- Tanggal Pengembangan: {inv.get('tanggal_pengembangan', '-')}
- Tanggal Input: {inv.get('tanggal_input', '-')}
- Video Tersedia: {'Ya' if inv.get('video') else 'Tidak'}
- Link Video: {inv.get('link_video', '-')}
- Koordinat: Lat {inv.get('lat', '-')}, Long {inv.get('lo', '-')}

Tips: Jelaskan dengan bahasa sederhana, pakai emoji yang cocok! Fokuskan pada informasi yang paling relevan dengan pertanyaan user.
"""

        # Kolaborasi data
        if "kolaborasi" in content and content["kolaborasi"]:
            db_context += "\nDATA KOLABORASI:\n"
            for i, collab in enumerate(content["kolaborasi"][:3], 1):
                db_context += f"""
{i}. {collab['inovasi_1']} ↔ {collab['inovasi_2']}
   OPD: {collab['opd_1']} x {collab['opd_2']}
   Urusan: {collab.get('urusan', '-')}
   Match: {collab['similarity']:.0%}
"""
            db_context += "\nTips: Jelaskan kolaborasi ini dengan cara yang menarik!\n"

        # Statistik data
        if "statistik" in content:
            stats = content["statistik"]
            db_context += f"""
STATISTIK INOVASI JATIM:
- Total: {stats.get('total_inovasi', 0)} inovasi
- Digital: {stats.get('inovasi_digital', 0)} inovasi
- Tahun ini: {stats.get('inovasi_tahun_ini', 0)} inovasi
- Rata-rata kematangan: {stats.get('rata_kematangan', 0)}

Tips: Sampaikan angka-angka ini dengan cara yang menarik pakai emoji!
"""

        # Dashboard insight
        if "dashboard_insight" in content:
            db_context += f"""
INSIGHT TERKINI:
{content['dashboard_insight']}
"""
    else:
        db_context = """
CATATAN: Data spesifik tidak ditemukan. 

Tips jawaban:
- Sampaikan dengan ramah bahwa datanya belum ada
- Tawarkan bantuan untuk pertanyaan lain
- Beri saran pertanyaan yang bisa dijawab
"""

    # Combine all
    final_prompt = f"""{system_role}

PERTANYAAN USER:
{question}

{db_context}

INSTRUKSI PENTING:
1. Jawab dengan gaya FRIENDLY dan CASUAL
2. Pakai emoji yang relevan untuk membuat lebih menarik
3. Gunakan "kamu" bukan "Anda"
4. JANGAN pakai "Yang Terhormat", "Hormat kami", dll
5. Akhiri dengan encouraging statement
6. Jika data fuzzy match, sampaikan dengan cara yang friendly
7. Format dengan bullet points (pakai emoji) jika banyak info
8. Jangan mengarang data yang tidak ada
9. Fokuskan pada informasi yang paling relevan dengan pertanyaan user
10. Jika ada field yang "-" (tidak ada data), tidak perlu disebutkan

JAWABAN (langsung, tanpa salam pembuka yang terlalu panjang):
"""

    return final_prompt
