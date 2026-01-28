import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from 'figma:asset/3554ecab8b87e1a4e26b58997b7d2614ae189b80.png';

const trendData = [
  { month: 'Jan', digital: 20, nonDigital: 15, teknologi: 10 },
  { month: 'Feb', digital: 28, nonDigital: 18, teknologi: 12 },
  { month: 'Mar', digital: 25, nonDigital: 16, teknologi: 11 },
  { month: 'Apr', digital: 35, nonDigital: 20, teknologi: 15 },
  { month: 'May', digital: 40, nonDigital: 22, teknologi: 18 },
  { month: 'Jun', digital: 32, nonDigital: 19, teknologi: 14 },
  { month: 'Jul', digital: 48, nonDigital: 25, teknologi: 20 },
  { month: 'Aug', digital: 45, nonDigital: 23, teknologi: 18 },
  { month: 'Sep', digital: 52, nonDigital: 28, teknologi: 22 },
  { month: 'Oct', digital: 58, nonDigital: 30, teknologi: 25 },
  { month: 'Nov', digital: 62, nonDigital: 32, teknologi: 28 },
  { month: 'Dec', digital: 68, nonDigital: 35, teknologi: 30 },
];

const maturityData = [
  { level: 'Inisiasi', jumlah: 85 },
  { level: 'Uji Coba', jumlah: 120 },
  { level: 'Penerapan', jumlah: 145 },
  { level: 'Inovasi Matang', jumlah: 80 },
];

interface ReportDashboardProps {
  onClose: () => void;
}

export function ReportDashboard({ onClose }: ReportDashboardProps) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const generatePDF = async () => {
      try {
        setIsGenerating(true);
        setProgress(10);

        // Wait for initial render
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProgress(20);

        // Create a temporary container outside the main DOM to avoid parent styles
        const tempContainer = document.createElement('div');
        tempContainer.style.cssText = `
          position: fixed;
          left: -9999px;
          top: 0;
          width: 1000px;
          background: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        `;
        document.body.appendChild(tempContainer);

        // Render report content directly in temp container
        tempContainer.innerHTML = `
          <div style="background-color: #ffffff; padding: 40px; width: 1000px;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 32px; border-bottom: 4px solid #2563EB; padding-bottom: 24px;">
              <img src="${logo}" alt="BRIDA Jatim" style="height: 64px; margin: 0 auto 16px; display: block;" />
              <h1 style="font-size: 32px; font-weight: bold; color: #1f2937; margin: 0 0 12px 0;">
                Executive Summary Report
              </h1>
              <h2 style="font-size: 22px; color: #4b5563; margin: 0 0 12px 0;">
                Dashboard Inovasi Daerah BRIDA Jawa Timur
              </h2>
              <p style="font-size: 14px; color: #6b7280; margin: 4px 0;">
                Periode: Januari - Desember 2026
              </p>
              <p style="font-size: 14px; color: #6b7280; margin: 4px 0;">
                Tanggal Cetak: ${new Date().toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>

            <!-- Summary Statistics -->
            <div style="margin-bottom: 40px;">
              <h3 style="font-size: 22px; font-weight: bold; color: #1f2937; margin: 0 0 20px 0; border-left: 4px solid #2563EB; padding-left: 12px;">
                Ringkasan Statistik
              </h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div style="background-color: #EFF6FF; padding: 20px; border-radius: 8px; border-left: 4px solid #2563EB;">
                  <p style="font-size: 14px; color: #4b5563; margin: 0 0 8px 0; font-weight: 500;">Total Inovasi</p>
                  <p style="font-size: 36px; font-weight: bold; color: #1f2937; margin: 0;">430</p>
                </div>
                <div style="background-color: #FAF5FF; padding: 20px; border-radius: 8px; border-left: 4px solid #9333EA;">
                  <p style="font-size: 14px; color: #4b5563; margin: 0 0 8px 0; font-weight: 500;">Rata-rata Kematangan</p>
                  <p style="font-size: 36px; font-weight: bold; color: #1f2937; margin: 0;">3.8</p>
                </div>
                <div style="background-color: #F0FDF4; padding: 20px; border-radius: 8px; border-left: 4px solid #16A34A;">
                  <p style="font-size: 14px; color: #4b5563; margin: 0 0 8px 0; font-weight: 500;">Inovasi Digital</p>
                  <p style="font-size: 36px; font-weight: bold; color: #1f2937; margin: 0;">215</p>
                </div>
                <div style="background-color: #FFF7ED; padding: 20px; border-radius: 8px; border-left: 4px solid #F97316;">
                  <p style="font-size: 14px; color: #4b5563; margin: 0 0 8px 0; font-weight: 500;">Inovasi Baru 2026</p>
                  <p style="font-size: 36px; font-weight: bold; color: #1f2937; margin: 0;">57</p>
                </div>
              </div>
            </div>

            <!-- Chart 1 Placeholder -->
            <div id="chart1-container" style="margin-bottom: 40px;">
              <h3 style="font-size: 22px; font-weight: bold; color: #1f2937; margin: 0 0 20px 0; border-left: 4px solid #2563EB; padding-left: 12px;">
                Tren Inovasi Per Bulan (2026)
              </h3>
              <div id="chart1" style="width: 100%; height: 350px; background-color: #f9fafb; padding: 20px; border-radius: 8px;"></div>
              <p style="font-size: 13px; color: #4b5563; margin: 12px 0 0 0; font-style: italic; line-height: 1.6;">
                Grafik menunjukkan pertumbuhan konsisten inovasi digital sepanjang tahun 2026 dengan peningkatan signifikan di kuartal terakhir.
              </p>
            </div>

            <!-- Chart 2 Placeholder -->
            <div id="chart2-container" style="margin-bottom: 40px;">
              <h3 style="font-size: 22px; font-weight: bold; color: #1f2937; margin: 0 0 20px 0; border-left: 4px solid #2563EB; padding-left: 12px;">
                Distribusi Berdasarkan Tahapan Inovasi
              </h3>
              <div id="chart2" style="width: 100%; height: 350px; background-color: #f9fafb; padding: 20px; border-radius: 8px;"></div>
              <p style="font-size: 13px; color: #4b5563; margin: 12px 0 0 0; font-style: italic; line-height: 1.6;">
                Mayoritas inovasi telah memasuki tahap Penerapan (145 inovasi), menunjukkan kematangan ekosistem inovasi daerah.
              </p>
            </div>

            <!-- Key Findings -->
            <div style="margin-bottom: 40px; background-color: #F0FDF4; padding: 24px; border-radius: 8px; border-left: 4px solid #16A34A;">
              <h3 style="font-size: 22px; font-weight: bold; color: #1f2937; margin: 0 0 20px 0;">
                Temuan Utama
              </h3>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
                  <span style="color: #16A34A; font-weight: bold; font-size: 18px; margin-top: 2px;">✓</span>
                  <span style="font-size: 15px; color: #374151; line-height: 1.6;">
                    Pertumbuhan inovasi digital meningkat 23% pada tahun 2026, menunjukkan akselerasi transformasi digital di Jawa Timur.
                  </span>
                </li>
                <li style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
                  <span style="color: #16A34A; font-weight: bold; font-size: 18px; margin-top: 2px;">✓</span>
                  <span style="font-size: 15px; color: #374151; line-height: 1.6;">
                    Dinas Komunikasi dan Informatika memimpin dengan 45 inovasi berkategori matang, menjadi role model bagi OPD lain.
                  </span>
                </li>
                <li style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
                  <span style="color: #16A34A; font-weight: bold; font-size: 18px; margin-top: 2px;">✓</span>
                  <span style="font-size: 15px; color: #374151; line-height: 1.6;">
                    Kota Surabaya dan Malang menjadi daerah dengan tingkat kematangan inovasi tertinggi (4.5 dan 4.2).
                  </span>
                </li>
                <li style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 0;">
                  <span style="color: #16A34A; font-weight: bold; font-size: 18px; margin-top: 2px;">✓</span>
                  <span style="font-size: 15px; color: #374151; line-height: 1.6;">
                    145 inovasi telah memasuki tahap Penerapan dan siap untuk replikasi ke daerah lain.
                  </span>
                </li>
              </ul>
            </div>

            <!-- Recommendations -->
            <div style="margin-bottom: 40px; background-color: #EFF6FF; padding: 24px; border-radius: 8px; border-left: 4px solid #2563EB;">
              <h3 style="font-size: 22px; font-weight: bold; color: #1f2937; margin: 0 0 20px 0;">
                Rekomendasi Strategis
              </h3>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
                  <span style="color: #2563EB; font-weight: bold; font-size: 18px; margin-top: 2px;">→</span>
                  <span style="font-size: 15px; color: #374151; line-height: 1.6;">
                    Tingkatkan kolaborasi antar daerah di wilayah Tapal Kuda untuk pemerataan inovasi.
                  </span>
                </li>
                <li style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
                  <span style="color: #2563EB; font-weight: bold; font-size: 18px; margin-top: 2px;">→</span>
                  <span style="font-size: 15px; color: #374151; line-height: 1.6;">
                    Percepat integrasi sistem e-government untuk menghemat biaya operasional hingga 30%.
                  </span>
                </li>
                <li style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 0;">
                  <span style="color: #2563EB; font-weight: bold; font-size: 18px; margin-top: 2px;">→</span>
                  <span style="font-size: 15px; color: #374151; line-height: 1.6;">
                    Target 500 inovasi tahun 2027 dapat tercapai dengan mendorong partisipasi aktif seluruh OPD.
                  </span>
                </li>
              </ul>
            </div>

            <!-- Footer -->
            <div style="margin-top: 60px; padding-top: 24px; border-top: 2px solid #D1D5DB; text-align: center;">
              <p style="font-size: 14px; font-weight: bold; color: #1f2937; margin: 0 0 8px 0;">
                BADAN RISET DAN INOVASI DAERAH PROVINSI JAWA TIMUR
              </p>
              <p style="font-size: 12px; color: #6b7280; margin: 0; line-height: 1.6;">
                Jl. Ahmad Yani No. 152, Surabaya | Email: brida@jatimprov.go.id | Website: brida.jatimprov.go.id
              </p>
            </div>
          </div>
        `;

        setProgress(40);

        // Render charts using Recharts in temp container
        const { createRoot } = await import('react-dom/client');
        
        // Chart 1
        const chart1Root = createRoot(tempContainer.querySelector('#chart1')!);
        chart1Root.render(
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 10, right: 30, left: 20, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280" 
                style={{ fontSize: '13px', fontWeight: '500' }}
                tick={{ fill: '#374151' }}
              />
              <YAxis 
                stroke="#6b7280" 
                style={{ fontSize: '13px', fontWeight: '500' }}
                tick={{ fill: '#374151' }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '13px', fontWeight: '500', paddingTop: '15px' }}
                iconType="line"
              />
              <Line 
                type="monotone" 
                dataKey="digital" 
                stroke="#2563EB" 
                strokeWidth={3} 
                name="Digital" 
                dot={{ r: 5, fill: '#2563EB' }}
              />
              <Line 
                type="monotone" 
                dataKey="nonDigital" 
                stroke="#10b981" 
                strokeWidth={3} 
                name="Non-Digital" 
                dot={{ r: 5, fill: '#10b981' }}
              />
              <Line 
                type="monotone" 
                dataKey="teknologi" 
                stroke="#f59e0b" 
                strokeWidth={3} 
                name="Teknologi" 
                dot={{ r: 5, fill: '#f59e0b' }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

        // Chart 2
        const chart2Root = createRoot(tempContainer.querySelector('#chart2')!);
        chart2Root.render(
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={maturityData} barSize={80} margin={{ top: 10, right: 30, left: 20, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="level" 
                stroke="#6b7280" 
                style={{ fontSize: '12px', fontWeight: '500' }}
                tick={{ fill: '#374151' }}
              />
              <YAxis 
                stroke="#6b7280" 
                style={{ fontSize: '13px', fontWeight: '500' }}
                tick={{ fill: '#374151' }}
              />
              <Bar 
                dataKey="jumlah" 
                fill="#2563EB" 
                radius={[8, 8, 0, 0]} 
                name="Jumlah Inovasi"
                label={{ position: 'top', fill: '#1f2937', fontSize: 14, fontWeight: 'bold' }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '13px', fontWeight: '500', paddingTop: '15px' }}
              />
            </BarChart>
          </ResponsiveContainer>
        );

        // Wait for charts to render
        await new Promise(resolve => setTimeout(resolve, 2000));
        setProgress(60);

        // Capture as canvas
        const canvas = await html2canvas(tempContainer, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          allowTaint: true,
        });

        setProgress(80);

        // Clean up temp container
        document.body.removeChild(tempContainer);

        // Create PDF
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        const pdf = new jsPDF('p', 'mm', 'a4');
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        setProgress(95);

        // Download
        const fileName = `BRIDA_Report_${new Date().toISOString().split('T')[0]}.pdf`;
        pdf.save(fileName);

        setProgress(100);
        
        setTimeout(() => {
          onClose();
        }, 500);

      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Gagal membuat PDF: ' + (error as Error).message);
        onClose();
      }
    };

    generatePDF();
  }, [onClose]);

  return (
    <div style={{ 
      position: 'fixed', 
      inset: '0', 
      backgroundColor: 'rgba(17, 24, 39, 0.75)', 
      zIndex: 50, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '16px' 
    }}>
      <div style={{ 
        backgroundColor: '#ffffff', 
        borderRadius: '8px', 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', 
        padding: '40px',
        maxWidth: '500px'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 16px 0', textAlign: 'center' }}>
          Generating PDF Report
        </h2>
        
        <div style={{ width: '100%', height: '12px', backgroundColor: '#e5e7eb', borderRadius: '6px', overflow: 'hidden', marginBottom: '16px' }}>
          <div style={{ 
            width: `${progress}%`, 
            height: '100%', 
            backgroundColor: '#2563EB',
            transition: 'width 0.3s ease',
            borderRadius: '6px'
          }} />
        </div>
        
        <p style={{ fontSize: '16px', color: '#6b7280', textAlign: 'center', margin: 0 }}>
          {progress < 20 ? 'Initializing...' :
           progress < 40 ? 'Preparing content...' :
           progress < 60 ? 'Rendering charts...' : 
           progress < 80 ? 'Capturing document...' : 
           progress < 95 ? 'Creating PDF...' : 'Downloading...'}
        </p>
        
        <p style={{ fontSize: '14px', color: '#9ca3af', textAlign: 'center', marginTop: '12px' }}>
          {progress}% Complete
        </p>

        <button
          onClick={onClose}
          style={{
            marginTop: '20px',
            width: '100%',
            padding: '10px',
            backgroundColor: '#f3f4f6',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            color: '#374151',
            fontSize: '14px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}