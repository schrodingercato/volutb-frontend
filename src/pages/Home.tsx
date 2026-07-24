import { useNavigate } from 'react-router-dom';
import { Activity, ArrowUpRight, BrainCircuit, ScanLine, Layers, Database } from 'lucide-react';
import { motion } from 'framer-motion';

export const Home = () => {
  const navigate = useNavigate();

  // Premium Animation Curves
  const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: customEase } }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] font-sans selection:bg-[#3b8a95] selection:text-white relative text-slate-800 overflow-x-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#e8f3f4] to-transparent z-0 pointer-events-none"></div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full px-8 py-6 z-50 flex justify-between items-center bg-white/70 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#3b8a95] rounded-lg flex items-center justify-center text-white font-serif italic shadow-md">
             V
          </div>
          <div className="flex flex-col">
             <span className="text-[#3b8a95] font-bold text-lg leading-none tracking-tight">VoluTB</span>
             <span className="text-slate-500 text-[9px] uppercase tracking-wider font-bold">Engine</span>
          </div>
        </div>
        <div className="flex gap-8 items-center text-xs uppercase tracking-wider font-bold text-slate-600">
          <a href="#how-it-works" className="cursor-pointer hover:text-[#3b8a95] transition-colors">Proses</a>
          <a href="#about" className="cursor-pointer hover:text-[#3b8a95] transition-colors">Teknologi</a>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-20 px-8 z-10">
        <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="flex flex-col items-start text-left max-w-2xl">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3b8a95]/30 bg-[#3b8a95]/10 text-[#3b8a95] text-[10px] uppercase font-bold tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b8a95] animate-pulse"></span>
              Sistem Analisis Spasial
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.1] text-slate-800">
              Transformasi <br/><span className="text-[#3b8a95]">Onkologi Spasial.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-slate-500 text-lg md:text-xl leading-relaxed mb-10 font-medium">
              Sistem AI mengubah citra rontgen 2D datar menjadi rekontruksi spasial 3D (Pseudo-CT), merevolusi pelacakan kavitas tuberkulosis dengan lokalisasi presisi.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex gap-4">
              <button 
                onClick={() => navigate('/klinisi/login')}
                className="bg-[#3b8a95] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#2c6b74] transition-all shadow-md flex items-center gap-2"
              >
                Akses Dasbor Medis
                <ArrowUpRight size={18} />
              </button>
              <button 
                className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm"
              >
                Pelajari Lebih Lanjut
              </button>
            </motion.div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: customEase, delay: 0.2 }} className="relative w-full h-[600px] flex items-center justify-center">
             <div className="w-full h-full bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-slate-100 p-4 relative overflow-hidden flex flex-col">
                <div className="flex gap-2 items-center mb-4 pb-4 border-b border-slate-100 px-2">
                   <div className="w-3 h-3 rounded-full bg-red-400"></div>
                   <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                   <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                
                <div className="flex-1 bg-slate-50 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-100">
                   <div className="absolute inset-0 grid grid-cols-2 gap-4 p-8">
                      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 flex flex-col justify-center items-center">
                         <div className="w-32 h-48 bg-slate-100 rounded-md mb-4 flex items-center justify-center">
                            <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Input 2D</span>
                         </div>
                      </div>
                      <div className="bg-[#3b8a95]/5 rounded-lg border border-[#3b8a95]/20 shadow-sm p-4 flex flex-col justify-center items-center relative">
                         <div className="absolute top-4 right-4 text-[#3b8a95]"><Activity size={20} /></div>
                         <div className="w-48 h-48 bg-white rounded-full mb-4 flex items-center justify-center shadow-lg border border-[#3b8a95]/20 relative">
                            <div className="w-32 h-32 rounded-full border-2 border-dashed border-[#3b8a95]/50 flex items-center justify-center">
                               <div className="w-16 h-16 bg-[#3b8a95]/20 rounded-full animate-ping"></div>
                               <div className="absolute w-2 h-2 bg-[#3b8a95] rounded-full"></div>
                            </div>
                         </div>
                         <span className="text-[#3b8a95] font-bold text-xs uppercase tracking-widest">Pseudo-CT 3D</span>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>

        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="how-it-works" className="relative w-full py-32 px-8 z-10 bg-white border-y border-slate-200">
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
          
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: customEase }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold mb-4 text-center tracking-tight text-slate-800">
            Alur Kerja Sistem
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: customEase, delay: 0.1 }} viewport={{ once: true }} className="text-slate-500 text-center text-lg max-w-2xl mb-20 font-medium">
            Tiga langkah otomatisasi bagaimana VoluTB mengubah data rontgen mentah menjadi wawasan klinis terukur berbasis YOLOv8.
          </motion.p>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            
            <motion.div variants={itemVariants} className="bg-[#f8fafc] border border-slate-200 p-10 rounded-[2rem] shadow-sm hover:shadow-md hover:border-[#3b8a95]/30 transition-all">
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
                  <ScanLine size={24} className="text-[#3b8a95]" />
                </div>
                <span className="text-4xl font-black text-slate-200">01</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Input CXR 2D</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Klinisi mengunggah citra rontgen dada (PA) 2D standar pasien. Sistem memvalidasi resolusi dan kejernihan medis secara otomatis.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#f8fafc] border border-slate-200 p-10 rounded-[2rem] shadow-sm hover:shadow-md hover:border-[#3b8a95]/30 transition-all">
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
                  <Layers size={24} className="text-[#3b8a95]" />
                </div>
                <span className="text-4xl font-black text-slate-200">02</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Voxel Diffusion</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Arsitektur difusi tingkat lanjut mengekstrapolasi data piksel 2D menjadi matriks spasial 3D (Pseudo-CT) tanpa paparan radiasi ekstra.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#f8fafc] border border-slate-200 p-10 rounded-[2rem] shadow-sm hover:shadow-md hover:border-[#3b8a95]/30 transition-all">
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
                  <BrainCircuit size={24} className="text-[#3b8a95]" />
                </div>
                <span className="text-4xl font-black text-slate-200">03</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Lokalisasi YOLOv8</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Model YOLOv8 mendeteksi dan melokalisasi rongga (kavitas) tuberkulosis, menghitung volume, dan menyajikan dasbor analitik.
              </p>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* --- GATEWAYS SECTION --- */}
      <section id="gateways" className="relative w-full min-h-screen flex items-center justify-center py-32 px-8 z-10 bg-[#f0f4f8]">
        <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
          
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: customEase }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold mb-4 text-center tracking-tight text-slate-800">
            Akses <span className="text-[#3b8a95]">Portal</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: customEase, delay: 0.1 }} viewport={{ once: true }} className="text-slate-500 text-center text-lg max-w-2xl mb-20 font-medium">
            Sistem terintegrasi ganda. Dasbor klinikal analitis untuk tenaga medis, dan ringkasan penyembuhan untuk pasien.
          </motion.p>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              onClick={() => navigate('/klinisi/login')} 
              className="group cursor-pointer bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-[#3b8a95]/30 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#3b8a95]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex justify-between items-start mb-16 relative z-10">
                <div className="w-16 h-16 rounded-[1.5rem] bg-[#3b8a95]/10 border border-[#3b8a95]/20 flex items-center justify-center group-hover:bg-[#3b8a95] transition-all">
                  <Activity size={28} className="text-[#3b8a95] group-hover:text-white transition-colors" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 group-hover:text-[#3b8a95] transition-colors">[01] GATEWAY</span>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-800 mb-1">Clinician Studio</h3>
                <p className="text-sm text-slate-500 mb-10 font-medium leading-relaxed">
                  Advanced diagnostic toolkit. Real-time 3D voxel diffusion and cavity localization metrics for specialists.
                </p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-[#3b8a95] transition-colors">Authenticate</span>
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-[#3b8a95] group-hover:border-[#3b8a95] group-hover:text-white transition-all text-slate-600">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              onClick={() => navigate('/pasien/login')} 
              className="group cursor-pointer bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-blue-400/30 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex justify-between items-start mb-16 relative z-10">
                <div className="w-16 h-16 rounded-[1.5rem] bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-500 transition-all">
                  <Database size={28} className="text-blue-500 group-hover:text-white transition-colors" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 group-hover:text-blue-500 transition-colors">[02] PORTAL</span>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-800 mb-1">Patient Access</h3>
                <p className="text-sm text-slate-500 mb-10 font-medium leading-relaxed">
                  Secure medical record access. Monitor your longitudinal therapy progress with empathetic, visual insights.
                </p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-500 transition-colors">View Records</span>
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 group-hover:text-white transition-all text-slate-600">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-slate-200 bg-white flex flex-col items-center justify-center z-10 relative">
        <div className="flex items-center gap-2 opacity-50 mb-4">
          <div className="w-4 h-4 bg-slate-400 rounded-sm flex items-center justify-center text-white font-serif italic text-[8px]">V</div>
          <span className="text-xs font-bold tracking-widest uppercase text-slate-500">VoluTB Engine</span>
        </div>
        <p className="text-[10px] text-slate-400 font-medium">© 2024 Spatial Oncology Systems. All rights reserved.</p>
      </footer>
    </div>
  );
};
