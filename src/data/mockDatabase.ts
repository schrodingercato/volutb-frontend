// Simulasi Database VoluTB
// Struktur ini disiapkan agar mudah diganti dengan Real API (misal REST API dengan axios) di kemudian hari.

export const VoluDatabase = {
  // 1. Data Dokter / Klinisi
  clinicians: [
    {
      id: "C-001",
      nip: "12345",
      password: "admin",
      name: "Dr. Aisyah R. Nadjib",
      specialization: "Pulmonologi",
      hospital: "RS Pusat Rujukan Nasional"
    }
  ],

  // 2. Data Pasien (Untuk Login Pasien)
  patients: [
    {
      id: "P-089",
      nik: "3201010101",
      dob: "1990-01-01",
      name: "Budi Santoso",
      gender: "L",
      age: 45,
      status: "Membaik"
    }
  ],

  // 3. Data Rekam Medis (Scans)
  scans: [
    {
      id: "S-1001",
      patientId: "P-089",
      date: "2024-06-15",
      volumeBase: 4.2, // cm3 (Awal Terapi)
      volumeEval1: 1.8, // cm3 (Evaluasi 1)
      trend: "-57%",
      recommendation: "Penurunan volume kavitas sebesar 57% mengindikasikan respons terapeutik yang sangat positif terhadap regimen OAT lini pertama. Tidak ditemukan penyebaran lesi satelit baru. Direkomendasikan untuk melanjutkan fase lanjutan tanpa modifikasi dosis.",
      focusPoint: "Paru-Paru Kanan Atas",
      initialDiagnosis: "TB BTA+"
    }
  ],

  // 4. Data Worklist (Untuk Halaman Kerja Klinisi)
  worklist: [
    {
      caseId: "CS-2024-089",
      patientName: "Budi Santoso",
      date: "Hari Ini, 09:30",
      status: "SELESAI",
      priority: "Tinggi"
    },
    {
      caseId: "CS-2024-090",
      patientName: "Siti Aminah",
      date: "Hari Ini, 10:15",
      status: "ANALISIS",
      priority: "Menengah"
    },
    {
      caseId: "CS-2024-091",
      patientName: "Agus Pratama",
      date: "Hari Ini, 11:00",
      status: "MENUNGGU",
      priority: "Menengah"
    }
  ]
};

// Fungsi simulasi query (Seolah-olah menembak API)
export const mockQuery = {
  loginKlinisi: (nip: string, pass: string) => {
    const user = VoluDatabase.clinicians.find(c => c.nip === nip && c.password === pass);
    return user ? { success: true, data: user } : { success: false, error: "NIP atau Kata Sandi salah" };
  },
  
  loginPasien: (nik: string, dob: string) => {
    const user = VoluDatabase.patients.find(p => p.nik === nik && p.dob === dob);
    return user ? { success: true, data: user } : { success: false, error: "NIK atau Tanggal Lahir tidak valid" };
  },

  getPatientData: (patientId: string) => {
    const patient = VoluDatabase.patients.find(p => p.id === patientId);
    const scan = VoluDatabase.scans.find(s => s.patientId === patientId);
    return { patient, scan };
  },

  getWorklist: () => {
    return VoluDatabase.worklist;
  }
};
