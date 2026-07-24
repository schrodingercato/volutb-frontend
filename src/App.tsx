import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

// Layouts
import { KlinisiLayout } from './layouts/KlinisiLayout';
import { PasienLayout } from './layouts/PasienLayout';

// Klinisi Pages
import { Worklist } from './pages/klinisi/Worklist';
import { Upload } from './pages/klinisi/Upload';
import { CaseDetail } from './pages/klinisi/CaseDetail';
import { Dashboard as KlinisiPatientDashboard } from './pages/klinisi/Dashboard';

// Pasien Pages
import { PasienDashboard } from './pages/pasien/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Unified Smart Auth Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Klinisi Routes with Layout */}
        <Route path="/klinisi" element={<KlinisiLayout />}>
          <Route index element={<Navigate to="/klinisi/worklist" replace />} />
          <Route path="worklist" element={<Worklist />} />
          <Route path="upload" element={<Upload />} />
          <Route path="kasus/:id" element={<CaseDetail />} />
          <Route path="dashboard/demo" element={<KlinisiPatientDashboard />} />
          <Route path="dashboard/:nik" element={<KlinisiPatientDashboard />} />
        </Route>

        {/* Pasien Routes with Layout */}
        <Route path="/pasien" element={<PasienLayout />}>
          <Route index element={<Navigate to="/pasien/beranda" replace />} />
          <Route path="beranda" element={<PasienDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
