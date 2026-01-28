import { useState } from 'react';
import { X, Save, Search } from 'lucide-react';

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

interface EditDataProps {
  darkMode: boolean;
  data: Inovasi;
  onClose: () => void;
  onSubmit: (data: Partial<Inovasi>) => void;
}

// Daftar Admin OPD
const adminOPDList = [
  'Badan Kepegawaian Daerah Provinsi Jawa Timur',
  'Badan Kesatuan Bangsa dan Politik Provinsi Jawa Timur',
  'Badan Pendapatan Daerah Provinsi Jawa Timur',
  'Dinas Energi dan Sumber Daya Mineral Provinsi Jawa Timur',
  'Dinas Kebudayaan dan Pariwisata Provinsi Jawa Timur',
  'Dinas Kelautan dan Perikanan Provinsi Jawa Timur',
  'Dinas Kepemudaan dan Olahraga Provinsi Jawa Timur',
  'Dinas Kesehatan Provinsi Jawa Timur',
  'Dinas Komunikasi dan Informatika Provinsi Jawa Timur',
  'Dinas Koperasi, Usaha Kecil dan Menengah Provinsi Jawa Timur',
  'Dinas Lingkungan Hidup Provinsi Jawa Timur',
  'Dinas Pekerjaan Umum Bina Marga Provinsi Jawa Timur',
  'Dinas Pemberdayaan Masyarakat dan Desa Provinsi Jawa Timur',
  'Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu Provinsi Jawa Timur',
  'Dinas Perhubungan Provinsi Jawa Timur',
  'Dinas Perindustrian dan Perdagangan Provinsi Jawa Timur',
  'Dinas Perpustakaan dan Kearsipan Provinsi Jawa Timur',
  'Dinas Pertanian dan Ketahanan Pangan Provinsi Jawa Timur',
  'Dinas Sosial Provinsi Jawa Timur',
  'Dinas Tenaga Kerja dan Transmigrasi Provinsi Jawa Timur',
];

// Daftar Asta Cipta
const astaCiptaList = [
  'Pangan',
  'Energi',
  'Air',
  'Kesehatan',
  'Lingkungan',
  'Keamanan',
  'Teknologi',
  'SDM',
];

// Daftar Urusan Utama
const urusanUtamaList = [
  'Administrasi Kependudukan Dan Pencatatan Sipil',
  'Energi Dan Sumber Daya Mineral',
  'Kearsipan',
  'Kebudayaan',
  'Kelautan Dan Perikanan',
  'Kepegawaian',
  'Kepemudaan Dan Olah Raga',
  'Kesehatan',
  'Ketenteraman, Ketertiban Umum, Dan Pelindungan Masyarakat',
  'Keuangan',
  'Komunikasi Dan Informatika',
  'Koperasi, Usaha Kecil, Dan Menengah',
  'Lingkungan Hidup',
  'Pangan',
  'Pariwisata',
  'Pekerjaan Umum Dan Penataan Ruang',
  'Pemberdayaan Masyarakat Dan Desa',
  'Pemberdayaan Perempuan Dan Pelindungan Anak',
  'Penanaman Modal',
  'Pendidikan',
  'Penelitian Dan Pengembangan',
  'Perdagangan',
  'Perencanaan',
  'Perhubungan',
  'Perpustakaan',
  'Pertanian',
  'Perumahan Rakyat Dan Kawasan Permukiman',
  'Pelayanan Terpadu Satu Pintu',
  'Sosial',
  'Tenaga Kerja',
];

export function EditData({ darkMode, data, onClose, onSubmit }: EditDataProps) {
  const [formData, setFormData] = useState<Partial<Inovasi>>(data);

  const [searchOPD, setSearchOPD] = useState('');
  const [searchAsta, setSearchAsta] = useState('');
  const [searchUrusan, setSearchUrusan] = useState('');
  const [searchUrusanLain, setSearchUrusanLain] = useState('');
  const [showOPDDropdown, setShowOPDDropdown] = useState(false);
  const [showAstaDropdown, setShowAstaDropdown] = useState(false);
  const [showUrusanDropdown, setShowUrusanDropdown] = useState(false);
  const [showUrusanLainDropdown, setShowUrusanLainDropdown] = useState(false);

  const filteredOPD = adminOPDList.filter(opd => 
    opd.toLowerCase().includes(searchOPD.toLowerCase())
  );

  const filteredAsta = astaCiptaList.filter(asta => 
    asta.toLowerCase().includes(searchAsta.toLowerCase())
  );

  const filteredUrusan = urusanUtamaList.filter(urusan => 
    urusan.toLowerCase().includes(searchUrusan.toLowerCase())
  );

  const filteredUrusanLain = urusanUtamaList.filter(urusan => 
    urusan.toLowerCase().includes(searchUrusanLain.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`sticky top-0 z-10 p-6 border-b flex items-center justify-between ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Edit Data Inovasi
          </h3>
          <button onClick={onClose} className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}>
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Grid 2 kolom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Judul Inovasi */}
            <div className="md:col-span-2">
              <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Judul Inovasi *
              </label>
              <input
                type="text"
                required
                value={formData.judul_inovasi}
                onChange={(e) => setFormData({ ...formData, judul_inovasi: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                }`}
              />
            </div>

            {/* Pemda */}
            <div>
              <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Pemda *
              </label>
              <input
                type="text"
                required
                value={formData.pemda}
                onChange={(e) => setFormData({ ...formData, pemda: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                }`}
              />
            </div>

            {/* Admin OPD - Searchable Dropdown */}
            <div className="relative">
              <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Admin OPD *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.admin_opd || searchOPD}
                  onChange={(e) => {
                    setSearchOPD(e.target.value);
                    setFormData({ ...formData, admin_opd: e.target.value });
                    setShowOPDDropdown(true);
                  }}
                  onFocus={() => setShowOPDDropdown(true)}
                  className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              {showOPDDropdown && filteredOPD.length > 0 && (
                <div className={`absolute z-20 w-full mt-1 max-h-60 overflow-y-auto rounded-lg border shadow-lg ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}>
                  {filteredOPD.map((opd, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setFormData({ ...formData, admin_opd: opd });
                        setSearchOPD('');
                        setShowOPDDropdown(false);
                      }}
                      className={`px-3 py-2 cursor-pointer transition-colors ${
                        darkMode ? 'hover:bg-gray-600 text-gray-200' : 'hover:bg-gray-100 text-gray-800'
                      }`}
                    >
                      {opd}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Inisiator */}
            <div>
              <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Inisiator *
              </label>
              <select
                required
                value={formData.inisiator}
                onChange={(e) => setFormData({ ...formData, inisiator: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                }`}
              >
                <option>Kepala Dinas</option>
                <option>Kepala Bidang</option>
                <option>Kepala Seksi</option>
                <option>Staf</option>
                <option>Lainnya</option>
              </select>
            </div>

            {/* Nama Inisiator */}
            <div>
              <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Nama Inisiator *
              </label>
              <input
                type="text"
                required
                value={formData.nama_inisiator}
                onChange={(e) => setFormData({ ...formData, nama_inisiator: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                }`}
              />
            </div>

            {/* Bentuk Inovasi */}
            <div>
              <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Bentuk Inovasi *
              </label>
              <select
                required
                value={formData.bentuk_inovasi}
                onChange={(e) => setFormData({ ...formData, bentuk_inovasi: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                }`}
              >
                <option>Inovasi Layanan</option>
                <option>Inovasi Tata Kelola</option>
                <option>Inovasi Lainnya</option>
              </select>
            </div>

            {/* Jenis */}
            <div>
              <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Jenis *
              </label>
              <select
                required
                value={formData.jenis}
                onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                }`}
              >
                <option>Digital</option>
                <option>Non-Digital</option>
              </select>
            </div>

            {/* Asta Cipta - Searchable Dropdown */}
            <div className="relative">
              <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Asta Cipta *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.asta_cipta || searchAsta}
                  onChange={(e) => {
                    setSearchAsta(e.target.value);
                    setFormData({ ...formData, asta_cipta: e.target.value });
                    setShowAstaDropdown(true);
                  }}
                  onFocus={() => setShowAstaDropdown(true)}
                  className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              {showAstaDropdown && filteredAsta.length > 0 && (
                <div className={`absolute z-20 w-full mt-1 max-h-60 overflow-y-auto rounded-lg border shadow-lg ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}>
                  {filteredAsta.map((asta, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setFormData({ ...formData, asta_cipta: asta });
                        setSearchAsta('');
                        setShowAstaDropdown(false);
                      }}
                      className={`px-3 py-2 cursor-pointer transition-colors ${
                        darkMode ? 'hover:bg-gray-600 text-gray-200' : 'hover:bg-gray-100 text-gray-800'
                      }`}
                    >
                      {asta}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Urusan Utama - Searchable Dropdown */}
            <div className="relative">
              <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Urusan Utama *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.urusan_utama || searchUrusan}
                  onChange={(e) => {
                    setSearchUrusan(e.target.value);
                    setFormData({ ...formData, urusan_utama: e.target.value });
                    setShowUrusanDropdown(true);
                  }}
                  onFocus={() => setShowUrusanDropdown(true)}
                  className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              {showUrusanDropdown && filteredUrusan.length > 0 && (
                <div className={`absolute z-20 w-full mt-1 max-h-60 overflow-y-auto rounded-lg border shadow-lg ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}>
                  {filteredUrusan.map((urusan, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setFormData({ ...formData, urusan_utama: urusan });
                        setSearchUrusan('');
                        setShowUrusanDropdown(false);
                      }}
                      className={`px-3 py-2 cursor-pointer transition-colors ${
                        darkMode ? 'hover:bg-gray-600 text-gray-200' : 'hover:bg-gray-100 text-gray-800'
                      }`}
                    >
                      {urusan}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Urusan Lain yang Beririsan - Searchable Dropdown */}
            <div className="relative">
              <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Urusan Lain Yang Beririsan
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.urusan_lain_yang_beririsan || searchUrusanLain}
                  onChange={(e) => {
                    setSearchUrusanLain(e.target.value);
                    setFormData({ ...formData, urusan_lain_yang_beririsan: e.target.value });
                    setShowUrusanLainDropdown(true);
                  }}
                  onFocus={() => setShowUrusanLainDropdown(true)}
                  className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              {showUrusanLainDropdown && filteredUrusanLain.length > 0 && (
                <div className={`absolute z-20 w-full mt-1 max-h-60 overflow-y-auto rounded-lg border shadow-lg ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}>
                  {filteredUrusanLain.map((urusan, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setFormData({ ...formData, urusan_lain_yang_beririsan: urusan });
                        setSearchUrusanLain('');
                        setShowUrusanLainDropdown(false);
                      }}
                      className={`px-3 py-2 cursor-pointer transition-colors ${
                        darkMode ? 'hover:bg-gray-600 text-gray-200' : 'hover:bg-gray-100 text-gray-800'
                      }`}
                    >
                      {urusan}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Kematangan */}
            <div>
              <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Kematangan (0-120) *
              </label>
              <input
                type="number"
                required
                min="0"
                max="120"
                value={formData.kematangan}
                onChange={(e) => setFormData({ ...formData, kematangan: Number(e.target.value) })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                }`}
              />
            </div>

            {/* Tahapan Inovasi */}
            <div>
              <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Tahapan Inovasi *
              </label>
              <select
                required
                value={formData.tahapan_inovasi}
                onChange={(e) => setFormData({ ...formData, tahapan_inovasi: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                }`}
              >
                <option>Inisiatif</option>
                <option>Uji Coba</option>
                <option>Penerapan</option>
              </select>
            </div>

            {/* Tanggal Input */}
            <div>
              <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Tanggal Input *
              </label>
              <input
                type="date"
                required
                value={formData.tanggal_input}
                onChange={(e) => setFormData({ ...formData, tanggal_input: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                }`}
              />
            </div>

            {/* Tanggal Penerapan */}
            <div>
              <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Tanggal Penerapan
              </label>
              <input
                type="date"
                value={formData.tanggal_penerapan}
                onChange={(e) => setFormData({ ...formData, tanggal_penerapan: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                }`}
              />
            </div>

            {/* Tanggal Pengembangan */}
            <div>
              <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Tanggal Pengembangan
              </label>
              <input
                type="date"
                value={formData.tanggal_pengembangan}
                onChange={(e) => setFormData({ ...formData, tanggal_pengembangan: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                }`}
              />
            </div>

            {/* Video */}
            <div>
              <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Video *
              </label>
              <select
                required
                value={formData.video}
                onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                }`}
              >
                <option>Ada</option>
                <option>Tidak</option>
              </select>
            </div>

            {/* Link Video */}
            <div>
              <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Link Video {formData.video === 'Ada' && '*'}
              </label>
              <input
                type="url"
                required={formData.video === 'Ada'}
                disabled={formData.video === 'Tidak'}
                value={formData.link_video}
                onChange={(e) => setFormData({ ...formData, link_video: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white disabled:opacity-50' : 'bg-white border-gray-300 text-gray-800 disabled:bg-gray-100'
                }`}
              />
            </div>

            {/* Latitude */}
            <div>
              <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Latitude *
              </label>
              <input
                type="number"
                required
                step="0.000001"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: Number(e.target.value) })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                }`}
              />
            </div>

            {/* Longitude */}
            <div>
              <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Longitude *
              </label>
              <input
                type="number"
                required
                step="0.000001"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: Number(e.target.value) })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                }`}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`flex justify-end gap-3 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg transition-colors ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save size={18} />
              Update Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
