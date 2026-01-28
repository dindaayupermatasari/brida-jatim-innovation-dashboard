import { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, MapPin, Award, Sparkles, Calendar, FileDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { SkeletonLoader } from './SkeletonLoader';
import { ReportDashboard } from './ReportDashboard';

// Updated data - Tren Penerapan Per Tahun (2022-2025)
const trendData = [
  { tahun: '2022', digital: 45, nonDigital: 32, teknologi: 18 },
  { tahun: '2023', digital: 68, nonDigital: 45, teknologi: 28 },
  { tahun: '2024', digital: 95, nonDigital: 58, teknologi: 42 },
  { tahun: '2025', digital: 112, nonDigital: 68, teknologi: 55 },
];

// Updated data - Jumlah Inovasi Berdasarkan Tahapan
const maturityData = [
  { level: 'Uji Coba', jumlah: 120 },
  { level: 'Penerapan', jumlah: 145 },
  { level: 'Inisiatif', jumlah: 85 },
];

const topOPD = [
  { name: 'Dinas Komunikasi dan Informatika', jumlah: 45 },
  { name: 'Dinas Kesehatan', jumlah: 38 },
  { name: 'Dinas Pendidikan', jumlah: 32 },
  { name: 'Bappeda', jumlah: 28 },
  { name: 'Dinas Perhubungan', jumlah: 24 },
];

const topUrusan = [
  { name: 'Kesehatan', jumlah: 78 },
  { name: 'Pendidikan', jumlah: 65 },
  { name: 'Komunikasi Dan Informatika', jumlah: 52 },
  { name: 'Pekerjaan Umum Dan Penataan Ruang', jumlah: 45 },
  { name: 'Administrasi Kependudukan Dan Pencatatan Sipil', jumlah: 38 },
];

const aiInsights = [
  { icon: '📈', text: 'Pertumbuhan inovasi digital meningkat 23% tahun ini', type: 'success' },
  { icon: '🏆', text: 'Dinas Kominfo memimpin dengan 45 inovasi berkategori matang', type: 'success' },
  { icon: '⚠️', text: 'Perlu peningkatan kolaborasi antar daerah di wilayah Tapal Kuda', type: 'warning' },
  { icon: '💡', text: 'Potensi integrasi sistem e-government dapat menghemat 30% biaya operasional', type: 'info' },
  { icon: '🎯', text: 'Target 500 inovasi tahun depan sangat realistis berdasarkan tren saat ini', type: 'success' },
];

interface HomeProps {
  darkMode: boolean;
}

export function Home({ darkMode }: HomeProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showReport, setShowReport] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newPosition = direction === 'left' 
        ? scrollPosition - scrollAmount 
        : scrollPosition + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  // Calculate max values for dynamic line thickness
  const getMaxForMonth = (data: typeof trendData) => {
    return data.map(item => {
      const values = [item.digital, item.nonDigital, item.teknologi];
      const maxVal = Math.max(...values);
      return {
        ...item,
        maxType: 
          maxVal === item.digital ? 'digital' : 
          maxVal === item.nonDigital ? 'nonDigital' : 
          'teknologi'
      };
    });
  };

  const stats = [
    {
      icon: TrendingUp,
      title: 'Total Inovasi',
      value: '430',
      bgColor: 'border-l-4 border-[#2563EB]',
      iconColor: 'text-[#2563EB]'
    },
    {
      icon: Award,
      title: 'Rata-rata Kematangan',
      value: '3.8',
      bgColor: 'border-l-4 border-purple-500',
      iconColor: 'text-purple-600'
    },
    {
      icon: Sparkles,
      title: 'Inovasi Digital',
      value: '215',
      bgColor: 'border-l-4 border-green-500',
      iconColor: 'text-green-600'
    },
    {
      icon: Calendar,
      title: 'Inovasi Baru 2026',
      value: '57',
      bgColor: 'border-l-4 border-orange-500',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-4 md:space-y-6 max-w-full pb-6 overflow-x-hidden">
      {/* Summary Cards Section */}
      <div>
        <h2 className={`text-base md:text-lg font-bold mb-3 md:mb-4 ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
          Ringkasan Statistik Inovasi
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`rounded-lg shadow-md p-3 md:p-4 transition-all hover:scale-105 cursor-pointer ${stat.bgColor} ${
                  darkMode ? 'bg-opacity-20' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={stat.iconColor} size={20} />
                </div>
                <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>
                  {stat.title}
                </p>
                <p className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Charts Section */}
      <div>
        <h2 className={`text-base md:text-lg font-bold mb-3 md:mb-4 ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
          Visualisasi Data
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
          {/* Trend Chart */}
          <div className={`rounded-lg shadow-md p-4 md:p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-base md:text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
              Tren Penerapan Inovasi Per Tahun
            </h3>
            <div className="w-full h-[300px] md:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis 
                    dataKey="tahun" 
                    stroke={darkMode ? '#9ca3af' : '#6b7280'} 
                    style={{ fontSize: '12px' }}
                    label={{ 
                      value: 'Tahun', 
                      position: 'insideBottom', 
                      offset: -10, 
                      fill: darkMode ? '#9ca3af' : '#6b7280'
                    }}
                  />
                  <YAxis 
                    stroke={darkMode ? '#9ca3af' : '#6b7280'} 
                    style={{ fontSize: '12px' }}
                    label={{ 
                      value: 'Jumlah Inovasi', 
                      angle: -90, 
                      position: 'insideLeft', 
                      fill: darkMode ? '#9ca3af' : '#6b7280',
                      style: { textAnchor: 'middle' },
                      offset: 10
                    }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                      color: darkMode ? '#ffffff' : '#000000'
                    }}
                    labelFormatter={(value) => `Tahun ${value}`}
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={36}
                    wrapperStyle={{ fontSize: '12px', paddingBottom: '5px' }} 
                  />
                  <Line type="monotone" dataKey="digital" stroke="#2563EB" strokeWidth={4} name="Digital" />
                  <Line type="monotone" dataKey="nonDigital" stroke="#10b981" strokeWidth={2} name="Non-Digital" />
                  <Line type="monotone" dataKey="teknologi" stroke="#f59e0b" strokeWidth={2} name="Teknologi" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Maturity Distribution */}
          <div className={`rounded-lg shadow-md p-4 md:p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-base md:text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
              Jumlah Inovasi Berdasarkan Tahapan
            </h3>
            <div className="w-full h-[300px] md:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={maturityData} barSize={60} margin={{ top: 20, right: 30, left: 60, bottom: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis 
                    dataKey="level" 
                    stroke={darkMode ? '#9ca3af' : '#6b7280'} 
                    style={{ fontSize: '12px' }}
                    interval={0}
                    label={{ 
                      value: 'Tahapan Inovasi', 
                      position: 'insideBottom', 
                      offset: -15, 
                      fill: darkMode ? '#9ca3af' : '#6b7280' 
                    }}
                  />
                  <YAxis 
                    stroke={darkMode ? '#9ca3af' : '#6b7280'} 
                    style={{ fontSize: '12px' }}
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
                  <Bar dataKey="jumlah" fill="#2563EB" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Capaian OPD dan Daerah Terbaik */}
      <div>
        <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
          Kinerja Perangkat Daerah dan Fokus Sektor Unggulan
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top OPD */}
          <div className={`rounded-lg shadow-md p-4 md:p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-base md:text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
              Top 5 OPD Berdasarkan Jumlah Inovasi
            </h3>
            <div className="w-full h-[300px] md:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topOPD} layout="vertical" margin={{ top: 5, right: 30, left: 5, bottom: 30 }} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis 
                    type="number" 
                    stroke={darkMode ? '#9ca3af' : '#6b7280'} 
                    style={{ fontSize: '12px' }}
                    label={{ 
                      value: 'Jumlah Inovasi', 
                      position: 'insideBottom', 
                      offset: -10, 
                      fill: darkMode ? '#9ca3af' : '#6b7280',
                      dy: 10
                    }}
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    stroke={darkMode ? '#9ca3af' : '#6b7280'} 
                    width={200} 
                    style={{ fontSize: '11px' }}
                    label={{ 
                      value: 'OPD', 
                      angle: -90, 
                      position: 'insideLeft', 
                      fill: darkMode ? '#9ca3af' : '#6b7280',
                      style: { textAnchor: 'middle' },
                      dx: -5
                    }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                      color: darkMode ? '#ffffff' : '#000000'
                    }}
                  />
                  <Bar dataKey="jumlah" radius={[0, 8, 8, 0]} fill={(entry) => {
                    return entry.jumlah === 45 ? '#2563EB' : '#9CA3AF';
                  }}>
                    {topOPD.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.jumlah === 45 ? '#2563EB' : '#9CA3AF'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Urusan */}
          <div className={`rounded-lg shadow-md p-4 md:p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-base md:text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
              Top 5 Urusan Berdasarkan Jumlah Inovasi
            </h3>
            <div className="w-full h-[300px] md:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topUrusan} layout="vertical" margin={{ top: 5, right: 30, left: 5, bottom: 30 }} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis 
                    type="number" 
                    stroke={darkMode ? '#9ca3af' : '#6b7280'} 
                    style={{ fontSize: '12px' }}
                    label={{ 
                      value: 'Jumlah Inovasi', 
                      position: 'insideBottom', 
                      offset: -10, 
                      fill: darkMode ? '#9ca3af' : '#6b7280',
                      dy: 10
                    }}
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    stroke={darkMode ? '#9ca3af' : '#6b7280'} 
                    width={200} 
                    style={{ fontSize: '11px' }}
                    label={{ 
                      value: 'Urusan', 
                      angle: -90, 
                      position: 'insideLeft', 
                      fill: darkMode ? '#9ca3af' : '#6b7280',
                      style: { textAnchor: 'middle' },
                      dx: -5
                    }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                      color: darkMode ? '#ffffff' : '#000000'
                    }}
                  />
                  <Bar dataKey="jumlah" radius={[0, 8, 8, 0]} fill={(entry) => {
                    return entry.jumlah === 78 ? '#2563EB' : '#9CA3AF';
                  }}>
                    {topUrusan.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.jumlah === 78 ? '#2563EB' : '#9CA3AF'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* AI Auto Insight */}
      <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
            AI Auto Insight
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <ChevronLeft size={20} className={darkMode ? 'text-white' : 'text-[#0F172A]'} />
            </button>
            <button
              onClick={() => scroll('right')}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <ChevronRight size={20} className={darkMode ? 'text-white' : 'text-[#0F172A]'} />
            </button>
          </div>
        </div>
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {aiInsights.map((insight, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-80 p-4 rounded-lg border-l-4 ${
                insight.type === 'success' ? 'border-green-500' :
                insight.type === 'warning' ? 'border-yellow-500' :
                'border-blue-500'
              } ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{insight.icon}</span>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-[#64748B]'}`}>
                  {insight.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Report */}
      <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
              Executive Summary Report
            </h3>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-[#64748B]'}`}>
              Download laporan ringkasan eksekutif lengkap dalam format PDF
            </p>
          </div>
          <button 
            onClick={() => setShowReport(true)}
            className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <FileDown size={20} />
            <span className="font-medium">Export PDF</span>
          </button>
        </div>
      </div>

      {/* Report Modal */}
      {showReport && <ReportDashboard onClose={() => setShowReport(false)} />}
    </div>
  );
}