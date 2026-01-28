import { useState } from 'react';
import { Filter, Download, RotateCcw, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ReportAnalytics } from './ReportAnalytics';

// Sample data - Top 10 Urusan dengan stacked tahapan
const urusanTahapanData = [
  { urusan: 'Kesehatan', inisiatif: 15, ujiCoba: 28, penerapan: 35 },
  { urusan: 'Pendidikan', inisiatif: 12, ujiCoba: 23, penerapan: 30 },
  { urusan: 'Komunikasi & Informatika', inisiatif: 18, ujiCoba: 16, penerapan: 18 },
  { urusan: 'Pekerjaan Umum', inisiatif: 10, ujiCoba: 15, penerapan: 20 },
  { urusan: 'Adm. Kependudukan', inisiatif: 8, ujiCoba: 12, penerapan: 18 },
  { urusan: 'Perhubungan', inisiatif: 12, ujiCoba: 10, penerapan: 12 },
  { urusan: 'Lingkungan Hidup', inisiatif: 15, ujiCoba: 8, penerapan: 9 },
  { urusan: 'Sosial', inisiatif: 10, ujiCoba: 9, penerapan: 10 },
  { urusan: 'Pertanian', inisiatif: 14, ujiCoba: 6, penerapan: 8 },
  { urusan: 'Pariwisata', inisiatif: 8, ujiCoba: 7, penerapan: 9 },
];

const jenisInovasiData = [
  { name: 'Digital', value: 215, color: '#6366f1' },
  { name: 'Non-Digital', value: 145, color: '#10b981' },
  { name: 'Teknologi', value: 70, color: '#f59e0b' },
];

// Watchlist data - Low Performance Innovations
const watchlistData = [
  { nama: 'Sistem Pengaduan Masyarakat v1', inisiator: 'Dinas Kominfo', tahunPenerapan: 2023, skorKematangan: 25 },
  { nama: 'Program Pemupukan Organik', inisiator: 'Dinas Pertanian', tahunPenerapan: 2022, skorKematangan: 18 },
  { nama: 'SOP Pelayanan Cepat Kecamatan', inisiator: 'Kepala Daerah', tahunPenerapan: 2023, skorKematangan: 22 },
  { nama: 'Aplikasi Absensi Manual', inisiator: 'Bappeda', tahunPenerapan: 2022, skorKematangan: 15 },
  { nama: 'Portal Berita Desa', inisiator: 'Dinas Pemberdayaan Masyarakat', tahunPenerapan: 2023, skorKematangan: 28 },
];

// Helper function to get maturity badge properties
const getMaturityBadge = (score: number) => {
  if (score >= 100) {
    return { label: 'Sangat Matang', color: 'bg-emerald-600', textColor: 'text-white' };
  } else if (score >= 80) {
    return { label: 'Matang', color: 'bg-blue-500', textColor: 'text-white' };
  } else if (score >= 60) {
    return { label: 'Cukup Matang', color: 'bg-yellow-500', textColor: 'text-white' };
  } else if (score >= 30) {
    return { label: 'Kurang Matang', color: 'bg-orange-500', textColor: 'text-white' };
  } else {
    return { label: 'Perlu Perhatian', color: 'bg-red-500', textColor: 'text-white' };
  }
};

interface AnalyticsProps {
  darkMode: boolean;
}

export function Analytics({ darkMode }: AnalyticsProps) {
  const [filters, setFilters] = useState({
    tahun: 'Semua',
    opd: 'Semua',
    jenisInovasi: 'Semua',
    bentukInovasi: 'Semua',
  });
  const [showReport, setShowReport] = useState(false);

  const resetFilters = () => {
    setFilters({
      tahun: 'Semua',
      opd: 'Semua',
      jenisInovasi: 'Semua',
      bentukInovasi: 'Semua',
    });
  };

  // Calculate total for donut center
  const totalInnovations = jenisInovasiData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-4 md:space-y-6 pb-6 max-w-full overflow-x-hidden">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Analitik Inovasi
        </h2>
        <button 
          onClick={() => setShowReport(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Download size={18} />
          <span>Export Data</span>
        </button>
      </div>

      {/* Filters */}
      <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-blue-500" />
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Filter Data</h3>
          </div>
          <button
            onClick={resetFilters}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <RotateCcw size={16} />
            <span className="text-sm font-medium">Reset Filter</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tahun</label>
            <select
              value={filters.tahun}
              onChange={(e) => setFilters({ ...filters, tahun: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
              }`}
            >
              <option>Semua</option>
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>OPD</label>
            <select
              value={filters.opd}
              onChange={(e) => setFilters({ ...filters, opd: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
              }`}
            >
              <option>Semua</option>
              <option>Dinas Kominfo</option>
              <option>Dinas Pertanian</option>
              <option>Bappeda</option>
              <option>Dinas Pemberdayaan Masyarakat</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Jenis Inovasi</label>
            <select
              value={filters.jenisInovasi}
              onChange={(e) => setFilters({ ...filters, jenisInovasi: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
              }`}
            >
              <option>Semua</option>
              <option>Digital</option>
              <option>Non-Digital</option>
              <option>Teknologi</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Bentuk Inovasi</label>
            <select
              value={filters.bentukInovasi}
              onChange={(e) => setFilters({ ...filters, bentukInovasi: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
              }`}
            >
              <option>Semua</option>
              <option>Aplikasi/Sistem</option>
              <option>SOP Baru</option>
              <option>Metode Baru</option>
            </select>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stacked Bar Chart - Top 10 Urusan */}
        <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Top 10 Urusan Berdasarkan Tahapan
          </h3>
          <p className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Status progres inovasi di setiap sektor urusan pemerintahan
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart 
              data={urusanTahapanData}
              layout="horizontal"
              margin={{ top: 20, right: 30, left: 60, bottom: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="urusan" 
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                angle={-45}
                textAnchor="end"
                height={80}
                style={{ fontSize: '11px' }}
                label={{ 
                  value: 'Urusan Utama', 
                  position: 'insideBottom', 
                  offset: -20,
                  fill: darkMode ? '#9ca3af' : '#6b7280',
                  dy: 15
                }}
              />
              <YAxis 
                stroke={darkMode ? '#9ca3af' : '#6b7280'}
                label={{ 
                  value: 'Jumlah Inovasi', 
                  angle: -90, 
                  position: 'center', 
                  fill: darkMode ? '#9ca3af' : '#6b7280',
                  style: { textAnchor: 'middle' },
                  dx: -25
                }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  color: darkMode ? '#ffffff' : '#000000'
                }}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                wrapperStyle={{ paddingBottom: '5px' }} 
              />
              <Bar dataKey="inisiatif" stackId="a" fill="#ef4444" name="Inisiatif" />
              <Bar dataKey="ujiCoba" stackId="a" fill="#f59e0b" name="Uji Coba" />
              <Bar dataKey="penerapan" stackId="a" fill="#10b981" name="Penerapan" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart - Distribusi Jenis */}
        <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Distribusi Jenis Inovasi
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={jenisInovasiData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                innerRadius={80}
                outerRadius={130}
                fill="#8884d8"
                dataKey="value"
              >
                {jenisInovasiData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  color: darkMode ? '#ffffff' : '#000000'
                }}
              />
              <Legend />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className={`text-3xl font-bold ${darkMode ? 'fill-white' : 'fill-gray-800'}`}
              >
                {totalInnovations}
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 100% Stacked Bar Chart - Inisiator vs Bentuk */}
      <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Komposisi Bentuk Inovasi per Inisiator
        </h3>
        <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Proporsi 100% dari setiap kategori inisiator berdasarkan bentuk inovasi (Aplikasi, SOP, Metode Baru)
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart 
            data={[
              { inisiator: 'Kepala Daerah', aplikasi: 40, sop: 35, metode: 25 },
              { inisiator: 'OPD', aplikasi: 55, sop: 30, metode: 15 },
              { inisiator: 'ASN', aplikasi: 30, sop: 40, metode: 30 },
              { inisiator: 'Masyarakat', aplikasi: 20, sop: 25, metode: 55 },
            ]}
            layout="vertical"
            stackOffset="expand"
            margin={{ top: 20, right: 30, left: 100, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis 
              type="number" 
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
              stroke={darkMode ? '#9ca3af' : '#6b7280'}
              domain={[0, 1]}
              label={{ 
                value: 'Persentase (%)', 
                position: 'insideBottom', 
                offset: -15, 
                fill: darkMode ? '#9ca3af' : '#6b7280',
                dy: 10
              }}
            />
            <YAxis 
              dataKey="inisiator" 
              type="category" 
              width={110}
              stroke={darkMode ? '#9ca3af' : '#6b7280'}
              style={{ fontSize: '12px' }}
              label={{ 
                value: 'Inisiator', 
                angle: -90, 
                position: 'insideLeft', 
                fill: darkMode ? '#9ca3af' : '#6b7280',
                style: { textAnchor: 'middle' },
                dx: -10
              }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                color: darkMode ? '#ffffff' : '#000000'
              }}
              formatter={(value: any) => `${(value * 100).toFixed(1)}%`}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              wrapperStyle={{ paddingBottom: '5px' }} 
            />
            <Bar dataKey="aplikasi" stackId="a" fill="#6366f1" name="Aplikasi/Sistem" />
            <Bar dataKey="sop" stackId="a" fill="#10b981" name="SOP Baru" />
            <Bar dataKey="metode" stackId="a" fill="#f59e0b" name="Metode Baru" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Watchlist Table - Low Performance */}
      <div className={`rounded-lg shadow-md overflow-hidden border-2 border-red-200 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className={`px-6 py-4 border-b ${darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-600" size={24} />
            <div>
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                🚨 Inovasi Perlu Perhatian (Low Performance)
              </h3>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Inovasi dengan skor kematangan {"<"} 30 dan sudah berjalan lebih dari 1 tahun
              </p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Nama Inovasi
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Inisiator/OPD
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Tahun Penerapan
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Skor Kematangan
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {watchlistData.map((item, index) => (
                <tr key={index} className={`hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors`}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.nama}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {item.inisiator}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {item.tahunPenerapan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-red-500 text-white">
                      {item.skorKematangan}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Modal */}
      {showReport && <ReportAnalytics onClose={() => setShowReport(false)} filters={filters} />}
    </div>
  );
}