import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Activity, CheckCircle, Clock } from 'lucide-react';

const mockCases = [
  {
    id: 'CS-2024-089',
    time: 'Hari Ini, 09:30',
    patientName: 'Budi Santoso',
    status: 'APPROVED',
  },
  {
    id: 'CS-2024-090',
    time: 'Hari Ini, 10:15',
    patientName: 'Siti Aminah',
    status: 'PROCESSING (DIFFUSION)',
  },
  {
    id: 'CS-2024-091',
    time: 'Hari Ini, 11:00',
    patientName: 'Agus Pratama',
    status: 'AWAITING REVIEW',
  }
];

export const Worklist = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <span className="bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-md text-[10px] uppercase tracking-widest flex items-center justify-center gap-1"><CheckCircle size={12} /> APPROVED</span>;
      case 'PROCESSING (DIFFUSION)':
        return <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-md text-[10px] uppercase tracking-widest flex items-center justify-center gap-1"><Activity size={12} className="animate-pulse" /> PROCESSING (DIFFUSION)</span>;
      case 'AWAITING REVIEW':
        return <span className="bg-amber-100 text-amber-700 font-bold px-3 py-1 rounded-md text-[10px] uppercase tracking-widest flex items-center justify-center gap-1"><Clock size={12} /> AWAITING REVIEW</span>;
      default:
        return <span>{status}</span>;
    }
  };

  const handleOpenWorkbench = (caseId: string, status: string) => {
    if (status === 'PROCESSING (DIFFUSION)') {
      alert('AI masih memproses data ini. Harap tunggu.');
      return;
    }
    navigate(`/klinisi/dashboard/${caseId}`);
  };

  return (
    <div className="w-full h-full flex flex-col gap-8 font-sans">
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
           <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Active Worklist</h1>
           <p className="text-slate-500 font-medium mt-1">Antrean pemrosesan AI dan validasi klinis Anda hari ini.</p>
        </div>
        
        <div className="relative">
           <input 
             type="text" 
             placeholder="Cari ID Kasus atau Pasien..."
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#3b8a95] focus:ring-1 focus:ring-[#3b8a95] shadow-sm w-64 text-slate-800"
           />
           <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
         <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest w-16">No</th>
                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest w-40">Waktu</th>
                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">ID Kasus</th>
                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Nama Pasien</th>
                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Status AI</th>
                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Aksi</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {mockCases.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-slate-50 transition-colors group">
                       <td className="px-6 py-4 font-bold text-slate-500">{idx + 1}</td>
                       <td className="px-6 py-4 text-sm text-slate-500">{row.time}</td>
                       <td className="px-6 py-4 font-bold text-slate-800">{row.id}</td>
                       <td className="px-6 py-4 text-sm font-medium text-slate-700">{row.patientName}</td>
                       <td className="px-6 py-4">
                          <div className="flex justify-center">
                            {getStatusBadge(row.status)}
                          </div>
                       </td>
                       <td className="px-6 py-4">
                          <div className="flex justify-center">
                             <button 
                               onClick={() => handleOpenWorkbench(row.id, row.status)}
                               className={`px-4 py-2 rounded-lg text-xs font-bold border transition-colors shadow-sm ${
                                 row.status === 'PROCESSING (DIFFUSION)' 
                                   ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60' 
                                   : 'bg-white text-slate-700 border-slate-200 hover:border-[#3b8a95] hover:text-[#3b8a95]'
                               }`}
                             >
                               Buka Workbench
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};
