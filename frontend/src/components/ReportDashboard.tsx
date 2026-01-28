import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from 'figma:asset/3554ecab8b87e1a4e26b58997b7d2614ae189b80.png';

// Data matching the actual Home component
const trendData = [
  { tahun: '2022', digital: 45, nonDigital: 32, teknologi: 18 },
  { tahun: '2023', digital: 68, nonDigital: 45, teknologi: 28 },
  { tahun: '2024', digital: 95, nonDigital: 58, teknologi: 42 },
  { tahun: '2025', digital: 112, nonDigital: 68, teknologi: 55 },
];

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

const stats = [
  { title: 'Total Inovasi', value: '430', color: '#2563EB' },
  { title: 'Rata-rata Kematangan', value: '3.8', color: '#a855f7' },
  { title: 'Inovasi Digital', value: '215', color: '#10b981' },
  { title: 'Inovasi Baru 2026', value: '57', color: '#f97316' }
];

const aiInsights = [
  { icon: '📈', text: 'Pertumbuhan inovasi digital meningkat 23% tahun ini', type: 'success' },
  { icon: '🏆', text: 'Dinas Kominfo memimpin dengan 45 inovasi berkategori matang', type: 'success' },
  { icon: '⚠️', text: 'Perlu peningkatan kolaborasi antar daerah di wilayah Tapal Kuda', type: 'warning' },
  { icon: '💡', text: 'Potensi integrasi sistem e-government dapat menghemat 30% biaya operasional', type: 'info' },
  { icon: '🎯', text: 'Target 500 inovasi tahun depan sangat realistis berdasarkan tren saat ini', type: 'success' },
];

interface ReportDashboardProps {
  onClose: () => void;
}

export function ReportDashboard({ onClose }: ReportDashboardProps) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Memuat komponen...');

  useEffect(() => {
    const generatePDF = async () => {
      try {
        setIsGenerating(true);
        setProgress(10);
        setStatusMessage('Memuat komponen...');
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setProgress(30);
        setStatusMessage('Menunggu grafik selesai dirender...');
        
        // Wait longer for charts to fully render with fixed dimensions
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        setProgress(50);
        setStatusMessage('Memverifikasi elemen visual...');
        
        // Create PDF with LANDSCAPE orientation for A4
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4'
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth(); // 297mm
        const pdfHeight = pdf.internal.pageSize.getHeight(); // 210mm
        
        // Process each page
        const pageIds = ['report-page-1', 'report-page-2'];
        
        for (let i = 0; i < pageIds.length; i++) {
          const pageId = pageIds[i];
          setProgress(50 + (i * 20));
          setStatusMessage(`Memproses halaman ${i + 1} dari ${pageIds.length}...`);
          
          const pageElement = document.getElementById(pageId);
          if (!pageElement) {
            console.error(`Page ${pageId} not found`);
            continue;
          }
          
          const rect = pageElement.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) {
            console.error(`Page ${pageId} has invalid dimensions:`, rect);
            continue;
          }
          
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // Add temporary style to fix oklch color issue
          const styleElement = document.createElement('style');
          styleElement.id = `html2canvas-fix-${pageId}`;
          styleElement.textContent = `
            #${pageId},
            #${pageId} * {
              color: #1f2937 !important;
              fill: currentColor !important;
            }
            #${pageId} {
              background-color: #ffffff !important;
            }
            #${pageId} .recharts-text {
              fill: #6b7280 !important;
            }
            #${pageId} .recharts-cartesian-grid-horizontal line,
            #${pageId} .recharts-cartesian-grid-vertical line {
              stroke: #e5e7eb !important;
            }
          `;
          document.head.appendChild(styleElement);
          
          await new Promise(resolve => setTimeout(resolve, 200));
          
          // Capture page as canvas
          const canvas = await html2canvas(pageElement, {
            scale: 2.5,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
            onclone: (clonedDoc) => {
              // Ensure all elements are visible in cloned document
              const clonedElement = clonedDoc.getElementById(pageId);
              if (clonedElement) {
                clonedElement.style.display = 'block';
                clonedElement.style.visibility = 'visible';
                clonedElement.style.opacity = '1';
              }
            }
          });
          
          // Remove temporary style
          const tempStyle = document.getElementById(`html2canvas-fix-${pageId}`);
          if (tempStyle) {
            tempStyle.remove();
          }
          
          const imgData = canvas.toDataURL('image/png', 1.0);
          
          // Add new page if not first page
          if (i > 0) {
            pdf.addPage();
          }
          
          // Apply safe margins (20mm on all sides)
          const margin = 20;
          const contentWidth = pdfWidth - (margin * 2); // 257mm
          const contentHeight = pdfHeight - (margin * 2); // 170mm
          
          // Calculate image dimensions to fit within content area while maintaining aspect ratio
          const canvasAspect = canvas.height / canvas.width;
          let imgWidth = contentWidth;
          let imgHeight = contentWidth * canvasAspect;
          
          // If height exceeds content area, scale down based on height
          if (imgHeight > contentHeight) {
            imgHeight = contentHeight;
            imgWidth = contentHeight / canvasAspect;
          }
          
          // Center the image if it's smaller than content area
          const xOffset = margin + (contentWidth - imgWidth) / 2;
          const yOffset = margin + (contentHeight - imgHeight) / 2;
          
          // Add image to PDF
          pdf.addImage(
            imgData,
            'PNG',
            xOffset,
            yOffset,
            imgWidth,
            imgHeight,
            undefined,
            'FAST'
          );
        }
        
        setProgress(95);
        setStatusMessage('Menyimpan file...');
        
        const fileName = `BRIDA_Dashboard_Report_${new Date().toISOString().split('T')[0]}.pdf`;
        pdf.save(fileName);
        
        setProgress(100);
        setStatusMessage('Selesai!');;
        
        setTimeout(() => {
          onClose();
        }, 500);
        
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Terjadi kesalahan saat membuat PDF. Silakan coba lagi.');
        onClose();
      } finally {
        setIsGenerating(false);
      }
    };
    
    const timer = setTimeout(() => {
      generatePDF();
    }, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div style={{ 
      position: 'fixed', 
      inset: 0, 
      backgroundColor: 'rgba(17, 24, 39, 0.75)', 
      zIndex: 9999, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '16px' 
    }}>
      <div style={{ 
        backgroundColor: '#ffffff', 
        borderRadius: '12px', 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)', 
        maxWidth: '1400px', 
        width: '100%', 
        maxHeight: '90vh', 
        overflow: 'auto',
        position: 'relative'
      }}>
        {/* Loading Overlay */}
        {isGenerating && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
            borderRadius: '12px'
          }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              border: '4px solid #E5E7EB',
              borderTop: '4px solid #2563EB',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '24px'
            }} />
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: '#1f2937', 
              marginBottom: '12px' 
            }}>
              Generating PDF Report
            </h3>
            <p style={{ 
              fontSize: '14px', 
              color: '#6b7280', 
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              {statusMessage}
            </p>
            <div style={{
              width: '100%',
              maxWidth: '400px',
              height: '8px',
              backgroundColor: '#E5E7EB',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: '#2563EB',
                transition: 'width 0.3s ease',
                borderRadius: '4px'
              }} />
            </div>
            <p style={{ 
              fontSize: '12px', 
              color: '#9ca3af', 
              marginTop: '8px'
            }}>
              {progress}%
            </p>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}
        
        <div style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
              Preview Laporan Dashboard
            </h2>
            <button
              onClick={onClose}
              style={{ 
                color: '#6b7280', 
                fontSize: '28px', 
                fontWeight: 'bold', 
                border: 'none', 
                background: 'none', 
                cursor: 'pointer',
                padding: '4px 8px',
                lineHeight: 1
              }}
            >
              ×
            </button>
          </div>
          
          {/* Multi-page Layout Container */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* PAGE 1: Summary + 2 Charts (Trend & Maturity) */}
            <div id="report-page-1" style={{ 
              backgroundColor: '#ffffff', 
              padding: '24px',
              width: '1122px', // A4 landscape width at 96 DPI (297mm)
              height: '793px', // A4 landscape height at 96 DPI (210mm)
              margin: '0 auto',
              boxSizing: 'border-box',
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid #e5e7eb'
            }}>
              {/* Header */}
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px', 
                borderBottom: '3px solid #2563EB', 
                paddingBottom: '12px' 
              }}>
                <img src={logo} alt="BRIDA Jatim" style={{ height: '45px' }} />
                <div style={{ flex: 1, marginLeft: '20px' }}>
                  <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 4px 0' }}>
                    Laporan Dashboard Inovasi BRIDA Jawa Timur
                  </h1>
                  <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>
                    Tanggal Generate: {new Date().toLocaleDateString('id-ID', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })} | Halaman 1 dari 2
                  </p>
                </div>
              </div>

              {/* Summary Statistics */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(4, 1fr)', 
                  gap: '10px',
                }}> 
                  {stats.map((stat, index) => (
                    <div key={index} style={{ 
                      padding: '12px', 
                      backgroundColor: '#f9fafb', 
                      borderRadius: '6px',
                      borderLeft: `4px solid ${stat.color}`
                    }}>
                      <p style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px', margin: 0 }}>
                        {stat.title}
                      </p>
                      <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: '4px 0 0 0' }}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart 1: Trend Chart */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  padding: '14px', 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '8px',
                  height: '280px'
                }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px', margin: '0 0 10px 0' }}>
                    Tren Penerapan Inovasi Per Tahun (2022-2025)
                  </h4>
                  <div style={{ width: '100%', height: '230px', minWidth: '1074px', minHeight: '230px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={trendData} 
                        margin={{ top: 10, right: 20, left: 10, bottom: 25 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="tahun" 
                          stroke="#6b7280" 
                          style={{ fontSize: '10px', fontWeight: '600' }}
                          label={{ 
                            value: 'Tahun', 
                            position: 'insideBottom', 
                            offset: -10, 
                            fill: '#1f2937',
                            style: { fontSize: '10px', fontWeight: 'bold' }
                          }}
                        />
                        <YAxis 
                          stroke="#6b7280" 
                          style={{ fontSize: '10px', fontWeight: '600' }}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            fontSize: '10px'
                          }}
                        />
                        <Legend 
                          verticalAlign="top" 
                          height={30}
                          wrapperStyle={{ fontSize: '10px', fontWeight: '600' }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="digital" 
                          stroke="#2563EB" 
                          strokeWidth={3} 
                          name="Digital"
                          dot={{ fill: '#2563EB', r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="nonDigital" 
                          stroke="#10b981" 
                          strokeWidth={3} 
                          name="Non-Digital"
                          dot={{ fill: '#10b981', r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="teknologi" 
                          stroke="#f59e0b" 
                          strokeWidth={3} 
                          name="Teknologi"
                          dot={{ fill: '#f59e0b', r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Chart 2: Maturity Distribution */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  padding: '14px', 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '8px',
                  height: '280px'
                }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px', margin: '0 0 10px 0' }}>
                    Jumlah Inovasi Berdasarkan Tahapan
                  </h4>
                  <div style={{ width: '100%', height: '230px', minWidth: '1074px', minHeight: '230px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={maturityData} 
                        margin={{ top: 10, right: 20, left: 10, bottom: 35 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="level" 
                          stroke="#6b7280" 
                          style={{ fontSize: '10px', fontWeight: '600' }}
                          interval={0}
                          label={{ 
                            value: 'Tahapan Inovasi', 
                            position: 'insideBottom', 
                            offset: -15, 
                            fill: '#1f2937',
                            style: { fontSize: '10px', fontWeight: 'bold' }
                          }}
                        />
                        <YAxis 
                          stroke="#6b7280" 
                          style={{ fontSize: '10px', fontWeight: '600' }}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            fontSize: '10px'
                          }}
                        />
                        <Bar dataKey="jumlah" fill="#2563EB" radius={[8, 8, 0, 0]} barSize={80} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{ 
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
                paddingTop: '10px', 
                borderTop: '2px solid #e5e7eb', 
                textAlign: 'center' 
              }}>
                <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px', margin: 0 }}>
                  BADAN RISET DAN INOVASI DAERAH PROVINSI JAWA TIMUR
                </p>
                <p style={{ fontSize: '8px', color: '#6b7280', margin: '4px 0 0 0', lineHeight: '1.4' }}>
                  Jl. Ahmad Yani No. 152, Surabaya | Email: brida@jatimprov.go.id | Website: brida.jatimprov.go.id
                </p>
              </div>
            </div>

            {/* PAGE 2: Top OPD & Top Urusan Charts */}
            <div id="report-page-2" style={{ 
              backgroundColor: '#ffffff', 
              padding: '24px',
              width: '1122px',
              height: '793px',
              margin: '0 auto',
              boxSizing: 'border-box',
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid #e5e7eb'
            }}>
              {/* Header */}
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px', 
                borderBottom: '3px solid #2563EB', 
                paddingBottom: '12px' 
              }}>
                <img src={logo} alt="BRIDA Jatim" style={{ height: '45px' }} />
                <div style={{ flex: 1, marginLeft: '20px' }}>
                  <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 4px 0' }}>
                    Laporan Dashboard Inovasi BRIDA Jawa Timur
                  </h1>
                  <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>
                    Tanggal Generate: {new Date().toLocaleDateString('id-ID', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })} | Halaman 2 dari 2
                  </p>
                </div>
              </div>

              {/* Chart 3: Top OPD */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  padding: '14px', 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '8px',
                  height: '300px'
                }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px', margin: '0 0 10px 0' }}>
                    Top 5 OPD Berdasarkan Jumlah Inovasi
                  </h4>
                  <div style={{ width: '100%', height: '250px', minWidth: '1074px', minHeight: '250px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={topOPD} 
                        layout="vertical"
                        margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          type="number" 
                          stroke="#6b7280" 
                          style={{ fontSize: '10px', fontWeight: '600' }}
                        />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          stroke="#6b7280" 
                          width={220} 
                          style={{ fontSize: '10px', fontWeight: '600' }}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            fontSize: '10px'
                          }}
                        />
                        <Bar dataKey="jumlah" radius={[0, 8, 8, 0]} barSize={30}>
                          {topOPD.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.jumlah === 45 ? '#2563EB' : '#9CA3AF'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Chart 4: Top Urusan */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  padding: '14px', 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '8px',
                  height: '300px'
                }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px', margin: '0 0 10px 0' }}>
                    Top 5 Urusan Berdasarkan Jumlah Inovasi
                  </h4>
                  <div style={{ width: '100%', height: '250px', minWidth: '1074px', minHeight: '250px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={topUrusan} 
                        layout="vertical"
                        margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          type="number" 
                          stroke="#6b7280" 
                          style={{ fontSize: '10px', fontWeight: '600' }}
                        />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          stroke="#6b7280" 
                          width={250} 
                          style={{ fontSize: '10px', fontWeight: '600' }}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            fontSize: '10px'
                          }}
                        />
                        <Bar dataKey="jumlah" radius={[0, 8, 8, 0]} barSize={30}>
                          {topUrusan.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.jumlah === 78 ? '#2563EB' : '#9CA3AF'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* AI Insights Summary */}
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px', borderLeft: '3px solid #2563EB', paddingLeft: '8px' }}>
                  Wawasan AI - Ringkasan Utama
                </h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '8px',
                }}>
                  {aiInsights.slice(0, 4).map((insight, index) => (
                    <div key={index} style={{ 
                      padding: '8px', 
                      backgroundColor: '#f9fafb', 
                      borderRadius: '4px',
                      borderLeft: `3px solid ${insight.type === 'success' ? '#2563EB' : insight.type === 'warning' ? '#f97316' : '#a855f7'}`
                    }}>
                      <p style={{ fontSize: '9px', color: '#6b7280', margin: 0, lineHeight: '1.5' }}>
                        {insight.icon} {insight.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div style={{ 
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
                paddingTop: '10px', 
                borderTop: '2px solid #e5e7eb', 
                textAlign: 'center' 
              }}>
                <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px', margin: 0 }}>
                  BADAN RISET DAN INOVASI DAERAH PROVINSI JAWA TIMUR
                </p>
                <p style={{ fontSize: '8px', color: '#6b7280', margin: '4px 0 0 0', lineHeight: '1.4' }}>
                  Jl. Ahmad Yani No. 152, Surabaya | Email: brida@jatimprov.go.id | Website: brida.jatimprov.go.id
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}