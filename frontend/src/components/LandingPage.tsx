import { ArrowRight } from 'lucide-react';
import logo from 'figma:asset/3554ecab8b87e1a4e26b58997b7d2614ae189b80.png';
import { Footer } from './Footer';

interface LandingPageProps {
  onEnter: () => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export function LandingPage({ onEnter, darkMode, setDarkMode }: LandingPageProps) {
  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-[#EFF6FF] to-white'} transition-colors duration-300`}>
      {/* Compact Header with Dark Mode Toggle */}
      <header className={`sticky top-0 z-50 transition-colors duration-300 ${
        darkMode ? 'bg-gray-800/90 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'
      } shadow-md`}>
        <div className="container mx-auto px-8 md:px-12 py-2">
          <div className="flex items-center justify-between">
            {/* Logo - Better Aligned to Left */}
            <div className="flex items-center">
              <img src={logo} alt="BRIDA Jatim" className="h-12 md:h-14 w-auto" />
            </div>
            
            {/* Fun Dark Mode Toggle - Better Aligned to Right */}
            <div className="flex items-center">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative p-2.5 rounded-full transition-all duration-500 hover:scale-110 ${
                  darkMode 
                    ? 'bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-purple-500/50' 
                    : 'bg-gradient-to-br from-yellow-400 to-orange-400 shadow-lg shadow-yellow-500/50'
                }`}
                title={darkMode ? 'Light Mode' : 'Dark Mode'}
              >
                <div className="relative w-5 h-5">
                  {darkMode ? (
                    // Moon with Stars
                    <div className="relative">
                      <svg 
                        className="w-5 h-5 text-yellow-100 transform transition-all duration-500 rotate-0 hover:rotate-12" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        style={{ animation: 'float 3s ease-in-out infinite' }}
                      >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                      {/* Twinkling Stars */}
                      <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse"></div>
                      <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
                    </div>
                  ) : (
                    // Sun with Rays
                    <div className="relative">
                      <svg 
                        className="w-5 h-5 text-white transform transition-all duration-500" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        style={{ animation: 'spin 8s linear infinite' }}
                      >
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </svg>
                      {/* Pulsing glow effect */}
                      <div className="absolute inset-0 bg-white rounded-full opacity-50 animate-ping"></div>
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Reduced Top Spacing */}
      <div className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6 md:mb-8 animate-fade-in">
            <img 
              src={logo} 
              alt="BRIDA Jatim" 
              className="h-40 md:h-56 w-auto drop-shadow-lg hover:scale-105 transition-transform duration-300" 
            />
          </div>

          {/* Main Heading */}
          <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 ${
            darkMode ? 'text-white' : 'text-[#0F172A]'
          } animate-slide-up`}>
            Dashboard Inovasi Daerah
            <span className="block text-[#2563EB] mt-2">BRIDA Jatim</span>
          </h1>

          {/* Subtitle */}
          <p className={`text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-[#64748B]'
          } animate-slide-up-delay`}>
            Platform digital yang menyajikan informasi inovasi daerah melalui visualisasi yang informatif, 
            terintegrasi, dan mutakhir untuk mendukung pengambilan keputusan berbasis data di Provinsi Jawa Timur.
          </p>

          {/* CTA Button */}
          <button
            onClick={onEnter}
            className="group bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold 
                     shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 
                     flex items-center gap-3 mx-auto animate-bounce-slow"
          >
            Mulai Eksplorasi
            <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={24} />
          </button>
        </div>

        {/* Purpose Section */}
        <div className="mt-16 md:mt-20 max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
              Tujuan Dashboard
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            <div className={`p-6 md:p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer ${
              darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-blue-50'
            } shadow-lg`}>
              <div className="text-4xl md:text-5xl mb-4">📊</div>
              <h3 className={`font-bold text-lg md:text-xl mb-3 ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                Visualisasi Data Inovasi
              </h3>
              <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-[#64748B]'}`}>
                Menyajikan data inovasi daerah dalam bentuk grafik, peta, dan statistik yang mudah dipahami untuk 
                monitoring dan evaluasi berkelanjutan.
              </p>
            </div>
            <div className={`p-6 md:p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer ${
              darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-blue-50'
            } shadow-lg`}>
              <div className="text-4xl md:text-5xl mb-4">🤖</div>
              <h3 className={`font-bold text-lg md:text-xl mb-3 ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                AI-Powered Insights
              </h3>
              <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-[#64748B]'}`}>
                Memanfaatkan kecerdasan buatan untuk memberikan rekomendasi kolaborasi inovasi dan insight otomatis 
                berbasis analisis data.
              </p>
            </div>
            <div className={`p-6 md:p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer ${
              darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-blue-50'
            } shadow-lg`}>
              <div className="text-4xl md:text-5xl mb-4">🗺️</div>
              <h3 className={`font-bold text-lg md:text-xl mb-3 ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                Pemetaan Regional
              </h3>
              <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-[#64748B]'}`}>
                Menampilkan sebaran geografis inovasi di seluruh kabupaten/kota Jawa Timur dengan tingkat kematangan 
                yang berbeda-beda.
              </p>
            </div>
            <div className={`p-6 md:p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer ${
              darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-blue-50'
            } shadow-lg`}>
              <div className="text-4xl md:text-5xl mb-4">📈</div>
              <h3 className={`font-bold text-lg md:text-xl mb-3 ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                Pengambilan Keputusan
              </h3>
              <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-[#64748B]'}`}>
                Mendukung pemerintah daerah dan OPD dalam mengambil keputusan strategis berbasis data yang akurat 
                dan terkini.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer darkMode={darkMode} sidebarOpen={false} />

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}