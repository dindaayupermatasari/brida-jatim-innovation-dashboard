import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { Home } from './components/Home';
import { Analytics } from './components/Analytics';
import { MapInnovation } from './components/MapInnovation';
import { AIChatbot } from './components/AIChatbot';
import { DataManagement } from './components/DataManagement';
import { LayoutDashboard, BarChart3, MapPin, Bot, Database, Menu, User, LogOut } from 'lucide-react';
import logo from 'figma:asset/3554ecab8b87e1a4e26b58997b7d2614ae189b80.png';

export default function App() {
  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem('activePage') || 'landing';
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  // NEW: useEffect to close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if click is outside profile menu
      if (profileMenuOpen && !target.closest('.profile-menu-container')) {
        setProfileMenuOpen(false);
        setShowLoginForm(false);
        setLoginError('');
      }
    };

    if (profileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileMenuOpen]);

  // Save active page to localStorage
  useEffect(() => {
    if (activePage !== 'landing') {
      localStorage.setItem('activePage', activePage);
    }
  }, [activePage]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Save login status
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);

  const navigation = [
    { id: 'home', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', name: 'Analitik', icon: BarChart3 },
    { id: 'map', name: 'Peta Inovasi', icon: MapPin },
    { id: 'ai-chatbot', name: 'AI Rekomendasi', icon: Bot },
    { id: 'data', name: 'Data Management', icon: Database },
  ];

  const renderPage = () => {
    switch (activePage) {
      case 'landing':
        return <LandingPage onEnter={() => setActivePage('home')} darkMode={darkMode} setDarkMode={setDarkMode} />;
      case 'home':
        return <Home darkMode={darkMode} />;
      case 'analytics':
        return <Analytics darkMode={darkMode} />;
      case 'map':
        return <MapInnovation darkMode={darkMode} />;
      case 'ai-chatbot':
        return <AIChatbot darkMode={darkMode} />;
      case 'data':
        return <DataManagement darkMode={darkMode} isLoggedIn={isLoggedIn} />;
      default:
        return <Home darkMode={darkMode} />;
    }
  };

  const handleLogin = () => {
    if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
      setIsLoggedIn(true);
      setShowLoginForm(false);
      setProfileMenuOpen(false);
      setLoginError('');
      setLoginForm({ username: '', password: '' });
    } else {
      setLoginError('Username atau password salah!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfileMenuOpen(false);
  };

  if (activePage === 'landing') {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <LandingPage onEnter={() => setActivePage('home')} darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-[#F8FAFC]'} transition-colors duration-300 overflow-x-hidden`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 shadow-lg transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}>
        <div className="w-full px-3 md:px-4 py-1.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <Menu size={20} />
              </button>
              <div className="flex items-center">
                <img src={logo} alt="BRIDA Jatim" className="h-10 md:h-12 w-auto" />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative p-2 rounded-full transition-all duration-500 hover:scale-110 ${
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

              {/* Profile Menu */}
              <div className="relative profile-menu-container">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-[#2563EB]' : 'bg-[#2563EB]'
                  }`}>
                    <User size={14} className="text-white" />
                  </div>
                </button>

                {profileMenuOpen && (
                  <div className={`absolute right-0 mt-2 w-64 rounded-lg shadow-xl ${
                    darkMode ? 'bg-gray-700' : 'bg-white'
                  } border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                    {!isLoggedIn && !showLoginForm ? (
                      <div className="p-4">
                        <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          Anda belum login
                        </p>
                        <button
                          onClick={() => setShowLoginForm(true)}
                          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                        >
                          Login Admin
                        </button>
                      </div>
                    ) : !isLoggedIn && showLoginForm ? (
                      <div className="p-4">
                        <h4 className={`font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          Login Admin
                        </h4>
                        {loginError && (
                          <p className="text-red-500 text-xs mb-2">{loginError}</p>
                        )}
                        <input
                          type="text"
                          placeholder="Username"
                          value={loginForm.username}
                          onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                          className={`w-full px-3 py-2 border rounded-lg mb-2 text-sm ${
                            darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'
                          }`}
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          className={`w-full px-3 py-2 border rounded-lg mb-3 text-sm ${
                            darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'
                          }`}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleLogin}
                            className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                          >
                            Login
                          </button>
                          <button
                            onClick={() => {
                              setShowLoginForm(false);
                              setLoginError('');
                            }}
                            className={`flex-1 px-3 py-2 rounded-lg transition-colors text-sm ${
                              darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                          >
                            Batal
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className={`px-4 py-3 border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                          <p className="font-semibold text-sm">Admin BRIDA</p>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            admin@brida.jatimprov.go.id
                          </p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors ${
                            darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-50'
                          }`}
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-[50px] flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-[50px] h-[calc(100vh-50px)] transition-all duration-300 z-40 ${
            sidebarOpen ? 'w-64' : 'w-0'
          } ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg overflow-hidden`}
        >
          <nav className="p-4 pt-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activePage === item.id
                      ? darkMode
                        ? 'bg-[#2563EB] text-white'
                        : 'bg-[#2563EB] text-white'
                      : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${

            sidebarOpen ? 'ml-0 lg:ml-64' : 'ml-0'

          } p-4 md:p-6 pt-6 pb-0 overflow-x-hidden`}

        >
          {renderPage()}
        </main>
      </div>

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