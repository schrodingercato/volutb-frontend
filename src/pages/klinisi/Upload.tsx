import { useState } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, FileText, CalendarClock, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Upload = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [nik, setNik] = useState('');
  const [name, setName] = useState('');
  const [timepoint, setTimepoint] = useState('Bulan ke-0 (Baseline)');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !nik || !name) return;
    
    // Simulate upload process then redirect to worklist
    setTimeout(() => {
      navigate('/klinisi/worklist');
    }, 1000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 font-sans">
      
      {/* Page Header */}
      <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex justify-between items-center relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#3b8a95]/10 to-transparent pointer-events-none"></div>
         <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Unggah Citra Diagnostik Baru</h2>
            <p className="text-slate-500 text-sm font-medium">Unggah format DICOM/CXR 2D standar untuk direkonstruksi menjadi model pseudo-CT 3D.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Metadata Form */}
        <div className="lg:col-span-1 bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm h-fit">
           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FileText size={20} className="text-[#3b8a95]" />
              Metadata Pasien
           </h3>
           
           <form id="uploadForm" onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">NIK Pasien</label>
                <input 
                  type="text" 
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  placeholder="Masukkan 16 digit NIK..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3b8a95] focus:ring-1 focus:ring-[#3b8a95]"
                  required
                />
                <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                  <AlertCircle size={10}/> NIK akan dienkripsi secara otomatis.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nama Pasien</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama lengkap pasien"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3b8a95] focus:ring-1 focus:ring-[#3b8a95]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Titik Waktu (Timepoint)</label>
                <div className="relative">
                  <CalendarClock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select 
                    value={timepoint}
                    onChange={(e) => setTimepoint(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#3b8a95] appearance-none"
                  >
                    <option>Bulan ke-0 (Baseline)</option>
                    <option>Bulan ke-2 (Fase Intensif)</option>
                    <option>Bulan ke-4 (Fase Lanjutan)</option>
                    <option>Bulan ke-6 (Akhir Terapi)</option>
                  </select>
                </div>
              </div>
           </form>
        </div>

        {/* Upload Dropzone */}
        <div className="lg:col-span-2 flex flex-col gap-6">
           <div 
             className={`bg-white rounded-[2rem] border-2 border-dashed ${isDragging ? 'border-[#3b8a95] bg-[#3b8a95]/5' : 'border-slate-200 hover:border-[#3b8a95]/50'} transition-all flex flex-col items-center justify-center p-12 h-[350px] relative`}
             onDragEnter={handleDrag}
             onDragLeave={handleDrag}
             onDragOver={handleDrag}
             onDrop={handleDrop}
           >
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".dcm,image/jpeg,image/png"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
                }}
              />
              
              {file ? (
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={40} className="text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">File Berhasil Dilampirkan</h3>
                    <p className="text-sm text-slate-500 font-medium">{file.name}</p>
                    <p className="text-xs text-slate-400 mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setFile(null);
                    }}
                    className="text-xs font-bold text-red-500 hover:underline mt-2 z-10 relative"
                  >
                    Ganti File
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 text-center pointer-events-none">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-2">
                    <UploadCloud size={40} className="text-[#3b8a95]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">Tarik & Lepas Citra di Sini</h3>
                    <p className="text-sm text-slate-500 font-medium">atau klik untuk memilih dari komputer</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-md mt-4">
                    <AlertCircle size={14} />
                    Mendukung DICOM (.dcm), PNG, atau JPG Resolusi Tinggi
                  </div>
                </div>
              )}
           </div>

           {/* Submit Button Area */}
           <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <input type="checkbox" id="consent" className="w-4 h-4 rounded border-slate-300 text-[#3b8a95] focus:ring-[#3b8a95]" required form="uploadForm" />
                 <label htmlFor="consent" className="text-xs text-slate-500 leading-relaxed max-w-md">
                   Saya menyatakan bahwa pengunggahan data ini telah melalui proses *Informed Consent* dan disetujui untuk analisis klinis.
                 </label>
              </div>
              
              <button 
                type="submit"
                form="uploadForm"
                disabled={!file || !nik || !name}
                className={`px-8 py-3 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2 ${
                  file && nik && name 
                    ? 'bg-[#3b8a95] hover:bg-[#2c6b74] text-white cursor-pointer' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                Mulai Proses Difusi
                <Activity size={18} />
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};
