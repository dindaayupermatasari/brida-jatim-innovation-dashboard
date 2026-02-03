def build_insight_prompt(stats, trend, top_opd, tahap_dist, top_urusan):
    return f"""
Kamu adalah analis data inovasi daerah Pemerintah Provinsi Jawa Timur.

Tugasmu adalah menyusun INSIGHT STRATEGIS untuk pimpinan daerah
berdasarkan DASHBOARD DATA INOVASI.

Buat 5 insight SINGKAT, TAJAM, dan BERORIENTASI KEBIJAKAN
dalam format JSON array berikut:

FORMAT OUTPUT:
[
  {{"icon":"📈","text":"...","type":"success"}},
  {{"icon":"🏆","text":"...","type":"success"}},
  {{"icon":"⚠️","text":"...","type":"warning"}},
  {{"icon":"💡","text":"...","type":"info"}},
  {{"icon":"🎯","text":"...","type":"success"}}
]

ATURAN KETAT:
- Output HARUS valid JSON (bisa langsung di-parse)
- Gunakan HANYA type berikut: success, warning, info
- Setiap insight MINIMAL 12 kata
- Jangan hanya menyebut angka, jelaskan maknanya
- Fokus pada pola, tren, dan perbandingan
- Jika ada risiko, tuliskan sebagai peringatan yang jelas
- Jika ada peluang, sertakan saran singkat yang kontekstual
- Bandingkan proporsi, tren, atau distribusi
- Jika ada stagnasi / penurunan, sebutkan RISIKONYA
- Jika ada peluang, sebutkan ARAH TINDAKAN singkat
- Hindari frasa normatif kosong (misal: "perlu ditingkatkan")
- JANGAN membuat asumsi di luar data yang diberikan
- Gunakan bahasa formal, ringkas, gaya eksekutif pemerintah

DATA UTAMA:
- Total inovasi: {stats['total_inovasi']}
- Inovasi digital: {stats['inovasi_digital']}
- Inovasi baru tahun ini: {stats['inovasi_tahun_ini']}
- Rata-rata kematangan inovasi: {stats['rata_kematangan']}

TREN INOVASI PER TAHUN:
{trend}

DISTRIBUSI TAHAPAN INOVASI:
{tahap_dist}

TOP 5 OPD PALING INOVATIF:
{top_opd}

TOP 5 URUSAN DENGAN INOVASI TERBANYAK:
{top_urusan}

Kembalikan HANYA JSON array sesuai format.
"""


def build_collaboration_prompt(data):
    return f"""
Kamu adalah analis kebijakan inovasi daerah Pemerintah Provinsi Jawa Timur.

Tugasmu adalah menyusun rekomendasi kolaborasi inovasi berbasis data
yang akan ditampilkan pada dashboard pimpinan daerah.

Buat 1 rekomendasi kolaborasi inovasi dalam format JSON berikut:

{{
  "judul_kolaborasi": "...",
  "opd_terlibat": ["...", "..."],
  "skor_kecocokan": {round(data['similarity'], 2)},
  "alasan_kesesuaian": "...",
  "manfaat": ["...", "...", "..."],
  "potensi_dampak": ["...", "...", "..."],
  "tingkat_rekomendasi": "Replikasi Lintas OPD / Kolaborasi Pengembangan / Referensi Praktik Baik"
}}


ATURAN PENULISAN:
- Bahasa formal, ringkas, gaya kebijakan publik
- Fokus pada MAKNA dan DAMPAK, bukan teknis
- Jangan mengarang data baru
- Manfaat dan dampak harus relevan dengan konteks inovasi
- Gunakan istilah pemerintahan Indonesia
- Maksimal 2 kalimat untuk ringkasan
- Minimal 3 poin manfaat dan 3 poin dampak
- Setiap insight HARUS mengandung implikasi kebijakan bagi pimpinan daerah
- Gunakan sudut pandang pengambilan keputusan strategis


DATA KOLABORASI:
- Inovasi 1: {data['inovasi_1']} ({data['opd_1']})
- Inovasi 2: {data['inovasi_2']} ({data['opd_2']})
- Urusan: {data['urusan']}
- Tahap inovasi: {data['tahap']}
- Skor kemiripan: {round(data['similarity'], 2)}

Kembalikan HANYA JSON tanpa teks tambahan.
"""


def build_input_collaboration_prompt(a, b, score):
    """
    Kolaborasi berdasarkan input user (tanpa clustering).
    """

    return f"""
Kamu adalah analis inovasi sektor publik Indonesia.

INOVASI A
Judul: {a['judul_inovasi']}
OPD: {a['admin_opd']}
Urusan Utama: {a['urusan_utama']}
Jenis: {a['jenis']}

INOVASI B
Judul: {b['judul_inovasi']}
OPD: {b['admin_opd']}
Urusan Utama: {b['urusan_utama']}
Jenis: {b['jenis']}

Skor kecocokan awal sistem: {score}%

ATURAN PENILAIAN BERDASARKAN SKOR:
- <30: kolaborasi eksploratif, risiko tinggi, manfaat terbatas
- 30–60: kolaborasi potensial, perlu pilot project
- >60: kolaborasi kuat dan strategis

TUGAS:
1. Tentukan tingkat kolaborasi (Sangat Tinggi / Tinggi / Sedang / Rendah)
2. Buat judul kolaborasi inovasi
3. Jelaskan alasan sinergi
4. Jelaskan manfaat kolaborasi
5. Jelaskan potensi dampak pelayanan publik

WAJIB format JSON:
Susun rekomendasi kolaborasi dalam format JSON berikut:
{{
  "judul_kolaborasi": "",
  "tingkat_kolaborasi": "",
  "alasan_sinergi": "",
  "manfaat_kolaborasi": ["...", "...", "..."],
  "potensi_dampak": ["...", "...", "..."]
}}

ATURAN:
- Bahasa formal kebijakan publik
- Maksimal 2 kalimat untuk alasan
- Manfaat dan dampak HARUS realistis sesuai skor
- Jangan berlebihan jika skor rendah
- Output HARUS JSON VALID tanpa teks tambahan
"""
