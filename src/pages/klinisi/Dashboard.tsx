import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ShieldCheck, Database, Calendar } from 'lucide-react';
import { mockQuery } from '../../data/mockDatabase';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Simulasi Fetching dari API
    const res = mockQuery.getPatientData("P-089");
    setData(res);
  }, []);

  if (!data) return <div className="p-10 text-slate-500">Memuat data diagnostik...</div>;
  const { patient, scan } = data;

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 font-sans">
      
      {/* Tab Navigation (Static) */}
      <div className="flex gap-4">
         <button className="bg-clinical text-white px-8 py-3 rounded-xl text-sm font-medium shadow-sm w-48 transition-colors">
            Analisis Spasial
         </button>
         <button onClick={() => navigate('/klinisi/worklist')} className="bg-white text-slate-500 hover:bg-slate-50 px-8 py-3 rounded-xl text-sm font-medium border border-slate-200 shadow-sm w-48 transition-colors">
            Kembali ke Worklist
         </button>
      </div>

      {/* Patient Header Card */}
      <div className="bg-white rounded-[1.5rem] border border-slate-200 p-6 flex justify-between items-center shadow-sm">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
               <Database size={20} />
            </div>
            <div>
               <h2 className="text-lg font-bold text-slate-800">Detail Kasus: {patient.name}</h2>
               <p className="text-xs text-slate-500">Rekam Medis: {patient.nik} | Usia: {patient.age} Thn | Gender: {patient.gender}</p>
            </div>
         </div>
         <div className="flex gap-4">
            <div className="flex flex-col items-end">
               <span className="text-xs text-slate-400 font-medium">Status</span>
               <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mt-1">
                 {patient.status}
               </span>
            </div>
            <div className="flex flex-col items-end">
               <span className="text-xs text-slate-400 font-medium">Tanggal Pemeriksaan</span>
               <div className="flex items-center gap-1 text-sm font-bold text-slate-700 mt-1">
                  <Calendar size={14} className="text-clinical" />
                  {scan.date}
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Clinical Metrics */}
         <div className="col-span-1 flex flex-col gap-6">
            
            <div className="bg-white border border-slate-200 rounded-[1.5rem] p-6 shadow-sm">
               <h3 className="text-sm font-bold text-slate-800 mb-4 border-b border-slate-100 pb-3">Informasi Diagnostik</h3>
               
               <div className="flex flex-col gap-4">
                 <div>
                    <span className="text-xs text-slate-400 block mb-1">Diagnosa Awal</span>
                    <span className="text-sm font-medium text-slate-800">{scan.initialDiagnosis}</span>
                 </div>
                 <div>
                    <span className="text-xs text-slate-400 block mb-1">Fokus Lokalisasi 3D</span>
                    <span className="text-sm font-medium text-slate-800">{scan.focusPoint}</span>
                 </div>
                 <div>
                    <span className="text-xs text-slate-400 block mb-1">Volume Kavitas Awal (Bulan 0)</span>
                    <span className="text-sm font-medium text-slate-800">{scan.volumeBase} cm³</span>
                 </div>
                 <div>
                    <span className="text-xs text-slate-400 block mb-1">Volume Kavitas Kini (Bulan 2)</span>
                    <span className="text-sm font-bold text-emerald-600">{scan.volumeEval1} cm³</span>
                 </div>
               </div>
            </div>

            <div className="bg-[#f0f4f8] border border-slate-200/50 rounded-[1.5rem] p-6 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Activity size={64} className="text-clinical" />
               </div>
               <h3 className="text-sm font-bold text-slate-800 mb-3 relative z-10 flex items-center gap-2">
                 <ShieldCheck size={16} className="text-clinical" /> Rekomendasi AI
               </h3>
               <p className="text-xs text-slate-600 leading-relaxed relative z-10 text-justify">
                 {scan.recommendation}
               </p>
               <div className="mt-4 inline-block bg-clinical text-white text-[10px] font-bold px-3 py-1.5 rounded-full">
                  Laju Penyusutan: {scan.trend}
               </div>
            </div>
         </div>

         {/* Main Chart Area */}
         <div className="col-span-2 bg-white border border-slate-200 rounded-[1.5rem] flex flex-col overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
               <h3 className="text-sm font-bold text-slate-800">Kurva Regresi Volume Kavitas</h3>
               <span className="text-[10px] text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full font-medium">YOLOv8 + Voxel Diffusion</span>
            </div>
            
            <div className="h-[400px] flex items-end justify-between px-16 pt-12 relative bg-white">
               {/* Grid lines */}
               <div className="absolute inset-0 z-0 flex flex-col justify-between p-8 pointer-events-none">
                  <div className="w-full h-px bg-slate-100 border-b border-dashed border-slate-200"></div>
                  <div className="w-full h-px bg-slate-100 border-b border-dashed border-slate-200"></div>
                  <div className="w-full h-px bg-slate-100 border-b border-dashed border-slate-200"></div>
                  <div className="w-full h-px bg-slate-100 border-b border-dashed border-slate-200"></div>
               </div>
               
               {/* Base */}
               <div className="z-10 flex flex-col items-center h-full justify-end w-1/4">
                 <div className="w-20 h-[80%] bg-slate-200 rounded-t-lg relative border border-slate-300 flex justify-center">
                    <span className="absolute -top-6 text-xs font-bold text-slate-600">{scan.volumeBase}cm³</span>
                 </div>
                 <div className="mt-4 text-xs font-bold text-slate-600">Baseline (Bln-0)</div>
               </div>
               
               {/* Eval 1 */}
               <div className="z-10 flex flex-col items-center h-full justify-end w-1/4">
                 <div className="w-20 h-[35%] bg-clinical/20 rounded-t-lg relative border border-clinical/50 flex justify-center shadow-[0_-5px_15px_rgba(59,138,149,0.1)]">
                    <span className="absolute -top-6 text-sm font-bold text-clinical">{scan.volumeEval1}cm³</span>
                 </div>
                 <div className="mt-4 text-xs font-bold text-clinical">Evaluasi (Bln-2)</div>
               </div>
               
               {/* Eval Final (Predicted) */}
               <div className="z-10 flex flex-col items-center h-full justify-end w-1/4 opacity-40">
                 <div className="w-20 h-[10%] bg-slate-100 rounded-t-lg border border-dashed border-slate-300"></div>
                 <div className="mt-4 text-xs font-bold text-slate-400">Proyeksi (Bln-6)</div>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
};
