import { X, FileCheck, Calendar, MapPin, Video } from 'lucide-react';

interface Inovasi {
  no: number;
  judul_inovasi: string;
  pemda: string;
  admin_opd: string;
  inisiator: string;
  nama_inisiator: string;
  bentuk_inovasi: string;
  jenis: string;
  asta_cipta: string;
  urusan_utama: string;
  urusan_lain_yang_beririsan: string;
  kematangan: number;
  tahapan_inovasi: string;
  tanggal_input: string;
  tanggal_penerapan: string;
  tanggal_pengembangan: string;
  video: string;
  link_video: string;
  latitude: number;
  longitude: number;
}

interface DetailViewModalProps {
  data: Inovasi;
  darkMode: boolean;
  onClose: () => void;
}

// Helper function
const getMaturityBadge = (score: number) => {
  if (score >= 100) {
    return { label: 'Sangat Matang', color: 'bg-emerald-600', textColor: 'text-white' };
  } else if (score >= 80) {
    return { label: 'Matang', color: 'bg-blue-500', textColor: 'text-white' };
  } else if (score >= 60) {
    return { label: 'Cukup Matang', color: 'bg-yellow-500', textColor: 'text-white' };
  } else if (score >= 1) {
    return { label: 'Kurang Matang', color: 'bg-orange-500', textColor: 'text-white' };
  } else {
    return { label: 'Draft', color: 'bg-gray-400', textColor: 'text-white' };
  }
};

// Helper to format snake_case to Title Case
const toTitleCase = (str: string) => {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export function DetailViewModal({ data, darkMode, onClose }: DetailViewModalProps) {
  const googleMapsUrl = `https://www.google.com/maps?q=${data.latitude},${data.longitude}`;
  const badge = getMaturityBadge(data.kematangan);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className={`rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto my-8 ${
        darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'
      }`}>
        {/* Header with gradient */}
        <div className={`sticky top-0 z-10 p-6 border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} backdrop-blur-lg bg-opacity-90`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <FileCheck className="text-white" size={24} />
              </div>
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Detail Data Inovasi
              </h3>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-all hover:scale-110 ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <X className={darkMode ? 'text-gray-400' : 'text-gray-600'} size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Badge Status */}
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-lg ${badge.color} ${badge.textColor}`}>
              📊 {data.kematangan} - {badge.label}
            </span>
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
              data.jenis === 'Digital' 
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
            } shadow-md`}>
              {data.jenis === 'Digital' ? '💻' : '📄'} {data.jenis}
            </span>
          </div>

          {/* Informasi Utama */}
          <div className={`rounded-xl p-6 shadow-lg ${darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <h4 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
              Informasi Utama
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No
                </label>
                <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{data.no}</p>
              </div>
              
              <div className={`md:col-span-2 p-4 rounded-lg border-l-4 border-blue-500 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                <label className={`block text-xs font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Judul Inovasi
                </label>
                <p className={`text-base font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{data.judul_inovasi}</p>
              </div>

              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Pemda
                </label>
                <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{data.pemda}</p>
              </div>

              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Admin OPD
                </label>
                <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{data.admin_opd}</p>
              </div>

              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Inisiator
                </label>
                <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{data.inisiator}</p>
              </div>

              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Nama Inisiator
                </label>
                <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{data.nama_inisiator}</p>
              </div>
            </div>
          </div>

          {/* Kategori Inovasi */}
          <div className={`rounded-xl p-6 shadow-lg ${darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <h4 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
              Kategori Inovasi
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Bentuk Inovasi
                </label>
                <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{data.bentuk_inovasi}</p>
              </div>

              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Asta Cipta
                </label>
                <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{data.asta_cipta}</p>
              </div>

              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Urusan Utama
                </label>
                <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{data.urusan_utama}</p>
              </div>

              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Tahapan Inovasi
                </label>
                <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{data.tahapan_inovasi}</p>
              </div>

              <div className={`md:col-span-2 p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Urusan Lain Yang Beririsan
                </label>
                <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {data.urusan_lain_yang_beririsan || '-'}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className={`rounded-xl p-6 shadow-lg ${darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <h4 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Calendar size={20} className="text-green-500" />
              Timeline
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                <label className={`block text-xs font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  📅 Tanggal Input
                </label>
                <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {data.tanggal_input ? new Date(data.tanggal_input).toLocaleDateString('id-ID') : '-'}
                </p>
              </div>

              <div className={`p-4 rounded-lg border-l-4 border-green-500 ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                <label className={`block text-xs font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  🚀 Tanggal Penerapan
                </label>
                <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {data.tanggal_penerapan ? new Date(data.tanggal_penerapan).toLocaleDateString('id-ID') : '-'}
                </p>
              </div>

              <div className={`p-4 rounded-lg border-l-4 border-purple-500 ${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
                <label className={`block text-xs font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  🔧 Tanggal Pengembangan
                </label>
                <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {data.tanggal_pengembangan ? new Date(data.tanggal_pengembangan).toLocaleDateString('id-ID') : '-'}
                </p>
              </div>
            </div>
          </div>

          {/* Video */}
          {data.video === 'Ada' && data.link_video && (
            <div className={`rounded-xl p-6 shadow-lg ${darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'}`}>
              <h4 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                <Video size={20} className="text-red-500" />
                Video Dokumentasi
              </h4>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
                <a 
                  href={data.link_video} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium transition-colors"
                >
                  <Video size={18} />
                  <span className="break-all">{data.link_video}</span>
                </a>
              </div>
            </div>
          )}

          {/* Lokasi */}
          <div className={`rounded-xl p-6 shadow-lg ${darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <h4 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <MapPin size={20} className="text-orange-500" />
              Lokasi Koordinat
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Latitude
                </label>
                <p className={`text-sm font-mono ${darkMode ? 'text-white' : 'text-gray-800'}`}>{data.latitude}</p>
              </div>

              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Longitude
                </label>
                <p className={`text-sm font-mono ${darkMode ? 'text-white' : 'text-gray-800'}`}>{data.longitude}</p>
              </div>
            </div>

            {/* Map Preview */}
            <div className="mt-4">
              <div className="rounded-xl overflow-hidden border-2 border-gray-300 dark:border-gray-600 shadow-lg">
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${data.longitude-0.01},${data.latitude-0.01},${data.longitude+0.01},${data.latitude+0.01}&layer=mapnik&marker=${data.latitude},${data.longitude}`}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Map Preview"
                />
              </div>
              <div className="mt-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
                >
                  <MapPin size={16} />
                  Lihat di Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`sticky bottom-0 p-6 border-t flex justify-end gap-3 backdrop-blur-lg bg-opacity-90 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}