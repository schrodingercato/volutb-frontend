import { Outlet, Link, useLocation } from 'react-router-dom';
import { Activity, LogOut, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export const PasienLayout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      {/* Sidebar */}
      <div className="w-[260px] bg-white border-r border-slate-200 flex flex-col z-20">
        <div className="h-[76px] flex items-center px-6 border-b border-slate-100">
          <div className="flex items-center gap-3 text-slate-800 font-black text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Activity size={20} />
            </div>
            VoluTB
          </div>
        </div>
        
        <div className="flex-1 p-4 flex flex-col gap-2 mt-2">
           <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2 ml-4">Rekam Medis</p>
           <NavItem to="/pasien/beranda" icon={<FileText size={20} />} label="Hasil Evaluasi" current={location.pathname} />
        </div>

        <div className="p-4 border-t border-slate-100">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-colors font-medium">
            <LogOut size={20} /> Keluar
          </Link>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <div className="h-[76px] bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-800">Status Akun:</span>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full border border-emerald-100">Terverifikasi</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-slate-800">Budi Santoso</span>
                <span className="text-xs text-slate-500">Pasien Terdaftar</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-600">
                BS
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-8 relative custom-scrollbar bg-slate-50">
           <Outlet />
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label, current }: any) => {
  const active = current.includes(to);
  return (
    <Link to={to} className={`flex items-center gap-3 px-4 py-3.5 text-sm rounded-xl transition-all relative font-bold ${active ? 'text-emerald-700 bg-emerald-50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>
      {icon}
      {label}
      {active && <motion.div layoutId="navIndicatorPasien" className="absolute left-0 top-2 bottom-2 w-1 bg-emerald-600 rounded-r-full" />}
    </Link>
  );
};
