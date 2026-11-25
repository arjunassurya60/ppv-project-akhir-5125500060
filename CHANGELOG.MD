Semua perubahan penting pada proyek **Kalkulator IPK Interaktif** (`ppv-project-akhir-5125500060`) dicatat dalam berkas ini.

## [v0.4.0] - 2026-11-24

### Added
- Menambahkan modul penyimpanan aman `src/storage.js` dengan `KUNCI = 'kalkulator-ipk:v1'`, fungsi `muat()`, dan fungsi `simpan()`.
- Menambahkan komponen DOM reusable `BarisMataKuliah` di `src/komponen.js` dengan pengisian nama mata kuliah menggunakan `textContent`.
- Menambahkan dokumentasi `README.md`, `CHANGELOG.md`, dan pembaruan `ROADMAP.md` untuk rilis versi `v0.4.0`.

### Changed
- Memperbarui `renderUI()` pada `src/app.js` agar merender baris tabel mata kuliah melalui komponen `BarisMataKuliah`.
- Menghubungkan helper `simpanCourses(courses)` pada `src/app.js` saat terjadi perubahan data mata kuliah (tambah, hapus, reset semua, dan muat sampel) serta menampilkan *toast* peringatan jika penyimpanan gagal.

### Fixed
- Membersihkan duplikasi impor/variabel di `src/app.js` dan memastikan ketahanan aplikasi saat menghadapi JSON rusak pada `localStorage` (S2) serta simulasi kegagalan/pemblokiran `localStorage.setItem` (S6).

## [v0.3.0]
- Menambahkan logika inti perhitungan IPK, target IPK, dan integrasi komponen/pembungkus UI (`src/state.js`, `src/ui-pustaka.js`, `src/app.js`).

## [v0.2.0]
- Menyusun tata letak antarmuka multi-tab (`Profil`, `Kelola mata kuliah`, `Ringkasan`, `Panduan nilai`), form input mata kuliah, tabel daftar mata kuliah, dan aset visual.

## [v0.1.0]
- Inisialisasi repositori proyek akhir `ppv-project-akhir-5125500060` dan kerangka dasar `index.html`.