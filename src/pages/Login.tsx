import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Activity } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!idNumber) return;

    // Smart Auth Logic
    // NIK Pasien is usually exactly 16 digits
    if (idNumber.length === 16) {
      localStorage.setItem('volutb_pasien', JSON.stringify({ nik: idNumber }));
      navigate('/pasien/beranda');
    } 
    // Otherwise assume it's NIP Dokter
    else {
      localStorage.setItem('volutb_clinician', JSON.stringify({ name: "Dr. Aisyah R. Nadjib", specialization: "Pulmonologi" }));
      navigate('/klinisi/worklist');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans">
      
      {/* Top Header with ITS Logo */}
      <header className="h-20 px-8 flex items-center justify-between w-full absolute top-0 left-0 z-50">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm">
               <span className="font-serif italic font-bold">V</span>
            </div>
            <span className="font-bold text-slate-800 tracking-tight">VoluTB System</span>
         </div>
         {/* ITS Logo (Using Wikipedia link as placeholder for standard ITS logo) */}
         <img src="https://upload.wikimedia.org/wikipedia/id/8/8a/Logo_ITS.png" alt="Logo ITS" className="h-10 object-contain drop-shadow-sm opacity-90" />
      </header>

      {/* Main Login Area */}
      <main className="flex-1 flex items-center justify-center p-4 pt-20">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="w-full max-w-[1000px] flex flex-col md:flex-row bg-transparent rounded-[2rem] overflow-hidden"
         >
            
            {/* Left Box (Green Illustration) */}
            <div className="w-full md:w-[45%] bg-[#9ac98d] p-10 flex flex-col items-center justify-center relative overflow-hidden rounded-[2rem] shadow-xl z-10 md:mr-[-2rem] my-4">
               {/* Internal Card inside the green box */}
               <div className="bg-[#f8f9fb] w-full aspect-video rounded-xl shadow-inner border border-white/50 flex flex-col items-center justify-center mb-8 relative">
                  {/* Dummy Medical Illustration */}
                  <img src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=400" alt="Medical Illustration" className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-20 mix-blend-luminosity" />
                  <div className="z-10 bg-emerald-100 p-4 rounded-xl shadow-sm text-emerald-600 mb-2">
                     <Activity size={32} />
                  </div>
                  <span className="z-10 text-xs font-bold text-slate-400 uppercase tracking-widest">Medical Illustration</span>
               </div>
               
               <h2 className="text-white font-bold text-2xl mb-3 text-center">Manage your clinical cases</h2>
               <p className="text-white/80 text-sm text-center font-medium leading-relaxed max-w-[280px]">
                 Sistem rekam medis terpadu untuk pelacakan spasial longitudinal kavitas tuberkulosis.
               </p>
               
               {/* Pagination Dots */}
               <div className="flex gap-1.5 mt-8">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
               </div>
            </div>

            {/* Right Box (Login Form) */}
            <div className="w-full md:w-[60%] bg-white rounded-[2rem] p-12 lg:p-16 flex flex-col justify-center shadow-2xl z-20">
               <h1 className="text-3xl font-bold text-slate-800 mb-2">Sign in</h1>
               <p className="text-slate-500 text-sm font-medium mb-10">
                 Enter your NIP / NIK and password to access the portal.
               </p>
               
               <form onSubmit={handleLogin} className="flex flex-col gap-6">
                  
                  {/* NIP/NIK Input */}
                  <div className="flex flex-col gap-2">
                     <label className="text-xs font-bold text-slate-700">NIP (Dokter) / NIK (Pasien)</label>
                     <input 
                       type="text" 
                       value={idNumber}
                       onChange={(e) => setIdNumber(e.target.value)}
                       placeholder="e.g. 12345 (Dokter) / 16 Digit (Pasien)"
                       className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-slate-50 placeholder:text-slate-400 font-medium"
                       required
                     />
                  </div>

                  {/* Password Input */}
                  <div className="flex flex-col gap-2">
                     <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-slate-700">Password</label>
                        <a href="#" className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">Forgot password?</a>
                     </div>
                     <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full border border-slate-200 rounded-xl pl-4 pr-12 py-3.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-[#fffaeb] font-medium"
                          required
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                     </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#1e293b] text-white font-bold py-4 rounded-xl mt-4 hover:bg-black transition-colors shadow-lg shadow-slate-200"
                  >
                     Sign In
                  </button>

                  <a href="/" className="text-center text-xs font-bold text-slate-400 hover:text-slate-600 mt-6 transition-colors">
                     Kembali ke Beranda Utama
                  </a>
               </form>
            </div>

         </motion.div>
      </main>

    </div>
  );
};
