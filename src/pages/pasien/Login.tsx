import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockQuery } from '../../data/mockDatabase';

export const Login = () => {
  const navigate = useNavigate();
  const [nik, setNik] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Autentikasi dengan Mock Database
    const result = mockQuery.loginPasien(nik, dob);
    
    if (result.success) {
      // Simpan state user ke localStorage untuk demo
      localStorage.setItem('volutb_patient', JSON.stringify(result.data));
      navigate('/pasien/beranda');
    } else {
      setError(result.error || 'Autentikasi gagal');
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#f4f7fb] flex items-center justify-center font-['Outfit'] selection:bg-emerald-500 selection:text-white">
      {/* Premium Clean Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -50, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-400/10 blur-[150px] mix-blend-multiply" />
        <motion.div animate={{ scale: [1, 1.5, 1], x: [0, -100, 0], y: [0, 50, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-teal-400/10 blur-[150px] mix-blend-multiply" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-multiply"></div>
      </div>
      
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 w-full max-w-md p-10 bg-white/60 backdrop-blur-3xl border border-slate-200/60 rounded-[2.5rem] shadow-[0_30px_60px_rgba(16,185,129,0.08)]">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 rounded-[1.5rem] bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-sm">
            <User size={32} className="text-emerald-500" />
          </div>
          <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold mb-2">Patient Portal</p>
          <h1 className="text-4xl font-['Playfair_Display'] italic text-slate-800 tracking-tight">Patient <span className="font-['Outfit'] font-black not-italic text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-500">Access.</span></h1>
        </div>
        
        {/* Error Message */}
        {error && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3">
             <AlertCircle size={18} className="text-red-500 shrink-0" />
             <p className="text-xs text-red-600 font-medium">{error}</p>
          </motion.div>
        )}
        
        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
             <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Nomor NIK Anda</label>
             <input 
               type="text" 
               value={nik}
               onChange={(e) => setNik(e.target.value)}
               placeholder="Contoh: 3201010101" 
               className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all" 
             />
          </div>
          
          <div className="flex flex-col gap-2">
             <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Tanggal Lahir</label>
             <input 
               type="date" 
               value={dob}
               onChange={(e) => setDob(e.target.value)}
               className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all" 
             />
             <p className="text-[9px] text-slate-400 font-medium mt-1 ml-1">Hint: Coba 01-01-1990</p>
          </div>
          
          <button type="submit" className="w-full mt-4 bg-white border border-slate-200 hover:bg-emerald-500 hover:border-emerald-500 text-slate-800 hover:text-white font-bold py-4 rounded-2xl flex justify-center items-center gap-2 transition-all duration-300 group shadow-sm">
            Lihat Data Saya <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button type="button" onClick={() => navigate('/')} className="text-[10px] text-slate-400 hover:text-slate-800 transition-colors mt-2 text-center w-full uppercase tracking-widest font-bold">
            Kembali ke Beranda Utama
          </button>
        </form>
      </motion.div>
    </div>
  );
};
