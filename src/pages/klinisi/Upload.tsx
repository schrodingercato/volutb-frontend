import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanFace, File as FileIcon, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="h-full w-full flex gap-12 font-sans items-center justify-center p-8">
      
      {/* Left Column: Hero Text */}
      <div className="flex-1 max-w-lg">
        <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-6">
          Precision 3D Localization from Single <span className="text-[#06B6D4]">2D CXR</span>.
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed mb-8">
          Unggah X-Ray (CXR) Anda. Mesin Difusi Voxel kami akan merekonstruksi topologi Paru 3D utuh, menekan paparan radiasi CT scan, dengan akurasi lokalisasi kelas klinis.
        </p>
        <div className="flex items-center gap-4 text-sm text-slate-500 font-bold uppercase tracking-widest">
           <span className="flex items-center gap-2"><Check size={16} className="text-emerald-500" /> DICOM</span>
           <span className="flex items-center gap-2"><Check size={16} className="text-emerald-500" /> PNG / JPG (PA)</span>
        </div>
      </div>

      {/* Right Column: Interactive Dropzone */}
      <div className="flex-1 max-w-md w-full flex flex-col gap-6">
        
        <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden group h-[300px] flex flex-col items-center justify-center cursor-pointer transition-all hover:border-[#06B6D4]/30 hover:bg-[#06B6D4]/5">
           
           {/* Scanning beam animation */}
           <motion.div 
             animate={{ top: ['0%', '100%', '0%'] }} 
             transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} 
             className="absolute left-0 right-0 h-[2px] bg-[#06B6D4] shadow-[0_0_15px_rgba(6,182,212,1)] z-0"
           />
           
           <input 
             type="file" 
             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
             accept=".dcm,.png,.jpg,.jpeg"
             onChange={(e) => setFile(e.target.files?.[0] || null)}
           />
           
           <div className="w-20 h-20 rounded-full bg-[#0F52BA]/20 border border-[#0F52BA]/30 flex items-center justify-center text-[#06B6D4] mb-6 relative z-10 group-hover:scale-110 transition-transform">
             <ScanFace size={40} />
           </div>
           
           <h3 className="text-xl font-bold text-white mb-2 relative z-10">Tarik Citra Ke Sini</h3>
           <p className="text-slate-400 text-sm relative z-10 text-center">Atau klik untuk menelusuri komputer Anda.</p>
        </div>

        <AnimatePresence>
          {file && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex flex-col gap-4 overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex items-center gap-3 text-white">
                  <FileIcon size={20} className="text-[#06B6D4]" />
                  <span className="text-sm font-bold truncate max-w-[200px]">{file.name}</span>
                </div>
                <button onClick={() => setFile(null)} className="text-slate-500 hover:text-[#EF4444] transition-colors"><X size={18} /></button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="NIK (Enkripsi)" className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#06B6D4] transition-colors" />
                <select className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-400 focus:outline-none focus:border-[#06B6D4] transition-colors">
                  <option value="">Fase Pemeriksaan</option>
                  <option value="Bulan-0">Bulan ke-0</option>
                  <option value="Bulan-2">Bulan ke-2</option>
                  <option value="Bulan-6">Bulan ke-6</option>
                </select>
              </div>

              <button onClick={() => navigate('/klinisi/worklist')} className="w-full bg-gradient-to-r from-[#0F52BA] to-[#06B6D4] hover:from-[#06B6D4] hover:to-[#0F52BA] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] mt-2">
                Proses Rekonstruksi Volumetrik
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
