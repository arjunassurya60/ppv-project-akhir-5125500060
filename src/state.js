export function ringkasan() {
    const totalSks = daftar.reduce((jml, item) => jml + item.sks, 0);
    const totalPoints = daftar.reduce((jml, item) => jml + item.points, 0);
    const ipk = totalSks > 0 ? totalPoints / totalSks : 0;
    return { jumlah: daftar.length, totalSks, totalPoints, ipk };
}

export function tentukanPredikat(ipk) {
    if (ipk >= 3.51) return { teks: 'Dengan Pujian (Cum Laude)', kode: 'pujian' };
    if (ipk >= 3.00) return { teks: 'Sangat Memuaskan', kode: 'sangat' };
    if (ipk >= 2.75) return { teks: 'Memuaskan', kode: 'memuaskan' };
    return { teks: 'Cukup', kode: 'cukup' };
}