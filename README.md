# Kalkulator IPK Interaktif — Penugasan PPV Tugas 3

Aplikasi web interaktif untuk mencatat, mengelola, dan menghitung Indeks Prestasi Kumulatif (IPK) secara dinamis tanpa perlu memuat ulang (*reload*) halaman. Aplikasi menyediakan tiga tampilan dalam satu halaman: Ringkasan, Kelola Mata Kuliah, dan Panduan Nilai.

---

## 🛠️ Cara Menjalankan Proyek

1. **Ekstrak File ZIP**: Pastikan folder ZIP hasil unduhan telah diekstrak.
2. **Buka File `index.html`**:
   - Klik dua kali pada file `index.html`, atau
   - Klik kanan `index.html` -> *Open with* -> pilih Browser pilihan Anda (Google Chrome, Firefox, Edge).
3. **Penggunaan**:
   - Masukkan Nama Mata Kuliah, Jumlah SKS, dan Nilai Huruf pada formulir di sebelah kiri.
   - Tekan tombol **Tambah Mata Kuliah** atau gunakan pintasan keyboard `Enter`.
   - Hasil akumulasi IPK, Total SKS, dan tabel daftar mata kuliah akan diperbarui secara otomatis.

---

## 🚀 Daftar Fitur Utama

- **Validasi Formulir Real-Time**: Memastikan masukan pengguna sesuai dengan kriteria yang ditentukan sebelum disimpan.
- **Kalkulasi IPK Dinamis**: Menghitung bobot nilai, total SKS, total poin mutu, dan nilai IPK secara instan.
- **Keadaan Antarmuka Lengkap (UI States)**:
  - *Empty State*: Tampilan khusus saat belum ada data mata kuliah.
  - *Loading State*: Visualisasi *spinner* singkat saat proses penambahan atau penghapusan data.
  - *Error State*: Pesan kesalahan visual dengan highlight warna merah pada input yang tidak valid.
- **Predikat Kelulusan Otomatis**: Menampilkan badge predikat (*Cum Laude*, *Sangat Memuaskan*, *Memuaskan*, *Cukup*) berdasarkan hasil perhitungan IPK.
- **Fitur Isi Sampel Data**: Tombol instan untuk memuat contoh data secara praktis.
- **Navigasi Tiga Tampilan**: Tab Ringkasan, Kelola Mata Kuliah, dan Panduan Nilai dapat dinavigasi dengan klik, tombol panah, `Home`, dan `End`.
- **Target IPK**: Atur target 0–4 untuk melihat progres dan selisih dari IPK saat ini.
- **Media Aksesibel**: Ilustrasi SVG lokal memiliki teks alternatif dan pesan fallback jika gambar gagal dimuat.
- **Animasi Ramah Aksesibilitas**: Perpindahan tab, progres, dan perubahan angka memakai animasi singkat berbasis transform/opacity; animasi dihentikan saat `prefers-reduced-motion` aktif.
- **Tampilan Responsif**: Layout menyesuaikan ponsel dan desktop, dengan tabel yang dapat digulir horizontal di layar sempit.
- **Validasi SKS**: SKS wajib berupa bilangan bulat antara 1 dan 6.
- **Skala Nilai Berwarna**: Pilihan dan panduan nilai diurutkan dari E ke A dengan gradasi merah, kuning, hingga hijau; kontrol nilai memiliki animasi turun saat pilihan berubah.
- **Profil Mahasiswa**: Tab Profil dapat menyimpan nama lengkap, NRP, program studi, dan foto JPG/PNG/WebP maksimal 2 MB di penyimpanan lokal browser. Foto dapat dipratinjau, diganti, atau dihapus.

---

## 📌 Daftar Event JavaScript yang Digunakan

1. `submit` — Menangani proses pengiriman formulir mata kuliah, menghentikan *default reload* browser (`e.preventDefault()`), dan menjalankan fungsi validasi.
2. `input` — Memicu validasi *real-time* saat pengguna mengetikkan nama mata kuliah dan jumlah SKS.
3. `change` — Memantau perubahan pada pilihan dropdown nilai huruf untuk memperbarui estimasi poin mutu secara otomatis.
4. `click` — Digunakan pada navigasi tab, tombol hapus item, tombol isi sampel data, serta tombol hapus seluruh data.
5. `keydown` *(Bonus Event)* — Menangkap masukan tombol keyboard.
6. `error` — Menampilkan fallback teks jika media ilustrasi gagal dimuat.

---

## ⌨️ Pintasan Papan Ketik (Keyboard Shortcut)

- **Pintasan**: <kbd>Enter</kbd> (saat fokus di formulir) atau <kbd>Ctrl</kbd> + <kbd>Enter</kbd>
- **Fungsi**: Memicu pengiriman formulir (*submit*) untuk menyimpan data mata kuliah tanpa perlu mengklik tombol mouse.
- **Manfaat Kecepatan Kerja**: Mempercepat alur kerja masukan data berulang (*data entry*), sehingga pengguna dapat mengetik nama matkul, menekan `Tab` untuk pindah input, dan menekan `Enter` secara fleksibel tanpa harus memindahkan tangan ke mouse.