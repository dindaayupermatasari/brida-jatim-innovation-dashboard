import { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// Import logo dari public/images
import logo from '/images/logo-brida-jatim.png';

interface AIResult {
  judul_kolaborasi: string;
  manfaat_kolaborasi: string[];
  alasan_sinergi: string;
  potensi_dampak: string[];
  tingkat_kolaborasi: string;
}

interface ReportAIRecommendationProps {
  onClose: () => void;
  data: {
    cluster_id: number;
    skor_kolaborasi: number;
    inovasi_1: {
      id: number;
      judul: string;
      opd?: string;
      urusan: string;
      tahap: string;
      kematangan: string;
    };
    inovasi_2: {
      id: number;
      judul: string;
      opd?: string;
      urusan: string;
      tahap: string;
      kematangan: string;
    };
    hasil_ai?: AIResult;
  };
}

export function ReportAIRecommendation({ onClose, data }: ReportAIRecommendationProps) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Memuat komponen...');
  const [aiData, setAiData] = useState<AIResult | null>(data.hasil_ai || null);
  const [isLoadingAI, setIsLoadingAI] = useState(!data.hasil_ai);

  // Fetch AI data if not provided
  useEffect(() => {
    const fetchAIData = async () => {
      if (data.hasil_ai) {
        setIsLoadingAI(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8000/ai-input-collaboration/simulate?inovasi_1_id=${data.inovasi_1.id}&inovasi_2_id=${data.inovasi_2.id}`
        );
        
        if (response.ok) {
          const result = await response.json();
          setAiData(result.hasil_ai);
        }
      } catch (error) {
        console.error('Error fetching AI data:', error);
      } finally {
        setIsLoadingAI(false);
      }
    };

    fetchAIData();
  }, [data]);

  useEffect(() => {
    if (isLoadingAI) return;
    
    const generatePDF = async () => {
      try {
        setIsGenerating(true);
        setProgress(10);
        setStatusMessage('Menunggu render komponen...');
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setProgress(30);
        setStatusMessage('Memverifikasi elemen visual...');
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const page1Content = document.getElementById('report-page-1');
        const page2Content = document.getElementById('report-page-2');
        
        if (!page1Content || !page2Content) {
          console.error('Report pages not found');
          alert('Error: Konten laporan tidak ditemukan. Silakan coba lagi.');
          onClose();
          return;
        }
        
        setProgress(50);
        setStatusMessage('Membuat screenshot halaman 1...');
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const canvas1 = await html2canvas(page1Content, {
          scale: 2.5,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
        });
        
        setProgress(65);
        setStatusMessage('Membuat screenshot halaman 2...');
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const canvas2 = await html2canvas(page2Content, {
          scale: 2.5,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
        });
        
        setProgress(80);
        setStatusMessage('Mengkonversi ke PDF...');
        
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        // Page 1
        const imgData1 = canvas1.toDataURL('image/png', 1.0);
        const imgWidth1 = pdfWidth;
        const imgHeight1 = (canvas1.height * pdfWidth) / canvas1.width;
        pdf.addImage(imgData1, 'PNG', 0, 0, imgWidth1, imgHeight1);
        
        // Page 2
        pdf.addPage();
        const imgData2 = canvas2.toDataURL('image/png', 1.0);
        const imgWidth2 = pdfWidth;
        const imgHeight2 = (canvas2.height * pdfWidth) / canvas2.width;
        pdf.addImage(imgData2, 'PNG', 0, 0, imgWidth2, imgHeight2);
        
        setProgress(95);
        setStatusMessage('Menyimpan file...');
        
        const fileName = `Rekomendasi_Kolaborasi_Cluster_${data.cluster_id}_${Date.now()}.pdf`;
        pdf.save(fileName);
        
        setProgress(100);
        setStatusMessage('PDF berhasil dibuat!');
        
        setTimeout(() => {
          onClose();
        }, 1500);
        
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Gagal membuat PDF. Silakan coba lagi.');
        onClose();
      } finally {
        setIsGenerating(false);
      }
    };

    generatePDF();
  }, [onClose, isLoadingAI, data.cluster_id]);

  const scorePercent = Math.round(data.skor_kolaborasi * 100);
  const getScoreCategory = (score: number): string => {
    if (score >= 0.9) return 'Sangat Cocok';
    if (score >= 0.7) return 'Potensial';
    return 'Cukup Cocok';
  };

  const getCategoryColor = (category: string) => {
    if (category === 'Sangat Cocok') return '#16A34A';
    if (category === 'Potensial') return '#3b82f6';
    return '#f59e0b';
  };

  const category = getScoreCategory(data.skor_kolaborasi);
  const categoryColor = getCategoryColor(category);

  return (
    <div style={{ 
      position: 'fixed', 
      inset: 0, 
      backgroundColor: 'rgba(0, 0, 0, 0.75)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '16px', 
        padding: '32px', 
        maxWidth: '500px', 
        width: '100%',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        {isLoadingAI ? (
          <>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px', textAlign: 'center' }}>
              Memuat Data AI...
            </h3>
            <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '12px', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{ 
                width: '50%', 
                height: '100%', 
                backgroundColor: '#3b82f6',
                animation: 'pulse 1.5s ease-in-out infinite'
              }} />
            </div>
            <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
              Mengambil analisis AI untuk kolaborasi ini...
            </p>
          </>
        ) : (
          <>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px', textAlign: 'center' }}>
              {isGenerating ? 'Membuat PDF...' : 'PDF Siap!'}
            </h3>
            <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '12px', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{ 
                width: `${progress}%`, 
                height: '100%', 
                backgroundColor: '#3b82f6',
                transition: 'width 0.3s ease-in-out'
              }} />
            </div>
            <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
              {statusMessage}
            </p>
            {!isGenerating && (
              <button
                onClick={onClose}
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Tutup
              </button>
            )}
          </>
        )}
      </div>

      {/* Hidden Report Content - PAGE 1 */}
      {!isLoadingAI && (
        <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
          <div id="report-page-1" style={{ 
            width: '210mm',
            height: '297mm',
            backgroundColor: 'white',
            padding: '20mm',
            fontFamily: 'Arial, sans-serif',
            color: '#000000',
            position: 'relative',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Header */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: '20px',
              paddingBottom: '18px',
              borderBottom: '4px solid #2563EB',
              gap: '24px'
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 style={{ 
                  fontSize: '26px', 
                  fontWeight: 'bold', 
                  color: '#1f2937', 
                  margin: 0,
                  lineHeight: '1.2',
                  wordWrap: 'break-word',
                  marginBottom: '6px'
                }}>
                  Rekomendasi Kolaborasi Inovasi
                </h1>
                <p style={{ fontSize: '15px', color: '#6b7280', margin: 0 }}>
                  Cluster #{data.cluster_id}
                </p>
              </div>
              <div style={{ 
                flexShrink: 0, 
                width: '100px', 
                height: '100px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: '#f9fafb',
                borderRadius: '12px',
                padding: '8px'
              }}>
                <img 
                  src={logo} 
                  alt="Logo" 
                  style={{ 
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block'
                  }} 
                />
              </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1 }}>
              {/* Document Info */}
              <div style={{ 
                backgroundColor: '#f3f4f6', 
                padding: '16px', 
                borderRadius: '12px', 
                marginBottom: '18px',
                border: '2px solid #e5e7eb'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, marginBottom: '6px', fontWeight: '600' }}>Tanggal Dibuat</p>
                    <p style={{ fontSize: '14px', color: '#1f2937', margin: 0, fontWeight: 'bold' }}>
                      {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, marginBottom: '6px', fontWeight: '600' }}>Skor Kecocokan</p>
                    <p style={{ fontSize: '14px', color: categoryColor, margin: 0, fontWeight: 'bold' }}>
                      {scorePercent}% - {category}
                    </p>
                  </div>
                </div>
              </div>

              {/* Innovation Details */}
              <div style={{ marginBottom: '18px' }}>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  color: '#1f2937', 
                  margin: 0,
                  marginBottom: '12px',
                  paddingLeft: '12px',
                  borderLeft: '5px solid #2563EB',
                  display: 'block'
                }}>
                  Detail Inovasi
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  {/* Inovasi 1 */}
                  <div style={{ 
                    padding: '14px', 
                    backgroundColor: '#EFF6FF', 
                    borderRadius: '10px',
                    border: '2px solid #3b82f6'
                  }}>
                    <p style={{ fontSize: '11px', color: '#6b7280', margin: 0, marginBottom: '8px', fontWeight: '600' }}>INOVASI 1</p>
                    <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#1f2937', margin: 0, marginBottom: '10px', lineHeight: '1.3', minHeight: '36px' }}>
                      {data.inovasi_1.judul}
                    </h4>
                    {data.inovasi_1.opd && (
                      <p style={{ fontSize: '11px', color: '#4b5563', margin: 0, marginBottom: '5px' }}>
                        <strong>OPD:</strong> {data.inovasi_1.opd}
                      </p>
                    )}
                    <p style={{ fontSize: '11px', color: '#4b5563', margin: 0, marginBottom: '5px' }}>
                      <strong>Urusan:</strong> {data.inovasi_1.urusan}
                    </p>
                    <p style={{ fontSize: '11px', color: '#4b5563', margin: 0, marginBottom: '5px' }}>
                      <strong>Tahap:</strong> {data.inovasi_1.tahap}
                    </p>
                    <p style={{ fontSize: '11px', color: '#4b5563', margin: 0 }}>
                      <strong>Kematangan:</strong> {data.inovasi_1.kematangan}
                    </p>
                  </div>

                  {/* Inovasi 2 */}
                  <div style={{ 
                    padding: '14px', 
                    backgroundColor: '#F0FDF4', 
                    borderRadius: '10px',
                    border: '2px solid #16A34A'
                  }}>
                    <p style={{ fontSize: '11px', color: '#6b7280', margin: 0, marginBottom: '8px', fontWeight: '600' }}>INOVASI 2</p>
                    <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#1f2937', margin: 0, marginBottom: '10px', lineHeight: '1.3', minHeight: '36px' }}>
                      {data.inovasi_2.judul}
                    </h4>
                    {data.inovasi_2.opd && (
                      <p style={{ fontSize: '11px', color: '#4b5563', margin: 0, marginBottom: '5px' }}>
                        <strong>OPD:</strong> {data.inovasi_2.opd}
                      </p>
                    )}
                    <p style={{ fontSize: '11px', color: '#4b5563', margin: 0, marginBottom: '5px' }}>
                      <strong>Urusan:</strong> {data.inovasi_2.urusan}
                    </p>
                    <p style={{ fontSize: '11px', color: '#4b5563', margin: 0, marginBottom: '5px' }}>
                      <strong>Tahap:</strong> {data.inovasi_2.tahap}
                    </p>
                    <p style={{ fontSize: '11px', color: '#4b5563', margin: 0 }}>
                      <strong>Kematangan:</strong> {data.inovasi_2.kematangan}
                    </p>
                  </div>
                </div>
              </div>

              {/* AI Analysis Results - Halaman 1 */}
              {aiData && (
                <>
                  {/* Judul Kolaborasi */}
                  <div style={{ marginBottom: '16px', backgroundColor: '#FAF5FF', padding: '14px', borderRadius: '10px', border: '3px solid #9333EA' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', margin: 0, marginBottom: '6px', lineHeight: '1.3' }}>
                      🤝 {aiData.judul_kolaborasi}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, fontWeight: '600' }}>
                      Tingkat Kolaborasi: <span style={{ color: '#9333EA', fontWeight: 'bold' }}>{aiData.tingkat_kolaborasi}</span>
                    </p>
                  </div>

                  {/* Manfaat Kolaborasi */}
                  <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ 
                      fontSize: '16px', 
                      fontWeight: 'bold', 
                      color: '#1f2937', 
                      margin: 0,
                      marginBottom: '10px',
                      paddingLeft: '12px',
                      borderLeft: '5px solid #16A34A',
                      display: 'block'
                    }}>
                      ✓ Manfaat Kolaborasi
                    </h3>
                    <div style={{ backgroundColor: '#F0FDF4', padding: '12px', borderRadius: '10px', border: '2px solid #16A34A' }}>
                      {Array.isArray(aiData.manfaat_kolaborasi) ? (
                        <ul style={{ margin: 0, paddingLeft: '18px' }}>
                          {aiData.manfaat_kolaborasi.map((manfaat, index) => (
                            <li key={index} style={{ fontSize: '12px', color: '#374151', marginBottom: '6px', lineHeight: '1.4' }}>
                              {manfaat}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p style={{ fontSize: '12px', color: '#374151', margin: 0, lineHeight: '1.4' }}>
                          {aiData.manfaat_kolaborasi}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer - Page 1 */}
            <div style={{ 
              marginTop: 'auto',
              paddingTop: '14px', 
              borderTop: '3px solid #e5e7eb', 
              textAlign: 'center' 
            }}>
              <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#1f2937', margin: 0, marginBottom: '4px' }}>
                BADAN RISET DAN INOVASI DAERAH PROVINSI JAWA TIMUR
              </p>
              <p style={{ fontSize: '10px', color: '#6b7280', margin: 0, lineHeight: '1.4' }}>
                Jl. Ahmad Yani No. 152, Surabaya | Email: brida@jatimprov.go.id | Website: brida.jatimprov.go.id
              </p>
            </div>
          </div>

          {/* PAGE 2 */}
          <div id="report-page-2" style={{ 
            width: '210mm',
            height: '297mm',
            backgroundColor: 'white',
            padding: '20mm',
            fontFamily: 'Arial, sans-serif',
            color: '#000000',
            position: 'relative',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Header Page 2 - Simplified */}
            <div style={{ 
              marginBottom: '20px',
              paddingBottom: '14px',
              borderBottom: '3px solid #e5e7eb'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                Analisis Kolaborasi (Lanjutan)
              </h2>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1 }}>
              {aiData && (
                <>
                  {/* Alasan Sinergi */}
                  <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ 
                      fontSize: '16px', 
                      fontWeight: 'bold', 
                      color: '#1f2937', 
                      margin: 0,
                      marginBottom: '10px',
                      paddingLeft: '12px',
                      borderLeft: '5px solid #3B82F6',
                      display: 'block'
                    }}>
                      🔗 Alasan Sinergi
                    </h3>
                    <div style={{ backgroundColor: '#EFF6FF', padding: '14px', borderRadius: '10px', border: '2px solid #3B82F6' }}>
                      <p style={{ fontSize: '12px', color: '#374151', margin: 0, lineHeight: '1.6' }}>
                        {aiData.alasan_sinergi}
                      </p>
                    </div>
                  </div>

                  {/* Potensi Dampak */}
                  <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ 
                      fontSize: '16px', 
                      fontWeight: 'bold', 
                      color: '#1f2937', 
                      margin: 0,
                      marginBottom: '10px',
                      paddingLeft: '12px',
                      borderLeft: '5px solid #F59E0B',
                      display: 'block'
                    }}>
                      📈 Potensi Dampak
                    </h3>
                    <div style={{ backgroundColor: '#FFFBEB', padding: '14px', borderRadius: '10px', border: '2px solid #F59E0B' }}>
                      {Array.isArray(aiData.potensi_dampak) ? (
                        <ul style={{ margin: 0, paddingLeft: '18px' }}>
                          {aiData.potensi_dampak.map((dampak, index) => (
                            <li key={index} style={{ fontSize: '12px', color: '#374151', marginBottom: '6px', lineHeight: '1.4' }}>
                              {dampak}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p style={{ fontSize: '12px', color: '#374151', margin: 0, lineHeight: '1.4' }}>
                          {aiData.potensi_dampak}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Langkah Selanjutnya */}
              <div style={{ marginBottom: '18px', backgroundColor: '#ECFDF5', padding: '16px', borderRadius: '10px', border: '3px solid #16A34A' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', margin: 0, marginBottom: '12px' }}>
                  💡 Langkah Selanjutnya
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ fontSize: '12px', color: '#374151', marginBottom: '8px', lineHeight: '1.5', paddingLeft: '22px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, fontWeight: 'bold', color: '#16A34A', fontSize: '13px' }}>1.</span>
                    Koordinasikan pertemuan antara pihak-pihak terkait untuk membahas kolaborasi
                  </li>
                  <li style={{ fontSize: '12px', color: '#374151', marginBottom: '8px', lineHeight: '1.5', paddingLeft: '22px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, fontWeight: 'bold', color: '#16A34A', fontSize: '13px' }}>2.</span>
                    Buat proposal kolaborasi dengan detail manfaat dan target capaian yang terukur
                  </li>
                  <li style={{ fontSize: '12px', color: '#374151', marginBottom: '8px', lineHeight: '1.5', paddingLeft: '22px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, fontWeight: 'bold', color: '#16A34A', fontSize: '13px' }}>3.</span>
                    Susun timeline implementasi dan alokasi sumber daya
                  </li>
                  <li style={{ fontSize: '12px', color: '#374151', margin: 0, lineHeight: '1.5', paddingLeft: '22px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, fontWeight: 'bold', color: '#16A34A', fontSize: '13px' }}>4.</span>
                    Monitor dan evaluasi progress kolaborasi secara berkala
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer - Page 2 */}
            <div style={{ 
              marginTop: 'auto',
              paddingTop: '14px', 
              borderTop: '3px solid #e5e7eb', 
              textAlign: 'center' 
            }}>
              <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#1f2937', margin: 0, marginBottom: '4px' }}>
                BADAN RISET DAN INOVASI DAERAH PROVINSI JAWA TIMUR
              </p>
              <p style={{ fontSize: '10px', color: '#6b7280', margin: 0, lineHeight: '1.4' }}>
                Jl. Ahmad Yani No. 152, Surabaya | Email: brida@jatimprov.go.id | Website: brida.jatimprov.go.id
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
