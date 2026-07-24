import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, ArrowRight, UserCheck, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';

export const PasienLogin = () => {
  const navigate = useNavigate();
  const [nik, setNik] = useState('');
  const [activationCode, setActivationCode] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (nik && activationCode) {
      localStorage.setItem('volutb_pasien', JSON.stringify({ nik }));
      navigate('/pasien/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* LEFT PANEL - ILLUSTRATION */}
      <div className="hidden lg:flex w-1/2 bg-blue-500 relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-400 to-blue-700 opacity-90 z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/30">
            <span className="text-white font-serif italic text-xl font-bold">V</span>
          </div>
          <span className="text-white font-bold text-xl tracking-wide">VoluTB</span>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl mb-8 inline-block">
             <Database className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
            Pantau Progres <br/>Penyembuhan Anda.
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed font-medium">
            Akses riwayat kesehatan dan hasil rontgen Anda yang telah divalidasi oleh dokter spesialis secara aman dan mudah dipahami.
          </p>
        </div>

        <div className="relative z-10 text-blue-200 text-sm font-medium">
          © 2026 Tim Deenpeleb.
        </div>
      </div>

      {/* RIGHT PANEL - LOGIN FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-800 mb-3 tracking-tight">Portal Pasien</h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Silakan masukkan NIK dan Kode Aktivasi yang Anda terima dari klinik/faskes Anda.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2 relative">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nomor Induk Kependudukan (NIK)</label>
              <div className="relative">
                 <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                 <input 
                   type="text" 
                   value={nik}
                   onChange={(e) => setNik(e.target.value)}
                   className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700 placeholder:text-slate-400"
                   placeholder="16 Digit NIK Anda"
                   required
                 />
              </div>
            </div>

            <div className="space-y-2 relative">
              <div className="flex justify-between items-center ml-1">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kode Aktivasi</label>
                 <a href="#" className="text-xs font-bold text-blue-500 hover:text-blue-600 transition-colors">Lupa Kode?</a>
              </div>
              <div className="relative">
                 <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                 <input 
                   type="text" 
                   value={activationCode}
                   onChange={(e) => setActivationCode(e.target.value)}
                   className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700 placeholder:text-slate-400"
                   placeholder="Masukkan kode unik..."
                   required
                 />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 group mt-8"
            >
              Akses Rekam Medis
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

        </motion.div>
      </div>
    </div>
  );
};
