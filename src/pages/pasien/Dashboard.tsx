import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, HeartPulse, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockQuery } from '../../data/mockDatabase';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Simulasi Fetching dari API
    const res = mockQuery.getPatientData("P-089");
    setData(res);
  }, []);

  if (!data) return <div className="p-10">Memuat data medis Anda...</div>;
  const { patient, scan } = data;

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800 font-['Outfit'] font-light relative overflow-hidden">
      
      {/* Background Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-400/10 blur-[120px] mix-blend-multiply" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-teal-400/10 blur-[120px] mix-blend-multiply" />
      </div>

      {/* Top Navbar */}
      <nav className="relative z-10 px-8 py-6 flex justify-between items-center max-w-5xl mx-auto">
         <div className="flex flex-col gap-0">
           <span className="text-2xl font-black tracking-tighter text-slate-800">VOLUTB.</span>
           <span className="text-[8px] uppercase tracking-[0.3em] font-mono text-emerald-500 font-bold">Patient Portal</span>
         </div>
         <button 
           onClick={() => {
             localStorage.removeItem('volutb_patient');
             navigate('/pasien/login');
           }}
           className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:bg-red-50 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors shadow-sm"
         >
           <LogOut size={16} />
         </button>
      </nav>

      <div className="max-w-5xl mx-auto w-full pb-20 px-8 relative z-10 mt-10">
        
        {/* Header Status */}
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-['Playfair_Display'] italic text-slate-800 tracking-tight mb-3">Halo, {patient.name}</h1>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest font-bold">ID Rekam Medis: {patient.nik}</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="bg-white/60 backdrop-blur-3xl border border-emerald-100 rounded-[2.5rem] p-10 shadow-[0_20px_60px_rgba(16,185,129,0.08)] mb-10 flex items-center gap-8 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-5">
             <ShieldCheck size={250} className="text-emerald-500" />
          </div>
          <div className="w-20 h-20 rounded-[1.5rem] bg-emerald-100/50 flex items-center justify-center text-emerald-500 shrink-0 border border-emerald-200/50 relative z-10 shadow-sm">
            <CheckCircle2 size={36} />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Kondisi Anda Semakin Membaik!</h2>
            <p className="text-slate-600 leading-relaxed text-lg font-light">
              Evaluasi rontgen terbaru menunjukkan penyusutan kavitas sebesar <strong className="text-emerald-600 font-bold">{scan.trend}</strong>. Teruskan pengobatan secara teratur.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-10">
          
          {/* Interactive Anatomical Card */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col items-center">
             <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8 w-full text-center">Visualisasi Area Peradangan</h3>
             
             <div className="relative w-[200px] h-[220px] mb-8">
                {/* Simplified Friendly Lungs Illustration */}
                <svg viewBox="0 0 200 220" className="w-full h-full drop-shadow-lg">
                  <path d="M40,50 Q20,120 40,190 Q70,210 90,180 Q100,100 80,50 Q60,30 40,50" fill="#E2E8F0" />
                  <path d="M160,50 Q180,120 160,190 Q130,210 110,180 Q100,100 120,50 Q140,30 160,50" fill="#E2E8F0" />
                  
                  {/* Active Tracking Point */}
                  <circle cx="60" cy="80" r="15" fill="#10B981" opacity="0.2" className="animate-pulse" />
                  <circle cx="60" cy="80" r="6" fill="#10B981" />
                  <line x1="60" y1="80" x2="-20" y2="40" stroke="#10B981" strokeWidth="2" strokeDasharray="4" />
                </svg>
                <div className="absolute -left-16 top-6 bg-white border border-emerald-200 text-emerald-600 text-[9px] uppercase tracking-widest font-bold px-4 py-2 rounded-full shadow-lg">
                   Fokus Area
                </div>
             </div>

             <div className="text-center mt-auto bg-slate-50 border border-slate-100 rounded-2xl p-4 w-full">
               <p className="text-slate-600 text-sm font-medium">
                 Pemantauan utama di <strong className="text-emerald-600">{scan.focusPoint}</strong>.
               </p>
             </div>
          </motion.div>

          {/* Longitudinal Therapy Timeline */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] p-10 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between">
             <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-10 text-center">Lini Masa Pemulihan (Fase Lanjutan)</h3>
             
             <div className="relative flex justify-between items-center px-6 mt-4 mb-16">
                {/* Background Line */}
                <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1 bg-slate-200 rounded-full z-0"></div>
                {/* Progress Line */}
                <div className="absolute left-10 w-[50%] top-1/2 -translate-y-1/2 h-1 bg-emerald-400 rounded-full z-0 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                
                {/* Point 1: Bulan 0 */}
                <div className="relative z-10 flex flex-col items-center gap-4 cursor-pointer group">
                   <div className="w-10 h-10 rounded-full bg-emerald-500 border-4 border-white shadow-lg flex items-center justify-center text-white"><CheckCircle2 size={16} /></div>
                   <div className="text-center">
                     <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-1">Awal Terapi</p>
                     <p className="text-sm font-bold text-slate-800">Bulan 0</p>
                   </div>
                </div>

                {/* Point 2: Bulan 2 (Active) */}
                <div className="relative z-10 flex flex-col items-center gap-4 cursor-pointer">
                   <div className="absolute -top-14 bg-emerald-50 border border-emerald-200 text-emerald-600 text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-full shadow-sm whitespace-nowrap">Evaluasi Saat Ini</div>
                   <div className="w-10 h-10 rounded-full bg-emerald-400 border-4 border-white shadow-lg shadow-emerald-500/30"></div>
                   <div className="text-center">
                     <p className="text-[9px] uppercase tracking-widest font-bold text-emerald-500 mb-1">Evaluasi 1</p>
                     <p className="text-sm font-bold text-slate-800">Bulan 2</p>
                   </div>
                </div>

                {/* Point 3: Bulan 6 (Future) */}
                <div className="relative z-10 flex flex-col items-center gap-4 opacity-40">
                   <div className="w-10 h-10 rounded-full bg-slate-200 border-4 border-white shadow-sm"></div>
                   <div className="text-center">
                     <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-1">Akhir Terapi</p>
                     <p className="text-sm font-bold text-slate-500">Bulan 6</p>
                   </div>
                </div>
             </div>

             <div className="mt-auto bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100/50 flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-white border border-emerald-100 flex items-center justify-center shrink-0 shadow-sm text-emerald-500">
                  <HeartPulse size={24} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-emerald-600 mb-2">Pesan Klinis Otomatis</h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-light">
                    "Respons jaringan parut sangat optimal. Tidak ada lesi satelit baru yang terdeteksi. Pertahankan kepatuhan minum obat secara disiplin."
                  </p>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
