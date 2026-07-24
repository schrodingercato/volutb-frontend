import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';

// Layouts
import { KlinisiLayout } from './layouts/KlinisiLayout';
import { PasienLayout } from './layouts/PasienLayout';

// Klinisi Pages
import { Login as KlinisiLogin } from './pages/klinisi/Login';
import { Worklist } from './pages/klinisi/Worklist';
import { Upload } from './pages/klinisi/Upload';
import { CaseDetail } from './pages/klinisi/CaseDetail';

import { Dashboard as KlinisiPatientDashboard } from './pages/klinisi/Dashboard';

// Pasien Pages
import { PasienLogin } from './pages/pasien/Login';
import { PasienDashboard } from './pages/pasien/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Klinisi Routes without Layout (e.g. Login) */}
        <Route path="/klinisi/login" element={<KlinisiLogin />} />
        
        {/* Klinisi Routes with Layout */}
        <Route path="/klinisi" element={<KlinisiLayout />}>
          <Route index element={<Navigate to="/klinisi/worklist" replace />} />
          <Route path="worklist" element={<Worklist />} />
          <Route path="upload" element={<Upload />} />
          <Route path="kasus/:id" element={<CaseDetail />} />
          <Route path="dashboard/:nik" element={<KlinisiPatientDashboard />} />
        </Route>

        {/* Pasien Routes without Layout */}
        <Route path="/pasien/login" element={<PasienLogin />} />

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
