import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import logo from 'figma:asset/3554ecab8b87e1a4e26b58997b7d2614ae189b80.png';

const kematanganOPDData = [
  { opd: 'Kominfo', kematangan: 4.5 },
  { opd: 'Kesehatan', kematangan: 4.2 },
  { opd: 'Pendidikan', kematangan: 3.9 },
  { opd: 'Bappeda', kematangan: 3.8 },
  { opd: 'Perhubungan', kematangan: 3.5 },
  { opd: 'PUPR', kematangan: 3.3 },
];

const jenisInovasiData = [
  { name: 'Digital', value: 215, color: '#6366f1' },
  { name: 'Non-Digital', value: 145, color: '#10b981' },
  { name: 'Teknologi', value: 70, color: '#f59e0b' },
];

const trendPerKotaData = [
  { month: 'Jan', surabaya: 10, malang: 8, sidoarjo: 6 },
  { month: 'Feb', surabaya: 12, malang: 9, sidoarjo: 7 },
  { month: 'Mar', surabaya: 15, malang: 11, sidoarjo: 8 },
  { month: 'Apr', surabaya: 18, malang: 13, sidoarjo: 9 },
  { month: 'May', surabaya: 22, malang: 15, sidoarjo: 11 },
  { month: 'Jun', surabaya: 25, malang: 17, sidoarjo: 13 },
];

interface ReportAnalyticsProps {
  onClose: () => void;
  filters: {
    tahun: string;
    opd: string;
    jenisInovasi: string;
    bentukInovasi: string;
  };
}

export function ReportAnalytics({ onClose, filters }: ReportAnalyticsProps) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let printTimer: NodeJS.Timeout;
    let afterPrintHandler: (() => void) | null = null;

    const initiatePrint = async () => {
      try {
        // Set generating state
        setIsGenerating(true);
        
        // Wait for all elements to render (including Recharts animations)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if report content is visible and has valid dimensions
        const reportContent = document.getElementById('report-analytics-content');
        if (!reportContent) {
          console.error('Report analytics content not found');
          onClose();
          return;
        }
        
        const contentRect = reportContent.getBoundingClientRect();
        if (contentRect.width === 0 || contentRect.height === 0) {
          console.error('Report analytics content has invalid dimensions');
          onClose();
          return;
        }

        // Wait a bit more for charts to fully render
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mark as ready before printing
        setIsReady(true);
        
        // Additional delay to ensure state update is reflected
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Trigger print dialog
        window.print();
        
      } catch (error) {
        console.error('Error during PDF generation:', error);
      } finally {
        // Always reset generating state
        setIsGenerating(false);
      }
    };

    // Handle after print event
    afterPrintHandler = () => {
      try {
        // Reset states and close modal
        setIsGenerating(false);
        setIsReady(false);
        onClose();
      } catch (error) {
        console.error('Error in afterprint handler:', error);
        onClose();
      }
    };

    // Add event listener
    window.addEventListener('afterprint', afterPrintHandler);
    
    // Start the print process
    printTimer = setTimeout(() => {
      initiatePrint();
    }, 100);

    // Cleanup function
    return () => {
      if (printTimer) {
        clearTimeout(printTimer);
      }
      if (afterPrintHandler) {
        window.removeEventListener('afterprint', afterPrintHandler);
      }
      // Ensure state is reset on unmount
      setIsGenerating(false);
      setIsReady(false);
    };
  }, [onClose]);

  const totalInnovations = jenisInovasiData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div style={{ 
      position: 'fixed', 
      inset: 0, 
      backgroundColor: 'rgba(17, 24, 39, 0.5)', 
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
        maxWidth: '896px', 
        width: '100%', 
        maxHeight: '90vh', 
        overflow: 'auto' 
      }}>
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Generating Analytics PDF...</h2>
            <button
              onClick={onClose}
              style={{ 
                color: '#6b7280', 
                fontSize: '32px', 
                fontWeight: 'bold', 
                border: 'none', 
                background: 'none', 
                cursor: 'pointer' 
              }}
            >
              ×
            </button>
          </div>
          
          {/* Report Content for PDF */}
          <div id="report-analytics-content" style={{ backgroundColor: '#ffffff', padding: '32px' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '32px', borderBottom: '4px solid #2563EB', paddingBottom: '24px' }}>
              <img src={logo} alt="BRIDA Jatim" style={{ height: '64px', margin: '0 auto 16px' }} />
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
                Laporan Analitik Inovasi Daerah
              </h1>
              <h2 style={{ fontSize: '20px', color: '#4b5563', marginBottom: '8px' }}>
                BRIDA Jawa Timur
              </h2>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0' }}>
                Tanggal Cetak: {new Date().toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>

            {/* Filter Applied */}
            <div style={{ marginBottom: '32px', backgroundColor: '#F3F4F6', padding: '16px', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>
                Filter Yang Diterapkan:
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '14px' }}>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#4b5563' }}>Tahun: </span>
                  <span style={{ color: '#1f2937' }}>{filters.tahun}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#4b5563' }}>OPD: </span>
                  <span style={{ color: '#1f2937' }}>{filters.opd}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#4b5563' }}>Jenis Inovasi: </span>
                  <span style={{ color: '#1f2937' }}>{filters.jenisInovasi}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#4b5563' }}>Bentuk Inovasi: </span>
                  <span style={{ color: '#1f2937' }}>{filters.bentukInovasi}</span>
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px', borderLeft: '4px solid #2563EB', paddingLeft: '12px' }}>
                Ringkasan Data
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div style={{ backgroundColor: '#EFF6FF', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                  <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '4px' }}>Total Inovasi</p>
                  <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#2563EB', margin: 0 }}>{totalInnovations}</p>
                </div>
                <div style={{ backgroundColor: '#F0FDF4', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                  <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '4px' }}>Digital</p>
                  <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#16A34A', margin: 0 }}>215</p>
                </div>
                <div style={{ backgroundColor: '#FEF3C7', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                  <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '4px' }}>Non-Digital</p>
                  <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#F59E0B', margin: 0 }}>145</p>
                </div>
              </div>
            </div>

            {/* Chart 1: Kematangan OPD */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px', borderLeft: '4px solid #2563EB', paddingLeft: '12px' }}>
                Kematangan Inovasi per OPD
              </h3>
              <div style={{ width: '100%', height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={kematanganOPDData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      type="number" 
                      domain={[0, 5]} 
                      stroke="#6b7280"
                      label={{ value: 'Skor Kematangan', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      dataKey="opd" 
                      type="category" 
                      width={100} 
                      stroke="#6b7280"
                    />
                    <Bar dataKey="kematangan" name="Kematangan">
                      {kematanganOPDData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.kematangan === 4.5 ? '#1E40AF' : '#D1D5DB'} />
                      ))}
                    </Bar>
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p style={{ fontSize: '12px', color: '#4b5563', marginTop: '8px', fontStyle: 'italic' }}>
                Dinas Kominfo memiliki skor kematangan tertinggi (4.5)
              </p>
            </div>

            {/* Chart 2: Distribusi Jenis */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px', borderLeft: '4px solid #2563EB', paddingLeft: '12px' }}>
                Distribusi Jenis Inovasi
              </h3>
              <div style={{ width: '100%', height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={jenisInovasiData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {jenisInovasiData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p style={{ fontSize: '12px', color: '#4b5563', marginTop: '8px', fontStyle: 'italic' }}>
                Inovasi digital mendominasi dengan 50% dari total inovasi
              </p>
            </div>

            {/* Chart 3: Trend Per Kota */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px', borderLeft: '4px solid #2563EB', paddingLeft: '12px' }}>
                Tren Inovasi per Kota (6 Bulan Terakhir)
              </h3>
              <div style={{ width: '100%', height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendPerKotaData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#6b7280"
                      label={{ value: 'Bulan', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      label={{ value: 'Jumlah Inovasi', angle: -90, position: 'insideLeft' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Line type="monotone" dataKey="surabaya" stroke="#6366f1" strokeWidth={2} name="Surabaya" />
                    <Line type="monotone" dataKey="malang" stroke="#10b981" strokeWidth={2} name="Malang" />
                    <Line type="monotone" dataKey="sidoarjo" stroke="#f59e0b" strokeWidth={2} name="Sidoarjo" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p style={{ fontSize: '12px', color: '#4b5563', marginTop: '8px', fontStyle: 'italic' }}>
                Surabaya menunjukkan tren pertumbuhan paling konsisten
              </p>
            </div>

            {/* Key Insights */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px', borderLeft: '4px solid #2563EB', paddingLeft: '12px' }}>
                Insight Analitik
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ color: '#2563EB', fontWeight: 'bold', marginTop: '4px' }}>•</span>
                  <span style={{ fontSize: '14px', color: '#374151' }}>
                    Dinas Kominfo memimpin dengan skor kematangan 4.5, diikuti Dinas Kesehatan (4.2)
                  </span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ color: '#2563EB', fontWeight: 'bold', marginTop: '4px' }}>•</span>
                  <span style={{ fontSize: '14px', color: '#374151' }}>
                    50% inovasi berbasis digital, menunjukkan transformasi digital yang positif
                  </span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ color: '#2563EB', fontWeight: 'bold', marginTop: '4px' }}>•</span>
                  <span style={{ fontSize: '14px', color: '#374151' }}>
                    Surabaya, Malang, dan Sidoarjo menunjukkan pertumbuhan inovasi yang konsisten
                  </span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ color: '#2563EB', fontWeight: 'bold', marginTop: '4px' }}>•</span>
                  <span style={{ fontSize: '14px', color: '#374151' }}>
                    Perlu peningkatan kematangan di OPD dengan skor di bawah 3.5
                  </span>
                </li>
              </ul>
            </div>

            {/* Footer */}
            <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #D1D5DB', textAlign: 'center', fontSize: '12px', color: '#6b7280' }}>
              <p style={{ marginBottom: '4px' }}>
                <strong>BADAN RISET DAN INOVASI DAERAH PROVINSI JAWA TIMUR</strong>
              </p>
              <p style={{ margin: 0 }}>
                Jl. Ahmad Yani No. 152, Surabaya | Email: brida@jatimprov.go.id | Website: brida.jatimprov.go.id
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}