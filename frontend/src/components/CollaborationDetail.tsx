import { ArrowLeft, CheckCircle, Users, Target, Zap, TrendingUp, AlertTriangle, Calendar, FileText, Lightbulb, BarChart, Shield, Clock } from 'lucide-react';

interface CollaborationDetailProps {
  darkMode: boolean;
  collaboration: {
    id: number;
    title: string;
    jenis: string;
    opd1: string;
    opd2: string;
    score: number;
    category: string;
    summary: string;
    tags: string[];
    manfaat: string;
    dampak: string;
    readiness: string;
  };
  onBack: () => void;
}

const getScoreBadgeColor = (score: number) => {
  if (score >= 90) return 'bg-emerald-500 text-white';
  if (score >= 70) return 'bg-blue-500 text-white';
  return 'bg-yellow-500 text-white';
};

export function CollaborationDetail({ darkMode, collaboration, onBack }: CollaborationDetailProps) {
  // Generate detailed data based on collaboration
  const generateDetailedData = () => {
    return {
      tujuan: `Mengintegrasikan ${collaboration.opd1} dan ${collaboration.opd2} untuk menciptakan sinergi yang efektif dalam meningkatkan kualitas pelayanan publik di Provinsi Jawa Timur.`,
      
      alasanKesesuaian: `Kedua OPD memiliki data dan sistem yang saling melengkapi. ${collaboration.opd1} memiliki basis data yang dapat diintegrasikan dengan sistem dari ${collaboration.opd2}, menciptakan efisiensi operasional yang signifikan.`,
      
      sasaranPengguna: [
        'Masyarakat umum Provinsi Jawa Timur',
        'Petugas OPD terkait',
        'Pemerintah daerah kabupaten/kota',
        'Stakeholder eksternal (swasta, akademisi)',
      ],
      
      langkahImplementasi: [
        {
          fase: 'Fase 1: Persiapan',
          durasi: '1-2 bulan',
          kegiatan: [
            'Pembentukan tim koordinasi lintas OPD',
            'Analisis kebutuhan teknis dan infrastruktur',
            'Penyusunan roadmap kolaborasi',
            'Koordinasi dengan pihak terkait',
          ],
        },
        {
          fase: 'Fase 2: Pengembangan',
          durasi: '3-4 bulan',
          kegiatan: [
            'Pengembangan API dan integrasi sistem',
            'Pengujian sistem secara bertahap',
            'Pelatihan SDM pengelola',
            'Penyusunan SOP operasional',
          ],
        },
        {
          fase: 'Fase 3: Implementasi',
          durasi: '2-3 bulan',
          kegiatan: [
            'Pilot project di wilayah terpilih',
            'Evaluasi dan perbaikan sistem',
            'Roll-out ke seluruh wilayah',
            'Monitoring dan evaluasi berkelanjutan',
          ],
        },
      ],
      
      estimasiBiaya: {
        infrastruktur: collaboration.score >= 90 ? 'Rp 250 - 350 juta' : 'Rp 400 - 600 juta',
        sdm: 'Rp 150 - 200 juta',
        operasional: 'Rp 100 - 150 juta/tahun',
        total: collaboration.score >= 90 ? 'Rp 500 - 700 juta' : 'Rp 650 - 950 juta',
      },
      
      risikoTantangan: [
        {
          risiko: 'Resistensi perubahan dari pegawai',
          mitigasi: 'Sosialisasi intensif dan pelatihan berkelanjutan',
          level: 'Sedang',
        },
        {
          risiko: 'Keterbatasan infrastruktur TI',
          mitigasi: 'Peningkatan kapasitas server dan bandwidth',
          level: collaboration.score >= 90 ? 'Rendah' : 'Sedang',
        },
        {
          risiko: 'Koordinasi antar OPD yang kompleks',
          mitigasi: 'Pembentukan tim koordinasi khusus dengan SOP jelas',
          level: 'Sedang',
        },
        {
          risiko: 'Keamanan dan privasi data',
          mitigasi: 'Implementasi sistem keamanan berlapis dan enkripsi data',
          level: 'Tinggi',
        },
      ],
      
      indikatorKeberhasilan: [
        {
          indikator: 'Peningkatan efisiensi waktu pelayanan',
          target: collaboration.score >= 90 ? '40-50%' : '30-40%',
          periode: '6 bulan',
        },
        {
          indikator: 'Tingkat kepuasan pengguna',
          target: 'Minimal 85%',
          periode: '1 tahun',
        },
        {
          indikator: 'Akurasi data terintegrasi',
          target: 'Minimal 95%',
          periode: '6 bulan',
        },
        {
          indikator: 'Adopsi sistem oleh OPD lain',
          target: 'Minimal 3 OPD',
          periode: '1 tahun',
        },
      ],
      
      dampakJangkaPanjang: [
        'Peningkatan kualitas pelayanan publik secara berkelanjutan',
        'Efisiensi anggaran operasional hingga 25-35%',
        'Peningkatan transparansi dan akuntabilitas pemerintah',
        'Model kolaborasi yang dapat direplikasi ke daerah lain',
        'Percepatan transformasi digital pemerintahan',
      ],
      
      rekomendasiLanjutan: [
        'Perluasan integrasi ke OPD lain yang relevan',
        'Pengembangan fitur analytics dan dashboard monitoring',
        'Implementasi AI untuk prediksi dan optimalisasi layanan',
        'Kolaborasi dengan pemerintah pusat untuk skalabilitas nasional',
      ],
    };
  };

  const detailData = generateDetailedData();

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Tinggi':
        return darkMode ? 'text-red-400 bg-red-900/30' : 'text-red-600 bg-red-50';
      case 'Sedang':
        return darkMode ? 'text-yellow-400 bg-yellow-900/30' : 'text-yellow-600 bg-yellow-50';
      case 'Rendah':
        return darkMode ? 'text-green-400 bg-green-900/30' : 'text-green-600 bg-green-50';
      default:
        return darkMode ? 'text-gray-400 bg-gray-900/30' : 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6 pb-6 max-w-full">
      {/* Header with Back Button */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors w-fit ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-200'
          }`}
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Kembali</span>
        </button>
        
        <div className="flex-1">
          <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Detail Analisis Kolaborasi Inovasi
          </h2>
        </div>
      </div>

      {/* Main Card */}
      <div className={`rounded-2xl shadow-xl overflow-hidden ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        {/* Title Section */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">{collaboration.title}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  {collaboration.jenis}
                </span>
                {collaboration.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-blue-50 text-base md:text-lg leading-relaxed">
                {collaboration.summary}
              </p>
            </div>
            
            {/* Score Badge */}
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-xl p-6 lg:min-w-[180px]">
              <div className={`text-5xl font-bold mb-2 ${getScoreBadgeColor(collaboration.score)}`}>
                {collaboration.score}%
              </div>
              <div className="text-sm font-semibold mb-1">{collaboration.category}</div>
              <div className="flex items-center gap-1 text-sm">
                <CheckCircle size={14} />
                {collaboration.readiness}
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="p-6 md:p-8 space-y-8">
          {/* OPD Partner */}
          <section>
            <h4 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Users className="text-blue-500" size={24} />
              OPD Yang Berkolaborasi
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>OPD Utama</p>
                <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{collaboration.opd1}</p>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Partner Kolaborasi</p>
                <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{collaboration.opd2}</p>
              </div>
            </div>
          </section>

          {/* Tujuan Kolaborasi */}
          <section>
            <h4 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Target className="text-purple-500" size={24} />
              Tujuan Kolaborasi
            </h4>
            <p className={`text-base leading-relaxed p-4 rounded-lg ${
              darkMode ? 'text-gray-300 bg-gray-750' : 'text-gray-700 bg-gray-50'
            }`}>
              {detailData.tujuan}
            </p>
          </section>

          {/* Manfaat dan Dampak */}
          <section>
            <h4 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Zap className="text-yellow-500" size={24} />
              Manfaat & Dampak
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg border-l-4 border-green-500 ${
                darkMode ? 'bg-gray-750' : 'bg-green-50'
              }`}>
                <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                  Manfaat Utama
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {collaboration.manfaat}
                </p>
              </div>
              <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${
                darkMode ? 'bg-gray-750' : 'bg-blue-50'
              }`}>
                <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  Potensi Dampak
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {collaboration.dampak}
                </p>
              </div>
            </div>
          </section>

          {/* Alasan Kesesuaian */}
          <section>
            <h4 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Lightbulb className="text-orange-500" size={24} />
              Alasan Kesesuaian & Sinergi
            </h4>
            <p className={`text-base leading-relaxed p-4 rounded-lg ${
              darkMode ? 'text-gray-300 bg-gray-750' : 'text-gray-700 bg-gray-50'
            }`}>
              {detailData.alasanKesesuaian}
            </p>
          </section>

          {/* Sasaran Pengguna */}
          <section>
            <h4 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Users className="text-indigo-500" size={24} />
              Sasaran Pengguna
            </h4>
            <ul className="space-y-2">
              {detailData.sasaranPengguna.map((user, index) => (
                <li key={index} className={`flex items-center gap-3 p-3 rounded-lg ${
                  darkMode ? 'bg-gray-750' : 'bg-gray-50'
                }`}>
                  <CheckCircle size={18} className="text-indigo-500 flex-shrink-0" />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{user}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Langkah Implementasi */}
          <section>
            <h4 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <TrendingUp className="text-green-500" size={24} />
              Langkah Implementasi
            </h4>
            <div className="space-y-4">
              {detailData.langkahImplementasi.map((fase, index) => (
                <div key={index} className={`p-4 rounded-lg ${
                  darkMode ? 'bg-gray-750 border border-gray-700' : 'bg-gray-50 border border-gray-200'
                }`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                    <h5 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {fase.fase}
                    </h5>
                    <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Clock size={16} />
                      <span>{fase.durasi}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {fase.kegiatan.map((kegiatan, kIndex) => (
                      <li key={kIndex} className="flex items-start gap-2">
                        <span className={`text-sm font-semibold mt-0.5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          {kIndex + 1}.
                        </span>
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {kegiatan}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Estimasi Biaya */}
          <section>
            <h4 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <BarChart className="text-emerald-500" size={24} />
              Estimasi Biaya
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Infrastruktur</p>
                <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {detailData.estimasiBiaya.infrastruktur}
                </p>
              </div>
              <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>SDM</p>
                <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {detailData.estimasiBiaya.sdm}
                </p>
              </div>
              <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Operasional</p>
                <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {detailData.estimasiBiaya.operasional}
                </p>
              </div>
              <div className={`p-4 rounded-lg text-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white`}>
                <p className="text-sm mb-1">Total Investasi</p>
                <p className="text-lg font-bold">{detailData.estimasiBiaya.total}</p>
              </div>
            </div>
          </section>

          {/* Risiko dan Tantangan */}
          <section>
            <h4 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <AlertTriangle className="text-red-500" size={24} />
              Risiko & Tantangan
            </h4>
            <div className="space-y-3">
              {detailData.risikoTantangan.map((item, index) => (
                <div key={index} className={`p-4 rounded-lg ${
                  darkMode ? 'bg-gray-750 border border-gray-700' : 'bg-gray-50 border border-gray-200'
                }`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
                    <h5 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {item.risiko}
                    </h5>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${getRiskColor(item.level)}`}>
                      {item.level}
                    </span>
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <strong className={darkMode ? 'text-gray-200' : 'text-gray-800'}>Mitigasi:</strong> {item.mitigasi}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Indikator Keberhasilan */}
          <section>
            <h4 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <CheckCircle className="text-teal-500" size={24} />
              Indikator Keberhasilan
            </h4>
            <div className="overflow-x-auto">
              <table className={`w-full ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <thead className={darkMode ? 'bg-gray-750' : 'bg-gray-100'}>
                  <tr>
                    <th className={`text-left p-3 font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Indikator
                    </th>
                    <th className={`text-left p-3 font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Target
                    </th>
                    <th className={`text-left p-3 font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Periode
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {detailData.indikatorKeberhasilan.map((item, index) => (
                    <tr key={index} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <td className="p-3">{item.indikator}</td>
                      <td className="p-3 font-semibold text-green-500">{item.target}</td>
                      <td className="p-3">{item.periode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Dampak Jangka Panjang */}
          <section>
            <h4 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <TrendingUp className="text-blue-500" size={24} />
              Dampak Jangka Panjang
            </h4>
            <ul className="space-y-2">
              {detailData.dampakJangkaPanjang.map((dampak, index) => (
                <li key={index} className={`flex items-start gap-3 p-3 rounded-lg ${
                  darkMode ? 'bg-blue-900/20' : 'bg-blue-50'
                }`}>
                  <CheckCircle size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{dampak}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Rekomendasi Lanjutan */}
          <section>
            <h4 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <FileText className="text-purple-500" size={24} />
              Rekomendasi Lanjutan
            </h4>
            <ul className="space-y-2">
              {detailData.rekomendasiLanjutan.map((rekomendasi, index) => (
                <li key={index} className={`flex items-start gap-3 p-3 rounded-lg ${
                  darkMode ? 'bg-purple-900/20' : 'bg-purple-50'
                }`}>
                  <Shield size={18} className="text-purple-500 flex-shrink-0 mt-0.5" />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{rekomendasi}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Footer Disclaimer */}
          <div className={`p-4 rounded-lg border-l-4 border-yellow-500 ${
            darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'
          }`}>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <strong className={darkMode ? 'text-yellow-400' : 'text-yellow-700'}>Catatan:</strong> 
              {' '}Analisis ini dihasilkan oleh sistem AI BRIDA Jatim sebagai pendukung pengambilan keputusan. 
              Untuk implementasi, diperlukan kajian lebih mendalam dan melibatkan semua stakeholder terkait.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
