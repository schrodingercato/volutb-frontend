import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, AlertCircle } from 'lucide-react';
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
    <div className="min-h-screen w-full bg-[#f2f6f7] flex items-center justify-center font-sans p-6">
      
      {/* Main Container */}
      <div className="w-full max-w-5xl flex relative h-[600px] items-center">
        
        {/* Left Side (Green/Teal Illustration Box) */}
        <div className="w-[60%] h-full bg-gradient-to-br from-[#8fc99a] to-[#a6d18a] rounded-3xl p-10 flex flex-col items-center justify-between shadow-lg relative z-0">
           
           {/* Logo Placeholder (ITS style) */}
           <div className="flex flex-col items-center mt-4">
              <div className="flex items-center gap-2">
                 <div className="w-10 h-10 bg-[#0f52ba] rounded-lg flex items-center justify-center text-white font-serif italic shadow-md">
                   V
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[#0f52ba] font-bold text-xl leading-none">VoluTB</span>
                   <span className="text-[#0f52ba] text-[10px] leading-tight">Reconstruksi<br/>Spasial 3D</span>
                 </div>
              </div>
           </div>

           {/* Illustration Placeholder */}
           <div className="w-full max-w-sm bg-white p-4 rounded-xl shadow-md mt-6 relative">
              <div className="aspect-[4/3] w-full bg-slate-50 border border-slate-100 rounded-lg flex flex-col items-center justify-center text-slate-300">
                 {/* Decorative Illustration Elements */}
                 <div className="flex gap-4 items-end mb-4">
                    <div className="w-8 h-16 bg-blue-100 rounded-sm"></div>
                    <div className="w-16 h-20 bg-emerald-100 rounded-md relative flex items-center justify-center">
                       <Activity size={24} className="text-emerald-500" />
                    </div>
                    <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                 </div>
                 <p className="text-xs font-medium">Medical Illustration</p>
              </div>
           </div>

           {/* Bottom Text */}
           <div className="text-center text-white mt-8">
              <h3 className="text-xl font-bold mb-2">Manage your clinical cases</h3>
              <p className="text-sm opacity-90 max-w-xs mx-auto">
                Sistem rekam medis terpadu untuk pelacakan spasial longitudinal kavitas tuberkulosis.
              </p>
              <div className="flex justify-center gap-1 mt-6">
                <div className="w-2 h-2 rounded-full bg-white opacity-100"></div>
                <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
                <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
              </div>
           </div>
        </div>

        {/* Right Side (White Login Card) - Overlapping */}
        <div className="absolute right-0 w-[45%] bg-white rounded-3xl p-12 shadow-[0_20px_50px_rgba(0,0,0,0.08)] z-10 border border-slate-100 min-h-[450px] flex flex-col justify-center">
           <h2 className="text-3xl font-medium text-slate-800 mb-2">Sign in</h2>
           <p className="text-xs text-slate-400 mb-8 font-medium">Enter your NIP and password to access admin panel.</p>

           {error && (
             <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-100 flex items-center gap-2">
                <AlertCircle size={16} className="text-red-500 shrink-0" />
                <p className="text-xs text-red-600 font-medium">{error}</p>
             </div>
           )}

           <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                 <label className="text-xs font-bold text-slate-700">NIP (Doctor ID)</label>
                 <input 
                   type="text" 
                   value={nip}
                   onChange={(e) => setNip(e.target.value)}
                   placeholder="Enter NIP" 
                   className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-clinical focus:ring-1 focus:ring-clinical transition-all"
                 />
              </div>

              <div className="flex flex-col gap-1.5">
                 <div className="flex justify-between items-end">
                    <label className="text-xs font-bold text-slate-700">Password</label>
                    <button type="button" className="text-xs text-clinical font-medium hover:underline">Forgot password?</button>
                 </div>
                 <input 
                   type="password" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="Enter password" 
                   className="w-full bg-[#fefce8] border border-yellow-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-clinical transition-all"
                 />
              </div>

              <div className="flex justify-end mt-4">
                 <button type="submit" className="bg-clinical hover:bg-clinical-dark text-white text-sm font-medium py-2.5 px-6 rounded-lg transition-colors">
                   Sign in
                 </button>
              </div>
           </form>
           
           <button type="button" onClick={() => navigate('/')} className="text-[10px] text-slate-400 hover:text-slate-600 transition-colors mt-8 text-center w-full">
             Kembali ke Beranda Utama
           </button>
        </div>

      </div>
    </div>
  );
};
