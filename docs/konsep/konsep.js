// konsep.js — Konsep Produk Project Akhir (ppv-project-akhir-5125500060)
const KONSEP = {
  nama: 'Kalkulator IPK Interaktif',
  tagline: 'Hitung IPK, pantau jarak ke target studi, dan simpan riwayat nilai semester secara aman di peramban.',
  persona: {
    nama: 'Nabila, 19 tahun',
    siapa: 'Mahasiswa semester 3 D3 Teknologi Multimedia dan Broadcasting yang sedang mengejar syarat IPK minimal untuk mempertahankan beasiswa.',
    keseharian: 'Mengikuti perkuliahan teori dan praktikum sepanjang minggu, lalu mengecek estimasi nilai mata kuliah di laptop saat waktu luang sebelum masa perwalian atau pengumuman KHS.',
    masalah: 'Sering bingung memperkirakan dampak satu nilai mata kuliah terhadap IPK keseluruhan dan selisihnya dari target IPK karena perhitungan bobot kali SKS masih dilakukan manual dan tersebar di catatan terpisah.',
  },
  masalah: 'Mahasiswa kesulitan mengukur dampak setiap nilai mata kuliah terhadap IPK dan jarak capaiannya dari target akademik yang diinginkan. Perhitungan bobot nilai dikalikan SKS secara berulang rawan keliru jika dilakukan manual atau terpecah di catatan terpisah. Akibatnya, evaluasi hasil belajar per semester menjadi lambat dan kurang terarah.',
  solusi: 'Kalkulator IPK Interaktif menghitung total SKS, poin mutu, IPK, predikat kelulusan, dan progres menuju target IPK secara otomatis setiap kali nilai ditambah atau dihapus. Data mata kuliah divalidasi secara real-time dan disimpan aman di localStorage peramban dengan mekanisme pemulihan saat data rusak. Pengguna cukup membuka aplikasi ringan ini tanpa perlu login untuk memantau perkembangan studinya kapan saja.',
  fitur: [
    {
      nama: 'Kelola daftar mata kuliah dengan validasi real-time',
      prioritas: 'wajib',
      alasan: 'Menjadi sumber data utama (nama mata kuliah, SKS 1-6, nilai huruf A-E) agar perhitungan IPK akurat; sudah selesai pada rilis v0.2.0 dan dimodulkan di src/komponen.js pada v0.4.0.',
    },
    {
      nama: 'Perhitungan IPK otomatis dan predikat kelulusan',
      prioritas: 'wajib',
      alasan: 'Menjawab langsung kebutuhan menghitung bobot kali SKS serta menampilkan status predikat secara instan tanpa hitung manual; sudah selesai pada rilis v0.3.0 (src/state.js).',
    },
    {
      nama: 'Pelacak progres target IPK (skala 0.00-4.00)',
      prioritas: 'wajib',
      alasan: 'Membantu persona melihat selisih poin antara IPK saat ini dengan target akademik atau syarat beasiswa; sudah selesai pada rilis v0.3.0 (src/app.js).',
    },
    {
      nama: 'Penyimpanan lokal tahan galat (localStorage berversi)',
      prioritas: 'wajib',
      alasan: 'Menjaga data nilai semester tetap tersimpan di peramban dan tidak macet meski JSON rusak atau kuota penuh; sudah selesai pada rilis v0.4.0 (src/storage.js).',
    },
    {
      nama: 'Profil mahasiswa dan panduan skala bobot nilai',
      prioritas: 'sebaiknya',
      alasan: 'Melengkapi konteks identitas akademik dan referensi bobot huruf E-A tanpa mengganggu alur hitung utama; sudah tersedia di tab Profil dan Panduan nilai (v0.2.0).',
    },
    {
      nama: 'Muat data sampel dan pintasan papan ketik (Enter / Ctrl+Enter)',
      prioritas: 'sebaiknya',
      alasan: 'Mempercepat uji coba alur aplikasi dan entri banyak mata kuliah sekaligus; sudah tersedia pada rilis v0.2.0-v0.3.0.',
    },
    {
      nama: 'Sinkronisasi akun cloud dan autentikasi login',
      prioritas: 'belum',
      alasan: 'Membutuhkan backend dan server database sehingga menambah kerumitan tanpa menguji nilai utama kalkulator cepat; ditunda ke versi berikutnya.',
    },
    {
      nama: 'Ekspor transkrip nilai ke PDF atau Excel',
      prioritas: 'belum',
      alasan: 'Kebutuhan utama pengguna saat ini adalah simulasi cepat dan pemantauan target di peramban, bukan pencetakan dokumen resmi.',
    },
  ],
  pembanding: [
    {
      nama: 'Spreadsheet Manual (Excel / Google Sheets)',
      kelebihan: 'Fleksibel untuk membuat banyak tabel semester dan rumus kustom.',
      kekurangan: 'Harus menulis rumus pembobotan sendiri dari awal, rentan salah ketik formula, dan tampilan kurang nyaman dipakai cepat di layar ponsel.',
    },
    {
      nama: 'Portal Akademik Kampus (SIAKAD / MIS)',
      kelebihan: 'Menyajikan nilai resmi yang sudah disahkan dosen dan bagian akademik.',
      kekurangan: 'Tidak bisa dipakai untuk simulasi skenario nilai sebelum nilai resmi keluar dan tidak memiliki pelacak target IPK pribadi.',
    },
    {
      nama: 'Kalkulator IPK Web Umum',
      kelebihan: 'Bisa langsung menghitung rata-rata nilai secara cepat di browser.',
      kekurangan: 'Umumnya tidak menyimpan riwayat mata kuliah dengan pemulihan data rusak, tidak menampilkan progres target IPK, dan skala hurufnya sering tidak memakai bobot AB/BC.',
    },  
    ],
  pembeda: 'Menggabungkan simulasi IPK berskala nilai lengkap (A, AB, B, BC, C, D, E), pelacak progres target IPK secara visual, serta penyimpanan lokal tahan galat tanpa perlu login.',
};