# Peta Modul — Kalkulator IPK Interaktif

## Diagram Ketergantungan Modul (Satu Arah)
- `index.html` ──(`<script type="module">`)──> `src/app.js`
- `src/app.js` ──(`import`)──> `src/state.js` (`ringkasan`, `tentukanPredikat`)
- `src/app.js` ──(`import`)──> `src/ui-pustaka.js` (`tampilToast`, `tampilKonfirmasi`)

## Tanggung Jawab Tiap Modul
- **`src/app.js`:** Mengatur inisialisasi aplikasi, status mata kuliah dan profil, validasi formulir, interaksi/event listener, serta perenderan tampilan DOM[cite: 5].
- **`src/state.js`:** Menghitung ringkasan mata kuliah (total SKS, poin mutu, IPK, dan jumlah item) serta menentukan predikat berdasarkan nilai IPK.
- **`src/ui-pustaka.js`:** Membungkus pemanggilan komponen toast dan modal konfirmasi Bootstrap[cite: 7].

## Bagian yang Belum Dimodulkan & Alasannya
- **`src/styles.css`:** Merupakan berkas stylesheet CSS untuk tata letak, warna nilai/predikat, dan gaya responsif, bukan modul JavaScript[cite: 8].
- **`assets/study-path.svg` dan `assets/grade-scale.svg`:** Merupakan aset ilustrasi vektor (`<img>`) yang ditampilkan di halaman[cite: 4], bukan modul logika JavaScript.
- **Bagian logika di `src/app.js` (seperti akses `localStorage` profil, validasi form, dan render DOM):** Belum dipisah ke modul JS terpisah (seperti `storage.js` atau `ui.js`) karena alur saat ini sudah berjalan terpusat di `src/app.js`[cite: 5] dan difokuskan pada penyelesaian MVP Sprint 3.