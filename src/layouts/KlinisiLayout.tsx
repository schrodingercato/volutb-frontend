import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, List, Upload as UploadIcon, Lock, ChevronDown, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const KlinisiLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Ambil data mock clinician dari localStorage
  const clinicianData = JSON.parse(localStorage.getItem('volutb_clinician') || '{}');
  const clinicianName = clinicianData.name || "admin";
  const specialization = clinicianData.specialization || "Available";

  // Map path ke Page Title
  const getPageTitle = (path: string) => {
    if (path.includes('dashboard')) return 'Dashboard';
    if (path.includes('worklist')) return 'Worklist Kasus';
    if (path.includes('upload')) return 'Upload Data Rontgen';
    return 'VoluTB Dashboard';
  };

  return (
    <div className="flex h-screen bg-[#f2f6f7] font-sans text-slate-800 overflow-hidden">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-[260px] bg-clinical text-white flex flex-col shadow-lg z-20 shrink-0">
         {/* Logo Area */}
         <div className="h-16 flex items-center px-6 gap-3 mb-6 mt-2">
            <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center backdrop-blur-sm">
               <span className="font-serif italic font-bold">V</span>
            </div>
            <span className="text-lg font-bold tracking-wide">VoluTB</span>
            <Lock size={16} className="ml-auto opacity-70" />
         </div>

         {/* Navigation Menu */}
         <nav className="flex-1 px-4 flex flex-col gap-1 overflow-y-auto custom-scrollbar-light">
            <span className="text-[10px] uppercase font-bold tracking-wider text-white/60 mb-2 mt-4 px-3">Dashboard</span>
            <NavItem to="/klinisi/dashboard/demo" icon={<Home size={18} />} label="Home" current={location.pathname} />

            <span className="text-[10px] uppercase font-bold tracking-wider text-white/60 mb-2 mt-6 px-3">Kasus Medis</span>
            <NavItem to="/klinisi/worklist" icon={<List size={18} />} label="Worklist Kasus" current={location.pathname} />
            <NavItem to="/klinisi/upload" icon={<UploadIcon size={18} />} label="Upload CXR" current={location.pathname} />
            
            <div className="mt-auto mb-6">
              <button 
                onClick={() => {
                  localStorage.removeItem('volutb_clinician');
                  navigate('/klinisi/login');
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                <LogOut size={18} />
                <span>Log Out</span>
              </button>
            </div>
         </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOPBAR */}
        <header className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-10 shadow-sm">
           <h1 className="text-lg font-medium text-slate-700">{getPageTitle(location.pathname)}</h1>
           
           <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                 <span className="text-sm font-bold text-slate-800 leading-tight">{clinicianName}</span>
                 <span className="text-[10px] text-clinical font-bold">{specialization}</span>
              </div>
              <div className="w-10 h-10 bg-[#ffc5c5] rounded-full flex items-center justify-center overflow-hidden border border-slate-200">
                <User size={24} className="text-slate-600 mt-2" />
              </div>
           </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
           <Outlet />
        </main>
        
        {/* FOOTER */}
        <footer className="h-12 border-t border-slate-200 flex justify-between items-center px-8 text-[11px] text-slate-400 font-medium shrink-0 bg-[#f2f6f7]">
           <div className="flex gap-4">
              <span className="hover:text-slate-600 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-slate-600 cursor-pointer transition-colors">Terms of Use</span>
           </div>
           <div>
              Copyright 2024 <span className="text-clinical font-bold cursor-pointer hover:underline">VoluTB System</span>. All Rights Reserved.
           </div>
        </footer>

      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.2); }
        
        .custom-scrollbar-light::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar-light::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-light::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
      `}</style>
    </div>
  );
};

const NavItem = ({ to, icon, label, current }: any) => {
  const active = current.includes(to);
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all ${
        active 
          ? 'bg-white text-clinical font-bold shadow-sm' 
          : 'text-white/80 hover:bg-white/10 hover:text-white'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};
