import { MapPin, Phone, Mail, Instagram, Twitter, ExternalLink } from 'lucide-react';
import logo from 'figma:asset/762c03ce75379b8f11d45d27d5eb18d10fa7e492.png';

interface FooterProps {
  darkMode: boolean;
  sidebarOpen: boolean;
}

export function Footer({ darkMode, sidebarOpen }: FooterProps) {
  return (
    <footer className={`mt-auto transition-all duration-300 ${
      sidebarOpen ? 'ml-0 lg:ml-64' : 'ml-0'
    } ${darkMode ? 'bg-gray-800 text-white' : 'bg-[#2563EB] text-white'}`}>
      <div className="w-full px-6 md:px-12 py-8 md:py-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Logo and Description - Vertical Layout, Center Aligned */}
            <div className="flex flex-col items-center text-center">
              <img 
                src={logo} 
                alt="BRIDA Jatim" 
                className="h-16 md:h-20 w-auto mb-3" 
              />
              <p className="text-sm md:text-base font-medium text-white leading-snug">
                Badan Riset dan Inovasi Daerah<br />Provinsi Jawa Timur
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="font-bold text-base md:text-lg mb-4">Kontak Kami</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="flex-shrink-0 mt-1" />
                  <div className="text-sm text-blue-100">
                    <p>Jl. Gayung Kebonsari No.56</p>
                    <p>Gayungan, Kec. Gayungan</p>
                    <p>Surabaya, Jawa Timur 60235</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="flex-shrink-0" />
                  <a href="tel:+62318290738" className="text-sm text-blue-100 hover:text-white transition-colors">
                    (031) 8290738
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="flex-shrink-0" />
                  <a href="mailto:ses-diri@brin.go.id" className="text-sm text-blue-100 hover:text-white transition-colors">
                    ses-diri@brin.go.id
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-bold text-base md:text-lg mb-4">Ikuti Kami</h4>
              <div className="space-y-3">
                <a
                  href="https://www.instagram.com/bridajatim/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-blue-100 hover:text-white transition-colors group"
                >
                  <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                    <Instagram size={18} />
                  </div>
                  <span>@bridajatim</span>
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a
                  href="https://x.com/balitbangjatim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-blue-100 hover:text-white transition-colors group"
                >
                  <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                    <Twitter size={18} />
                  </div>
                  <span>@balitbangjatim</span>
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>

          {/* Full-Width Copyright Section */}
          <div className="mt-8 pt-6 border-t border-blue-400">
            <p className="text-xs md:text-sm text-center text-blue-100">
              © {new Date().getFullYear()} BRIDA Jatim. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}