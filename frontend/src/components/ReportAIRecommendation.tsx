import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
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
  useEffect(() => {
    // Trigger print dialog immediately
    const timer = setTimeout(() => {
      window.print();
    }, 500);

    // Close modal after print dialog
    const handleAfterPrint = () => {
      onClose();
    };

    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [onClose]);

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
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Generating AI Recommendation PDF...</h2>
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
          <div id="report-ai-content" style={{ backgroundColor: '#ffffff', padding: '32px' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '32px', borderBottom: '4px solid #2563EB', paddingBottom: '24px' }}>
              <img src={logo} alt="BRIDA Jatim" style={{ height: '64px', margin: '0 auto 16px' }} />
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
                Laporan AI Rekomendasi Kolaborasi Inovasi
              </h1>
              <h2 style={{ fontSize: '20px', color: '#4b5563', marginBottom: '8px' }}>
                BADAN RISET DAN INOVASI DAERAH PROVINSI JAWA TIMUR
              </h2>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0' }}>
                Tanggal Cetak: {new Date().toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>

            {/* Executive Summary */}
            <div style={{ marginBottom: '32px', backgroundColor: '#EFF6FF', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #2563EB' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>
                Ringkasan Eksekutif
              </h3>
              <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6', marginBottom: '8px' }}>
                Sistem AI telah mengidentifikasi <strong>27 peluang kolaborasi</strong> berdasarkan analisis data inovasi daerah. 
                Dari total rekomendasi, <strong>8 kolaborasi</strong> termasuk kategori "Sangat Cocok" dengan skor di atas 90%.
              </p>
              <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6', margin: 0 }}>
                Rekomendasi prioritas: <strong>Integrasi E-Health dengan Sistem Kependudukan</strong> (Skor: 92%) 
                memiliki kesiapan infrastruktur tertinggi dan dampak signifikan.
              </p>
            </div>

            {/* Summary Stats */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px', borderLeft: '4px solid #2563EB', paddingLeft: '12px' }}>
                Statistik Rekomendasi
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div style={{ backgroundColor: '#F0FDF4', padding: '16px', borderRadius: '8px', textAlign: 'center', border: '2px solid #10B981' }}>
                  <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '4px' }}>Sangat Cocok</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#10B981', margin: 0 }}>8</p>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Skor ≥ 90%</p>
                </div>
                <div style={{ backgroundColor: '#EFF6FF', padding: '16px', borderRadius: '8px', textAlign: 'center', border: '2px solid #3B82F6' }}>
                  <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '4px' }}>Potensial</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#3B82F6', margin: 0 }}>15</p>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Skor 70-89%</p>
                </div>
                <div style={{ backgroundColor: '#FEF3C7', padding: '16px', borderRadius: '8px', textAlign: 'center', border: '2px solid #F59E0B' }}>
                  <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '4px' }}>Kurang Cocok</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#F59E0B', margin: 0 }}>4</p>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Skor &lt; 70%</p>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px', borderLeft: '4px solid #2563EB', paddingLeft: '12px' }}>
                Distribusi Kategori Rekomendasi
              </h3>
              <div style={{ width: '100%', height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#6b7280"
                      label={{ value: 'Kategori', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      label={{ value: 'Jumlah', angle: -90, position: 'insideLeft' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="jumlah" name="Jumlah Rekomendasi">
                      {chartData.map((entry, index) => (
                        <rect key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top 3 Recommendations */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px', borderLeft: '4px solid #2563EB', paddingLeft: '12px' }}>
                Top 3 Rekomendasi Prioritas
              </h3>
              {topRecommendations.map((rec, index) => (
                <div key={rec.id} style={{ 
                  marginBottom: '16px', 
                  backgroundColor: '#F9FAFB', 
                  padding: '16px', 
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ 
                          backgroundColor: '#2563EB', 
                          color: 'white', 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}>
                          {index + 1}
                        </span>
                        <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                          {rec.title}
                        </h4>
                      </div>
                      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
                        <strong>Jenis:</strong> {rec.jenis}
                      </p>
                      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
                        <strong>Pihak Terlibat:</strong> {rec.opd1} × {rec.opd2}
                      </p>
                      <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.5', marginBottom: '8px' }}>
                        {rec.summary}
                      </p>
                    </div>
                    <div style={{ 
                      backgroundColor: rec.score >= 90 ? '#10B981' : '#3B82F6',
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      textAlign: 'center',
                      marginLeft: '16px'
                    }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{rec.score}%</div>
                      <div style={{ fontSize: '10px' }}>{rec.category}</div>
                    </div>
                  </div>
                  
                  <div style={{ 
                    backgroundColor: 'white', 
                    padding: '12px', 
                    borderRadius: '6px',
                    marginBottom: '8px'
                  }}>
                    <p style={{ fontSize: '12px', color: '#4b5563', marginBottom: '4px' }}>
                      <strong>💡 Manfaat:</strong> {rec.manfaat}
                    </p>
                    <p style={{ fontSize: '12px', color: '#4b5563', marginBottom: '4px' }}>
                      <strong>📊 Dampak:</strong> {rec.dampak}
                    </p>
                    <p style={{ fontSize: '12px', color: '#4b5563', margin: 0 }}>
                      <strong>🎯 Status:</strong> {rec.readiness}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {rec.tags.map((tag, idx) => (
                      <span key={idx} style={{ 
                        fontSize: '11px', 
                        backgroundColor: '#DBEAFE', 
                        color: '#1E40AF', 
                        padding: '4px 8px', 
                        borderRadius: '4px',
                        fontWeight: '500'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Key Insights */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px', borderLeft: '4px solid #2563EB', paddingLeft: '12px' }}>
                Insight & Rekomendasi
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ color: '#2563EB', fontWeight: 'bold', marginTop: '4px' }}>•</span>
                  <span style={{ fontSize: '14px', color: '#374151' }}>
                    Kolaborasi antar OPD dengan sistem API ready memiliki peluang implementasi tertinggi (92%)
                  </span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ color: '#2563EB', fontWeight: 'bold', marginTop: '4px' }}>•</span>
                  <span style={{ fontSize: '14px', color: '#374151' }}>
                    Integrasi data kesehatan dan kependudukan dapat meningkatkan efisiensi pelayanan hingga 40%
                  </span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ color: '#2563EB', fontWeight: 'bold', marginTop: '4px' }}>•</span>
                  <span style={{ fontSize: '14px', color: '#374151' }}>
                    Platform terintegrasi multi-OPD memerlukan koordinasi intensif namun berdampak jangka panjang
                  </span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ color: '#2563EB', fontWeight: 'bold', marginTop: '4px' }}>•</span>
                  <span style={{ fontSize: '14px', color: '#374151' }}>
                    Kolaborasi lintas daerah dengan sistem e-payment meningkatkan investasi hingga 25%
                  </span>
                </li>
              </ul>
            </div>

            {/* Action Plan */}
            <div style={{ marginBottom: '32px', backgroundColor: '#FEF3C7', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #F59E0B' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#92400E', marginBottom: '12px' }}>
                📋 Rekomendasi Tindak Lanjut
              </h3>
              <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#374151', lineHeight: '1.8' }}>
                <li>Prioritaskan implementasi kolaborasi dengan skor ≥ 90% (kategori Sangat Cocok)</li>
                <li>Lakukan feasibility study untuk kolaborasi multi-OPD yang memerlukan koordinasi intensif</li>
                <li>Bentuk tim koordinasi lintas OPD untuk implementasi integrasi sistem</li>
                <li>Evaluasi infrastruktur API dan kesiapan teknis setiap OPD terlibat</li>
              </ol>
            </div>

            {/* Footer */}
            <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #D1D5DB', textAlign: 'center', fontSize: '12px', color: '#6b7280' }}>
              <p style={{ marginBottom: '4px' }}>
                <strong>BADAN RISET DAN INOVASI DAERAH PROVINSI JAWA TIMUR</strong>
              </p>
              <p style={{ margin: 0 }}>
                Jl. Ahmad Yani No. 152, Surabaya | Email: brida@jatimprov.go.id | Website: brida.jatimprov.go.id
              </p>
              <p style={{ marginTop: '8px', fontStyle: 'italic', fontSize: '11px' }}>
                *Laporan ini dihasilkan oleh sistem AI Rekomendasi Kolaborasi BRIDA Jatim
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}