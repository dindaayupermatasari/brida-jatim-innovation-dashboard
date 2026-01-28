import { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from 'figma:asset/3554ecab8b87e1a4e26b58997b7d2614ae189b80.png';

interface ReportSingleInnovationProps {
  onClose: () => void;
  innovation: {
    id: string;
    title: string;
    jenis: string;
    score: number;
    category: string;
    summary: string;
    description?: string;
    collaborators?: string[];
    benefits?: string[];
    challenges?: string[];
    recommendations?: string[];
  };
}

export function ReportSingleInnovation({ onClose, innovation }: ReportSingleInnovationProps) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Memuat komponen...');

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return { bg: '#16A34A', text: '#ffffff' };
    if (score >= 70) return { bg: '#3b82f6', text: '#ffffff' };
    return { bg: '#f59e0b', text: '#ffffff' };
  };

  const scoreColor = getScoreBadgeColor(innovation.score);

  useEffect(() => {
    const generatePDF = async () => {
      try {
        setIsGenerating(true);
        setProgress(10);
        setStatusMessage('Menunggu render komponen...');
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setProgress(40);
        setStatusMessage('Memverifikasi elemen visual...');
        
        const reportContent = document.getElementById('report-single-innovation-content');
        if (!reportContent) {
          console.error('Report content not found');
          alert('Error: Konten laporan tidak ditemukan. Silakan coba lagi.');
          onClose();
          return;
        }
        
        const rect = reportContent.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          console.error('Report content has invalid dimensions:', rect);
          alert('Error: Konten laporan memiliki dimensi tidak valid. Silakan coba lagi.');
          onClose();
          return;
        }
        
        setProgress(60);
        setStatusMessage('Membuat screenshot halaman...');
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const styleElement = document.createElement('style');
        styleElement.id = 'html2canvas-oklch-fix';
        styleElement.textContent = `
          #report-single-innovation-content,
          #report-single-innovation-content * {
            color: inherit !important;
            background-color: inherit !important;
            border-color: inherit !important;
          }
          #report-single-innovation-content {
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
        
        const sanitizedTitle = innovation.title.replace(/[^a-zA-Z0-9 ]/g, '').substring(0, 50);
        const fileName = `BRIDA_Inovasi_${sanitizedTitle}_${new Date().toISOString().split('T')[0]}.pdf`;
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
    }, 300);
    
    return () => {
      clearTimeout(timer);
    };
  }, [onClose, innovation.title]);

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
              Preview Laporan Inovasi
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
          <div id="report-single-innovation-content" style={{ 
            backgroundColor: '#ffffff', 
            padding: '28px',
            minHeight: '500px',
            display: 'block',
            visibility: 'visible',
            width: '210mm',
            margin: '0 auto',
            boxSizing: 'border-box'
          }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '28px', borderBottom: '3px solid #2563EB', paddingBottom: '16px' }}>
              <img src={logo} alt="BRIDA Jatim" style={{ height: '60px', margin: '0 auto 16px', display: 'block' }} />
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px', margin: 0 }}>
                Laporan Detail Inovasi
              </h1>
              <h2 style={{ fontSize: '20px', color: '#4b5563', marginBottom: '8px', margin: '8px 0' }}>
                BRIDA Jawa Timur
              </h2>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '8px 0' }}>
                Tanggal Generate: {new Date().toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>

            {/* Innovation Title & Score */}
            <div style={{ marginBottom: '24px', backgroundColor: '#f0f9ff', padding: '24px', borderRadius: '10px', border: '3px solid #2563EB', pageBreakInside: 'avoid' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px', margin: '0 0 10px 0' }}>
                    {innovation.title}
                  </h3>
                  <span style={{ 
                    display: 'inline-block',
                    padding: '6px 12px', 
                    backgroundColor: '#e5e7eb', 
                    color: '#1f2937', 
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {innovation.jenis}
                  </span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    backgroundColor: scoreColor.bg, 
                    color: scoreColor.text, 
                    padding: '12px 18px', 
                    borderRadius: '10px',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    marginBottom: '6px'
                  }}>
                    {innovation.score}%
                  </div>
                  <div style={{ 
                    fontSize: '12px', 
                    fontWeight: 'bold',
                    color: scoreColor.bg
                  }}>
                    {innovation.category}
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div style={{ marginBottom: '24px', pageBreakInside: 'avoid' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px', borderLeft: '4px solid #2563EB', paddingLeft: '10px' }}>
                Ringkasan
              </h3>
              <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '10px' }}>
                <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.7', margin: 0 }}>
                  {innovation.summary}
                </p>
              </div>
            </div>

            {/* Description */}
            {innovation.description && (
              <div style={{ marginBottom: '24px', pageBreakInside: 'avoid' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px', borderLeft: '4px solid #2563EB', paddingLeft: '10px' }}>
                  Deskripsi Detail
                </h3>
                <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '10px' }}>
                  <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.7', margin: 0 }}>
                    {innovation.description}
                  </p>
                </div>
              </div>
            )}

            {/* Collaborators */}
            {innovation.collaborators && innovation.collaborators.length > 0 && (
              <div style={{ marginBottom: '24px', pageBreakInside: 'avoid' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px', borderLeft: '4px solid #2563EB', paddingLeft: '10px' }}>
                  Kolaborator Potensial
                </h3>
                <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '10px' }}>
                  <ul style={{ margin: 0, paddingLeft: '22px', fontSize: '14px', color: '#374151', lineHeight: '1.8' }}>
                    {innovation.collaborators.map((collab, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{collab}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Benefits */}
            {innovation.benefits && innovation.benefits.length > 0 && (
              <div style={{ marginBottom: '24px', pageBreakInside: 'avoid' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px', borderLeft: '4px solid #16A34A', paddingLeft: '10px' }}>
                  Manfaat Kolaborasi
                </h3>
                <div style={{ padding: '20px', backgroundColor: '#f0fdf4', borderRadius: '10px', border: '2px solid #16A34A' }}>
                  <ul style={{ margin: 0, paddingLeft: '22px', fontSize: '14px', color: '#374151', lineHeight: '1.8' }}>
                    {innovation.benefits.map((benefit, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Challenges */}
            {innovation.challenges && innovation.challenges.length > 0 && (
              <div style={{ marginBottom: '24px', pageBreakInside: 'avoid' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px', borderLeft: '4px solid #f59e0b', paddingLeft: '10px' }}>
                  Tantangan & Pertimbangan
                </h3>
                <div style={{ padding: '20px', backgroundColor: '#fffbeb', borderRadius: '10px', border: '2px solid #f59e0b' }}>
                  <ul style={{ margin: 0, paddingLeft: '22px', fontSize: '14px', color: '#374151', lineHeight: '1.8' }}>
                    {innovation.challenges.map((challenge, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{challenge}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {innovation.recommendations && innovation.recommendations.length > 0 && (
              <div style={{ marginBottom: '24px', pageBreakInside: 'avoid' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px', borderLeft: '4px solid #a855f7', paddingLeft: '10px' }}>
                  Rekomendasi Tindak Lanjut
                </h3>
                <div style={{ padding: '20px', backgroundColor: '#faf5ff', borderRadius: '10px', border: '2px solid #a855f7' }}>
                  <ul style={{ margin: 0, paddingLeft: '22px', fontSize: '14px', color: '#374151', lineHeight: '1.8' }}>
                    {innovation.recommendations.map((rec, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Footer */}
            <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '2px solid #e5e7eb', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#1f2937', marginBottom: '6px', margin: 0 }}>
                BADAN RISET DAN INOVASI DAERAH PROVINSI JAWA TIMUR
              </p>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: '6px 0 0 0', lineHeight: '1.6' }}>
                Jl. Ahmad Yani No. 152, Surabaya | Email: brida@jatimprov.go.id | Website: brida.jatimprov.go.id
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}