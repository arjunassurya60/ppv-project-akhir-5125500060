function tampilToast(pesan, jenis = 'success') {
    const el = document.querySelector('#toastInfo');
    el.querySelector('#toastPesan').textContent = pesan;
    el.classList.remove('text-bg-success', 'text-bg-danger');
    el.classList.add(`text-bg-${jenis}`);
    bootstrap.Toast.getOrCreateInstance(el, { delay: 3000 }).show();
}

function tampilKonfirmasi({ judul, isi, labelYa = 'Ya, hapus' }, onYa) {
    const el = document.querySelector('#modalKonfirmasi');
    const pemicu = document.activeElement;
    el.querySelector('#judulKonfirmasi').textContent = judul;
    el.querySelector('[data-isi]').textContent = isi;

    const tombolYa = el.querySelector('#btnKonfirmasiYa');
    tombolYa.textContent = labelYa;

    const modal = bootstrap.Modal.getOrCreateInstance(el);
    tombolYa.onclick = () => { modal.hide(); onYa(); };
    el.addEventListener('hidden.bs.modal', () => pemicu?.focus(), { once: true });
    modal.show();
}