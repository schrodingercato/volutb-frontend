import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockQuery } from '../../data/mockDatabase';

export const Login = () => {
  const navigate = useNavigate();
  const [nip, setNip] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Autentikasi dengan Mock Database
    const result = mockQuery.loginKlinisi(nip, password);
    
    if (result.success) {
      // Simpan state user ke localStorage untuk demo
      localStorage.setItem('volutb_clinician', JSON.stringify(result.data));
      navigate('/klinisi/worklist');
    } else {
      setError(result.error || 'Autentikasi gagal');
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#030509] flex items-center justify-center font-['Outfit'] selection:bg-[#06b6d4] selection:text-white">
      {/* Premium Cinematic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -50, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#1e3a8a]/20 blur-[150px] mix-blend-screen" />
        <motion.div animate={{ scale: [1, 1.5, 1], x: [0, -100, 0], y: [0, 50, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#06b6d4]/10 blur-[150px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
      </div>
      
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 w-full max-w-md p-10 bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 rounded-[1.5rem] bg-black/50 border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
            <Activity size={32} className="text-[#06B6D4]" />
          </div>
          <p className="text-[10px] text-[#06B6D4] uppercase tracking-widest font-bold mb-2">Secure Access Gateway</p>
          <h1 className="text-4xl font-['Playfair_Display'] italic text-white tracking-tight">Clinician <span className="font-['Outfit'] font-black not-italic text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Studio.</span></h1>
        </div>
        
        {/* Error Message */}
        {error && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3">
             <AlertCircle size={18} className="text-red-400 shrink-0" />
             <p className="text-xs text-red-300 font-medium">{error}</p>
          </motion.div>
        )}
        
        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
             <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">ID Dokter / NIP</label>
             <input 
               type="text" 
               value={nip}
               onChange={(e) => setNip(e.target.value)}
               placeholder="Masukkan NIP (Coba: 12345)" 
               className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#06B6D4]/50 focus:bg-white/[0.05] transition-all" 
             />
          </div>
          
          <div className="flex flex-col gap-2">
             <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Kata Sandi</label>
             <input 
               type="password" 
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               placeholder="Masukkan Kata Sandi (Coba: admin)" 
               className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#06B6D4]/50 focus:bg-white/[0.05] transition-all" 
             />
          </div>
          
          <button type="submit" className="w-full mt-4 bg-white/5 border border-white/10 hover:bg-[#06B6D4] hover:border-[#06B6D4] text-white hover:text-black font-bold py-4 rounded-2xl flex justify-center items-center gap-2 transition-all duration-300 group">
            Otorisasi Akses <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button type="button" onClick={() => navigate('/')} className="text-[10px] text-slate-500 hover:text-white transition-colors mt-2 text-center w-full uppercase tracking-widest font-bold">
            Kembali ke Beranda Utama
          </button>
        </form>
      </motion.div>
    </div>
  );
};
