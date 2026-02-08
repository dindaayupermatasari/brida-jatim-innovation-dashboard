import { useState, useEffect, useRef } from 'react';
import { Send, Bot, FileDown, Users, Target, Zap, Search, X, AlertCircle, RefreshCw, Sparkles, TrendingUp, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { CollaborationDetail } from './CollaborationDetail';
import ReportCollaboration from './ReportSingleInnovation';
import { ReportAIRecommendation } from './ReportAIRecommendation';

// ==================== INTERFACES ====================
interface TopRecommendation {
  cluster_id: number;
  skor_kolaborasi: number;
  jumlah_inovasi: number;
  inovasi_1: {
    id: number;
    judul: string;
    urusan: string;
    tahap: string;
    kematangan: string;
  };
  inovasi_2: {
    id: number;
    judul: string;
    urusan: string;
    tahap: string;
    kematangan: string;
  };
}

interface AIChatbotProps {
  darkMode: boolean;
}

interface Message {
  id: number;
  type: 'user' | 'bot' | 'typing' | 'error';
  text: string;
}

interface Innovation {
  id: number;
  judul: string;
  opd?: string;
  urusan?: string;
  tahap?: string;
  kematangan?: string;
}

interface ExplorationResult {
  title: string;
  score: number;
  manfaat: string[];
  dampak: string[];
  alasan: string;
  tingkat: string;
  judul1?: string;
  judul2?: string;
  opd1?: string;
  opd2?: string;
}

// Interface untuk data detail yang akan dikirim ke CollaborationDetail
interface DetailData {
  inovasi_1_id: number;
  inovasi_2_id: number;
  inovasi_1_judul: string;
  inovasi_2_judul: string;
  opd_1: string;
  opd_2: string;
  urusan_1: string;
  urusan_2: string;
  tahap_1: string;
  tahap_2: string;
  kematangan_1: string;
  kematangan_2: string;
  similarity: number;
}

// ==================== UTILITY FUNCTIONS ====================
const getScoreBadgeColor = (score: number): string => {
  if (score >= 0.9) return 'bg-emerald-500 text-white';
  if (score >= 0.7) return 'bg-blue-500 text-white';
  return 'bg-yellow-500 text-white';
};

const getScoreLabel = (score: number): string => {
  if (score >= 0.9) return 'Sangat Cocok';
  if (score >= 0.7) return 'Potensial';
  return 'Cukup Cocok';
};

const scoreToPercentage = (score: number): number => Math.round(score * 100);

// ==================== API CONFIGURATION ====================
const API_BASE_URL = 'http://localhost:8000';

const API_ENDPOINTS = {
  innovations: `${API_BASE_URL}/dashboard/inovasi-list`,
  topRecommendations: `${API_BASE_URL}/api/recommendations/top-clusters`,
  explorationSimulate: `${API_BASE_URL}/ai-input-collaboration/simulate`,
};

// ==================== SEARCHABLE DROPDOWN COMPONENT ====================
function SearchableDropdown({ 
  options, 
  value, 
  onChange, 
  label, 
  darkMode 
}: { 
  options: Innovation[];
  value: number | null;
  onChange: (id: number) => void;
  label: string; 
  darkMode: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedLabel = options.find(o => o.id === value)?.judul || 'Pilih inovasi';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {label}
      </label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2.5 border rounded-xl cursor-pointer flex items-center justify-between transition
        ${darkMode
          ? 'bg-gray-700 border-gray-600 text-white hover:border-purple-500'
          : 'bg-white border-gray-300 text-gray-800 hover:border-purple-400'
        }`}
      >
        <span className="truncate">{selectedLabel}</span>
        <Search size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
      </div>

      {isOpen && (
        <div
          className={`absolute left-0 top-full z-50 mt-2 rounded-xl shadow-2xl border overflow-hidden
          ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}
          style={{ minWidth: '100%', width: 'max-content', maxWidth: '500px' }}
        >
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
                className={`w-full pl-9 pr-8 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500
                  ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
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
          <div className="overflow-y-auto py-1" style={{ maxHeight: '320px' }}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => {
                    onChange(option.id);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className={`px-4 py-3 text-sm cursor-pointer transition flex items-start gap-2
                  ${value === option.id
                    ? 'bg-purple-600 text-white'
                    : darkMode
                      ? 'hover:bg-gray-700 text-gray-200'
                      : 'hover:bg-purple-50 text-gray-800'
                  }`}
                >
                  <span className="flex-1 leading-snug">{option.judul}</span>
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

// ==================== TYPING INDICATOR ====================
const TypingIndicator = () => (
  <div className="flex gap-1">
    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
  </div>
);

// ==================== MAIN COMPONENT ====================
export function AIChatbot({ darkMode }: AIChatbotProps) {
  // ========== STATE MANAGEMENT ==========
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [filterInovasi1, setFilterInovasi1] = useState<number | null>(null);
  const [filterInovasi2, setFilterInovasi2] = useState<number | null>(null);
  const [selectedExploration, setSelectedExploration] = useState<ExplorationResult | null>(null);
  const [showExplorationResult, setShowExplorationResult] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<DetailData | null>(null);
  const [activeTab, setActiveTab] = useState<'recommendations' | 'exploration'>('recommendations');
  const [pdfData, setPdfData] = useState<any>(null);
  const [selectedPdfRecommendation, setSelectedPdfRecommendation] = useState<TopRecommendation | null>(null);
  
  // Top Recommendations State
  const [topRecommendations, setTopRecommendations] = useState<TopRecommendation[]>([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true);
  const [recommendationError, setRecommendationError] = useState<string | null>(null);
  const [lastRunTime, setLastRunTime] = useState<string | null>(null);
  
  // Exploration State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [explorationError, setExplorationError] = useState<string | null>(null);
  const [innovationList, setInnovationList] = useState<Innovation[]>([]);
  const [isLoadingInnovation, setIsLoadingInnovation] = useState(false);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const explorationResultRef = useRef<HTMLDivElement>(null);

  // ========== SCROLL FUNCTIONS ==========
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  // ========== FETCH INNOVATION LIST ==========
  useEffect(() => {
    const fetchInnovations = async () => {
      setIsLoadingInnovation(true);
      try {
        const response = await fetch(API_ENDPOINTS.innovations);
        if (!response.ok) throw new Error('Gagal mengambil data inovasi');
        
        const data = await response.json();
        const mapped: Innovation[] = data.map((item: any) => ({
          id: item.id,
          judul: item.judul_inovasi,
          opd: item.admin_opd,
          urusan: item.urusan_utama,
          tahap: item.tahapan_inovasi,
          kematangan: item.label_kematangan,
        }));
        setInnovationList(mapped);
      } catch (error) {
        console.error('Error fetching innovations:', error);
        setInnovationList([]);
      } finally {
        setIsLoadingInnovation(false);
      }
    };

    fetchInnovations();
  }, []);

  // ========== FETCH TOP RECOMMENDATIONS ==========
  const fetchTopRecommendations = async () => {
    setIsLoadingRecommendations(true);
    setRecommendationError(null);

    try {
      console.log('Fetching from:', API_ENDPOINTS.topRecommendations);
      const response = await fetch(`${API_ENDPOINTS.topRecommendations}?limit=10`);
      
      if (!response.ok) {
        throw new Error('Gagal mengambil rekomendasi');
      }

      const result = await response.json();
      console.log('API Response:', result);

      // Handle empty state
      if (result.status === 'empty' || !result.data || result.data.length === 0) {
        setRecommendationError(result.message || 'Belum ada rekomendasi tersedia. Clustering mungkin belum dijalankan.');
        setTopRecommendations([]);
        setLastRunTime(null);
        return;
      }

      // Success - set data
      if (result.last_run) {
        setLastRunTime(result.last_run);
      }
      
      setTopRecommendations(result.data);
      console.log('Loaded', result.data.length, 'recommendations');

    } catch (error) {
      console.error('Error:', error);
      setRecommendationError('Terjadi kesalahan saat mengambil data.');
      setTopRecommendations([]);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  useEffect(() => {
    fetchTopRecommendations();
  }, []);

  // ========== CHATBOT FUNCTIONS ==========
  const simulateTyping = (text: string) => {
    const typingMessage: Message = {
      id: Date.now(),
      type: 'typing',
      text: '',
    };
    setMessages(prev => [...prev, typingMessage]);

    setTimeout(() => {
      setMessages(prev => {
        const filtered = prev.filter(m => m.type !== 'typing');
        return [...filtered, {
          id: Date.now(),
          type: 'bot',
          text: text,
        }];
      });
    }, 1500);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      text: input,
    };

    setMessages(prev => [...prev, userMessage]);
    
    if (topRecommendations.length > 0) {
      const top = topRecommendations[0];
      const scorePercent = scoreToPercentage(top.skor_kolaborasi);
      const responseText = `Rekomendasi kolaborasi terbaik saat ini adalah antara "${top.inovasi_1.judul}" (${top.inovasi_1.urusan}) dan "${top.inovasi_2.judul}" (${top.inovasi_2.urusan}) dengan skor kecocokan ${scorePercent}%. Kedua inovasi berada di tahap ${top.inovasi_1.tahap} dengan tingkat kematangan ${top.inovasi_1.kematangan}.`;
      simulateTyping(responseText);
    } else {
      simulateTyping('Mohon maaf, saat ini belum ada rekomendasi kolaborasi tersedia. Silakan jalankan clustering terlebih dahulu.');
    }

    setInput('');
  };

  const handleRetry = () => {
    if (topRecommendations.length > 0) {
      const top = topRecommendations[0];
      const scorePercent = scoreToPercentage(top.skor_kolaborasi);
      const responseText = `Rekomendasi teratas: kolaborasi "${top.inovasi_1.judul}" dan "${top.inovasi_2.judul}" dengan skor ${scorePercent}%.`;
      simulateTyping(responseText);
    }
  };

  // ========== EXPLORATION FUNCTIONS ==========
  const handleAnalyze = async () => {
    if (!filterInovasi1 || !filterInovasi2) {
      setExplorationError("Pilih dua inovasi terlebih dahulu");
      return;
    }

    if (filterInovasi1 === filterInovasi2) {
      setExplorationError("Pilih dua inovasi yang berbeda");
      return;
    }

    setIsAnalyzing(true);
    setExplorationError(null);

    try {
      const res = await fetch(
        `${API_ENDPOINTS.explorationSimulate}?inovasi_1_id=${filterInovasi1}&inovasi_2_id=${filterInovasi2}`
      );

      if (!res.ok) throw new Error("Gagal mengambil analisis AI");

      const data = await res.json();
      const ai = data.hasil_ai;

      const inovasi1 = innovationList.find(i => i.id === filterInovasi1);
      const inovasi2 = innovationList.find(i => i.id === filterInovasi2);

      const mappedResult: ExplorationResult = {
        title: ai.judul_kolaborasi,
        score: data.skor_kecocokan,
        manfaat: Array.isArray(ai.manfaat_kolaborasi)
          ? ai.manfaat_kolaborasi
          : [ai.manfaat_kolaborasi],
        dampak: Array.isArray(ai.potensi_dampak)
          ? ai.potensi_dampak
          : [ai.potensi_dampak],
        alasan: ai.alasan_sinergi,
        tingkat: ai.tingkat_kolaborasi,
        judul1: inovasi1?.judul,
        judul2: inovasi2?.judul,
        opd1: inovasi1?.opd,
        opd2: inovasi2?.opd,
      };

      setSelectedExploration(mappedResult);
      setShowExplorationResult(true);

      setTimeout(() => {
        explorationResultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);

    } catch (err) {
      console.error('Exploration error:', err);
      setExplorationError("Gagal mengambil analisis kolaborasi AI");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // ========== HANDLE VIEW DETAIL - UPDATED ==========
  const handleViewDetail = async (collaboration: TopRecommendation) => {
    // Cari data lengkap dari innovationList untuk mendapatkan OPD
    let opd_1 = '';
    let opd_2 = '';
    
    try {
      // Fetch detail lengkap dari API jika perlu
      const response = await fetch(API_ENDPOINTS.innovations);
      if (response.ok) {
        const fullData = await response.json();
        const inovasi1Full = fullData.find((item: any) => item.id === collaboration.inovasi_1.id);
        const inovasi2Full = fullData.find((item: any) => item.id === collaboration.inovasi_2.id);
        
        opd_1 = inovasi1Full?.admin_opd || 'N/A';
        opd_2 = inovasi2Full?.admin_opd || 'N/A';
      }
    } catch (error) {
      console.error('Error fetching OPD data:', error);
    }

    const detailData: DetailData = {
      inovasi_1_id: collaboration.inovasi_1.id,
      inovasi_2_id: collaboration.inovasi_2.id,
      inovasi_1_judul: collaboration.inovasi_1.judul,
      inovasi_2_judul: collaboration.inovasi_2.judul,
      opd_1: opd_1,
      opd_2: opd_2,
      urusan_1: collaboration.inovasi_1.urusan,
      urusan_2: collaboration.inovasi_2.urusan,
      tahap_1: collaboration.inovasi_1.tahap,
      tahap_2: collaboration.inovasi_2.tahap,
      kematangan_1: collaboration.inovasi_1.kematangan,
      kematangan_2: collaboration.inovasi_2.kematangan,
      similarity: collaboration.skor_kolaborasi,
    };

    setSelectedDetail(detailData);
    setActiveTab('exploration');
  };

  // ========== RENDER DETAIL VIEW - UPDATED ==========
  if (activeTab === 'exploration' && selectedDetail) {
    return (
      <CollaborationDetail
        darkMode={darkMode}
        inovasi_1_id={selectedDetail.inovasi_1_id}
        inovasi_2_id={selectedDetail.inovasi_2_id}
        inovasi_1_judul={selectedDetail.inovasi_1_judul}
        inovasi_2_judul={selectedDetail.inovasi_2_judul}
        opd_1={selectedDetail.opd_1}
        opd_2={selectedDetail.opd_2}
        urusan_1={selectedDetail.urusan_1}
        urusan_2={selectedDetail.urusan_2}
        tahap_1={selectedDetail.tahap_1}
        tahap_2={selectedDetail.tahap_2}
        kematangan_1={selectedDetail.kematangan_1}
        kematangan_2={selectedDetail.kematangan_2}
        similarity={selectedDetail.similarity}
        onBack={() => {
          setSelectedDetail(null);
          setActiveTab('recommendations');
        }}
      />
    );
  }

  // ========== MAIN RENDER ==========
  return (
    <div className="space-y-8 pb-6 max-w-full">
      {/* Page Header */}
      <div>
        <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          AI Rekomendasi Kolaborasi Inovasi
        </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Sistem rekomendasi berbasis clustering untuk kolaborasi inovasi daerah
        </p>
        {lastRunTime && (
          <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Terakhir diperbarui: {new Date(lastRunTime).toLocaleString('id-ID')}
          </p>
        )}
      </div>

      {/* Main Layout: Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* ============= SECTION 1: TOP REKOMENDASI ============= */}
          <section className={`rounded-2xl shadow-2xl overflow-hidden ${
            darkMode ? 'bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-blue-800' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200'
          }`}>
            <div className={`px-6 py-5 border-b ${darkMode ? 'border-blue-800 bg-blue-900/60' : 'border-blue-200 bg-white/80'}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Sparkles className="text-white" size={20} />
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Top Rekomendasi Kolaborasi
                </h3>
              </div>
              <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-gray-600'}`}>
                Pasangan inovasi dengan skor similarity tertinggi dari setiap cluster
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Loading State */}
              {isLoadingRecommendations && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Memuat rekomendasi...
                  </p>
                </div>
              )}

              {/* Error State */}
              {recommendationError && !isLoadingRecommendations && (
                <div className={`rounded-lg p-6 text-center ${darkMode ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'}`}>
                  <AlertCircle className={`mx-auto mb-3 ${darkMode ? 'text-red-400' : 'text-red-600'}`} size={48} />
                  <p className={`text-sm font-medium mb-3 ${darkMode ? 'text-red-300' : 'text-red-800'}`}>
                    {recommendationError}
                  </p>
                  <button
                    onClick={fetchTopRecommendations}
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium mx-auto"
                  >
                    <RefreshCw size={16} />
                    Coba Lagi
                  </button>
                </div>
              )}

              {/* Empty State */}
              {!isLoadingRecommendations && !recommendationError && topRecommendations.length === 0 && (
                <div className={`rounded-lg p-6 text-center ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Belum ada rekomendasi tersedia
                  </p>
                </div>
              )}

              {/* Recommendations List */}
              {!isLoadingRecommendations && topRecommendations.map((item, index) => {
                const scorePercent = scoreToPercentage(item.skor_kolaborasi);
                
                return (
                  <div
                    key={`${item.cluster_id}-${item.inovasi_1.id}-${item.inovasi_2.id}`}
                    className={`rounded-xl p-6 transition-all hover:scale-[1.01] ${
                      darkMode ? 'bg-gray-800 hover:bg-gray-750 shadow-lg' : 'bg-white hover:shadow-xl shadow-md'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                            index === 0 ? 'bg-yellow-500 text-white' :
                            index === 1 ? 'bg-gray-400 text-white' :
                            index === 2 ? 'bg-orange-600 text-white' :
                            'bg-gray-600 text-white'
                          }`}>
                            #{index + 1}
                          </span>
                          <span className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Cluster {item.cluster_id}
                          </span>
                          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            • {item.jumlah_inovasi} inovasi terkait
                          </span>
                        </div>
                      </div>
                      
                      {/* Score Badge */}
                      <div className="text-center ml-4">
                        <div className={`px-4 py-2 rounded-lg text-lg font-bold ${getScoreBadgeColor(item.skor_kolaborasi)}`}>
                          {scorePercent}%
                        </div>
                        <div className={`text-xs mt-1 font-semibold ${
                          item.skor_kolaborasi >= 0.9 ? 'text-emerald-600 dark:text-emerald-400' :
                          item.skor_kolaborasi >= 0.7 ? 'text-blue-600 dark:text-blue-400' :
                          'text-yellow-600 dark:text-yellow-400'
                        }`}>
                          {getScoreLabel(item.skor_kolaborasi)}
                        </div>
                      </div>
                    </div>

                    {/* Innovation Pair */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      <div className={`px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <p className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Inovasi 1
                        </p>
                        <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {item.inovasi_1.judul}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          <span className={`text-xs px-2 py-0.5 rounded ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                            {item.inovasi_1.urusan}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded ${darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
                            {item.inovasi_1.tahap}
                          </span>
                        </div>
                      </div>
                      
                      <div className={`px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <p className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Inovasi 2
                        </p>
                        <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {item.inovasi_2.judul}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          <span className={`text-xs px-2 py-0.5 rounded ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                            {item.inovasi_2.urusan}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded ${darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
                            {item.inovasi_2.tahap}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Maturity Badge */}
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        darkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700'
                      }`}>
                        {item.inovasi_1.kematangan}
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
                        onClick={() => setSelectedPdfRecommendation(item)}
                        className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                      >
                        <FileDown size={16} />
                        PDF
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ============= SECTION 2: EXPLORATION INPUT ============= */}
          <section className={`rounded-2xl shadow-2xl ${
            darkMode ? 'bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-800' : 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200'
          }`}>
            <div className={`px-6 py-5 border-b ${darkMode ? 'border-purple-800 bg-purple-900/60' : 'border-purple-200 bg-white/80'}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Target className="text-white" size={20} />
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Eksplorasi Kolaborasi Khusus
                </h3>
              </div>
              <p className={`text-sm ${darkMode ? 'text-purple-200' : 'text-gray-600'}`}>
                Analisis potensi kolaborasi antara dua inovasi pilihan Anda
              </p>
            </div>

            <div className="p-6 space-y-4" style={{ overflow: 'visible' }}>
              {isLoadingInnovation ? (
                <div className="text-center py-8">
                  <Loader2 className={`mx-auto mb-3 animate-spin ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} size={32} />
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Memuat daftar inovasi...
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ overflow: 'visible' }}>
                    <SearchableDropdown
                      options={innovationList}
                      value={filterInovasi1}
                      onChange={setFilterInovasi1}
                      label="Inovasi Pertama"
                      darkMode={darkMode}
                    />
                    <SearchableDropdown
                      options={innovationList}
                      value={filterInovasi2}
                      onChange={setFilterInovasi2}
                      label="Inovasi Kedua"
                      darkMode={darkMode}
                    />
                  </div>

                  {explorationError && (
                    <div className={`p-3 rounded-lg border ${darkMode ? 'bg-red-900/20 border-red-700 text-red-300' : 'bg-red-50 border-red-200 text-red-700'}`}>
                      <div className="flex items-center gap-2">
                        <AlertCircle size={16} />
                        <span className="text-sm">{explorationError}</span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !filterInovasi1 || !filterInovasi2}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                      isAnalyzing || !filterInovasi1 || !filterInovasi2
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        : 'bg-purple-500 text-white hover:bg-purple-600'
                    }`}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Menganalisis...
                      </>
                    ) : (
                      <>
                        <Sparkles size={20} />
                        Analisis dengan AI
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </section>

          {/* ============= EXPLORATION RESULT ============= */}
          {showExplorationResult && selectedExploration && (
            <div ref={explorationResultRef}>
              <section className={`rounded-2xl shadow-2xl overflow-hidden animate-fadeIn ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}>
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-black p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={20} />
                        <span className="text-sm font-medium opacity-90">Hasil Analisis AI</span>
                      </div>
                      <h4 className="text-2xl font-bold mb-2">{selectedExploration.title}</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedExploration.opd1 && (
                          <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                            {selectedExploration.opd1}
                          </span>
                        )}
                        {selectedExploration.opd2 && (
                          <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                            {selectedExploration.opd2}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="ml-4 text-center">
                      <div className="bg-white text-purple-600 px-4 py-2 rounded-lg text-2xl font-bold">
                        {selectedExploration.score}%
                      </div>
                      <div className="text-xs mt-1 opacity-90">Skor Kecocokan</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div className={`p-4 rounded-lg border-l-4 border-purple-500 ${
                    darkMode ? 'bg-purple-900/20' : 'bg-purple-50'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="text-purple-500" size={20} />
                      <h5 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        Tingkat Kolaborasi
                      </h5>
                    </div>
                    <p className={`text-lg font-semibold ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                      {selectedExploration.tingkat}
                    </p>
                  </div>

                  <div>
                    <h5 className={`font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      <Target size={16} className="text-purple-500" />
                      Manfaat Kolaborasi
                    </h5>
                    <div className="space-y-2">
                      {selectedExploration.manfaat.map((m: string, i: number) => (
                        <div key={i} className={`flex items-start gap-2 p-2 rounded-lg text-sm ${
                          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white border text-gray-700'
                        }`}>
                          <span className="font-bold text-purple-500">{i + 1}.</span>
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`border-t pt-4 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                    <h5 className={`font-semibold mb-2 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      <Users size={16} className="text-purple-500" />
                      Alasan Sinergi
                    </h5>
                    <div className={`text-sm rounded-lg p-4 border-l-4 ${
                      darkMode 
                        ? 'text-gray-300 bg-gray-700 border-purple-500' 
                        : 'text-gray-700 bg-purple-50 border-purple-500'
                    }`}>
                      {selectedExploration.alasan}
                    </div>
                  </div>

                  <div className={`border-t pt-4 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                    <h5 className={`font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      <TrendingUp size={16} className="text-purple-500" />
                      Potensi Dampak
                    </h5>
                    <div className="space-y-2">
                      {selectedExploration.dampak.map((d: string, i: number) => (
                        <div key={i} className={`flex items-start gap-2 p-2 rounded-lg text-sm ${
                          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white border text-gray-700'
                        }`}>
                          <span className="font-bold text-purple-500">{i + 1}.</span>
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button 
                    onClick={() => setPdfData({
                      inovasi_1: { judul: selectedExploration.judul1, opd: selectedExploration.opd1 },
                      inovasi_2: { judul: selectedExploration.judul2, opd: selectedExploration.opd2 },
                      skor_kecocokan: selectedExploration.score,
                      kategori: getScoreLabel(selectedExploration.score / 100),
                      hasil_ai: {
                        manfaat: selectedExploration.manfaat,
                        alasan: [selectedExploration.alasan],
                        dampak: selectedExploration.dampak
                      }
                    })}
                    className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                  >
                    <FileDown size={16} />
                    Export PDF Hasil Eksplorasi
                  </button>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN - AI Chatbot */}
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
                  <h3 className="font-bold text-lg">AI Policy Assistant</h3>
                  <p className="text-xs text-green-100">Online - Siap Membantu</p>
                </div>
              </div>
              <p className="text-xs text-green-50 mt-2">
                Asisten AI untuk analisis kebijakan kolaborasi inovasi
              </p>
            </div>

            <div className="h-[480px] overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Bot size={48} className="mx-auto mb-3 opacity-50" />
                  <p className="text-sm">
                    Tanyakan tentang rekomendasi kolaborasi
                  </p>
                </div>
              )}
              
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
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

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
                  disabled={!input.trim()}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    input.trim()
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  }`}
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
      
      {pdfData && (
        <ReportCollaboration 
          onClose={() => setPdfData(null)} 
          data={pdfData}
        />
      )}

      {selectedPdfRecommendation && (
        <ReportAIRecommendation
          onClose={() => setSelectedPdfRecommendation(null)}
          data={selectedPdfRecommendation}
        />
      )}
    </div>
  );
}