import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f2f6f7] font-sans text-slate-800 selection:bg-[#3b8a95] selection:text-white flex flex-col">
      
      {/* NAVBAR */}
      <nav className="h-20 flex items-center justify-between px-8 lg:px-16 relative z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#3b8a95] rounded-xl flex items-center justify-center text-white shadow-md shadow-[#3b8a95]/20">
            <span className="font-serif italic font-bold text-xl">V</span>
          </div>
          <div className="flex flex-col">
             <span className="font-bold text-lg tracking-wide leading-none text-slate-800">VoluTB</span>
             <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Klinik</span>
          </div>
        </div>

        <div className="flex items-center">
          <button 
            onClick={() => navigate('/login')}
            className="px-6 py-2.5 bg-[#3b8a95] text-white text-sm font-bold rounded-lg hover:bg-[#2c6b74] transition-all shadow-sm"
          >
            Login Sistem
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-between px-8 lg:px-16 pt-12 lg:pt-0 gap-12 relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Left: Typography */}
        <div className="w-full lg:w-1/2 flex flex-col items-start z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >

            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-slate-800 mb-6">
              Sistem<br />
              <span className="text-[#3b8a95]">Rekonstruksi 3D</span><br />
              Tuberkulosis.
            </h1>
            
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-lg mb-8">
              Sistem AI presisi yang memproses satu citra rontgen dada (CXR 2D) menjadi rekonstruksi volume paru 3D. Membantu tenaga medis melokalisasi kavitas tuberkulosis dengan tingkat akurasi spasial tinggi.
            </p>
          </motion.div>
        </div>

        {/* Right: Abstract Visualization Cards (With Dummy Images) */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full max-w-[500px]"
          >
            {/* Main Application Window Mockup */}
            <div className="bg-white rounded-[2rem] shadow-2xl p-4 border border-slate-200/50 relative overflow-hidden">
               {/* Browser/Window dots */}
               <div className="flex gap-2 mb-4 px-2">
                 <div className="w-3 h-3 rounded-full bg-red-400"></div>
                 <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                 <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
               </div>
               
               <div className="grid grid-cols-2 gap-4 h-[350px]">
                  {/* Card 1: 2D Input */}
                  <div className="bg-slate-50 rounded-2xl flex flex-col p-4 border border-slate-100 items-center justify-center relative overflow-hidden group">
                     <span className="absolute top-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest z-10">Rontgen 2D</span>
                     {/* Dummy Image for X-ray */}
                     <img src="/gambarrontgen.jpg" alt="Chest X-Ray Dummy" className="w-32 h-40 object-cover rounded-xl shadow-sm mb-4" />
                     <h3 className="font-bold text-slate-700 text-sm">Data Awal</h3>
                     <p className="text-[10px] text-slate-500 font-medium">1 Foto Rontgen PA</p>
                  </div>
                  
                  {/* Card 2: 3D Output */}
                  <div className="bg-[#f0f4f8] rounded-2xl flex flex-col p-4 border border-slate-200/50 items-center justify-center relative overflow-hidden">
                     {/* Dummy Image for 3D Lungs */}
                     <img src="/gambardummy.jpeg" alt="3D Reconstruction Dummy" className="w-40 h-40 object-cover rounded-full shadow-lg mb-4 border-4 border-white object-center" />
                     <h3 className="font-bold text-[#3b8a95] text-sm">Hasil Rekonstruksi 3D</h3>
                     <p className="text-[10px] text-slate-500 font-medium text-center">Lokasi Presisi &amp; Volume</p>
                  </div>
               </div>
            </div>
            
            {/* Decorative background shapes */}
            <div className="absolute -z-10 top-10 -right-10 w-64 h-64 bg-[#3b8a95]/10 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </main>

    </div>
  );
};
