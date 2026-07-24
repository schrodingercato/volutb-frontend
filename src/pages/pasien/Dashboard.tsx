import { useState } from 'react';
import { LogOut, HeartPulse, CheckCircle2, Calendar, Download, Pill, ChevronRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const PasienDashboard = () => {
  const navigate = useNavigate();
  const [activeMonth, setActiveMonth] = useState(2); // Default to month 2
  
  const timelineData = [
    { month: 0, label: 'Awal Terapi', status: 'Selesai', note: 'Diagnosis awal ditegakkan. Area infeksi terdeteksi di paru-paru kanan atas. Pengobatan dimulai.' },
    { month: 2, label: 'Evaluasi Tahap 1', status: 'Aktif', note: 'Kabar baik! Area titik pemantauan menunjukkan perbaikan yang stabil. Ukuran rongga infeksi mengecil dibanding bulan sebelumnya.' },
    { month: 4, label: 'Evaluasi Lanjutan', status: 'Menunggu', note: 'Jadwal rontgen evaluasi berikutnya. Terus lanjutkan minum obat.' },
    { month: 6, label: 'Akhir Terapi', status: 'Menunggu', note: 'Evaluasi penyelesaian pengobatan. Harapan pemulihan penuh.' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-20">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 h-[72px] flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-serif italic font-bold">V</div>
              <span className="font-bold text-lg text-slate-800 tracking-tight">VoluTB Portal</span>
           </div>
           
           <div className="flex items-center gap-6 text-sm font-bold text-slate-600">
             <span className="hidden md:inline-block">Halo, Bapak Budi</span>
             <button 
               onClick={() => {
                 localStorage.removeItem('volutb_pasien');
                 navigate('/login');
               }}
               className="flex items-center gap-2 hover:text-red-500 transition-colors bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200"
             >
               <LogOut size={16} /> <span className="hidden md:inline-block">Keluar</span>
             </button>
           </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-8 flex flex-col gap-6">
        
        {/* Welcome & Status Header */}
        <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-[2rem] p-8 text-white shadow-md shadow-emerald-500/20 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-full bg-white/10 blur-3xl rounded-full"></div>
           <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                 <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-white/20">
                    <HeartPulse size={14} /> Ringkasan Kesehatan
                 </div>
                 <h2 className="text-3xl font-bold mb-2">Tampak Membaik!</h2>
                 <p className="text-emerald-50 font-medium max-w-lg leading-relaxed">
                   Kondisi paru-paru Anda menunjukkan perkembangan yang positif. Tetap jalankan pola hidup sehat dan rutin minum obat sesuai anjuran medis.
                 </p>
              </div>
              <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 text-center shrink-0">
                 <span className="block text-[10px] uppercase font-bold tracking-widest text-emerald-100 mb-1">Evaluasi Terakhir</span>
                 <span className="block text-2xl font-bold">12 Okt 2024</span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           
           {/* Simplified Anatomical Card */}
           <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <h3 className="font-bold text-slate-800 text-lg mb-2">Area Pemantauan</h3>
              <p className="text-sm text-slate-500 font-medium mb-8">Ilustrasi sederhana titik pemulihan Anda.</p>
              
              <div className="relative w-48 h-56 flex items-center justify-center">
                 {/* Vector Lung Illustration */}
                 <div className="relative w-40 h-48 bg-blue-50/50 rounded-t-full flex justify-between px-2 pt-4 border-2 border-blue-100">
                    <div className="w-16 h-36 bg-blue-100/50 rounded-[40%] relative border border-blue-200/50">
                       {/* Highlight Dot (Right Upper Lobe) */}
                       <div className="absolute top-6 left-6">
                          <div className="w-4 h-4 bg-amber-400 rounded-full animate-ping absolute opacity-75"></div>
                          <div className="w-4 h-4 bg-amber-500 rounded-full border-2 border-white relative z-10"></div>
                       </div>
                    </div>
                    <div className="w-16 h-36 bg-blue-100/50 rounded-[40%] border border-blue-200/50"></div>
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-3 h-16 bg-blue-200/30"></div>
                 </div>
              </div>
              
              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-left w-full">
                 <h4 className="text-sm font-bold text-amber-700 flex items-center gap-2 mb-1">
                    <CheckCircle2 size={16} /> Paru-Paru Kanan Atas
                 </h4>
                 <p className="text-xs text-amber-700/80 leading-relaxed font-medium">
                    Titik fokus ini adalah area yang sedang dalam proses penyembuhan. Kabar baiknya, area ini terus mengecil.
                 </p>
              </div>
           </div>

           {/* Medical Advice & Actions */}
           <div className="flex flex-col gap-6">
              
              <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex-1">
                 <h3 className="font-bold text-slate-800 text-lg mb-6">Anjuran Medis</h3>
                 
                 <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-start">
                       <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shrink-0">
                          <Pill size={20} />
                       </div>
                       <div>
                          <h4 className="font-bold text-slate-700 text-sm mb-1">Rutin Minum Obat (OAT)</h4>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed">Sangat penting untuk tidak melewatkan jadwal minum obat agar bakteri tidak menjadi kebal.</p>
                       </div>
                    </div>
                    
                    <div className="w-full h-px bg-slate-100 my-2"></div>
                    
                    <div className="flex gap-4 items-start">
                       <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shrink-0">
                          <Calendar size={20} />
                       </div>
                       <div>
                          <h4 className="font-bold text-slate-700 text-sm mb-1">Jadwal Kontrol Poli Paru</h4>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed">Senin, 12 Desember 2024 (Bulan ke-4).</p>
                       </div>
                    </div>
                 </div>
              </div>

              <button className="w-full bg-slate-800 text-white font-bold py-4 rounded-[1.5rem] hover:bg-slate-700 transition-all shadow-md flex items-center justify-center gap-2 group">
                <Download size={18} />
                Unduh Ringkasan Edukasi (PDF)
              </button>

           </div>
        </div>

        {/* 6-Month Timeline */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm mt-2">
           <h3 className="font-bold text-slate-800 text-lg mb-8 flex items-center gap-2">
             <Activity size={20} className="text-blue-500" /> Lini Masa Pengobatan 6 Bulan
           </h3>
           
           <div className="relative">
              {/* Connecting Line */}
              <div className="absolute top-6 left-12 right-12 h-1 bg-slate-100 rounded-full z-0">
                 <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: '33%' }}></div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 relative z-10">
                 {timelineData.map((step, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setActiveMonth(step.month)}
                      className="flex flex-col items-center cursor-pointer group"
                    >
                       <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all border-4 ${
                         activeMonth === step.month 
                           ? 'bg-blue-500 border-blue-100 text-white scale-110 shadow-md' 
                           : step.status === 'Selesai'
                             ? 'bg-blue-500 border-white text-white'
                             : 'bg-white border-slate-200 text-slate-400 group-hover:border-blue-300'
                       }`}>
                          <span className="font-bold text-sm">{step.month}</span>
                       </div>
                       <span className={`text-[10px] font-bold uppercase tracking-widest text-center ${
                         activeMonth === step.month ? 'text-blue-600' : 'text-slate-400'
                       }`}>
                         {step.label}
                       </span>
                    </div>
                 ))}
              </div>
           </div>
           
           {/* Timeline Note Card */}
           <motion.div 
             key={activeMonth}
             initial={{ opacity: 0, y: 10 }} 
             animate={{ opacity: 1, y: 0 }}
             className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5"
           >
              <h4 className="text-sm font-bold text-blue-800 mb-2 flex items-center gap-2">
                 Catatan Bulan ke-{activeMonth}
              </h4>
              <p className="text-sm text-blue-900/70 font-medium leading-relaxed">
                 {timelineData.find(d => d.month === activeMonth)?.note}
              </p>
           </motion.div>
        </div>

      </main>
    </div>
  );
};
