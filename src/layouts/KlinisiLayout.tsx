import { Outlet, Link, useLocation } from 'react-router-dom';
import { Activity, List, Upload as UploadIcon, LayoutDashboard, Bell, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export const KlinisiLayout = () => {
  const location = useLocation();
  
  // Ambil data mock clinician dari localStorage
  const clinicianData = JSON.parse(localStorage.getItem('volutb_clinician') || '{}');
  const clinicianName = clinicianData.name || "Dr. Gregory S.";
  const specialization = clinicianData.specialization || "Sp. Rad (K) TR";

  return (
    <div className="flex flex-col h-screen bg-[#030509] text-slate-300 font-['Outfit'] font-light overflow-hidden selection:bg-[#06b6d4] selection:text-white">
      
      {/* Premium Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#1e3a8a]/10 blur-[150px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-overlay"></div>
      </div>

      {/* Floating Topbar Header */}
      <div className="px-8 py-6 z-50">
        <div className="h-16 bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[1.5rem] flex items-center justify-between px-6 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          
          {/* Left Side: Logo & Status */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 text-white font-black text-xl tracking-tight group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#1e3a8a] flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all">
                <Activity size={20} className="text-white" />
              </div>
              VOLUTB<span className="font-['Playfair_Display'] italic font-normal text-[#06B6D4]">Studio.</span>
            </Link>
            
            <div className="h-6 w-px bg-white/10"></div>
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#06b6d4] shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse"></div>
              <span className="text-[10px] text-[#06b6d4] font-mono tracking-widest uppercase font-bold">Secure Gateway Active</span>
            </div>
          </div>

          {/* Center Navigation */}
          <div className="flex items-center gap-2">
            <NavItem to="/klinisi/worklist" icon={<List size={16} />} label="Worklist Kasus" current={location.pathname} />
            <NavItem to="/klinisi/upload" icon={<UploadIcon size={16} />} label="Upload CXR" current={location.pathname} />
            <NavItem to="/klinisi/dashboard/demo" icon={<LayoutDashboard size={16} />} label="Analitik Spasial" current={location.pathname} />
          </div>

          {/* Right Side: Profile & Notification */}
          <div className="flex items-center gap-5">
            <button className="relative w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 transition-colors">
              <Bell size={18} />
              <div className="absolute top-0 right-0 w-3 h-3 bg-[#06b6d4] rounded-full border-2 border-[#030509] shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
            </button>
            
            <div className="flex items-center gap-3 pl-5 border-l border-white/10">
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-white">{clinicianName}</span>
                <span className="text-[9px] text-[#06B6D4] font-mono font-bold uppercase tracking-widest">{specialization}</span>
              </div>
              <div className="w-10 h-10 rounded-full border border-[#06B6D4]/30 bg-white/5 flex items-center justify-center overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(clinicianName)}&background=030509&color=06B6D4&bold=true`} alt="Avatar" className="w-full h-full" />
              </div>
            </div>
            
            <Link to="/klinisi/login" className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 flex items-center justify-center text-red-400 transition-all ml-2" onClick={() => localStorage.removeItem('volutb_clinician')}>
              <LogOut size={16} />
            </Link>
          </div>

        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 overflow-y-auto px-8 pb-8 relative z-10 custom-scrollbar">
         <Outlet />
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(6, 182, 212, 0.5); }
      `}</style>
    </div>
  );
};

const NavItem = ({ to, icon, label, current }: any) => {
  const active = current.includes(to);
  return (
    <Link to={to} className={`flex items-center gap-2 px-4 py-2.5 text-[11px] uppercase tracking-widest rounded-xl transition-all relative font-bold ${active ? 'text-white bg-white/10 border border-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}`}>
      {icon}
      {label}
      {active && <motion.div layoutId="topNavIndicator" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-[#06B6D4] rounded-t-full shadow-[0_0_10px_rgba(6,182,212,1)]" />}
    </Link>
  );
};
