import { useState, useEffect, useRef } from 'react';
import { Send, Bot, FileDown, Users, Target, Zap, Search, X, AlertCircle, RefreshCw, Sparkles, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { CollaborationDetail } from './CollaborationDetail';
import { ReportSingleInnovation } from './ReportSingleInnovation';

// Top AI-Generated Recommendations (System Generated)
const topRecommendations = [
  {
    id: 1,
    title: 'Integrasi E-Health dengan Sistem Kependudukan',
    jenis: 'Kolaborasi Antar OPD',
    opd1: 'Dinas Kesehatan',
    opd2: 'Dinas Kependudukan',
    score: 92,
    category: 'Sangat Cocok',
    summary: 'Integrasi data kependudukan dengan sistem kesehatan untuk mempercepat verifikasi pasien dan meningkatkan akurasi pelayanan.',
    tags: ['Digital', 'Data Integration', 'API Ready', 'High Impact'],
    manfaat: 'Mempercepat verifikasi data pasien dan meningkatkan akurasi pelayanan kesehatan',
    dampak: 'Waktu pelayanan turun 40%, kepuasan masyarakat naik 35%',
    readiness: 'Siap Implementasi',
  },
  {
    id: 2,
    title: 'Smart City Dashboard Terintegrasi',
    jenis: 'Kolaborasi Multi-OPD',
    opd1: 'Dinas Kominfo',
    opd2: 'Bappeda, Dishub, PUPR',
    score: 88,
    category: 'Potensial',
    summary: 'Platform terpadu untuk monitoring real-time infrastruktur kota dan layanan publik dalam satu dashboard terintegrasi.',
    tags: ['Digital', 'Cloud Ready', 'Real-time', 'Multi-OPD'],
    manfaat: 'Monitoring real-time infrastruktur kota dan layanan publik dalam satu platform',
    dampak: 'Efisiensi pengambilan keputusan meningkat 50%',
    readiness: 'Perlu Koordinasi',
  },
  {
    id: 3,
    title: 'Sistem Perizinan Terpadu dengan E-Payment',
    jenis: 'Kolaborasi Antar Daerah',
    opd1: 'DPMPTSP Surabaya',
    opd2: 'DPMPTSP Sidoarjo',
    score: 85,
    category: 'Potensial',
    summary: 'Kemudahan perizinan lintas wilayah dengan pembayaran online untuk meningkatkan investasi daerah.',
    tags: ['Digital', 'E-Payment', 'Lintas Daerah', 'OSS Ready'],
    manfaat: 'Kemudahan perizinan lintas wilayah dengan pembayaran online',
    dampak: 'Peningkatan investasi lintas daerah 25%',
    readiness: 'Perlu Koordinasi',
  },
];

// User exploration data
const userCollaborationData = [
  {
    id: 1,
    title: 'Integrasi E-Health dengan Sistem Kependudukan',
    opd1: 'Dinas Kesehatan',
    opd2: 'Dinas Kependudukan',
    score: 92,
    manfaat: 'Mempercepat verifikasi data pasien dan meningkatkan akurasi pelayanan kesehatan',
    dampak: 'Waktu pelayanan turun 40%, kepuasan masyarakat naik 35%',
    alasan: 'Kedua sistem memiliki kesamaan data kependudukan yang dapat diintegrasikan untuk efisiensi',
    urusan: 'Kesehatan, Administrasi Kependudukan',
    targetPengguna: 'Masyarakat umum, Tenaga Kesehatan',
    potensiIntegrasi: 'Tinggi - API Ready',
  },
];

interface AIChatbotProps {
  darkMode: boolean;
}

interface Message {
  id: number;
  type: 'user' | 'bot' | 'typing' | 'error';
  text: string;
}

// Helper function for score badge color
const getScoreBadgeColor = (score: number) => {
  if (score >= 90) return 'bg-emerald-500 text-white';
  if (score >= 70) return 'bg-blue-500 text-white';
  return 'bg-yellow-500 text-white';
};

const getScoreLabel = (score: number) => {
  if (score >= 90) return 'Sangat Cocok';
  if (score >= 70) return 'Potensial';
  return 'Kurang Cocok';
};

// Searchable Dropdown Component
function SearchableDropdown({ 
  options, 
  value, 
  onChange, 
  label, 
  darkMode 
}: { 
  options: string[]; 
  value: string; 
  onChange: (val: string) => void; 
  label: string; 
  darkMode: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {label}
      </label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2.5 border rounded-lg cursor-pointer flex items-center justify-between transition-all ${
          darkMode ? 'bg-gray-700 border-gray-600 text-white hover:border-blue-500' : 'bg-white border-gray-300 text-gray-800 hover:border-blue-400'
        }`}
      >
        <span className="text-sm">{value}</span>
        <Search size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
      </div>

      {isOpen && (
        <div className={`absolute z-50 w-full mt-1 rounded-lg shadow-xl border ${
          darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
        }`}>
          <div className="p-2">
            <div className="relative">
              <Search size={16} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ketik untuk mencari..."
                className={`w-full pl-9 pr-8 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800'
                }`}
                onClick={(e) => e.stopPropagation()}
              />
              {searchTerm && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchTerm('');
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <X size={14} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                </button>
              )}
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className={`px-4 py-2 cursor-pointer text-sm transition-colors ${
                    value === option
                      ? 'bg-blue-500 text-white'
                      : darkMode
                        ? 'hover:bg-gray-600 text-gray-200'
                        : 'hover:bg-gray-100 text-gray-800'
                  }`}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className={`px-4 py-3 text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Tidak ada hasil
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function AIChatbot({ darkMode }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [filterInovasi1, setFilterInovasi1] = useState('');
  const [filterInovasi2, setFilterInovasi2] = useState('');
  const [selectedExploration, setSelectedExploration] = useState(userCollaborationData[0]);
  const [showExplorationResult, setShowExplorationResult] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'recommendations' | 'exploration' | 'chatbot'>('recommendations');
  const [selectedInnovationForPDF, setSelectedInnovationForPDF] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const explorationResultRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const innovationList = [
    'E-Health Telemedicine',
    'Sistem Kependudukan Digital',
    'Smart Traffic Management',
    'Portal Data Terbuka',
    'E-Learning Platform',
    'Sistem Perizinan Online',
    'Smart City Dashboard',
    'Aplikasi Pengaduan Masyarakat',
    'Sistem Informasi Kesehatan',
    'Platform E-Commerce Daerah',
  ];

  const simulateTyping = (text: string) => {
    const typingMessage: Message = {
      id: messages.length + 1,
      type: 'typing',
      text: '',
    };
    setMessages(prev => [...prev, typingMessage]);

    setTimeout(() => {
      setMessages(prev => {
        const filtered = prev.filter(m => m.type !== 'typing');
        return [...filtered, {
          id: prev.length,
          type: 'bot',
          text: text,
        }];
      });
    }, 1500);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      text: input,
    };

    setMessages(prev => [...prev, userMessage]);
    
    const shouldError = Math.random() < 0.1;

    if (shouldError) {
      setTimeout(() => {
        const errorMessage: Message = {
          id: messages.length + 2,
          type: 'error',
          text: 'Maaf, terjadi kesalahan saat memproses permintaan Anda.',
        };
        setMessages(prev => [...prev, errorMessage]);
      }, 1000);
    } else {
      const responseText = `Berdasarkan analisis data terkini, rekomendasi kolaborasi "${topRecommendations[0].title}" memiliki skor kecocokan tertinggi (${topRecommendations[0].score}%) karena memiliki kesiapan infrastruktur API dan dampak signifikan terhadap efisiensi pelayanan publik.`;
      simulateTyping(responseText);
    }

    setInput('');
  };

  const handleRetry = () => {
    const responseText = `Berdasarkan analisis data terkini, rekomendasi kolaborasi "${topRecommendations[0].title}" memiliki skor kecocokan tertinggi (${topRecommendations[0].score}%) karena memiliki kesiapan infrastruktur API dan dampak signifikan terhadap efisiensi pelayanan publik.`;
    simulateTyping(responseText);
  };

  const handleAnalyze = () => {
    setShowExplorationResult(true);
    const responseText = `Analisis selesai untuk \"${filterInovasi1}\" dan \"${filterInovasi2}\". Hasil menunjukkan potensi kolaborasi yang baik dengan skor ${userCollaborationData[0].score}%. Silakan lihat detail di bawah.`;
    simulateTyping(responseText);
    
    // Smooth scroll to result after render
    setTimeout(() => {
      explorationResultRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }, 100);
  };

  const handleViewDetail = (collaboration: typeof topRecommendations[0]) => {
    setSelectedDetail(collaboration);
    setActiveTab('exploration');
  };

  const TypingIndicator = () => (
    <div className="flex gap-1">
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  );

  // If detail page is shown, render CollaborationDetail component
  if (activeTab === 'exploration' && selectedDetail) {
    return (
      <CollaborationDetail
        darkMode={darkMode}
        collaboration={selectedDetail}
        onBack={() => setActiveTab('recommendations')}
      />
    );
  }

  return (
    <div className="space-y-8 pb-6 max-w-full">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            AI Rekomendasi Kolaborasi Inovasi
          </h2>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Sistem AI untuk mendukung analisis dan pengambilan keputusan strategis inovasi daerah
          </p>
        </div>
      </div>

      {/* Main Layout: Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN - Main Content (Sections 1 & 2) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* ============= SECTION 1: TOP REKOMENDASI (SYSTEM GENERATED) ============= */}
          <section className={`rounded-2xl shadow-2xl overflow-hidden ${
            darkMode ? 'bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-blue-800' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200'
          }`}>
            <div className={`px-6 py-5 border-b ${darkMode ? 'border-blue-800 bg-blue-900/60' : 'border-blue-200 bg-white/80'}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Sparkles className="text-white" size={20} />
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Top Rekomendasi Kolaborasi Inovasi
                </h3>
              </div>
              <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-gray-600'}`}>
                Rekomendasi utama yang dihasilkan otomatis oleh AI berdasarkan analisis seluruh data inovasi untuk mendukung kebijakan strategis.
              </p>
            </div>

            <div className="p-6 space-y-6">
              {topRecommendations.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-xl p-6 transition-all hover:scale-[1.02] cursor-pointer ${
                    darkMode ? 'bg-gray-800 hover:bg-gray-750 shadow-lg' : 'bg-white hover:shadow-xl shadow-md'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {item.title}
                      </h4>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {item.jenis}
                      </span>
                    </div>
                    <div className="text-center ml-4">
                      <div className={`px-4 py-2 rounded-lg text-lg font-bold ${getScoreBadgeColor(item.score)}`}>
                        {item.score}%
                      </div>
                      <div className={`text-xs mt-1 font-semibold ${
                        item.score >= 90 ? 'text-emerald-600 dark:text-emerald-400' :
                        item.score >= 70 ? 'text-blue-600 dark:text-blue-400' :
                        'text-yellow-600 dark:text-yellow-400'
                      }`}>
                        {item.category}
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className={`text-sm mb-4 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {item.summary}
                  </p>

                  {/* OPD Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>OPD Utama</p>
                      <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{item.opd1}</p>
                    </div>
                    <div className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Partner</p>
                      <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{item.opd2}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Readiness Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle size={16} className={item.readiness === 'Siap Implementasi' ? 'text-green-500' : 'text-yellow-500'} />
                    <span className={`text-sm font-semibold ${
                      item.readiness === 'Siap Implementasi' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-yellow-600 dark:text-yellow-400'
                    }`}>
                      {item.readiness}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleViewDetail(item)}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                    >
                      Lihat Detail
                      <ArrowRight size={16} />
                    </button>
                    <button 
                      onClick={() => setSelectedInnovationForPDF(item)}
                      className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                    >
                      <FileDown size={16} />
                      PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ============= SECTION 2: EKSPLORASI MANUAL (USER DRIVEN) ============= */}
          <section className={`rounded-2xl shadow-xl overflow-hidden ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className={`px-6 py-5 border-b ${darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <TrendingUp className="text-white" size={20} />
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Eksplorasi Kolaborasi Inovasi (Simulasi AI)
                </h3>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Fitur untuk mencoba dan mensimulasikan ide kolaborasi inovasi secara mandiri.
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Input Area */}
              <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <SearchableDropdown
                    options={innovationList}
                    value={filterInovasi1}
                    onChange={setFilterInovasi1}
                    label="Inovasi 1"
                    darkMode={darkMode}
                  />
                  <SearchableDropdown
                    options={innovationList}
                    value={filterInovasi2}
                    onChange={setFilterInovasi2}
                    label="Inovasi 2"
                    darkMode={darkMode}
                  />
                </div>
                <button
                  onClick={handleAnalyze}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all font-medium flex items-center justify-center gap-2 shadow-md"
                >
                  <Bot size={20} />
                  Analisis Kolaborasi dengan AI
                </button>
              </div>

              {/* Output Area */}
              {showExplorationResult && (
                <div 
                  ref={explorationResultRef}
                  className={`rounded-xl p-6 border-2 ${
                    darkMode ? 'bg-gray-750 border-purple-700' : 'bg-purple-50 border-purple-300'
                  }`}
                >
                  <h4 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {selectedExploration.title}
                  </h4>

                  {/* Score Display */}
                  <div className={`flex items-center gap-3 p-4 rounded-lg mb-4 ${
                    darkMode ? 'bg-gray-700' : 'bg-white'
                  }`}>
                    <div className="p-3 bg-purple-500 rounded-lg">
                      <Zap className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Skor Kecocokan
                      </p>
                      <p className={`text-3xl font-bold ${
                        selectedExploration.score >= 90 ? 'text-emerald-600' :
                        selectedExploration.score >= 70 ? 'text-blue-600' :
                        'text-yellow-600'
                      }`}>
                        {selectedExploration.score}%
                      </p>
                      <p className={`text-xs font-semibold ${
                        selectedExploration.score >= 90 ? 'text-emerald-600' :
                        selectedExploration.score >= 70 ? 'text-blue-600' :
                        'text-yellow-600'
                      }`}>
                        {getScoreLabel(selectedExploration.score)}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                    <div>
                      <h5 className={`font-semibold mb-2 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        <Target size={16} className="text-purple-500" />
                        Manfaat Kolaborasi
                      </h5>
                      <p className={`text-sm rounded-lg p-3 ${
                        darkMode ? 'text-gray-300 bg-gray-700' : 'text-gray-700 bg-white'
                      }`}>
                        {selectedExploration.manfaat}
                      </p>
                    </div>

                    <div>
                      <h5 className={`font-semibold mb-2 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        <Users size={16} className="text-purple-500" />
                        Alasan Kesesuaian / Sinergi
                      </h5>
                      <p className={`text-sm rounded-lg p-3 ${
                        darkMode ? 'text-gray-300 bg-gray-700' : 'text-gray-700 bg-white'
                      }`}>
                        {selectedExploration.alasan}
                      </p>
                    </div>

                    <div>
                      <h5 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        Potensi Dampak
                      </h5>
                      <p className={`text-sm rounded-lg p-3 ${
                        darkMode ? 'text-gray-300 bg-gray-700' : 'text-gray-700 bg-white'
                      }`}>
                        {selectedExploration.dampak}
                      </p>
                    </div>
                  </div>

                  {/* Export PDF Button */}
                  <div className="mt-4">
                    <button 
                      onClick={() => setSelectedInnovationForPDF({
                        ...selectedExploration,
                        jenis: 'Hasil Eksplorasi',
                        category: getScoreLabel(selectedExploration.score),
                        summary: selectedExploration.manfaat,
                        collaborators: [selectedExploration.opd1, selectedExploration.opd2],
                        benefits: [selectedExploration.manfaat],
                        challenges: [selectedExploration.alasan]
                      })}
                      className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                    >
                      <FileDown size={16} />
                      Export PDF Hasil Eksplorasi
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN - AI Chatbot Assistant (Section 3) */}
        <div className="lg:col-span-1">
          <div className={`rounded-2xl shadow-xl overflow-hidden sticky top-6 ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`} style={{ height: '700px' }}>
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white p-2 rounded-lg">
                  <Bot className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Policy Assistant BRIDA</h3>
                  <p className="text-xs text-green-100">Online - Siap Membantu</p>
                </div>
              </div>
              <p className="text-xs text-green-50 mt-2">
                AI sebagai pendukung analisis kebijakan, bukan pengganti keputusan.
              </p>
            </div>

            {/* Messages */}
            <div className="h-[480px] overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'typing' ? (
                    <div className={`rounded-lg p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <TypingIndicator />
                    </div>
                  ) : message.type === 'error' ? (
                    <div className="max-w-[90%] rounded-lg p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700">
                      <div className="flex items-start gap-2 mb-2">
                        <AlertCircle size={16} className="text-red-600 dark:text-red-400 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-red-800 dark:text-red-200 font-semibold mb-1">
                            Terjadi Kesalahan
                          </p>
                          <p className="text-xs text-red-700 dark:text-red-300">
                            {message.text}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleRetry}
                        className="flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded text-xs hover:bg-red-700 transition-colors"
                      >
                        <RefreshCw size={12} />
                        Coba Lagi
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`max-w-[90%] rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-green-500 text-white'
                          : darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.type === 'bot' && (
                        <div className="flex items-center gap-2 mb-1">
                          <Bot size={14} className="text-green-500" />
                          <span className="text-xs font-semibold text-green-500">AI Assistant</span>
                        </div>
                      )}
                      <p className="text-sm">{message.text}</p>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Tanya tentang rekomendasi..."
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                />
                <button
                  onClick={handleSend}
                  className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                💡 AI sebagai pendukung analisis, bukan pengambil keputusan
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Report Modal */}
      {selectedInnovationForPDF && (
        <ReportSingleInnovation 
          onClose={() => setSelectedInnovationForPDF(null)} 
          innovation={selectedInnovationForPDF}
        />
      )}
    </div>
  );
}