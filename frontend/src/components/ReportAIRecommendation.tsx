import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from 'figma:asset/3554ecab8b87e1a4e26b58997b7d2614ae189b80.png';

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

const chartData = [
  { name: 'Sangat Cocok', jumlah: 8, color: '#10b981' },
  { name: 'Potensial', jumlah: 15, color: '#3b82f6' },
  { name: 'Kurang Cocok', jumlah: 4, color: '#f59e0b' },
];

interface ReportAIRecommendationProps {
  onClose: () => void;
}

export function ReportAIRecommendation({ onClose }: ReportAIRecommendationProps) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Memuat komponen...');

  useEffect(() => {
    const generatePDF = async () => {
      try {
        setIsGenerating(true);
        setProgress(10);
        setStatusMessage('Menunggu render komponen...');
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setProgress(30);
        setStatusMessage('Menunggu grafik selesai dirender...');
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setProgress(50);
        setStatusMessage('Memverifikasi elemen visual...');
        
        const reportContent = document.getElementById('report-ai-content');
        if (!reportContent) {
          console.error('Report AI content not found');
          alert('Error: Konten laporan tidak ditemukan. Silakan coba lagi.');
          onClose();
          return;
        }
        
        const rect = reportContent.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          console.error('Report AI content has invalid dimensions:', rect);
          alert('Error: Konten laporan memiliki dimensi tidak valid. Silakan coba lagi.');
          onClose();
          return;
        }
        
        setProgress(70);
        setStatusMessage('Membuat screenshot halaman...');
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const styleElement = document.createElement('style');
        styleElement.id = 'html2canvas-oklch-fix';
        styleElement.textContent = `
          #report-ai-content,
          #report-ai-content * {
            color: inherit !important;
            background-color: inherit !important;
            border-color: inherit !important;
          }
          #report-ai-content {
            color: #000000 !important;
            background-color: #ffffff !important;
          }
        `;
        document.head.appendChild(styleElement);
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const canvas = await html2canvas(reportContent, {
          scale: 2.5,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          windowWidth: reportContent.scrollWidth,
          windowHeight: reportContent.scrollHeight,
        });
        
        const tempStyle = document.getElementById('html2canvas-oklch-fix');
        if (tempStyle) {
          tempStyle.remove();
        }
        
        setProgress(85);
        setStatusMessage('Mengkonversi ke PDF...');
        
        const imgData = canvas.toDataURL('image/png', 1.0);
        
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasAspect = canvas.height / canvas.width;
        
        const contentWidth = pdfWidth - 20;
        const contentHeight = contentWidth * canvasAspect;
        const pageHeight = pdfHeight - 20;
        
        const totalPages = Math.ceil(contentHeight / pageHeight);
        
        for (let page = 0; page < totalPages; page++) {
          if (page > 0) {
            pdf.addPage();
          }
          
          const position = -page * pageHeight;
          
          pdf.addImage(
            imgData,
            'PNG',
            10,
            position + 10,
            contentWidth,
            contentHeight,
            undefined,
            'FAST'
          );
        }
        
        setProgress(95);
        setStatusMessage('Menyimpan file...');
        
        const fileName = `BRIDA_AI_Recommendation_Report_${new Date().toISOString().split('T')[0]}.pdf`;
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
              Preview Laporan AI Rekomendasi
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
          
          {/* Report Content */}
          <div id="report-ai-content" style={{ 
            backgroundColor: '#ffffff', 
            padding: '48px',
            minHeight: '500px',
            display: 'block',
            visibility: 'visible',
            width: '210mm',
            margin: '0 auto'
          }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '48px', borderBottom: '4px solid #2563EB', paddingBottom: '24px' }}>
              <img src={logo} alt="BRIDA Jatim" style={{ height: '80px', margin: '0 auto 24px', display: 'block' }} />
              <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px', margin: 0 }}>
                Laporan AI Rekomendasi Kolaborasi
              </h1>
              <h2 style={{ fontSize: '24px', color: '#4b5563', marginBottom: '12px', margin: '12px 0' }}>
                BRIDA Jawa Timur
              </h2>
              <p style={{ fontSize: '16px', color: '#6b7280', margin: '12px 0' }}>
                Tanggal Generate: {new Date().toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>

            {/* Overview */}
            <div style={{ marginBottom: '48px', backgroundColor: '#f0f9ff', padding: '28px', borderRadius: '12px', border: '3px solid #2563EB' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>
                📊 Ringkasan Rekomendasi
              </h3>
              <p style={{ fontSize: '16px', color: '#374151', lineHeight: '1.8', margin: 0 }}>
                Sistem AI kami telah menganalisis <strong>430 inovasi</strong> dan menghasilkan <strong>27 rekomendasi kolaborasi</strong>. 
                Dari jumlah tersebut, <strong>8 rekomendasi</strong> termasuk kategori <span style={{ color: '#16A34A', fontWeight: 'bold' }}>Sangat Cocok</span>, 
                <strong> 15 rekomendasi</strong> kategori <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>Potensial</span>, 
                dan <strong>4 rekomendasi</strong> kategori <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>Kurang Cocok</span>.
              </p>
            </div>

            {/* Chart: Distribution */}
            <div style={{ marginBottom: '48px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '24px', borderLeft: '5px solid #2563EB', paddingLeft: '16px' }}>
                Distribusi Kategori Rekomendasi
              </h3>
              <div style={{ padding: '32px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
                <div style={{ width: '100%', height: '400px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 40, left: 40, bottom: 40 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="name" 
                        stroke="#6b7280"
                        style={{ fontSize: '14px', fontWeight: '600' }}
                        label={{ 
                          value: 'Kategori', 
                          position: 'insideBottom', 
                          offset: -15, 
                          fill: '#1f2937',
                          style: { fontSize: '14px', fontWeight: 'bold' }
                        }}
                      />
                      <YAxis 
                        stroke="#6b7280"
                        style={{ fontSize: '14px', fontWeight: '600' }}
                        label={{ 
                          value: 'Jumlah Rekomendasi', 
                          angle: -90, 
                          position: 'insideLeft',
                          fill: '#1f2937',
                          style: { fontSize: '14px', fontWeight: 'bold' }
                        }}
                      />
                      <Bar dataKey="jumlah" radius={[10, 10, 0, 0]} barSize={80} name="Jumlah Rekomendasi">
                        {chartData.map((entry, index) => (
                          <Bar key={`bar-${index}`} dataKey="jumlah" fill={entry.color} />
                        ))}
                      </Bar>
                      <Legend 
                        verticalAlign="top" 
                        height={50}
                        wrapperStyle={{ fontSize: '15px', fontWeight: '600', paddingBottom: '10px' }} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Top 3 Recommendations */}
            <div style={{ marginBottom: '48px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '24px', borderLeft: '5px solid #2563EB', paddingLeft: '16px' }}>
                Top 3 Rekomendasi Kolaborasi
              </h3>
              {topRecommendations.map((rec, index) => (
                <div key={rec.id} style={{ 
                  marginBottom: '28px', 
                  padding: '28px', 
                  backgroundColor: index === 0 ? '#ecfdf5' : '#f9fafb', 
                  borderRadius: '12px',
                  border: index === 0 ? '3px solid #16A34A' : '2px solid #e5e7eb'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                      #{index + 1} {rec.title}
                    </h4>
                    <div style={{ 
                      backgroundColor: rec.category === 'Sangat Cocok' ? '#16A34A' : '#3b82f6', 
                      color: 'white', 
                      padding: '8px 16px', 
                      borderRadius: '24px',
                      fontSize: '15px',
                      fontWeight: 'bold'
                    }}>
                      Score: {rec.score}
                    </div>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ 
                      display: 'inline-block',
                      backgroundColor: '#dbeafe', 
                      color: '#1e40af', 
                      padding: '6px 16px', 
                      borderRadius: '16px',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginRight: '10px'
                    }}>
                      {rec.jenis}
                    </span>
                    <span style={{ 
                      display: 'inline-block',
                      backgroundColor: '#fef3c7', 
                      color: '#92400e', 
                      padding: '6px 16px', 
                      borderRadius: '16px',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      {rec.readiness}
                    </span>
                  </div>
                  <p style={{ fontSize: '15px', color: '#4b5563', marginBottom: '14px', lineHeight: '1.6', fontWeight: '600' }}>
                    <strong>Pihak Terlibat:</strong> {rec.opd1} ↔ {rec.opd2}
                  </p>
                  <p style={{ fontSize: '15px', color: '#374151', marginBottom: '16px', lineHeight: '1.7' }}>
                    {rec.summary}
                  </p>
                  <div style={{ marginBottom: '14px' }}>
                    <p style={{ fontSize: '14px', color: '#059669', marginBottom: '8px', lineHeight: '1.7', fontWeight: '600' }}>
                      <strong>✓ Manfaat:</strong> {rec.manfaat}
                    </p>
                    <p style={{ fontSize: '14px', color: '#2563EB', margin: 0, lineHeight: '1.7', fontWeight: '600' }}>
                      <strong>📈 Dampak:</strong> {rec.dampak}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
                    {rec.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} style={{ 
                        backgroundColor: '#e0e7ff', 
                        color: '#4338ca', 
                        padding: '6px 14px', 
                        borderRadius: '16px',
                        fontSize: '13px',
                        fontWeight: '600'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Next Steps */}
            <div style={{ marginBottom: '48px', backgroundColor: '#fffbeb', padding: '28px', borderRadius: '12px', border: '3px solid #f59e0b' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', marginBottom: '20px' }}>
                💡 Langkah Selanjutnya
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ fontSize: '15px', color: '#374151', marginBottom: '16px', lineHeight: '1.7', paddingLeft: '32px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, fontWeight: 'bold', color: '#f59e0b', fontSize: '16px' }}>1.</span>
                  Koordinasikan pertemuan antara pihak-pihak yang direkomendasikan untuk kolaborasi
                </li>
                <li style={{ fontSize: '15px', color: '#374151', marginBottom: '16px', lineHeight: '1.7', paddingLeft: '32px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, fontWeight: 'bold', color: '#f59e0b', fontSize: '16px' }}>2.</span>
                  Buat proposal kolaborasi dengan detail manfaat dan dampak yang terukur
                </li>
                <li style={{ fontSize: '15px', color: '#374151', marginBottom: '16px', lineHeight: '1.7', paddingLeft: '32px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, fontWeight: 'bold', color: '#f59e0b', fontSize: '16px' }}>3.</span>
                  Monitor dan evaluasi progress implementasi kolaborasi secara berkala
                </li>
                <li style={{ fontSize: '15px', color: '#374151', margin: 0, lineHeight: '1.7', paddingLeft: '32px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, fontWeight: 'bold', color: '#f59e0b', fontSize: '16px' }}>4.</span>
                  Dokumentasikan best practices untuk replikasi ke daerah lain
                </li>
              </ul>
            </div>

            {/* Footer */}
            <div style={{ marginTop: '60px', paddingTop: '24px', borderTop: '3px solid #e5e7eb', textAlign: 'center' }}>
              <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
                BADAN RISET DAN INOVASI DAERAH PROVINSI JAWA TIMUR
              </p>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: '1.6' }}>
                Jl. Ahmad Yani No. 152, Surabaya | Email: brida@jatimprov.go.id | Website: brida.jatimprov.go.id
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
