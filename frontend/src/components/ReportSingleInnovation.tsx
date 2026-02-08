import { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from '/images/logo-brida-jatim.png';

interface ReportCollaborationProps {
  onClose: () => void;
  data: {
    inovasi_1: { judul: string; opd: string; admin?: string };
    inovasi_2: { judul: string; opd: string; admin?: string };
    skor_kecocokan: number;
    kategori: string;
    hasil_ai: {
      manfaat: string[];
      alasan: string[];
      dampak: string[];
    };
  };
}

export default function ReportCollaboration({ onClose, data }: ReportCollaborationProps) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Memuat komponen...');

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return { bg: '#16A34A', text: '#ffffff' };
    if (score >= 70) return { bg: '#3b82f6', text: '#ffffff' };
    return { bg: '#f59e0b', text: '#ffffff' };
  };

  const scoreColor = getScoreBadgeColor(data.skor_kecocokan);
  
  const numberBox: React.CSSProperties = {
    minWidth: '28px',
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  };

  // Footer Component yang akan digunakan di kedua halaman
  const Footer = () => (
    <div style={{ 
      paddingTop: '16px',
      borderTop: '2px solid #e5e7eb',
      textAlign: 'center',
      pageBreakInside: 'avoid',
      breakInside: 'avoid'
    }}>
      <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#1f2937', marginBottom: '6px', margin: 0 }}>
        BADAN RISET DAN INOVASI DAERAH PROVINSI JAWA TIMUR
      </p>
      <p style={{ fontSize: '12px', color: '#6b7280', margin: '6px 0 0 0', lineHeight: '1.6' }}>
        Jl. Gayung Kebonsari No.56, Gayungan, Kec. Gayungan Surabaya, Jawa Timur 60235 <br />  
        Email: balitbangjatim@gmail.com | Website: brida.jatimprov.go.id/
      </p>
    </div>
  );

  useEffect(() => {
    const generatePDF = async () => {
      try {
        setIsGenerating(true);
        setProgress(10);
        setStatusMessage('Menunggu render komponen...');
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setProgress(40);
        setStatusMessage('Memverifikasi elemen visual...');
        
        const page1Content = document.getElementById('pdf-page-1');
        const page2Content = document.getElementById('pdf-page-2');
        
        if (!page1Content || !page2Content) {
          console.error('Report content not found');
          alert('Error: Konten laporan tidak ditemukan. Silakan coba lagi.');
          onClose();
          return;
        }
        
        setProgress(60);
        setStatusMessage('Membuat screenshot halaman...');

        await document.fonts.ready;
        await new Promise(r => setTimeout(r, 300));

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margin = 15;

        // Generate Page 1
        const canvas1 = await html2canvas(page1Content, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
          windowWidth: page1Content.scrollWidth,
          windowHeight: page1Content.scrollHeight,
          onclone: (clonedDoc) => {
            const all = clonedDoc.querySelectorAll('*');
            all.forEach((el) => {
              const style = clonedDoc.defaultView?.getComputedStyle(el);
              if (!style) return;
              const props = ['color', 'backgroundColor', 'borderColor', 'boxShadow'];
              props.forEach((prop) => {
                const val = style.getPropertyValue(prop);
                if (val.includes("oklch")) {
                  (el as HTMLElement).style.setProperty(prop, "#000000");
                }
              });
            });
          }
        });

        const imgData1 = canvas1.toDataURL('image/png');
        const imgWidth1 = pdfWidth - margin * 2;
        const imgHeight1 = (canvas1.height * imgWidth1) / canvas1.width;
        pdf.addImage(imgData1, 'PNG', margin, margin, imgWidth1, imgHeight1);

        setProgress(80);
        setStatusMessage('Membuat halaman kedua...');

        // Generate Page 2
        pdf.addPage();
        
        const canvas2 = await html2canvas(page2Content, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
          windowWidth: page2Content.scrollWidth,
          windowHeight: page2Content.scrollHeight,
          onclone: (clonedDoc) => {
            const all = clonedDoc.querySelectorAll('*');
            all.forEach((el) => {
              const style = clonedDoc.defaultView?.getComputedStyle(el);
              if (!style) return;
              const props = ['color', 'backgroundColor', 'borderColor', 'boxShadow'];
              props.forEach((prop) => {
                const val = style.getPropertyValue(prop);
                if (val.includes("oklch")) {
                  (el as HTMLElement).style.setProperty(prop, "#000000");
                }
              });
            });
          }
        });

        const imgData2 = canvas2.toDataURL('image/png');
        const imgWidth2 = pdfWidth - margin * 2;
        const imgHeight2 = (canvas2.height * imgWidth2) / canvas2.width;
        pdf.addImage(imgData2, 'PNG', margin, margin, imgWidth2, imgHeight2);

        setProgress(95);
        setStatusMessage('Menyimpan file...');
        
        const title1 = data.inovasi_1.judul.replace(/[^a-zA-Z0-9 ]/g, '').substring(0, 25);
        const title2 = data.inovasi_2.judul.replace(/[^a-zA-Z0-9 ]/g, '').substring(0, 25);
        const fileName = `BRIDA_Kolaborasi_${title1}_${title2}_${new Date().toISOString().split('T')[0]}.pdf`;

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
  }, [onClose, data]);

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
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              {statusMessage}
            </p>
            <div style={{
              width: '100%',
              maxWidth: '400px',
              height: '8px',
              backgroundColor: '#E5E7EB',
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '8px'
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
              color: '#9ca3af'
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
          
          {/* PAGE 1 */}
          <div id="pdf-page-1" style={{ 
            backgroundColor: '#ffffff', 
            padding: '28px',
            minHeight: '1050px',
            maxHeight: '1050px',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '794px',
            width: '100%',
            margin: '0 auto 30px auto',
            boxSizing: 'border-box',
            border: '1px solid #e5e7eb'
          }}>
            {/* Header */}
            <div style={{ 
              textAlign: 'center',
              marginBottom: '24px',
              borderBottom: '3px solid #2563EB',
              paddingBottom: '16px'
            }}>
              <img src={logo} alt="BRIDA Jatim" style={{ height: '60px', margin: '0 auto 16px', display: 'block' }} />
              <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px', margin: 0 }}>
                Laporan Analisis Potensi Kolaborasi Inovasi
              </h1>
              <h2 style={{ fontSize: '18px', color: '#4b5563', marginBottom: '8px', margin: '8px 0' }}>
                BRIDA Jawa Timur
              </h2>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: '8px 0' }}>
                Tanggal Generate: {new Date().toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>

            {/* Innovation Title & Score */}
            <div style={{ 
              backgroundColor: '#f0f9ff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              border: '3px solid #2563EB',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '6px', margin: '0 0 6px 0', color: '#1f2937' }}>
                {data.inovasi_1.judul}
              </h3>

              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '14px', margin: '14px 0', color: '#1f2937' }}>
                {data.inovasi_2.judul}
              </h3>

              {/* Skor */}
              <div style={{
                backgroundColor: scoreColor.bg,
                color: scoreColor.text,
                width: "90px",
                height: "90px",
                borderRadius: "12px",
                fontSize: '22px',
                fontWeight: "bold",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: "1.2",
                margin: "0 auto"
              }}>
                <div>{data.skor_kecocokan}%</div>
                <div style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  marginTop: "3px"
                }}>
                  {data.kategori}
                </div>
              </div>
            </div>

            {/* Manfaat Kolaborasi */}
            {data.hasil_ai.manfaat?.length > 0 && (
              <div style={{ 
                backgroundColor: '#f0fdf4',
                borderLeft: '6px solid #16a34a',
                padding: '16px',
                borderRadius: '10px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                marginBottom: '20px',
                flex: 1
              }}>
                <h3 style={{
                  color: "#166534",
                  fontSize: "17px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                  margin: '0 0 12px 0'
                }}>
                  Manfaat Kolaborasi
                </h3>
                {data.hasil_ai.manfaat.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    background: '#ffffff',
                    border: '2px solid #bbf7d0',
                    borderRadius: '8px',
                    padding: '10px',
                    marginBottom: '8px'
                  }}>
                    <div style={{ 
                      ...numberBox, 
                      background: '#22c55e', 
                      color: '#fff',
                      marginTop: '2px'
                    }}>
                      {i + 1}
                    </div>
                    <div style={{ 
                      fontSize: '13px', 
                      lineHeight: '1.8', 
                      color: '#1f2937', 
                      flex: 1,
                      paddingTop: '2px'
                    }}>
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer di Page 1 */}
            <div style={{ marginTop: 'auto' }}>
              <Footer />
            </div>
          </div>

          {/* PAGE 2 */}
          <div id="pdf-page-2" style={{ 
            backgroundColor: '#ffffff', 
            padding: '28px',
            minHeight: '1050px',
            maxHeight: '1050px',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '794px',
            width: '100%',
            margin: '0 auto',
            boxSizing: 'border-box',
            border: '1px solid #e5e7eb'
          }}>
            {/* Alasan Kecocokan */}
            {data.hasil_ai.alasan?.length > 0 && (
              <div style={{ 
                backgroundColor: '#eff6ff',
                borderLeft: '6px solid #2563eb',
                padding: '16px',
                borderRadius: '10px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                marginBottom: '20px'
              }}>
                <h3 style={{ 
                  color: '#1e3a8a', 
                  fontSize: '17px', 
                  fontWeight: 'bold', 
                  marginBottom: '12px',
                  margin: '0 0 12px 0'
                }}>
                  Alasan Kecocokan
                </h3>
                {data.hasil_ai.alasan.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    background: '#ffffff',            
                    border: '2px solid #bfdbfe',       
                    borderRadius: '8px',
                    padding: '10px',
                    marginBottom: '8px'
                  }}>
                    <div style={{ 
                      ...numberBox, 
                      background: '#3b82f6', 
                      color: '#fff',
                      marginTop: '2px'
                    }}>
                      {i + 1}
                    </div>
                    <div style={{ 
                      fontSize: '13px', 
                      lineHeight: '1.8', 
                      color:'#1f2937', 
                      flex: 1,
                      paddingTop: '2px'
                    }}>
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Dampak Potensial */}
            {data.hasil_ai.dampak?.length > 0 && (
              <div style={{ 
                backgroundColor: '#faf5ff',
                borderLeft: '6px solid #9333ea',
                padding: '16px',
                borderRadius: '10px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                marginBottom: '20px'
              }}>
                <h3 style={{ 
                  color: '#6b21a8', 
                  fontSize: '17px', 
                  fontWeight: 'bold', 
                  marginBottom: '12px',
                  margin: '0 0 12px 0'
                }}>
                  Dampak Potensial
                </h3>
                {data.hasil_ai.dampak.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    background: '#ffffff',             
                    border: '2px solid #e9d5ff',       
                    borderRadius: '8px',
                    padding: '10px',
                    marginBottom: '8px'
                  }}>
                    <div style={{ 
                      ...numberBox, 
                      background: '#9333ea', 
                      color: '#fff',
                      marginTop: '2px'
                    }}>
                      {i + 1}
                    </div>
                    <div style={{ 
                      fontSize: '13px', 
                      lineHeight: '1.8', 
                      color:'#1f2937', 
                      flex: 1,
                      paddingTop: '2px'
                    }}>
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer di Page 2 */}
            <div style={{ marginTop: 'auto' }}>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}