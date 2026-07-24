import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockQuery } from '../../data/mockDatabase';

export const Worklist = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState<any[]>([]);

  useEffect(() => {
    // Simulasi Fetching dari API
    setCases(mockQuery.getWorklist());
  }, []);

  return (
    <div className="w-full max-w-[1400px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-['Playfair_Display'] italic text-white tracking-tight mb-2">Worklist Kasus Aktif</h1>
          <p className="text-[10px] text-[#06B6D4] font-mono uppercase tracking-widest font-bold">{cases.length} Total Antrean Pemeriksaan</p>
        </div>
        
        <div className="flex gap-3">
          <div className="flex items-center gap-3 bg-white/[0.02] border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-md shadow-lg focus-within:border-[#06b6d4]/50 transition-colors">
            <Search size={18} className="text-slate-500" />
            <input type="text" placeholder="Cari ID/NIK Kasus..." className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-600 w-56 font-light" />
          </div>
          <button className="flex items-center justify-center bg-white/[0.02] border border-white/10 px-5 py-3 rounded-2xl text-slate-400 hover:text-white hover:border-[#06b6d4]/30 transition-all backdrop-blur-md shadow-lg">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 border-b border-white/10 text-[9px] text-slate-400 uppercase tracking-widest font-bold">
            <tr>
              <th className="px-8 py-6">ID Kasus (Klinikal)</th>
              <th className="px-8 py-6">Nama Pasien</th>
              <th className="px-8 py-6">Waktu Masuk</th>
              <th className="px-8 py-6">Prioritas</th>
              <th className="px-8 py-6">Status Sistem</th>
              <th className="px-8 py-6 text-right">Tindakan Khusus</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {cases.map((c, i) => (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                key={c.caseId} 
                className="hover:bg-white/5 transition-colors cursor-pointer group"
                onClick={() => navigate('/klinisi/dashboard/demo')}
              >
                <td className="px-8 py-6 font-bold text-white group-hover:text-[#06B6D4] transition-colors">{c.caseId}</td>
                <td className="px-8 py-6 font-medium">{c.patientName}</td>
                <td className="px-8 py-6 text-xs text-slate-400 font-mono">{c.date}</td>
                <td className="px-8 py-6">
                  <span className={`text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 ${
                    c.priority === 'Tinggi' ? 'text-red-400' : 'text-slate-400'
                  }`}>
                    {c.priority === 'Tinggi' && <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></div>}
                    {c.priority}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <span className={`text-[9px] px-3 py-1.5 rounded-md uppercase tracking-widest font-bold border ${
                    c.status === 'ANALISIS' ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30' :
                    c.status === 'SELESAI' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                    'bg-slate-500/10 text-slate-400 border-slate-500/30'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center ml-auto text-slate-500 group-hover:bg-[#06B6D4] group-hover:border-[#06B6D4] group-hover:text-white transition-all">
                    <ChevronRight size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
