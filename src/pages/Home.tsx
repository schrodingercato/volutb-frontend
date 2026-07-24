import { useNavigate } from 'react-router-dom';
import { Activity, ArrowUpRight, CheckCircle2, ScanLine, Layers, Database } from 'lucide-react';
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
             <span className="text-slate-500 text-[9px] uppercase tracking-wider font-bold">Klinik</span>
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
              Alat Bantu Keputusan Klinis
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.1] text-slate-800">
              Masa Depan <br/><span className="text-[#3b8a95]">Skrining Tuberkulosis.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-slate-500 text-lg md:text-xl leading-relaxed mb-10 font-medium">
              Sistem AI cerdas yang mampu mengubah satu foto rontgen dada biasa (2D) menjadi rekonstruksi paru 3D. Membantu dokter menemukan lokasi pasti infeksi tuberkulosis tanpa perlu CT scan tambahan.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex gap-4">
              <button 
                onClick={() => navigate('/klinisi/login')}
                className="bg-[#3b8a95] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#2c6b74] transition-all shadow-md flex items-center gap-2"
              >
                Masuk ke Dasbor
                <ArrowUpRight size={18} />
              </button>
            </motion.div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: customEase, delay: 0.2 }} className="relative w-full h-[550px] flex items-center justify-center">
             <div className="w-full h-full bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-slate-100 p-4 relative overflow-hidden flex flex-col">
                <div className="flex gap-2 items-center mb-4 pb-4 border-b border-slate-100 px-2">
                   <div className="w-3 h-3 rounded-full bg-red-400"></div>
                   <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                   <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                
                <div className="flex-1 bg-slate-50 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-100 p-8">
                   <div className="w-full h-full grid grid-cols-2 gap-6">
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center p-6 text-center">
                         <div className="w-24 h-32 bg-slate-100 rounded-lg mb-4 flex items-center justify-center border border-slate-200">
                            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Rontgen 2D</span>
                         </div>
                         <h3 className="font-bold text-slate-700 text-sm mb-1">Data Awal</h3>
                         <p className="text-[10px] text-slate-500">1 Foto Rontgen Dada</p>
                      </div>
                      
                      <div className="bg-[#3b8a95]/5 rounded-2xl border border-[#3b8a95]/20 shadow-sm flex flex-col items-center justify-center p-6 text-center relative">
                         <div className="w-32 h-32 bg-white rounded-full mb-4 flex items-center justify-center shadow-md border border-[#3b8a95]/30">
                            <Activity size={32} className="text-[#3b8a95]" />
                         </div>
                         <h3 className="font-bold text-[#3b8a95] text-sm mb-1">Hasil Rekonstruksi 3D</h3>
                         <p className="text-[10px] text-slate-500">Lokasi Presisi & Tampak Samping</p>
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
            Cara Kerja VoluTB
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: customEase, delay: 0.1 }} viewport={{ once: true }} className="text-slate-500 text-center text-lg max-w-2xl mb-20 font-medium">
            Tiga langkah sederhana bagaimana sistem kami membantu dokter mendeteksi sebaran infeksi Tuberkulosis dari satu foto rontgen.
          </motion.p>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            
            <motion.div variants={itemVariants} className="bg-[#f8fafc] border border-slate-200 p-10 rounded-[2rem] shadow-sm hover:shadow-md hover:border-[#3b8a95]/30 transition-all text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm mb-6">
                <ScanLine size={28} className="text-[#3b8a95]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">1. Unggah Foto</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Dokter hanya perlu mengunggah satu foto rontgen dada standar milik pasien. Sistem otomatis memperbaiki kualitas gambarnya.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#f8fafc] border border-slate-200 p-10 rounded-[2rem] shadow-sm hover:shadow-md hover:border-[#3b8a95]/30 transition-all text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm mb-6">
                <Layers size={28} className="text-[#3b8a95]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">2. Proses ke 3D</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Sistem AI canggih kami memproses foto datar tersebut menjadi model paru-paru tiga dimensi tanpa paparan radiasi tambahan.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#f8fafc] border border-slate-200 p-10 rounded-[2rem] shadow-sm hover:shadow-md hover:border-[#3b8a95]/30 transition-all text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm mb-6">
                <CheckCircle2 size={28} className="text-[#3b8a95]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">3. Deteksi Lokasi</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Sistem menandai lokasi persis rongga infeksi (kavitas) dan menghasilkan foto tampak samping sebagai panduan bagi dokter.
              </p>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* --- GATEWAYS SECTION --- */}
      <section id="gateways" className="relative w-full py-32 px-8 z-10 bg-[#f0f4f8]">
        <div className="relative z-10 w-full max-w-5xl flex flex-col items-center mx-auto">
          
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: customEase }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold mb-4 text-center tracking-tight text-slate-800">
            Akses <span className="text-[#3b8a95]">Portal</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: customEase, delay: 0.1 }} viewport={{ once: true }} className="text-slate-500 text-center text-lg max-w-2xl mb-20 font-medium">
            Sistem VoluTB dirancang secara khusus untuk dua pengguna berbeda demi menjaga privasi dan keakuratan informasi.
          </motion.p>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              onClick={() => navigate('/klinisi/login')} 
              className="group cursor-pointer bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-[#3b8a95]/30 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#3b8a95]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex justify-between items-start mb-12 relative z-10">
                <div className="w-16 h-16 rounded-[1.5rem] bg-[#3b8a95]/10 border border-[#3b8a95]/20 flex items-center justify-center group-hover:bg-[#3b8a95] transition-all">
                  <Activity size={28} className="text-[#3b8a95] group-hover:text-white transition-colors" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 group-hover:text-[#3b8a95] transition-colors">Untuk Dokter</span>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Portal Tenaga Medis</h3>
                <p className="text-sm text-slate-500 mb-10 font-medium leading-relaxed">
                  Ruang kerja khusus dokter untuk mengunggah rontgen pasien, melihat hasil rekonstruksi 3D secara detail, dan memberikan validasi medis.
                </p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#3b8a95]">Masuk Sekarang</span>
                  <div className="w-10 h-10 rounded-full bg-[#3b8a95] border border-[#3b8a95] flex items-center justify-center text-white">
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
              
              <div className="flex justify-between items-start mb-12 relative z-10">
                <div className="w-16 h-16 rounded-[1.5rem] bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-500 transition-all">
                  <Database size={28} className="text-blue-500 group-hover:text-white transition-colors" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 group-hover:text-blue-500 transition-colors">Untuk Pasien</span>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Akses Riwayat Pasien</h3>
                <p className="text-sm text-slate-500 mb-10 font-medium leading-relaxed">
                  Portal aman bagi pasien untuk memantau ringkasan hasil rontgen mereka yang telah disetujui dokter, dengan bahasa yang mudah dipahami.
                </p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-500 transition-colors">Lihat Data Anda</span>
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
          <span className="text-xs font-bold tracking-widest uppercase text-slate-500">VoluTB Sistem Medis</span>
        </div>
        <p className="text-[10px] text-slate-400 font-medium">© 2026 Tim Deenpeleb (Institut Teknologi Sepuluh Nopember). All rights reserved.</p>
      </footer>
    </div>
  );
};
