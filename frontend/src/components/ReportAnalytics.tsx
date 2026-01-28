import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from 'figma:asset/3554ecab8b87e1a4e26b58997b7d2614ae189b80.png';

// Data matching the actual Analytics component
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

const bentukInovasiPerInisiatorData = [
  { inisiator: 'Kepala Daerah', aplikasi: 40, sop: 35, metode: 25 },
  { inisiator: 'OPD', aplikasi: 55, sop: 30, metode: 15 },
  { inisiator: 'ASN', aplikasi: 30, sop: 40, metode: 30 },
  { inisiator: 'Masyarakat', aplikasi: 20, sop: 25, metode: 55 },
];

const watchlistData = [
  { nama: 'Sistem Pengaduan Masyarakat v1', inisiator: 'Dinas Kominfo', tahunPenerapan: 2023, skorKematangan: 25 },
  { nama: 'Program Pemupukan Organik', inisiator: 'Dinas Pertanian', tahunPenerapan: 2022, skorKematangan: 18 },
  { nama: 'SOP Pelayanan Cepat Kecamatan', inisiator: 'Kepala Daerah', tahunPenerapan: 2023, skorKematangan: 22 },
  { nama: 'Aplikasi Absensi Manual', inisiator: 'Bappeda', tahunPenerapan: 2022, skorKematangan: 15 },
  { nama: 'Portal Berita Desa', inisiator: 'Dinas Pemberdayaan Masyarakat', tahunPenerapan: 2023, skorKematangan: 28 },
];

const getMaturityBadge = (score: number) => {
  if (score >= 30) {
    return { label: 'Kurang Matang', color: '#f97316', textColor: '#ffffff' };
  } else {
    return { label: 'Perlu Perhatian', color: '#ef4444', textColor: '#ffffff' };
  }
};

interface ReportAnalyticsProps {
  onClose: () => void;
}

export function ReportAnalytics({ onClose }: ReportAnalyticsProps) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Memuat komponen...');

  const totalInnovations = jenisInovasiData.reduce((sum, item) => sum + item.value, 0);

  useEffect(() => {
    const generatePDF = async () => {
      try {
        setIsGenerating(true);
        setProgress(10);
        setStatusMessage('Menunggu render komponen...');
        
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
        const pageIds = ['report-analytics-page-1', 'report-analytics-page-2'];
        
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
        
        const fileName = `BRIDA_Analytics_Report_${new Date().toISOString().split('T')[0]}.pdf`;
        pdf.save(fileName);
        
        setProgress(100);
        setStatusMessage('Selesai!');
        
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
              Preview Laporan Analitik
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
            
            {/* PAGE 1: Top 10 Urusan + Jenis Inovasi Charts */}
            <div id="report-analytics-page-1" style={{ 
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
                marginBottom: '14px', 
                borderBottom: '3px solid #2563EB', 
                paddingBottom: '12px' 
              }}>
                <img src={logo} alt="BRIDA Jatim" style={{ height: '45px' }} />
                <div style={{ flex: 1, marginLeft: '20px' }}>
                  <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 4px 0' }}>
                    Laporan Analitik Inovasi BRIDA Jawa Timur
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

              {/* Filter Info */}
              <div style={{ marginBottom: '14px', backgroundColor: '#f0f9ff', padding: '10px 14px', borderRadius: '6px', border: '2px solid #2563EB' }}>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: '#6b7280' }}>Periode:</span>
                    <span style={{ fontSize: '11px', color: '#1f2937', fontWeight: 'bold' }}>Semua Tahun</span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: '#6b7280' }}>Kategori:</span>
                    <span style={{ fontSize: '11px', color: '#1f2937', fontWeight: 'bold' }}>Top 10 Urusan</span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: '#6b7280' }}>Total:</span>
                    <span style={{ fontSize: '11px', color: '#1f2937', fontWeight: 'bold' }}>{totalInnovations} Inovasi</span>
                  </div>
                </div>
              </div>

              {/* Chart 1: Top 10 Urusan */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ 
                  padding: '14px', 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '8px',
                  height: '330px'
                }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px', margin: '0 0 10px 0' }}>
                    Top 10 Urusan Berdasarkan Tahapan Inovasi
                  </h3>
                  <div style={{ width: '100%', height: '280px', minWidth: '1074px', minHeight: '280px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={urusanTahapanData} 
                        margin={{ top: 10, right: 20, left: 10, bottom: 50 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="urusan" 
                          stroke="#6b7280" 
                          angle={-45}
                          textAnchor="end"
                          height={70}
                          interval={0}
                          style={{ fontSize: '9px', fontWeight: '600' }}
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
                          height={28}
                          wrapperStyle={{ fontSize: '10px', fontWeight: '600' }}
                        />
                        <Bar dataKey="inisiatif" stackId="a" fill="#f59e0b" name="Inisiatif" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="ujiCoba" stackId="a" fill="#3b82f6" name="Uji Coba" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="penerapan" stackId="a" fill="#10b981" name="Penerapan" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Chart 2: Jenis Inovasi with Summary Cards */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ 
                  padding: '14px', 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '8px',
                  height: '300px'
                }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px', margin: '0 0 10px 0' }}>
                    Distribusi Jenis Inovasi
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    {/* Pie Chart */}
                    <div style={{ width: '350px', height: '240px', minWidth: '350px', minHeight: '240px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={jenisInovasiData}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={85}
                            paddingAngle={3}
                            dataKey="value"
                          >
                            {jenisInovasiData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: '#ffffff',
                              border: '1px solid #e5e7eb',
                              borderRadius: '4px',
                              fontSize: '10px'
                            }}
                          />
                          <Legend 
                            verticalAlign="bottom" 
                            height={40}
                            wrapperStyle={{ fontSize: '10px', fontWeight: '600' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    {/* Summary Cards */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {jenisInovasiData.map((item, index) => (
                        <div key={index} style={{ 
                          padding: '14px', 
                          backgroundColor: '#ffffff', 
                          borderRadius: '6px',
                          border: `3px solid ${item.color}`,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <div>
                            <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>
                              {item.name}
                            </p>
                            <p style={{ fontSize: '28px', fontWeight: 'bold', color: item.color, margin: 0 }}>
                              {item.value}
                            </p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '24px', fontWeight: 'bold', color: item.color, margin: 0 }}>
                              {((item.value / totalInnovations) * 100).toFixed(1)}%
                            </p>
                            <p style={{ fontSize: '9px', color: '#9ca3af', margin: '4px 0 0 0' }}>
                              dari total
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
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

            {/* PAGE 2: Bentuk Inovasi + Watchlist */}
            <div id="report-analytics-page-2" style={{ 
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
                marginBottom: '14px', 
                borderBottom: '3px solid #2563EB', 
                paddingBottom: '12px' 
              }}>
                <img src={logo} alt="BRIDA Jatim" style={{ height: '45px' }} />
                <div style={{ flex: 1, marginLeft: '20px' }}>
                  <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 4px 0' }}>
                    Laporan Analitik Inovasi BRIDA Jawa Timur
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

              {/* Chart 3: Bentuk Inovasi Per Inisiator */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  padding: '14px', 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '8px',
                  height: '310px'
                }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px', margin: '0 0 10px 0' }}>
                    Bentuk Inovasi Per Inisiator
                  </h3>
                  <div style={{ width: '100%', height: '260px', minWidth: '1074px', minHeight: '260px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={bentukInovasiPerInisiatorData} 
                        margin={{ top: 10, right: 20, left: 10, bottom: 45 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="inisiator" 
                          stroke="#6b7280" 
                          angle={-45}
                          textAnchor="end"
                          height={60}
                          interval={0}
                          style={{ fontSize: '10px', fontWeight: '600' }}
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
                          height={28}
                          wrapperStyle={{ fontSize: '10px', fontWeight: '600' }}
                        />
                        <Bar dataKey="aplikasi" stackId="a" fill="#f59e0b" name="Aplikasi" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="sop" stackId="a" fill="#3b82f6" name="SOP" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="metode" stackId="a" fill="#10b981" name="Metode" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Watchlist Table */}
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px', borderLeft: '3px solid #ef4444', paddingLeft: '8px' }}>
                  ⚠️ Watchlist: Inovasi Perlu Perhatian
                </h3>
                <div style={{ padding: '12px', backgroundColor: '#fef2f2', borderRadius: '6px', border: '2px solid #ef4444' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                        <th style={{ padding: '8px 10px', textAlign: 'left', fontSize: '10px', fontWeight: 'bold', color: '#1f2937' }}>
                          Nama Inovasi
                        </th>
                        <th style={{ padding: '8px 10px', textAlign: 'left', fontSize: '10px', fontWeight: 'bold', color: '#1f2937' }}>
                          Inisiator
                        </th>
                        <th style={{ padding: '8px 10px', textAlign: 'center', fontSize: '10px', fontWeight: 'bold', color: '#1f2937' }}>
                          Tahun
                        </th>
                        <th style={{ padding: '8px 10px', textAlign: 'center', fontSize: '10px', fontWeight: 'bold', color: '#1f2937' }}>
                          Skor
                        </th>
                        <th style={{ padding: '8px 10px', textAlign: 'center', fontSize: '10px', fontWeight: 'bold', color: '#1f2937' }}>
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {watchlistData.map((item, index) => {
                        const badge = getMaturityBadge(item.skorKematangan);
                        return (
                          <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                            <td style={{ padding: '8px 10px', fontSize: '9px', color: '#374151', fontWeight: '600' }}>
                              {item.nama}
                            </td>
                            <td style={{ padding: '8px 10px', fontSize: '9px', color: '#6b7280' }}>
                              {item.inisiator}
                            </td>
                            <td style={{ padding: '8px 10px', textAlign: 'center', fontSize: '9px', color: '#6b7280' }}>
                              {item.tahunPenerapan}
                            </td>
                            <td style={{ padding: '8px 10px', textAlign: 'center', fontSize: '11px', fontWeight: 'bold', color: '#1f2937' }}>
                              {item.skorKematangan}
                            </td>
                            <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                              <span style={{ 
                                backgroundColor: badge.color, 
                                color: badge.textColor, 
                                padding: '4px 10px', 
                                borderRadius: '12px',
                                fontSize: '8px',
                                fontWeight: 'bold',
                                display: 'inline-block'
                              }}>
                                {badge.label}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Key Insights */}
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px', borderLeft: '3px solid #2563EB', paddingLeft: '8px' }}>
                  Rekomendasi Tindakan
                </h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '8px',
                }}>
                  <div style={{ 
                    padding: '10px', 
                    backgroundColor: '#f0f9ff', 
                    borderRadius: '4px',
                    borderLeft: '3px solid #2563EB'
                  }}>
                    <p style={{ fontSize: '9px', color: '#1f2937', margin: 0, lineHeight: '1.5', fontWeight: '600' }}>
                      💡 Prioritaskan peningkatan skor kematangan pada 5 inovasi watchlist
                    </p>
                  </div>
                  <div style={{ 
                    padding: '10px', 
                    backgroundColor: '#f0fdf4', 
                    borderRadius: '4px',
                    borderLeft: '3px solid #10b981'
                  }}>
                    <p style={{ fontSize: '9px', color: '#1f2937', margin: 0, lineHeight: '1.5', fontWeight: '600' }}>
                      📊 Tingkatkan kolaborasi antar urusan untuk knowledge sharing
                    </p>
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

          </div>
        </div>
      </div>
    </div>
  );
}