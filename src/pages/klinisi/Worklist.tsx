import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Activity, CheckCircle, Clock } from 'lucide-react';
import { mockQuery } from '../../data/mockDatabase';

export const Worklist = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState<any[]>([]);

  useEffect(() => {
    // Simulasi Fetching dari API
    setCases(mockQuery.getWorklist());
  }, []);

  const countSelesai = cases.filter(c => c.status === 'SELESAI').length;
  const countMenunggu = cases.filter(c => c.status === 'MENUNGGU').length;

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 font-sans">
      
      {/* Metric Cards */}
      <div className="bg-[#f0f4f8] rounded-[2rem] p-6 border border-slate-200/50 flex gap-6 items-center shadow-sm">
         <div className="bg-clinical/10 rounded-2xl p-4 flex items-center justify-center">
            <Activity className="text-clinical" size={24} />
         </div>
         <div className="flex flex-col flex-1 border-r border-slate-200">
            <span className="text-3xl font-medium text-slate-800">{cases.length}</span>
            <span className="text-xs text-slate-500 font-medium">Total Kasus</span>
         </div>
         
         <div className="bg-emerald-500/10 rounded-2xl p-4 flex items-center justify-center">
            <CheckCircle className="text-emerald-500" size={24} />
         </div>
         <div className="flex flex-col flex-1 border-r border-slate-200">
            <span className="text-3xl font-medium text-slate-800">{countSelesai}</span>
            <span className="text-xs text-slate-500 font-medium">Selesai Dianalisis</span>
         </div>
         
         <div className="bg-amber-500/10 rounded-2xl p-4 flex items-center justify-center">
            <Clock className="text-amber-500" size={24} />
         </div>
         <div className="flex flex-col flex-1">
            <span className="text-3xl font-medium text-slate-800">{countMenunggu}</span>
            <span className="text-xs text-slate-500 font-medium">Menunggu Validasi</span>
         </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-full p-2 border border-slate-200 flex items-center shadow-sm">
         <input 
           type="text" 
           placeholder="Cari berdasarkan ID Kasus atau Nama Pasien..." 
           className="flex-1 bg-transparent border-none outline-none px-4 text-sm text-slate-700" 
         />
         <button className="bg-clinical text-white rounded-full p-3 hover:bg-clinical-dark transition-colors">
            <Search size={16} />
         </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden mt-2">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-5 border-r border-slate-100">No</th>
              <th className="px-6 py-5 border-r border-slate-100">Waktu</th>
              <th className="px-6 py-5 border-r border-slate-100">ID Kasus</th>
              <th className="px-6 py-5 border-r border-slate-100">Nama Pasien</th>
              <th className="px-6 py-5 border-r border-slate-100">Prioritas</th>
              <th className="px-6 py-5 border-r border-slate-100 text-center">Status</th>
              <th className="px-6 py-5 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {cases.map((c, i) => (
              <tr 
                key={c.caseId} 
                className={`hover:bg-slate-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
              >
                <td className="px-6 py-4 font-medium border-r border-slate-100">{i + 1}</td>
                <td className="px-6 py-4 text-xs border-r border-slate-100">{c.date}</td>
                <td className="px-6 py-4 font-medium border-r border-slate-100">{c.caseId}</td>
                <td className="px-6 py-4 border-r border-slate-100">{c.patientName}</td>
                
                <td className="px-6 py-4 border-r border-slate-100">
                  <span className={`${c.priority === 'Tinggi' ? 'text-red-500 font-medium' : 'text-slate-600'}`}>
                    {c.priority}
                  </span>
                </td>
                
                <td className="px-6 py-4 border-r border-slate-100 text-center">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    c.status === 'ANALISIS' ? 'text-amber-600 bg-amber-50' :
                    c.status === 'SELESAI' ? 'text-emerald-600 bg-emerald-50' :
                    'text-slate-600 bg-slate-100'
                  }`}>
                    {c.status}
                  </span>
                </td>
                
                <td className="px-6 py-4 text-center">
                  <button 
                    onClick={() => navigate('/klinisi/dashboard/demo')}
                    className="bg-clinical hover:bg-clinical-dark text-white text-xs font-medium py-2 px-5 rounded-lg transition-colors shadow-sm"
                  >
                    Lihat Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
