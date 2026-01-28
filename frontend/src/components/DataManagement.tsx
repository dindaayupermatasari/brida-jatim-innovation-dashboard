import { useState } from 'react';
import { Plus, Edit2, Trash2, Download, Search, FileText, X, Eye, CheckSquare, Square, ChevronUp, ChevronDown, AlertTriangle } from 'lucide-react';
import { AddData } from './AddData';
import { EditData } from './EditData';
import { DetailViewModal } from './DetailViewModal';

// Updated Interface with 20 columns (snake_case)
interface Inovasi {
  no: number;
  judul_inovasi: string;
  pemda: string;
  admin_opd: string;
  inisiator: string;
  nama_inisiator: string;
  bentuk_inovasi: string;
  jenis: string;
  asta_cipta: string;
  urusan_utama: string;
  urusan_lain_yang_beririsan: string;
  kematangan: number;
  tahapan_inovasi: string;
  tanggal_input: string;
  tanggal_penerapan: string;
  tanggal_pengembangan: string;
  video: string;
  link_video: string;
  latitude: number;
  longitude: number;
}

interface DataManagementProps {
  darkMode: boolean;
  isLoggedIn: boolean;
}

// Helper function to get maturity badge properties
const getMaturityBadge = (score: number) => {
  if (score >= 100) {
    return { label: 'Sangat Matang', color: 'bg-emerald-600', textColor: 'text-white' };
  } else if (score >= 80) {
    return { label: 'Matang', color: 'bg-blue-500', textColor: 'text-white' };
  } else if (score >= 60) {
    return { label: 'Cukup Matang', color: 'bg-yellow-500', textColor: 'text-white' };
  } else if (score >= 1) {
    return { label: 'Kurang Matang', color: 'bg-orange-500', textColor: 'text-white' };
  } else {
    return { label: 'Draft', color: 'bg-gray-400', textColor: 'text-white' };
  }
};

type SortField = 'judul_inovasi' | 'admin_opd' | 'jenis' | 'tahapan_inovasi' | 'kematangan';
type SortDirection = 'asc' | 'desc';

export function DataManagement({ darkMode, isLoggedIn }: DataManagementProps) {
  const [data, setData] = useState<Inovasi[]>([
    {
      no: 1,
      judul_inovasi: 'Sistem Perizinan Online Terpadu',
      pemda: 'Provinsi Jawa Timur',
      admin_opd: 'Dinas PMPTSP',
      inisiator: 'Kepala Dinas',
      nama_inisiator: 'Dr. Ahmad Wijaya',
      bentuk_inovasi: 'Inovasi Layanan',
      jenis: 'Digital',
      asta_cipta: 'Pangan',
      urusan_utama: 'Pelayanan Terpadu Satu Pintu',
      urusan_lain_yang_beririsan: 'Penanaman Modal',
      kematangan: 98,
      tahapan_inovasi: 'Penerapan',
      tanggal_input: '2023-01-15',
      tanggal_penerapan: '2024-01-10',
      tanggal_pengembangan: '2023-06-20',
      video: 'Ada',
      link_video: 'https://youtube.com/example1',
      latitude: -7.2575,
      longitude: 112.7521
    },
    {
      no: 2,
      judul_inovasi: 'E-Health Telemedicine Platform',
      pemda: 'Kota Surabaya',
      admin_opd: 'Dinas Kesehatan',
      inisiator: 'Kepala Dinas',
      nama_inisiator: 'dr. Siti Nurhaliza',
      bentuk_inovasi: 'Inovasi Layanan',
      jenis: 'Digital',
      asta_cipta: 'Kesehatan',
      urusan_utama: 'Kesehatan',
      urusan_lain_yang_beririsan: 'Komunikasi dan Informatika',
      kematangan: 85,
      tahapan_inovasi: 'Penerapan',
      tanggal_input: '2023-02-10',
      tanggal_penerapan: '2024-02-15',
      tanggal_pengembangan: '2023-07-05',
      video: 'Ada',
      link_video: 'https://youtube.com/example2',
      latitude: -7.2504,
      longitude: 112.7688
    },
    {
      no: 3,
      judul_inovasi: 'Smart Traffic Management System',
      pemda: 'Kota Malang',
      admin_opd: 'Dinas Perhubungan',
      inisiator: 'Kepala Dinas',
      nama_inisiator: 'Ir. Bambang Susilo',
      bentuk_inovasi: 'Inovasi Tata Kelola',
      jenis: 'Digital',
      asta_cipta: 'Energi',
      urusan_utama: 'Perhubungan',
      urusan_lain_yang_beririsan: 'Komunikasi dan Informatika',
      kematangan: 110,
      tahapan_inovasi: 'Penerapan',
      tanggal_input: '2022-11-20',
      tanggal_penerapan: '2023-06-15',
      tanggal_pengembangan: '2023-03-10',
      video: 'Tidak',
      link_video: '',
      latitude: -7.9797,
      longitude: 112.6304
    },
    {
      no: 4,
      judul_inovasi: 'Sistem Pembelajaran Daring Interaktif',
      pemda: 'Kabupaten Sidoarjo',
      admin_opd: 'Dinas Pendidikan',
      inisiator: 'Kepala Dinas',
      nama_inisiator: 'Prof. Dr. Rina Kartika',
      bentuk_inovasi: 'Inovasi Layanan',
      jenis: 'Digital',
      asta_cipta: 'SDM',
      urusan_utama: 'Pendidikan',
      urusan_lain_yang_beririsan: 'Komunikasi dan Informatika',
      kematangan: 78,
      tahapan_inovasi: 'Uji Coba',
      tanggal_input: '2023-05-12',
      tanggal_penerapan: '2024-08-20',
      tanggal_pengembangan: '2023-09-15',
      video: 'Ada',
      link_video: 'https://youtube.com/example3',
      latitude: -7.4478,
      longitude: 112.7183
    },
    {
      no: 5,
      judul_inovasi: 'Optimalisasi Pemupukan Organik Berkelanjutan',
      pemda: 'Kabupaten Jember',
      admin_opd: 'Dinas Pertanian',
      inisiator: 'Kepala Bidang',
      nama_inisiator: 'Ir. Agus Santoso, M.P.',
      bentuk_inovasi: 'Inovasi Lainnya',
      jenis: 'Non-Digital',
      asta_cipta: 'Pangan',
      urusan_utama: 'Pertanian',
      urusan_lain_yang_beririsan: 'Lingkungan Hidup',
      kematangan: 65,
      tahapan_inovasi: 'Inisiatif',
      tanggal_input: '2024-01-05',
      tanggal_penerapan: '2024-09-01',
      tanggal_pengembangan: '2024-04-10',
      video: 'Tidak',
      link_video: '',
      latitude: -8.1669,
      longitude: 113.6997
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterJenis, setFilterJenis] = useState('Semua');
  const [filterTahapan, setFilterTahapan] = useState('Semua');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Inovasi | null>(null);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [pendingAction, setPendingAction] = useState<'add' | 'edit' | 'delete' | null>(null);
  const [pendingItem, setPendingItem] = useState<Inovasi | null>(null);

  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingItem, setViewingItem] = useState<Inovasi | null>(null);
  
  // Bulk action states
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Inovasi | null>(null);
  
  // Sorting states
  const [sortField, setSortField] = useState<SortField>('judul_inovasi');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = (bVal as string).toLowerCase();
    }
    
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredData = sortedData.filter((item) => {
    const matchesSearch = item.judul_inovasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.admin_opd.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesJenis = filterJenis === 'Semua' || item.jenis === filterJenis;
    const matchesTahapan = filterTahapan === 'Semua' || item.tahapan_inovasi === filterTahapan;
    return matchesSearch && matchesJenis && matchesTahapan;
  });

  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedData.map(item => item.no));
    }
  };

  const handleSelectItem = (no: number) => {
    if (selectedIds.includes(no)) {
      setSelectedIds(selectedIds.filter(selectedNo => selectedNo !== no));
    } else {
      setSelectedIds([...selectedIds, no]);
    }
  };

  const handleBulkDelete = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (window.confirm(`Apakah Anda yakin ingin menghapus ${selectedIds.length} data terpilih?`)) {
      setData(data.filter(item => !selectedIds.includes(item.no)));
      setSelectedIds([]);
    }
  };

  const handleBulkExport = () => {
    const selectedData = data.filter(item => selectedIds.includes(item.no));
    alert(`Export ${selectedData.length} data terpilih (implementasi export sebenarnya diperlukan)`);
  };

  const handleEdit = (item: Inovasi) => {
    if (!isLoggedIn) {
      setPendingAction('edit');
      setPendingItem(item);
      setShowLoginModal(true);
      return;
    }
    setEditingItem(item);
    setShowEditModal(true);
  };

  const handleDeleteClick = (item: Inovasi) => {
    if (!isLoggedIn) {
      setPendingAction('delete');
      setPendingItem(item);
      setShowLoginModal(true);
      return;
    }
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setData(data.filter((item) => item.no !== itemToDelete.no));
      setShowDeleteModal(false);
      setItemToDelete(null);
    }
  };

  const handleAddNew = () => {
    if (!isLoggedIn) {
      setPendingAction('add');
      setShowLoginModal(true);
      return;
    }
    setShowAddModal(true);
  };

  const handleLogin = () => {
    if (loginForm.username === 'admin' && loginForm.password === 'brida2026') {
      window.localStorage.setItem('isLoggedIn', 'true');
      setShowLoginModal(false);
      setLoginError('');
      setLoginForm({ username: '', password: '' });
      
      setTimeout(() => {
        if (pendingAction === 'add') {
          handleAddNew();
        } else if (pendingAction === 'edit' && pendingItem) {
          handleEdit(pendingItem);
        } else if (pendingAction === 'delete' && pendingItem) {
          handleDeleteClick(pendingItem);
        }
        setPendingAction(null);
        setPendingItem(null);
        window.location.reload();
      }, 100);
    } else {
      setLoginError('Username atau password salah');
    }
  };

  const handleAddSubmit = (newData: Partial<Inovasi>) => {
    const newItem = {
      ...newData,
      no: Math.max(...data.map((d) => d.no)) + 1,
    } as Inovasi;
    setData([...data, newItem]);
    setShowAddModal(false);
  };

  const handleEditSubmit = (updatedData: Partial<Inovasi>) => {
    if (editingItem) {
      setData(data.map((item) => (item.no === editingItem.no ? { ...item, ...updatedData } : item)));
      setShowEditModal(false);
      setEditingItem(null);
    }
  };

  const handleExport = (format: string) => {
    alert(`Export data dalam format ${format} (implementasi export sebenarnya diperlukan)`);
  };

  const handleView = (item: Inovasi) => {
    setViewingItem(item);
    setShowViewModal(true);
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
          Data Management
        </h2>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => handleExport('Excel')}
            className="flex items-center gap-2 bg-green-500 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Excel</span>
          </button>
          <button
            onClick={() => handleExport('CSV')}
            className="flex items-center gap-2 bg-[#2563EB] text-white px-3 md:px-4 py-2 rounded-lg hover:bg-[#1D4ED8] transition-colors text-sm"
          >
            <Download size={18} />
            <span className="hidden sm:inline">CSV</span>
          </button>
          <button
            onClick={() => handleExport('JSON')}
            className="flex items-center gap-2 bg-purple-500 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm"
          >
            <FileText size={18} />
            <span className="hidden sm:inline">JSON</span>
          </button>
          <button
            onClick={() => handleExport('PDF')}
            className="flex items-center gap-2 bg-red-500 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
          >
            <FileText size={18} />
            <span className="hidden sm:inline">PDF</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Cari Data
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari judul inovasi atau OPD..."
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                }`}
              />
            </div>
          </div>
          <div>
            <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Jenis Inovasi
            </label>
            <select
              value={filterJenis}
              onChange={(e) => setFilterJenis(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
              }`}
            >
              <option>Semua</option>
              <option>Digital</option>
              <option>Non-Digital</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Tahapan Inovasi
            </label>
            <select
              value={filterTahapan}
              onChange={(e) => setFilterTahapan(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
              }`}
            >
              <option>Semua</option>
              <option>Inisiatif</option>
              <option>Uji Coba</option>
              <option>Penerapan</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center flex-wrap gap-3">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Menampilkan {filteredData.length} dari {data.length} data
          </p>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus size={18} />
            <span>Tambah Data</span>
          </button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.length > 0 && (
        <div className={`rounded-lg shadow-md p-4 flex items-center justify-between ${
          darkMode ? 'bg-blue-900/50 border border-blue-700' : 'bg-blue-50 border border-blue-200'
        }`}>
          <div className={`flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <CheckSquare size={20} className="text-blue-500" />
            <span className="font-medium">{selectedIds.length} data terpilih</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleBulkExport}
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
            >
              <Download size={16} />
              Export Terpilih
            </button>
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              <Trash2 size={16} />
              Hapus Terpilih
            </button>
          </div>
        </div>
      )}

      {/* Data Table - Only 6 Important Columns */}
      <div className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className={`px-6 py-3 text-left ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <button
                    onClick={handleSelectAll}
                    className="flex items-center justify-center"
                  >
                    {selectedIds.length === paginatedData.length && paginatedData.length > 0 ? (
                      <CheckSquare size={18} className="text-blue-500" />
                    ) : (
                      <Square size={18} />
                    )}
                  </button>
                </th>
                <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  No
                </th>
                <th 
                  onClick={() => handleSort('judul_inovasi')}
                  className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    Judul Inovasi
                    {sortField === 'judul_inovasi' && (
                      sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('admin_opd')}
                  className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    Admin OPD
                    {sortField === 'admin_opd' && (
                      sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('jenis')}
                  className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    Jenis
                    {sortField === 'jenis' && (
                      sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('tahapan_inovasi')}
                  className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    Tahapan Inovasi
                    {sortField === 'tahapan_inovasi' && (
                      sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('kematangan')}
                  className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    Kematangan
                    {sortField === 'kematangan' && (
                      sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Aksi</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {paginatedData.map((item) => (
                <tr key={item.no} className={`transition-colors ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleSelectItem(item.no)}
                      className="flex items-center justify-center"
                    >
                      {selectedIds.includes(item.no) ? (
                        <CheckSquare size={18} className="text-blue-500" />
                      ) : (
                        <Square size={18} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                      )}
                    </button>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{item.no}</td>
                  <td className={`px-6 py-4 text-sm font-medium ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}>{item.judul_inovasi}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{item.admin_opd}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.jenis === 'Digital' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 
                      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                    }`}>
                      {item.jenis}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{item.tahapan_inovasi}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {(() => {
                      const badge = getMaturityBadge(item.kematangan);
                      return (
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badge.color} ${badge.textColor}`}>
                          {item.kematangan} - {badge.label}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(item)}
                        className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="Lihat"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className={`p-4 flex justify-between items-center border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-4">
            <label className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Rows per page:
            </label>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className={`px-3 py-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
              }`}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Halaman {currentPage} dari {totalPages || 1}
          </p>
          
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              Sebelumnya
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className={`px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && itemToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-lg shadow-xl max-w-md w-full ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
                  <AlertTriangle className="text-red-600" size={24} />
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Konfirmasi Hapus
                </h3>
              </div>
            </div>
            <div className="p-6">
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Apakah Anda yakin ingin menghapus data <strong>"{itemToDelete.judul_inovasi}"</strong>?
              </p>
              <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Data yang dihapus tidak dapat dikembalikan.
              </p>
            </div>
            <div className={`p-6 border-t flex justify-end gap-3 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setItemToDelete(null);
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-lg shadow-xl max-w-md w-full ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Login Admin
                </h3>
                <button onClick={() => setShowLoginModal(false)}>
                  <X className={darkMode ? 'text-gray-400' : 'text-gray-600'} size={24} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Username
                </label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                />
              </div>
              {loginError && (
                <p className="text-sm text-red-600">{loginError}</p>
              )}
            </div>
            <div className={`p-6 border-t flex justify-end gap-3 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                onClick={() => setShowLoginModal(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Batal
              </button>
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Data Modal */}
      {showAddModal && (
        <AddData
          darkMode={darkMode}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddSubmit}
        />
      )}

      {/* Edit Data Modal */}
      {showEditModal && editingItem && (
        <EditData
          darkMode={darkMode}
          data={editingItem}
          onClose={() => {
            setShowEditModal(false);
            setEditingItem(null);
          }}
          onSubmit={handleEditSubmit}
        />
      )}

      {/* Detail View Modal */}
      {showViewModal && viewingItem && (
        <DetailViewModal
          darkMode={darkMode}
          data={viewingItem}
          onClose={() => {
            setShowViewModal(false);
            setViewingItem(null);
          }}
        />
      )}
    </div>
  );
}
