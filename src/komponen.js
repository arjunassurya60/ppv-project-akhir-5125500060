export function BarisMataKuliah(item, nomor) {
    const tr = document.createElement('tr');

    const tdNo = document.createElement('td');
    tdNo.textContent = String(nomor);

    const tdNama = document.createElement('td');
    const strongNama = document.createElement('strong');
    strongNama.textContent = item.name;
    tdNama.append(strongNama);

    const tdSks = document.createElement('td');
    tdSks.className = 'text-center';
    tdSks.textContent = String(item.sks);

    const tdNilai = document.createElement('td');
    tdNilai.className = 'text-center';
    const bobot = Number(item.weight ?? 0).toFixed(2);
    tdNilai.textContent = `${item.grade} (${bobot})`;

    const tdPoin = document.createElement('td');
    tdPoin.className = 'text-center';
    tdPoin.textContent = Number(item.points ?? 0).toFixed(2);

    const tdAksi = document.createElement('td');
    tdAksi.className = 'text-center';

    const btnHapus = document.createElement('button');
    btnHapus.type = 'button';
    btnHapus.className = 'btn-del';
    btnHapus.dataset.id = String(item.id);
    btnHapus.textContent = 'Hapus';

    tdAksi.append(btnHapus);
    tr.append(tdNo, tdNama, tdSks, tdNilai, tdPoin, tdAksi);

    return tr;
}

export function KartuCatatan(catatan = {}) {
    const artikel = document.createElement('article');
    artikel.className = 'kartu-catatan';
    if (catatan.id !== undefined) {
        artikel.dataset.id = String(catatan.id);
    }

    const judulEl = document.createElement('h3');
    judulEl.textContent = catatan.judul ?? '';

    const mkEl = document.createElement('p');
    mkEl.textContent = catatan.mk ?? '';

    const btnSemat = document.createElement('button');
    btnSemat.type = 'button';
    btnSemat.className = 'btn-semat';
    btnSemat.textContent = catatan.disematkan ? 'Lepas' : 'Sematkan';

    artikel.append(judulEl, mkEl, btnSemat);
    return artikel;
}