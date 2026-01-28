import { useState } from 'react';
import { MapPin, TrendingUp, Award, Layers, Filter, Play, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const regions = [
  { id: 1, name: 'Kota Surabaya', lat: -7.2575, lng: 112.7521, inovasi: 95, kematangan: 4.5, dominant: 'Digital', color: 'bg-green-600', url_video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 2, name: 'Kota Malang', lat: -7.9666, lng: 112.6326, inovasi: 72, kematangan: 4.2, dominant: 'Digital', color: 'bg-green-500', url_video: '' },
  { id: 3, name: 'Kabupaten Sidoarjo', lat: -7.4467, lng: 112.7184, inovasi: 68, kematangan: 4.0, dominant: 'Digital', color: 'bg-blue-500', url_video: 'https://youtu.be/9bZkp7q19f0' },
  { id: 4, name: 'Kabupaten Gresik', lat: -7.1564, lng: 112.6540, inovasi: 54, kematangan: 3.8, dominant: 'Digital', color: 'bg-blue-400', url_video: '' },
  { id: 5, name: 'Kota Madiun', lat: -7.6298, lng: 111.5239, inovasi: 48, kematangan: 3.7, dominant: 'Non-Digital', color: 'bg-blue-400', url_video: '' },
  { id: 6, name: 'Kabupaten Mojokerto', lat: -7.5463, lng: 112.4337, inovasi: 42, kematangan: 3.6, dominant: 'Digital', color: 'bg-blue-300', url_video: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ' },
  { id: 7, name: 'Kabupaten Jember', lat: -8.1716, lng: 113.6996, inovasi: 38, kematangan: 3.4, dominant: 'Non-Digital', color: 'bg-yellow-500', url_video: '' },
  { id: 8, name: 'Kota Kediri', lat: -7.8149, lng: 112.0178, inovasi: 35, kematangan: 3.3, dominant: 'Non-Digital', color: 'bg-yellow-400', url_video: '' },
  { id: 9, name: 'Kabupaten Pasuruan', lat: -7.6453, lng: 112.9075, inovasi: 32, kematangan: 3.2, dominant: 'Non-Digital', color: 'bg-yellow-400', url_video: '' },
  { id: 10, name: 'Kabupaten Lamongan', lat: -7.1161, lng: 112.4186, inovasi: 28, kematangan: 3.0, dominant: 'Non-Digital', color: 'bg-orange-400', url_video: '' },
];

// Helper to get maturity color for tooltip
const getMaturityColor = (kematangan: number, darkMode: boolean) => {
  if (kematangan >= 4.0) {
    return darkMode ? 'bg-green-700 border-green-500' : 'bg-green-100 border-green-500';
  } else if (kematangan >= 3.5) {
    return darkMode ? 'bg-blue-700 border-blue-500' : 'bg-blue-100 border-blue-500';
  } else {
    return darkMode ? 'bg-yellow-700 border-yellow-500' : 'bg-yellow-100 border-yellow-500';
  }
};

// Helper to convert YouTube URL to embed format
const getYouTubeEmbedUrl = (url: string): string => {
  if (!url) return '';
  
  // Handle youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/);
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }
  
  // Handle youtu.be/VIDEO_ID
  const shortMatch = url.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (shortMatch) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }
  
  // If already embed format or other format, return as is
  return url;
};

interface MapInnovationProps {
  darkMode: boolean;
}

// Video Modal Component
function VideoModal({ videoUrl, onClose, darkMode }: { videoUrl: string; onClose: () => void; darkMode: boolean }) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Video Profil Inovasi
          </h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Video Container */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={embedUrl}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video Profil Inovasi"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export function MapInnovation({ darkMode }: MapInnovationProps) {
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [filterDaerah, setFilterDaerah] = useState('Semua');
  const [hoveredRegion, setHoveredRegion] = useState<typeof regions[0] | null>(null);
  const [zoomLevel, setZoomLevel] = useState<'out' | 'in'>('out');
  const [showVideoModal, setShowVideoModal] = useState(false);

  const filteredRegions = regions.filter((region) => {
    if (filterDaerah === 'Semua') return true;
    return region.name === filterDaerah;
  });

  const comparisonData = regions.slice(0, 6).map(r => ({
    name: r.name.split(' ')[1] || r.name.split(' ')[0],
    jumlah: r.inovasi
  }));

  // Dummy data for widgets
  const blankSpotRegions = [
    'Kabupaten Pacitan',
    'Kabupaten Ponorogo',
    'Kabupaten Magetan',
  ];

  const top5Regions = [
    { rank: 1, name: 'Kota Surabaya', jumlah: 95, score: 4.5, digital: 58 },
    { rank: 2, name: 'Kota Malang', jumlah: 72, score: 4.2, digital: 45 },
    { rank: 3, name: 'Kabupaten Sidoarjo', jumlah: 68, score: 4.0, digital: 42 },
    { rank: 4, name: 'Kabupaten Gresik', jumlah: 54, score: 3.8, digital: 32 },
    { rank: 5, name: 'Kota Madiun', jumlah: 48, score: 3.7, digital: 28 },
  ];

  return (
    <div className="space-y-6 pb-6 overflow-x-hidden">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Peta Inovasi Daerah
        </h2>
        <div className="flex items-center gap-3">
          <select
            value={filterDaerah}
            onChange={(e) => setFilterDaerah(e.target.value)}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
            }`}
          >
            <option>Semua</option>
            {regions.map((region) => (
              <option key={region.id}>{region.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Map Area - 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Map Container (70-75%) */}
        <div className="lg:col-span-9">
          <div className={`rounded-lg shadow-md p-6 h-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="text-blue-500" size={20} />
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Peta Jawa Timur - Lokasi Inovasi
                </h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setZoomLevel('out')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    zoomLevel === 'out'
                      ? 'bg-blue-500 text-white'
                      : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Zoom Out (Cluster)
                </button>
                <button
                  onClick={() => setZoomLevel('in')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    zoomLevel === 'in'
                      ? 'bg-blue-500 text-white'
                      : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Zoom In (Pins)
                </button>
              </div>
            </div>
            
            <div className="relative">
              {/* Simulated Map Background */}
              <div className={`w-full h-[500px] rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} relative overflow-hidden`}>
                {/* Map grid pattern */}
                <div className="absolute inset-0" style={{
                  backgroundImage: `linear-gradient(${darkMode ? '#4B5563' : '#D1D5DB'} 1px, transparent 1px), linear-gradient(90deg, ${darkMode ? '#4B5563' : '#D1D5DB'} 1px, transparent 1px)`,
                  backgroundSize: '50px 50px'
                }}></div>
                
                {/* Clustered View (Zoom Out) */}
                {zoomLevel === 'out' ? (
                  <div className="absolute inset-0">
                    {/* Cluster markers */}
                    {filteredRegions.map((region) => (
                      <div
                        key={region.id}
                        className="absolute cursor-pointer transform hover:scale-110 transition-all"
                        style={{
                          left: `${((region.lng - 111.0) / 3.0) * 100}%`,
                          top: `${((region.lat + 8.5) / 1.5) * 100}%`,
                        }}
                        onClick={() => {
                          setSelectedRegion(region);
                          setZoomLevel('in');
                        }}
                        onMouseEnter={() => setHoveredRegion(region)}
                        onMouseLeave={() => setHoveredRegion(null)}
                      >
                        {/* Cluster circle */}
                        <div className={`${region.color} rounded-full w-16 h-16 flex items-center justify-center shadow-xl border-4 border-white animate-pulse`}>
                          <span className="text-white font-bold text-xl">{region.inovasi}</span>
                        </div>
                        
                        {/* Tooltip */}
                        {hoveredRegion?.id === region.id && (
                          <div className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-4 py-3 rounded-lg shadow-xl z-10 border-2 ${
                            getMaturityColor(region.kematangan, darkMode)
                          } ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            <p className="font-bold text-sm">{region.name}</p>
                            <p className="text-xs">Inovasi: {region.inovasi}</p>
                            <p className="text-xs">Kematangan: {region.kematangan.toFixed(1)}</p>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-current"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Individual Pin View (Zoom In) */
                  <div className="absolute inset-0">
                    {filteredRegions.map((region) => (
                      <div
                        key={region.id}
                        className="absolute cursor-pointer transform hover:scale-125 transition-all"
                        style={{
                          left: `${((region.lng - 111.0) / 3.0) * 100}%`,
                          top: `${((region.lat + 8.5) / 1.5) * 100}%`,
                        }}
                        onClick={() => setSelectedRegion(region)}
                        onMouseEnter={() => setHoveredRegion(region)}
                        onMouseLeave={() => setHoveredRegion(null)}
                      >
                        {/* Pin marker */}
                        <MapPin className={`${region.color.replace('bg-', 'text-')} drop-shadow-lg`} size={32} fill="currentColor" />
                        
                        {/* Tooltip */}
                        {hoveredRegion?.id === region.id && (
                          <div className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-4 py-3 rounded-lg shadow-xl z-10 border-2 ${
                            getMaturityColor(region.kematangan, darkMode)
                          } ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            <p className="font-bold text-sm">{region.name}</p>
                            <p className="text-xs">Inovasi: {region.inovasi}</p>
                            <p className="text-xs">Kematangan: {region.kematangan.toFixed(1)}</p>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-current"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Legend */}
            <div className="mt-4 flex items-center justify-center gap-6 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Tinggi (≥4.0)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Sedang (3.5-4.0)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Rendah (&lt;3.5)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Side Panel (25-30%) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Widget 1: Blank Spot Alert */}
          <div className="rounded-lg shadow-md p-5 bg-red-50 border-2 border-red-200">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="text-red-600" size={20} />
              <h4 className="font-bold text-red-800 text-sm">Blank Spot (0 Inovasi)</h4>
            </div>
            <p className="text-xs text-red-700 mb-3">
              Daerah berikut belum memiliki inovasi terdaftar:
            </p>
            <ul className="space-y-2">
              {blankSpotRegions.map((region, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-500 text-lg leading-none mt-0.5">•</span>
                  <span className="text-sm text-red-800 leading-tight">{region}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Widget 2: Top 5 Leaderboard */}
          <div className={`rounded-lg shadow-md p-5 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-2 mb-4">
              <Award className="text-yellow-500" size={20} />
              <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Top 5 Kabupaten/Kota
              </h4>
            </div>
            <div className="space-y-3">
              {top5Regions.map((region) => (
                <div 
                  key={region.rank}
                  className={`p-3 rounded-lg transition-all hover:scale-[1.02] ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-lg font-bold ${
                          region.rank === 1 ? 'text-yellow-500' :
                          region.rank === 2 ? 'text-gray-400' :
                          region.rank === 3 ? 'text-orange-600' :
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {region.rank}
                        </span>
                        <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {region.name}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Skor: {region.score.toFixed(1)} | Digital: {region.digital}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-blue-600">
                        {region.jumlah}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Daerah - Di Bawah Map */}
      <div>
        <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Detail Daerah Terpilih
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Detail Info Cards */}
          <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-2 mb-4">
              <Layers className="text-blue-500" size={20} />
              <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Informasi Umum</h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <h5 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {selectedRegion.name}
                </h5>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${selectedRegion.color} text-white mb-4`}>
                  Level: {selectedRegion.kematangan >= 4.0 ? 'Tinggi' : selectedRegion.kematangan >= 3.5 ? 'Sedang' : 'Rendah'}
                </div>
              </div>

              <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Jenis Dominan</span>
                  <Layers className="text-purple-500" size={18} />
                </div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {selectedRegion.dominant}
                </p>
              </div>

              {/* Video Button - Conditional Rendering */}
              {selectedRegion.url_video && (
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md font-medium"
                >
                  <Play size={20} fill="currentColor" />
                  <span>Lihat Video Profil</span>
                </button>
              )}
            </div>
          </div>

          <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-blue-500" size={20} />
              <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Statistik Inovasi</h4>
            </div>
            
            <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Jumlah Inovasi</span>
                <TrendingUp className="text-blue-500" size={20} />
              </div>
              <p className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {selectedRegion.inovasi}
              </p>
              <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Total inovasi terdaftar
              </p>
            </div>
          </div>

          <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-2 mb-4">
              <Award className="text-green-500" size={20} />
              <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Tingkat Kematangan</h4>
            </div>
            
            <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Rata-rata Kematangan</span>
                <Award className="text-green-500" size={20} />
              </div>
              <p className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {selectedRegion.kematangan.toFixed(1)}
              </p>
              {/* Progress Bar */}
              <div className="mt-4">
                <div className={`w-full h-3 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                    style={{ width: `${(selectedRegion.kematangan / 5) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>0</span>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className={`mt-6 rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h4 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Informasi Peta
          </h4>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Klik pada marker (titik) di peta atau arahkan kursor ke marker untuk melihat detail informasi inovasi daerah. 
            Setiap marker menunjukkan lokasi dan jumlah inovasi di kabupaten/kota tersebut.
          </p>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && selectedRegion.url_video && (
        <VideoModal videoUrl={selectedRegion.url_video} onClose={() => setShowVideoModal(false)} darkMode={darkMode} />
      )}
    </div>
  );
}