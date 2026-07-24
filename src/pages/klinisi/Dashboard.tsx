import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Maximize2, Rotate3D, Layers, Eye, ShieldCheck, FileWarning, ArrowRight, Download, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Box } from '@react-three/drei';

// --- 3D Components ---

// Simulated Transparent Lung Lobe
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

// Simulated TB Cavity (Lesion)
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

      {/* OrbitControls allows user to drag, rotate, and zoom the 3D scene */}
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} autoRotate={!isolateLesion} autoRotateSpeed={1} />

      <group position={[0, 0, 0]} scale={isolateLesion ? 2 : 1}>
        {/* Render Lungs only if not isolating lesions */}
        {!isolateLesion && (
          <>
            {/* Right Lung (from patient perspective, left side of screen) */}
            <LungLobe position={[-1.8, 0, 0]} rotation={[0, 0, -0.1]} />
            {/* Left Lung */}
            <LungLobe position={[1.8, 0, 0]} rotation={[0, 0, 0.1]} />
          </>
        )}

        {/* Trachea (Mock) */}
        {!isolateLesion && (
          <mesh position={[0, 3, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 2, 16]} />
            <meshStandardMaterial color="#cbd5e1" transparent opacity={0.3} />
          </mesh>
        )}

        {/* Right Upper Lobe Lesions */}
        <group position={[-1.5, 1.5, 0.5]}>
           <Cavity position={[0, 0, 0]} scale={1.2} />
           <Cavity position={[0.3, 0.2, 0.2]} scale={0.8} isAmber={true} />
           <Cavity position={[-0.2, -0.3, -0.1]} scale={0.6} />
        </group>

        {/* Left Upper Lobe Lesion */}
        <group position={[1.2, 1.8, -0.2]}>
           <Cavity position={[0, 0, 0]} scale={0.9} />
        </group>
      </group>
    </>
  );
};

// --- Main Dashboard Component ---

export const Dashboard = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'lungs' | 'lesion'>('lungs');
  
  const handleApprove = () => {
    navigate('/klinisi/worklist');
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 font-sans">
      
      {/* Patient Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex justify-between items-center shrink-0">
         <div className="flex items-center gap-6">
            <div className="flex flex-col">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">ID KASUS</span>
               <span className="text-xl font-bold text-slate-800">CS-2024-089</span>
            </div>
            <div className="h-10 w-px bg-slate-200"></div>
            <div className="flex flex-col">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">PASIEN</span>
               <div className="flex items-center gap-2">
                 <span className="text-lg font-bold text-[#3b8a95]">Budi Santoso</span>
                 <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-bold">3201****5678</span>
               </div>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <div className="bg-[#3b8a95]/10 text-[#3b8a95] px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
               <Activity size={16} />
               Timepoint: Bulan ke-2 (Fase Intensif)
            </div>
         </div>
      </div>

      {/* Workbench Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        
        {/* LEFT COLUMN: 3D INTERACTIVE CANVAS */}
        <div className="lg:col-span-7 flex flex-col gap-4">
           <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm flex-1 p-6 flex flex-col relative overflow-hidden">
              <div className="flex justify-between items-center mb-4 z-10 relative">
                 <h3 className="font-bold text-slate-800 flex items-center gap-2">
                   <Rotate3D size={20} className="text-[#3b8a95]" />
                   Interactive 3D Pseudo-CT Canvas
                 </h3>
                 <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button 
                      onClick={() => setViewMode('lungs')}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'lungs' ? 'bg-white text-[#3b8a95] shadow-sm' : 'text-slate-500'}`}
                    >
                      Full Anatomy
                    </button>
                    <button 
                      onClick={() => setViewMode('lesion')}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'lesion' ? 'bg-white text-red-500 shadow-sm' : 'text-slate-500'}`}
                    >
                      Isolate Lesion
                    </button>
                 </div>
              </div>

              {/* Real 3D Viewport (Three.js) */}
              <div className="flex-1 bg-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center group border border-slate-800 cursor-move">
                 
                 <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                    <Scene3D isolateLesion={viewMode === 'lesion'} />
                 </Canvas>

                 {/* Instructions Overlay */}
                 <div className="absolute top-4 left-4 text-white/50 text-xs font-medium pointer-events-none">
                   <p>Gunakan mouse untuk memutar (Klik & Geser)</p>
                   <p>Gunakan scroll untuk Zoom In/Out</p>
                 </div>

                 {/* Annotations Overlay (HTML over Canvas) */}
                 {viewMode === 'lungs' ? (
                   <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-emerald-400 text-xs font-bold tracking-widest uppercase flex flex-col items-center gap-1 opacity-70 pointer-events-none">
                      <div className="h-6 w-px bg-emerald-400 border-dashed"></div>
                      Lung Areas
                   </div>
                 ) : (
                   <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-red-400 text-xs font-bold tracking-widest uppercase flex flex-col items-center gap-1 opacity-70 pointer-events-none">
                      <div className="h-6 w-px bg-red-400 border-dashed"></div>
                      Isolated TB Cavities
                   </div>
                 )}

                 {/* Viewport Controls */}
                 <div className="absolute right-4 bottom-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-md flex items-center justify-center text-white backdrop-blur-sm"><Maximize2 size={16} /></button>
                    <button className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-md flex items-center justify-center text-white backdrop-blur-sm"><Eye size={16} /></button>
                 </div>
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN: MPR & VALIDATION */}
        <div className="lg:col-span-5 flex flex-col gap-4">
           
           {/* MPR Slices */}
           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-[220px] flex flex-col">
              <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                <Layers size={16} className="text-[#3b8a95]" />
                Multi-Planar Reconstruction (MPR)
              </h3>
              <div className="grid grid-cols-3 gap-2 flex-1">
                 {/* Z-Axis (Axial) */}
                 <div className="bg-slate-100 rounded-xl flex flex-col items-center p-2 relative overflow-hidden group">
                    <div className="flex-1 w-full flex items-center justify-center relative">
                       {/* Mockup Axial Slice */}
                       <div className="w-20 h-16 bg-slate-300 rounded-full flex items-center justify-center relative blur-[0.5px]">
                          <div className="w-6 h-8 bg-emerald-500/40 rounded-full absolute left-2 top-4"></div>
                          <div className="w-6 h-8 bg-emerald-500/40 rounded-full absolute right-2 top-4"></div>
                          <div className="w-3 h-3 bg-purple-500/80 rounded-full absolute left-3 top-5"></div>
                       </div>
                    </div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Z-Axis Section</span>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#3b8a95]/20 group-hover:bg-[#3b8a95] transition-colors cursor-pointer"></div>
                 </div>
                 
                 {/* Y-Axis (Coronal) */}
                 <div className="bg-slate-100 rounded-xl flex flex-col items-center p-2 relative overflow-hidden group">
                    <div className="flex-1 w-full flex items-center justify-center relative">
                       <div className="w-20 h-24 bg-slate-300 rounded-t-full flex items-end justify-center pb-2 relative blur-[0.5px]">
                          <div className="w-7 h-16 bg-emerald-500/40 rounded-t-full absolute left-2 bottom-2"></div>
                          <div className="w-7 h-16 bg-emerald-500/40 rounded-t-full absolute right-2 bottom-2"></div>
                          <div className="w-4 h-4 bg-purple-500/80 rounded-full absolute left-3 top-4"></div>
                       </div>
                    </div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Y-Axis Section</span>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#3b8a95]/20 group-hover:bg-[#3b8a95] transition-colors cursor-pointer"></div>
                 </div>
                 
                 {/* X-Axis (Sagittal) */}
                 <div className="bg-slate-100 rounded-xl flex flex-col items-center p-2 relative overflow-hidden group">
                    <div className="flex-1 w-full flex items-center justify-center relative">
                       <div className="w-16 h-24 bg-slate-300 rounded-[30%] flex items-end justify-center pb-2 relative blur-[0.5px]">
                          <div className="w-12 h-20 bg-emerald-500/40 rounded-t-full absolute left-2 bottom-2"></div>
                          <div className="w-5 h-4 bg-purple-500/80 rounded-full absolute left-5 top-4"></div>
                       </div>
                    </div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">X-Axis Section</span>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#3b8a95]/20 group-hover:bg-[#3b8a95] transition-colors cursor-pointer"></div>
                 </div>
              </div>
           </div>

           {/* 2D Cross Validation */}
           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  2D Cross-Validation (Consistency)
                </div>
                <span className="bg-emerald-50 text-emerald-600 text-[9px] px-2 py-1 rounded-md uppercase font-bold tracking-widest">Konsisten</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-2 flex-1">
                 <div className="bg-slate-900 rounded-lg flex flex-col relative overflow-hidden">
                    <div className="absolute top-2 left-2 text-[9px] text-white/70 font-bold bg-black/50 px-2 py-0.5 rounded">CXR Asli (PA)</div>
                    <div className="flex-1 w-full flex items-center justify-center relative p-4">
                       <div className="w-full h-full bg-slate-400 blur-sm rounded-[30%] opacity-50"></div>
                       {/* Simulate rib cage lines */}
                       <div className="absolute w-full h-px bg-white/20 top-1/4"></div>
                       <div className="absolute w-full h-px bg-white/20 top-2/4"></div>
                       <div className="absolute w-full h-px bg-white/20 top-3/4"></div>
                    </div>
                 </div>
                 
                 <div className="bg-slate-900 rounded-lg flex flex-col relative overflow-hidden">
                    <div className="absolute top-2 left-2 text-[9px] text-white/70 font-bold bg-black/50 px-2 py-0.5 rounded">Deteksi AI (2D)</div>
                    <div className="flex-1 w-full flex items-center justify-center relative p-4">
                       <div className="w-full h-full bg-slate-400 blur-sm rounded-[30%] opacity-20"></div>
                       {/* Highlight bounding box */}
                       <div className="absolute top-6 left-6 w-8 h-8 border-2 border-red-500 rounded-sm"></div>
                    </div>
                 </div>
              </div>
           </div>
           
           {/* Decision Gate & Export */}
           <div className="bg-[#f0f4f8] rounded-2xl border border-slate-200/50 shadow-sm p-5 shrink-0 flex flex-col gap-4">
              <div className="flex gap-2">
                <FileWarning size={20} className="text-amber-500 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                   <span className="text-sm font-bold text-slate-800">Panel Lokalisasi Anatomis</span>
                   <span className="text-xs text-slate-600 leading-relaxed mt-1">Kavitas terdeteksi pada <strong className="text-amber-600">Lobus Superior Dextra</strong> (Paru Kanan Atas). Pola sebaran stabil tanpa indikasi artefak difusi stokastik.</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mt-2">
                 <button 
                   onClick={() => alert("Re-analisis dikirim ke antrean AI")}
                   className="flex-1 bg-white border border-red-200 text-red-500 font-bold text-sm py-3 rounded-xl hover:bg-red-50 transition-colors shadow-sm"
                 >
                   Reject / Re-analyse
                 </button>
                 <button 
                   onClick={handleApprove}
                   className="flex-1 bg-[#3b8a95] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#2c6b74] transition-colors shadow-sm flex items-center justify-center gap-2"
                 >
                   Approve & Publish
                   <ArrowRight size={16} />
                 </button>
              </div>
              
              <button className="w-full flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors mt-1">
                 <Download size={14} /> Ekspor Laporan Medis (PDF)
              </button>
           </div>

        </div>
      </div>
    </div>
  );
};
