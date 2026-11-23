## Ringkasan Progres Sprint

- **Sprint 1 — Inisialisasi & Kerangka Proyek**: Selesai
- **Sprint 2 — Antarmuka & Alur Kelola Mata Kuliah**: Selesai
- **Sprint 3 — Perhitungan IPK & Integrasi UI**: Selesai
- **Sprint 4 — Penyimpanan Aman, Komponen Reusable, Uji Ketangguhan & Rilis v0.4.0**: **Selesai**
  - [x] Implementasi penyimpanan aman `src/storage.js` (`KUNCI = 'kalkulator-ipk:v1'`, `muat()`, `simpan()`) dan integrasi di `src/app.js`
  - [x] Implementasi komponen `BarisMataKuliah` di `src/komponen.js` dengan `textContent` dan penggunaannya di `renderUI()`
  - [x] Uji manual skenario rusak (S2: JSON rusak di `localStorage` dan S6: simulasi `localStorage.setItem` gagal/diblokir) lewat server lokal & DevTools
  - [x] Penyusunan `README.md`, `CHANGELOG.md`, pembaruan `ROADMAP.md`, serta rilis tag Git `v0.4.0`