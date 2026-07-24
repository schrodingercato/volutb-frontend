import { useNavigate } from 'react-router-dom';
import { User, Activity, ArrowUpRight, ChevronDown, Sparkles, BrainCircuit, ScanLine, Layers, CheckCircle2, Sun, Moon, ShieldCheck } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';

// Unified Global Background (Fixed Position)
const FluidBackground = ({ isDark }: { isDark: boolean }) => (
  <div className={`fixed inset-0 overflow-hidden pointer-events-none z-0 transition-colors duration-1000 ${isDark ? 'bg-[#030509]' : 'bg-[#f4f7fb]'}`}>
    {/* Global Blobs */}
    <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -50, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className={`absolute top-[0%] left-[0%] w-[50vw] h-[50vw] rounded-full blur-[150px] mix-blend-screen ${isDark ? 'bg-[#1e3a8a]/20' : 'bg-[#0ea5e9]/20'}`} />
    <motion.div animate={{ scale: [1, 1.5, 1], x: [0, -100, 0], y: [0, 50, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className={`absolute bottom-[0%] right-[0%] w-[60vw] h-[60vw] rounded-full blur-[150px] mix-blend-screen ${isDark ? 'bg-[#06b6d4]/10' : 'bg-[#3b82f6]/15'}`} />
    <motion.div animate={{ scale: [1, 1.1, 1], x: [0, 50, 0], y: [0, 50, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className={`absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full blur-[150px] mix-blend-screen ${isDark ? 'bg-[#4c1d95]/10' : 'bg-[#8b5cf6]/10'}`} />
    
    {/* Grain Overlay */}
    <div className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] ${isDark ? 'opacity-[0.15] mix-blend-overlay' : 'opacity-[0.03] mix-blend-multiply'}`}></div>
  </div>
);

export const Home = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const yHeroText = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const yHeroImage = useTransform(scrollYProgress, [0, 1], [0, 150]);

  // Theme Variables
  const textMain = isDark ? "text-white" : "text-slate-900";
  const textMuted = isDark ? "text-slate-400" : "text-slate-500";
  const textAccent = isDark ? "text-slate-300" : "text-slate-600";
  const bgCard = isDark ? "bg-white/[0.03]" : "bg-white/60";
  const bgCardHover = isDark ? "hover:bg-white/[0.08]" : "hover:bg-white/90";
  const borderCard = isDark ? "border-white/10" : "border-slate-200/60";
  const shadowCard = isDark ? "shadow-[0_30px_60px_rgba(0,0,0,0.5)]" : "shadow-[0_30px_60px_rgba(14,165,233,0.1)]";

  // Premium Animation Curves
  const customEase = [0.22, 1, 0.36, 1];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: customEase } }
  };

  return (
    <div className={`w-full min-h-screen font-['Outfit'] font-light selection:bg-[#06b6d4] selection:text-white relative transition-colors duration-1000 ${textMain}`}>
      
      <FluidBackground isDark={isDark} />

      {/* Navbar with Theme Toggle */}
      <nav className={`fixed top-0 left-0 w-full px-8 py-6 z-50 flex justify-between items-center pointer-events-none transition-colors duration-500 ${isDark ? 'mix-blend-difference' : 'bg-white/30 backdrop-blur-md border-b border-slate-200/50 mix-blend-normal'}`}>
        <div className="flex flex-col gap-0">
          <span className="text-2xl font-black tracking-tighter">VOLUTB.</span>
          <span className={`text-[8px] uppercase tracking-[0.3em] font-mono ${textAccent}`}>Engine</span>
        </div>
        <div className="flex gap-8 items-center text-[10px] uppercase tracking-widest font-bold">
          <a href="#how-it-works" className={`pointer-events-auto cursor-pointer transition-colors ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-black'}`}>Process</a>
          <a href="#about" className={`pointer-events-auto cursor-pointer transition-colors ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-black'}`}>Technology</a>
          
          {/* Theme Toggle Button */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className={`pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-900/10 hover:bg-slate-900/20 text-slate-900'}`}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-screen flex items-center px-8 md:px-24 overflow-hidden z-10 max-w-[1600px] mx-auto">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Typography */}
            <motion.div 
              style={{ y: yHeroText }}
              initial="hidden" animate="visible" variants={containerVariants}
              className="flex flex-col z-20 pt-20 lg:pt-0"
            >
               <motion.div variants={itemVariants} className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border w-fit mb-8 backdrop-blur-sm ${isDark ? 'border-white/10 bg-white/[0.02]' : 'border-slate-300 bg-white/50'}`}>
                  <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-pulse"></span>
                  <span className={`text-[10px] uppercase tracking-widest font-bold ${textAccent}`}>Volumetric AI v2.4</span>
               </motion.div>
               
               <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.9] mb-6">
                 <span className={`block text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-white to-slate-400' : 'from-slate-900 to-slate-500'}`}>Pioneering</span>
                 <span className="block font-['Playfair_Display'] italic font-normal text-[#06b6d4] tracking-tight py-2">Spatial</span>
                 <span className={`block text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-white to-slate-500' : 'from-slate-900 to-slate-600'}`}>Oncology.</span>
               </motion.h1>
               
               <motion.p variants={itemVariants} className={`${textMuted} text-lg md:text-xl font-light leading-relaxed max-w-md mb-12 border-l-2 border-[#06b6d4] pl-6`}>
                 Sistem AI mengubah rontgen 2D datar menjadi rekontruksi spasial 3D (Pseudo-CT), merevolusi pelacakan kavitas tuberkulosis dengan lokalisasi presisi.
               </motion.p>
            </motion.div>

            {/* Right: X-Ray to 3D Asset */}
            <motion.div 
              style={{ y: yHeroImage }}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2, ease: customEase, delay: 0.4 }}
              className="relative w-full aspect-square flex items-center justify-center pointer-events-none z-10"
            >
              <img 
                src="/hero_xray.png" 
                alt="2D to 3D X-Ray Reconstruction" 
                className={`w-full h-full max-w-[800px] object-contain drop-shadow-[0_0_80px_rgba(6,182,212,0.4)] ${isDark ? 'mix-blend-screen' : 'mix-blend-multiply opacity-90'}`}
                style={{ WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)' }}
              />
            </motion.div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="how-it-works" className={`relative w-full py-32 px-8 md:px-24 z-10`}>
         <div className="max-w-7xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerVariants} className="text-center mb-24">
               <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-['Playfair_Display'] italic mb-4">The Workflow</motion.h2>
               <motion.p variants={itemVariants} className={`${textMuted} font-light max-w-xl mx-auto`}>Tiga langkah revolusioner bagaimana VoluTB mengubah data rontgen mentah menjadi wawasan klinis terukur berbasis YOLOv8.</motion.p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Step 1 */}
               <motion.div variants={itemVariants} className={`${bgCard} ${bgCardHover} ${borderCard} border p-8 rounded-[2rem] transition-all duration-500 hover:-translate-y-2 group ${shadowCard}`}>
                  <div className="text-[#06b6d4] text-5xl font-black opacity-20 mb-6 group-hover:opacity-100 group-hover:scale-110 origin-left transition-all duration-500 font-mono">01</div>
                  <ScanLine size={32} className={`${textMain} mb-6`} />
                  <h3 className="text-2xl font-bold mb-3">Input CXR 2D</h3>
                  <p className={`${textMuted} text-sm leading-relaxed`}>Klinisi mengunggah citra rontgen dada (PA) 2D standar pasien. Sistem memvalidasi resolusi dan kejernihan medis secara otomatis.</p>
               </motion.div>

               {/* Step 2 */}
               <motion.div variants={itemVariants} className={`${bgCard} ${bgCardHover} ${borderCard} border p-8 rounded-[2rem] transition-all duration-500 hover:-translate-y-2 group ${shadowCard}`}>
                  <div className="text-[#06b6d4] text-5xl font-black opacity-20 mb-6 group-hover:opacity-100 group-hover:scale-110 origin-left transition-all duration-500 font-mono">02</div>
                  <Layers size={32} className={`${textMain} mb-6`} />
                  <h3 className="text-2xl font-bold mb-3">Voxel Diffusion</h3>
                  <p className={`${textMuted} text-sm leading-relaxed`}>Arsitektur difusi tingkat lanjut mengekstrapolasi data piksel 2D menjadi matriks spasial 3D (Pseudo-CT) tanpa paparan radiasi ekstra.</p>
               </motion.div>

               {/* Step 3 */}
               <motion.div variants={itemVariants} className={`${bgCard} ${bgCardHover} ${borderCard} border p-8 rounded-[2rem] transition-all duration-500 hover:-translate-y-2 group ${shadowCard}`}>
                  <div className="text-[#06b6d4] text-5xl font-black opacity-20 mb-6 group-hover:opacity-100 group-hover:scale-110 origin-left transition-all duration-500 font-mono">03</div>
                  <CheckCircle2 size={32} className={`${textMain} mb-6`} />
                  <h3 className="text-2xl font-bold mb-3">YOLOv8 Localization</h3>
                  <p className={`${textMuted} text-sm leading-relaxed`}>Model YOLOv8 mendeteksi dan melokalisasi rongga (kavitas) tuberkulosis, menghitung volume, dan menyajikan dasbor analitik longitudinal.</p>
               </motion.div>
            </motion.div>
         </div>
      </section>

      {/* --- ABOUT / TECHNOLOGY SECTION --- */}
      <section id="about" className="relative w-full min-h-screen flex items-center py-32 px-8 md:px-24 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 50 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.2, ease: customEase }} viewport={{ once: true, amount: 0.3 }} className={`relative w-full aspect-square md:aspect-[4/3] rounded-[3rem] overflow-hidden border ${isDark ? 'border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] bg-[#050B14]' : 'border-slate-200 shadow-2xl bg-white'}`}>
             <img src="/feature_ai.png" alt="AI Core Processing" className={`w-full h-full object-cover ${isDark ? 'opacity-80 mix-blend-screen' : 'opacity-90 mix-blend-multiply'}`} style={{ WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)' }} />
             <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#030509]' : 'from-[#f4f7fb]'} via-transparent to-transparent`}></div>
             
             <div className={`absolute bottom-8 left-8 right-8 ${isDark ? 'bg-black/60 border-white/10' : 'bg-white/80 border-slate-200'} backdrop-blur-2xl border p-6 rounded-3xl flex justify-between items-center shadow-2xl`}>
                <div>
                  <p className={`text-[9px] uppercase tracking-widest ${textMuted} mb-1 font-mono`}>Localization Accuracy</p>
                  <p className="text-3xl font-black">98.4<span className="text-[#06b6d4] text-xl">%</span></p>
                </div>
                <div className={`h-10 w-[1px] ${isDark ? 'bg-white/10' : 'bg-slate-300'}`}></div>
                <div>
                  <p className={`text-[9px] uppercase tracking-widest ${textMuted} mb-1 font-mono`}>Model Architecture</p>
                  <p className="text-xl font-bold pt-1">YOLOv8 <span className={`${textMuted} font-light text-sm`}>+ DenseNet</span></p>
                </div>
             </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerVariants} className="flex flex-col">
             <motion.div variants={itemVariants} className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#06b6d4]/30 w-fit mb-8 ${isDark ? 'bg-[#06b6d4]/10' : 'bg-[#06b6d4]/5'} backdrop-blur-sm`}>
                <ShieldCheck size={14} className="text-[#06b6d4]" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#06b6d4]">Performance Matrix</span>
             </motion.div>
             
             <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-['Playfair_Display'] italic mb-8 leading-[1.1]">
               Uncompromising <br/><strong className={`font-sans font-black text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-white to-[#06b6d4]' : 'from-slate-900 to-[#06b6d4]'} not-italic`}>Accuracy.</strong>
             </motion.h2>
             
             <motion.p variants={itemVariants} className={`${textMuted} text-lg leading-relaxed mb-10 font-light max-w-lg`}>
               Berbekal arsitektur YOLOv8 yang sangat dioptimalkan untuk pengenalan pola medis, dan didukung oleh klasifikasi DenseNet. VoluTB melokalisasi infeksi dengan kecepatan sepersekian detik.
             </motion.p>
             
             <ul className="flex flex-col gap-6">
                <motion.li variants={itemVariants} className={`flex gap-5 items-start ${bgCard} p-5 rounded-2xl border ${borderCard}`}>
                   <div className="w-12 h-12 rounded-xl bg-[#06b6d4]/10 border border-[#06b6d4]/30 flex items-center justify-center shrink-0">
                      <BrainCircuit size={20} className="text-[#06b6d4]" />
                   </div>
                   <div>
                     <h4 className="text-lg font-bold mb-1">Zero-Radiation 3D Views</h4>
                     <p className={`text-sm ${textMuted} leading-relaxed`}>Menyajikan kedalaman spasial layaknya CT-Scan tanpa memaparkan pasien pada radiasi berlebih berulang kali.</p>
                   </div>
                </motion.li>
             </ul>
          </motion.div>
        </div>
      </section>

      {/* --- GATEWAYS SECTION --- */}
      <section id="gateways" className="relative w-full min-h-screen flex items-center justify-center py-32 px-8 z-10">
        <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
          
          <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: customEase }} viewport={{ once: true }} className="text-5xl md:text-7xl font-black mb-4 text-center tracking-tighter">
            Access <span className="font-['Playfair_Display'] italic font-normal text-[#06b6d4]">Portals</span>.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: customEase, delay: 0.2 }} viewport={{ once: true }} className={`${textMuted} text-center text-lg max-w-2xl mb-24 font-light`}>
            Sistem terintegrasi ganda. Dasbor klinikal analitis untuk tenaga medis, dan ringkasan penyembuhan empatik yang mudah dipahami untuk pasien.
          </motion.p>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full">
            {/* Klinisi Card */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              onClick={() => navigate('/klinisi/login')} 
              className={`group cursor-pointer ${bgCard} backdrop-blur-3xl border ${borderCard} p-10 rounded-[3rem] ${shadowCard} hover:border-[#06b6d4]/40 transition-all duration-500 relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#06b6d4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex justify-between items-start mb-16 relative z-10">
                <div className={`w-16 h-16 rounded-[1.5rem] ${isDark ? 'bg-black/50 border-white/10' : 'bg-white border-slate-200 shadow-sm'} border flex items-center justify-center group-hover:border-[#06b6d4]/50 transition-all`}>
                  <Activity size={28} className="text-[#06b6d4]" />
                </div>
                <span className={`text-[10px] uppercase tracking-widest font-mono ${textAccent} group-hover:${textMain} transition-colors`}>[01] GATEWAY</span>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-light mb-4">Clinician <br/><strong className={`font-black ${textMain} text-5xl block mt-1`}>Studio.</strong></h3>
                <p className={`text-sm ${textMuted} mb-12 leading-relaxed font-light`}>
                  Advanced diagnostic toolkit. Real-time 3D voxel diffusion and cavity localization metrics for specialists.
                </p>
                <div className={`flex items-center justify-between border-t ${isDark ? 'border-white/5' : 'border-slate-200'} pt-6 group-hover:border-[#06b6d4]/30 transition-colors`}>
                  <span className="text-[10px] font-bold uppercase tracking-widest group-hover:text-[#06b6d4] transition-colors">Authenticate</span>
                  <div className={`w-12 h-12 rounded-full ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'} border flex items-center justify-center group-hover:bg-[#06b6d4] group-hover:border-[#06b6d4] group-hover:text-white transition-all`}>
                    <ArrowUpRight size={20} className={isDark ? 'text-white' : 'text-slate-900'} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pasien Card */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              onClick={() => navigate('/pasien/login')} 
              className={`group cursor-pointer ${bgCard} backdrop-blur-3xl border ${borderCard} p-10 rounded-[3rem] ${shadowCard} hover:border-emerald-400/40 transition-all duration-500 relative overflow-hidden md:mt-16`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex justify-between items-start mb-16 relative z-10">
                <div className={`w-16 h-16 rounded-[1.5rem] ${isDark ? 'bg-black/50 border-white/10' : 'bg-white border-slate-200 shadow-sm'} border flex items-center justify-center group-hover:border-emerald-400/50 transition-all`}>
                  <User size={28} className="text-emerald-400" />
                </div>
                <span className={`text-[10px] uppercase tracking-widest font-mono ${textAccent} group-hover:${textMain} transition-colors`}>[02] PORTAL</span>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-light mb-4">Patient <br/><strong className={`font-black ${textMain} text-5xl block mt-1`}>Access.</strong></h3>
                <p className={`text-sm ${textMuted} mb-12 leading-relaxed font-light`}>
                  Secure medical record access. Monitor your longitudinal therapy progress with empathetic, visual insights.
                </p>
                <div className={`flex items-center justify-between border-t ${isDark ? 'border-white/5' : 'border-slate-200'} pt-6 group-hover:border-emerald-400/30 transition-colors`}>
                  <span className="text-[10px] font-bold uppercase tracking-widest group-hover:text-emerald-400 transition-colors">View Records</span>
                  <div className={`w-12 h-12 rounded-full ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'} border flex items-center justify-center group-hover:bg-emerald-400 group-hover:border-emerald-400 group-hover:text-white transition-all`}>
                    <ArrowUpRight size={20} className={isDark ? 'text-white' : 'text-slate-900'} />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative w-full py-12 border-t ${isDark ? 'border-white/5' : 'border-slate-200'} bg-transparent text-center z-10`}>
         <p className={`text-[10px] font-mono ${textAccent} uppercase tracking-widest`}>
           © 2024 VoluTB Engine. All Rights Reserved.
         </p>
      </footer>

    </div>
  );
};
