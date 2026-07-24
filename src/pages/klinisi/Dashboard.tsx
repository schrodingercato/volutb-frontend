import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Maximize2, Rotate3D, Layers, Eye, ShieldCheck, FileWarning, ArrowRight, Download, Activity, Info, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// --- Mock Database untuk Routing Dinamis ---
const caseDatabase: Record<string, any> = {
  'CS-2024-089': {
    id: 'CS-2024-089',
    patientName: 'Budi Santoso',
    nik: '3201****5678',
    status: 'APPROVED',
    timepoint: 'Bulan ke-2 (Fase Intensif)',
    notes: 'Kavitas mengecil dibanding bulan 0. Lanjutkan pengobatan sesuai standar.',
  },
  'CS-2024-091': {
    id: 'CS-2024-091',
    patientName: 'Agus Pratama',
    nik: '3172****1122',
    status: 'AWAITING REVIEW',
    timepoint: 'Bulan ke-0 (Skrining Awal)',
    notes: '',
  }
};

// --- 3D Components ---
const LungLobe = ({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) => {
  return (
    <mesh position={position} rotation={rotation}>
      <capsuleGeometry args={[1.5, 4, 16, 32]} />
      <meshPhysicalMaterial 
        color="#34d399" 
        transparent 
        opacity={0.15} 
        roughness={0.1}
        transmission={0.9}
        thickness={1}
      />
    </mesh>
  );
};

const Cavity = ({ position, scale = 1, isAmber = false }: { position: [number, number, number], scale?: number, isAmber?: boolean }) => {
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[0.4, 16, 16]} />
      <meshStandardMaterial 
        color={isAmber ? "#fbbf24" : "#ef4444"} 
        emissive={isAmber ? "#f59e0b" : "#dc2626"}
        emissiveIntensity={0.5}
        roughness={0.8}
      />
    </mesh>
  );
};

const Scene3D = ({ isolateLesion }: { isolateLesion: boolean }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3b8a95" />

      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} autoRotate={!isolateLesion} autoRotateSpeed={1} />

      <group position={[0, 0, 0]} scale={isolateLesion ? 2 : 1}>
        {!isolateLesion && (
          <>
            <LungLobe position={[-1.8, 0, 0]} rotation={[0, 0, -0.1]} />
            <LungLobe position={[1.8, 0, 0]} rotation={[0, 0, 0.1]} />
          </>
        )}
        {!isolateLesion && (
          <mesh position={[0, 3, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 2, 16]} />
            <meshStandardMaterial color="#cbd5e1" transparent opacity={0.3} />
          </mesh>
        )}
        <group position={[-1.5, 1.5, 0.5]}>
           <Cavity position={[0, 0, 0]} scale={1.2} />
           <Cavity position={[0.3, 0.2, 0.2]} scale={0.8} isAmber={true} />
           <Cavity position={[-0.2, -0.3, -0.1]} scale={0.6} />
        </group>
        <group position={[1.2, 1.8, -0.2]}>
           <Cavity position={[0, 0, 0]} scale={0.9} />
        </group>
      </group>
    </>
  );
};

export const Dashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'lungs' | 'lesion'>('lungs');
  const [clinicalNotes, setClinicalNotes] = useState('');
  
  // Dynamic Case Data
  const caseData = id && caseDatabase[id] ? caseDatabase[id] : caseDatabase['CS-2024-089'];
  const isApproved = caseData.status === 'APPROVED';

  useEffect(() => {
    if (caseData.notes) {
      setClinicalNotes(caseData.notes);
    }
  }, [caseData]);

  const handleApprove = () => {
    alert("Kasus disetujui dengan catatan: " + clinicalNotes);
    navigate('/klinisi/worklist');
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 font-sans max-w-[1600px] mx-auto pb-8">
      
      {/* Patient Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex justify-between items-center shrink-0">
         <div className="flex items-center gap-6">
            <div className="flex flex-col">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">ID KASUS</span>
               <span className="text-xl font-bold text-slate-800">{caseData.id}</span>
            </div>
            <div className="h-10 w-px bg-slate-200"></div>
            <div className="flex flex-col">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">PASIEN</span>
               <div className="flex items-center gap-2">
                 <span className="text-lg font-bold text-[#3b8a95]">{caseData.patientName}</span>
                 <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-bold">{caseData.nik}</span>
               </div>
            </div>
         </div>
         <div className="flex items-center gap-3">
            {isApproved ? (
              <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm border border-emerald-200">
                <ShieldCheck size={16} /> Telah Disetujui (Approved)
              </div>
            ) : (
              <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm border border-amber-200">
                <Activity size={16} className="animate-pulse" /> Menunggu Peninjauan
              </div>
            )}
         </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex gap-3 items-start text-sm text-slate-600 shadow-sm">
         <Info size={18} className="text-slate-400 shrink-0 mt-0.5" />
         <p>
           <strong>Peringatan Klinis:</strong> Hasil analisis ini disediakan oleh sistem berbantuan komputer (VoluTB) dan <em>bukan pengganti diagnosis profesional</em>. Keputusan klinis akhir tetap berada di tangan dokter penanggung jawab.
         </p>
      </div>

      {/* Main Grid: 3D Left, Data Right */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* LEFT COLUMN: 3D Canvas */}
        <div className="lg:col-span-7 flex flex-col min-h-[500px]">
           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex-1 p-4 flex flex-col relative overflow-hidden">
              <div className="flex justify-between items-center mb-4 z-10">
                 <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                   <Rotate3D size={18} className="text-[#3b8a95]" />
                   Visualisasi Volume 3D Lesi
                 </h3>
                 <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button 
                      onClick={() => setViewMode('lungs')}
                      className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${viewMode === 'lungs' ? 'bg-white text-[#3b8a95] shadow-sm' : 'text-slate-500'}`}
                    >
                      Full Anatomy
                    </button>
                    <button 
                      onClick={() => setViewMode('lesion')}
                      className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${viewMode === 'lesion' ? 'bg-white text-red-500 shadow-sm' : 'text-slate-500'}`}
                    >
                      Isolate Lesion
                    </button>
                 </div>
              </div>

              {/* Three.js Canvas */}
              <div className="flex-1 bg-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-800 cursor-move shadow-inner">
                 <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                    <Scene3D isolateLesion={viewMode === 'lesion'} />
                 </Canvas>

                 <div className="absolute top-4 left-4 text-white/50 text-[10px] font-medium pointer-events-none">
                   <p>Scroll: Zoom | Drag: Rotate</p>
                 </div>

                 <div className="absolute bottom-4 left-4 flex gap-3">
                   <span className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
                     <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span> Kepadatan Tinggi
                   </span>
                   <span className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
                     <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span> Kepadatan Sedang
                   </span>
                 </div>
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN: Reports & Validation */}
        <div className="lg:col-span-5 flex flex-col gap-4">
           
           {/* Analisis Volume Panel */}
           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="bg-slate-50 border-b border-slate-200 p-3">
                 <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                   <Activity size={16} className="text-blue-600" />
                   Analisis Volume
                 </h3>
              </div>
              <div className="p-5 flex flex-col gap-6">
                 
                 {/* Total Volume */}
                 <div className="flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Volume Terdeteksi</span>
                    <div className="flex items-baseline gap-1 text-[#0f172a]">
                       <span className="text-4xl font-extrabold tracking-tight">42.5</span>
                       <span className="text-sm font-bold text-slate-500">cm³</span>
                    </div>
                 </div>

                 <div className="h-px w-full bg-slate-200 border-dashed border-b"></div>

                 {/* Distribusi per Lobus */}
                 <div className="flex flex-col gap-3">
                    <span className="text-xs font-bold text-slate-800 mb-1">Distribusi per Lobus</span>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600 font-medium">Kanan Atas (RUL)</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">30.2 cm³</span>
                        <span className="text-xs text-slate-400 w-10 text-right">(71%)</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600 font-medium">Kanan Tengah (RML)</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">0.0 cm³</span>
                        <span className="text-xs text-slate-400 w-10 text-right"></span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600 font-medium">Kanan Bawah (RLL)</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">4.1 cm³</span>
                        <span className="text-xs text-slate-400 w-10 text-right">(10%)</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600 font-medium">Kiri Atas (LUL)</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">8.2 cm³</span>
                        <span className="text-xs text-slate-400 w-10 text-right">(19%)</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600 font-medium">Kiri Bawah (LLL)</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">0.0 cm³</span>
                        <span className="text-xs text-slate-400 w-10 text-right"></span>
                      </div>
                    </div>
                 </div>

                 {/* AI Confidence */}
                 <div className="mt-2 bg-[#f0f4f8] rounded-lg p-3 flex justify-between items-center border border-blue-100">
                    <span className="text-xs font-bold text-slate-600">Tingkat Keyakinan AI</span>
                    <span className="bg-blue-200/50 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">Sedang (82%)</span>
                 </div>
              </div>
           </div>
           
           {/* 2D Cross Validation - Adapted from Image 2 */}
           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="bg-slate-50 border-b border-slate-200 p-3">
                 <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                   <Layers size={16} className="text-slate-600" />
                   Panel Validasi Dua Dimensi
                 </h3>
              </div>
              <div className="grid grid-cols-2 divide-x divide-slate-200">
                 {/* Original CXR */}
                 <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center py-2 bg-slate-50/50">Citra Asli (CXR)</span>
                    <div className="h-32 bg-slate-900 relative overflow-hidden flex items-center justify-center p-2">
                       <img src="/gambarrontgen.jpg" alt="CXR" className="h-full object-cover rounded opacity-80" />
                    </div>
                 </div>
                 {/* AI Marker */}
                 <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center py-2 bg-slate-50/50">Deteksi Marker AI</span>
                    <div className="h-32 bg-slate-900 relative overflow-hidden flex items-center justify-center p-2">
                       <img src="/gambarrontgen.jpg" alt="CXR Marked" className="h-full object-cover rounded opacity-50" />
                       <div className="absolute top-6 left-10 w-12 h-14 border-2 border-red-500 bg-red-500/20 rounded-sm"></div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Decision Gate: Clinical Notes & Buttons */}
           <div className="flex flex-col gap-2 mt-auto pt-2">
              <label className="text-xs font-bold text-slate-700">Catatan Klinis (Opsional)</label>
              <textarea 
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                disabled={isApproved}
                placeholder="Tambahkan catatan untuk rekam medis..."
                className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none h-20 bg-white disabled:bg-slate-50 disabled:text-slate-500"
              />
              
              {!isApproved && (
                <div className="flex items-center gap-3 mt-2">
                   <button 
                     onClick={() => alert("Hasil ditolak.")}
                     className="flex-1 bg-white border border-red-300 text-red-600 font-bold text-sm py-3 rounded-xl hover:bg-red-50 transition-colors shadow-sm"
                   >
                     Tolak Hasil
                   </button>
                   <button 
                     onClick={handleApprove}
                     className="flex-1 bg-[#22c55e] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#16a34a] transition-colors shadow-sm flex items-center justify-center gap-2"
                   >
                     <ShieldCheck size={18} />
                     Setujui & Publikasikan
                   </button>
                </div>
              )}
           </div>

        </div>
      </div>
    </div>
  );
};
