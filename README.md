# Kalkulator IPK Interaktif (`ppv-project-akhir-5125500060`)

Aplikasi web berbasis JavaScript ES Module untuk menghitung Indeks Prestasi Kumulatif (IPK), memantau target IPK, dan mengelola daftar mata kuliah secara interaktif di sisi klien.

## Cara Menjalankan Lewat Server Lokal

Karena aplikasi menggunakan modul ES (`<script type="module" src="src/app.js"></script>`), jalankan proyek melalui server lokal (jangan dibuka langsung sebagai `file://` agar modul ES dan `localStorage` berjalan normal):

1. Buka folder repositori `ppv-project-akhir-5125500060` di **Visual Studio Code**.
2. Buka `index.html`.
3. Jalankan server lokal (misalnya menggunakan ekstensi **Live Server** / **Go Live**, atau server lokal lain seperti `http://127.0.0.1:5500`).
4. Akses aplikasi melalui alamat `http://127.0.0.1:5500/index.html` di peramban.

## Daftar Fitur MVP & Status

- **Pencatatan & Pengelolaan Mata Kuliah** — Menambah mata kuliah (nama, jumlah SKS, nilai huruf, dan pratinjau poin mutu), menghapus satu mata kuliah, menghapus semua data, atau memuat data sampel: **Selesai**.
- **Perhitungan IPK & Ringkasan Akademik** — Menghitung total SKS, jumlah mata kuliah, poin mutu, IPK, predikat/status ringkasan, serta progres menuju target IPK: **Selesai**.
- **Penyimpanan Aman Berbasis `localStorage`** — Memuat data secara aman saat aplikasi dibuka dan menyimpan perubahan data dengan penanganan galat (`try/catch`) serta notifikasi *toast* saat penyimpanan gagal/diblokir: **Selesai**.
- **Komponen UI Reusable (`BarisMataKuliah`)** — Merakit baris tabel mata kuliah secara terpusat menggunakan `textContent` untuk nama mata kuliah agar aman dari injeksi tag HTML: **Selesai**.

## Struktur Modul & Arah Ketergantungan

```text
index.html
  └── src/app.js (koordinator UI, state sesi, event listener, dan penyimpanan)
        ├── src/state.js      (logika perhitungan bobot, poin, dan ringkasan IPK)
        ├── src/storage.js    (kontrak kunci, pemuatan aman, dan penyimpanan ke localStorage)
        ├── src/komponen.js   (komponen DOM reusable: BarisMataKuliah)
        └── src/ui-pustaka.js (pembungkus komponen UI / notifikasi antarmuka)