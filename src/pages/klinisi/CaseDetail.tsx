import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Maximize2, MousePointer2, ZoomIn, ScanFace, Layers, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const CaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clahe, setClahe] = useState(50);
  const [slice, setSlice] = useState(50);

  return (
    <div className="h-full w-full flex gap-4 font-sans text-slate-300">
      
      {/* LEFT COLUMN: 2D Source & Validation (W: 300px) */}
      <div className="w-[320px] bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col overflow-hidden backdrop-blur-xl">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
            <Layers size={14} className="text-[#06B6D4]" /> 2D Source
          </h2>
          <span className="text-[9px] bg-white/5 text-slate-400 px-2 py-0.5 rounded border border-white/10 font-mono">DICOM RAW</span>
        </div>
        
        <div className="flex-1 relative p-4 flex flex-col gap-4">
          <div className="w-full aspect-[3/4] bg-black rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center shadow-inner">
            {/* Mocking the X-Ray image */}
            <div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center grayscale mix-blend-screen opacity-60" style={{ filter: `contrast(${clahe + 50}%) brightness(${100 - clahe/4}%)` }}></div>
            
            {/* U-Net Highlight Box mock */}
            <div className="absolute top-[25%] left-[30%] w-16 h-16 border-2 border-[#EF4444] bg-[#EF4444]/10 rounded shadow-[0_0_15px_rgba(239,68,68,0.5)]">
               <span className="absolute -top-5 left-0 text-[9px] bg-[#EF4444] text-white px-1 py-0.5 rounded font-mono font-bold">U-NET OVERLAY</span>
            </div>
          </div>
          
          <div className="bg-[#0B0F17] p-4 rounded-xl border border-white/5">
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">CLAHE Contrast</label>
              <span className="text-[10px] font-mono text-[#06B6D4]">{clahe}%</span>
            </div>
            <input type="range" min="0" max="100" value={clahe} onChange={(e) => setClahe(parseInt(e.target.value))} className="w-full accent-[#06B6D4] h-1 bg-white/10 rounded-full appearance-none cursor-pointer" />
          </div>
        </div>
      </div>

      {/* CENTER COLUMN: 3D Pseudo-CT Canvas (Flex-1) */}
      <div className="flex-1 bg-black rounded-2xl border border-white/10 relative overflow-hidden flex flex-col shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
        
        {/* VTK/ThreeJS Floating Overlay Tools */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <ToolButton icon={<MousePointer2 size={16} />} active />
          <ToolButton icon={<ZoomIn size={16} />} />
          <ToolButton icon={<ScanFace size={16} />} />
        </div>
        
        <div className="absolute top-4 right-4 z-10">
          <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 transition-colors backdrop-blur-md">
            <Maximize2 size={16} />
          </button>
        </div>

        {/* 3D Canvas Area (Simulated) */}
        <div className="flex-1 relative flex items-center justify-center">
           {/* Futuristic 3D Volume Mock */}
           <div className="relative w-[60vh] h-[60vh] max-w-[500px] max-h-[500px] flex items-center justify-center opacity-80 mix-blend-screen">
             
             {/* Base Volume Grid */}
             <div className="absolute w-full h-full border-[0.5px] border-[#0F52BA]/30 rounded-[100px] border-dashed rotate-45 animate-[spin_60s_linear_infinite]"></div>
             <div className="absolute w-[80%] h-[80%] border border-[#06B6D4]/20 rounded-full"></div>
             
             {/* Center Lung Mass Volume (Simulated by glowing radial gradient) */}
             <div className="absolute w-[60%] h-[70%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#06B6D4]/20 via-[#0F52BA]/5 to-transparent rounded-[40%]"></div>
             
             {/* Glowing Lesion Mask (Amber/Red) per spec */}
             <motion.div 
               animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
               transition={{ duration: 3, repeat: Infinity }}
               className="absolute top-[25%] left-[25%] w-16 h-16 bg-[#F59E0B]/40 blur-md rounded-full shadow-[0_0_30px_rgba(245,158,11,0.8)]"
             ></motion.div>
             <div className="absolute top-[25%] left-[25%] w-16 h-16 border border-[#EF4444] rounded-full border-dashed transform rotate-12"></div>
             
             {/* Pointer Line to Lesion */}
             <div className="absolute top-[30%] left-[40%] w-32 h-[1px] bg-[#F59E0B] origin-left -rotate-12">
                <div className="absolute right-0 -top-3 text-[9px] font-mono font-bold text-[#F59E0B] bg-[#0B0F17] border border-[#F59E0B]/30 px-2 py-0.5 rounded shadow-lg">
                  VOL: 4.2cm³ (LOBUS SUP. DEXTRA)
                </div>
             </div>
           </div>
        </div>

        {/* Slice Slider Bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[60%] max-w-[400px] bg-[#0B0F17]/80 backdrop-blur-md p-3 rounded-xl border border-white/10 flex flex-col gap-2 z-10">
           <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Axial Slice Viewer</span>
              <span className="text-[10px] font-mono text-white">Z: {slice} / 120</span>
           </div>
           <input type="range" min="0" max="120" value={slice} onChange={(e) => setSlice(parseInt(e.target.value))} className="w-full accent-white h-1 bg-white/10 rounded-full appearance-none cursor-pointer" />
        </div>
      </div>

      {/* RIGHT COLUMN: Diagnostic & Localization Summary (W: 340px) */}
      <div className="w-[340px] flex flex-col gap-4">
        
        {/* Info Card */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 backdrop-blur-xl">
           <div className="flex justify-between items-start mb-4">
             <div>
               <h1 className="text-xl font-black text-white">{id || 'CS-2024-089'}</h1>
               <p className="text-xs text-slate-400 mt-1">Gregory Smith • 45 Tahun (L)</p>
             </div>
             <span className="px-2 py-1 bg-amber-500/10 text-[#F59E0B] text-[9px] font-bold rounded uppercase tracking-wider border border-[#F59E0B]/20">Pending Review</span>
           </div>
           
           <div className="w-full h-[1px] bg-white/5 my-4"></div>
           
           <h3 className="text-[10px] uppercase tracking-widest text-[#06B6D4] font-bold mb-3">Lokalisasi Anatomis (AI)</h3>
           <div className="flex flex-col gap-2">
             <div className="bg-[#0B0F17] p-3 rounded-xl border border-white/5 flex gap-3 items-center">
               <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center font-bold font-mono text-xs border border-[#F59E0B]/30">RUL</div>
               <div>
                 <p className="text-xs font-bold text-white">Lobus Superior Dextra</p>
                 <p className="text-[10px] text-slate-400 mt-0.5">Paru Kanan Atas</p>
               </div>
             </div>
           </div>

           <div className="w-full h-[1px] bg-white/5 my-4"></div>
           
           <h3 className="text-[10px] uppercase tracking-widest text-[#06B6D4] font-bold mb-3">Metrik Klinis</h3>
           <div className="grid grid-cols-2 gap-2">
             <div className="bg-[#0B0F17] p-3 rounded-xl border border-white/5">
                <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Kavitas Vol.</p>
                <p className="text-sm font-mono text-white">4.2 cm³</p>
             </div>
             <div className="bg-[#0B0F17] p-3 rounded-xl border border-white/5">
                <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Stabilitas AI</p>
                <p className="text-sm font-mono text-[#06B6D4]">94%</p>
             </div>
           </div>
        </div>

        {/* Gatekeeper Action Bar */}
        <div className="mt-auto bg-white/[0.02] border border-white/5 rounded-2xl p-5 backdrop-blur-xl flex flex-col gap-3">
           <h3 className="text-[9px] uppercase tracking-widest text-slate-500 font-bold text-center mb-2">Gatekeeper Actions</h3>
           
           <button onClick={() => navigate('/klinisi/worklist')} className="w-full bg-[#EF4444]/10 hover:bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30 font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
             <XCircle size={16} /> Tolak / Minta Re-Scan
           </button>
           
           <button onClick={() => navigate('/klinisi/worklist')} className="w-full bg-[#F59E0B]/10 hover:bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30 font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
             <AlertTriangle size={16} /> Revisi Manual Masking
           </button>
           
           <button onClick={() => navigate('/klinisi/worklist')} className="w-full bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors border border-white/10 mt-2">
             <CheckCircle2 size={16} /> Setujui & Terbitkan
           </button>
        </div>

      </div>

    </div>
  );
};

const ToolButton = ({ icon, active }: { icon: React.ReactNode, active?: boolean }) => (
  <button className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${active ? 'bg-[#06B6D4] text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-[#0B0F17]/80 backdrop-blur-md text-slate-400 hover:text-white border border-white/10'}`}>
    {icon}
  </button>
);
