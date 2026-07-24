import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Beaker, BrainCircuit, ScanLine } from 'lucide-react';
import { mockQuery } from '../../data/mockDatabase';

export const Dashboard = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Simulasi Fetching dari API
    const res = mockQuery.getPatientData("P-089");
    setData(res);
  }, []);

  if (!data) return <div className="p-10 text-white">Loading data diagnostik...</div>;
  const { patient, scan } = data;

  return (
    <div className="w-full max-w-[1400px] mx-auto font-['Outfit'] font-light">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-['Playfair_Display'] italic text-white tracking-tight mb-2">Longitudinal Cavity Tracking</h1>
          <p className="text-[10px] text-[#06B6D4] font-mono uppercase tracking-widest font-bold">Patient Data: {patient.name} ({patient.id})</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-8">
        
        {/* Main Chart */}
        <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] flex flex-col overflow-hidden backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
            <div className="flex items-center gap-3">
               <ScanLine size={18} className="text-[#06B6D4]" />
               <h3 className="text-[10px] font-bold text-white uppercase tracking-widest">Kurva Regresi Volume 3D</h3>
            </div>
            <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-md font-bold border border-emerald-500/20 uppercase tracking-widest">Respons Terapeutik Positif</span>
          </div>
          
          <div className="h-[450px] flex items-end justify-between px-16 pt-12 relative bg-[#030509] shadow-[inset_0_0_80px_rgba(0,0,0,0.5)]">
             {/* Grid lines */}
             <div className="absolute inset-0 z-0 flex flex-col justify-between p-8 pointer-events-none">
                <div className="w-full h-[1px] bg-white/5 border-b border-dashed border-white/10"></div>
                <div className="w-full h-[1px] bg-white/5 border-b border-dashed border-white/10"></div>
                <div className="w-full h-[1px] bg-white/5 border-b border-dashed border-white/10"></div>
                <div className="w-full h-[1px] bg-white/5 border-b border-dashed border-white/10"></div>
             </div>
             
             {/* Base */}
             <div className="z-10 flex flex-col items-center h-full justify-end w-1/4">
               <motion.div initial={{ height: 0 }} animate={{ height: '80%' }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="w-20 bg-white/5 rounded-t-xl relative border border-white/20 hover:bg-white/10 transition-colors cursor-crosshair group">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs font-bold text-white font-mono opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-2 py-1 rounded border border-white/10">{scan.volumeBase}cm³</div>
               </motion.div>
               <div className="mt-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Baseline (Bulan-0)</div>
             </div>
             
             {/* Eval 1 */}
             <div className="z-10 flex flex-col items-center h-full justify-end w-1/4">
               <motion.div initial={{ height: 0 }} animate={{ height: '35%' }} transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="w-20 bg-[#06B6D4]/20 rounded-t-xl relative border border-[#06B6D4]/50 shadow-[0_0_25px_rgba(6,182,212,0.2)] hover:bg-[#06B6D4]/40 transition-colors cursor-crosshair">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[14px] font-bold text-[#06B6D4] font-mono">{scan.volumeEval1}cm³</div>
               </motion.div>
               <div className="mt-6 text-[10px] font-bold text-[#06B6D4] uppercase tracking-widest">Evaluasi (Bulan-2)</div>
             </div>
             
             {/* Eval Final (Predicted) */}
             <div className="z-10 flex flex-col items-center h-full justify-end w-1/4 opacity-30">
               <div className="w-20 h-[10%] bg-white/5 rounded-t-xl border border-dashed border-white/20"></div>
               <div className="mt-6 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Proyeksi (Bulan-6)</div>
             </div>
          </div>
        </div>

        {/* Info Column */}
        <div className="flex flex-col gap-6">
          <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 backdrop-blur-3xl shadow-xl">
            <h3 className="text-[10px] uppercase tracking-widest text-[#06B6D4] font-bold mb-6 flex items-center gap-2"><Beaker size={14} /> Metadata Klinikal</h3>
            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Usia / Kelamin</span>
                <span className="text-sm text-white font-mono bg-white/5 px-2 py-1 rounded">{patient.age} Thn / {patient.gender}</span>
              </div>
              <div className="w-full h-px bg-white/5"></div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Diagnosa Awal</span>
                <span className="text-sm text-white font-mono bg-white/5 px-2 py-1 rounded">{scan.initialDiagnosis}</span>
              </div>
              <div className="w-full h-px bg-white/5"></div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Lokalisasi Fokus</span>
                <span className="text-sm text-white font-mono text-right">{scan.focusPoint}</span>
              </div>
              <div className="w-full h-px bg-white/5"></div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Laju Penyusutan</span>
                <span className="text-sm text-emerald-400 font-mono font-bold bg-emerald-400/10 border border-emerald-400/20 px-2 py-1 rounded">{scan.trend} / Bln</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[#06b6d4]/5 border border-[#06b6d4]/20 rounded-[2rem] p-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#06b6d4] blur-[80px] opacity-20 pointer-events-none"></div>
             <div className="flex items-center gap-3 mb-4 relative z-10">
               <BrainCircuit size={18} className="text-[#06B6D4]" />
               <h3 className="text-[10px] uppercase tracking-widest text-[#06B6D4] font-bold">Interpretasi AI (YOLOv8)</h3>
             </div>
             <p className="text-xs text-slate-300 leading-relaxed text-justify font-light relative z-10">
               {scan.recommendation}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
