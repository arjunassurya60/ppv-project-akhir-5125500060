export const KUNCI = 'kalkulator-ipk:v1';

const BOBOT_VALID = {
    A: 4.0,
    AB: 3.5,
    B: 3.0,
    BC: 2.5,
    C: 2.0,
    D: 1.0,
    E: 0.0
};

let cadanganMemori = [];

function normalisasiItem(item) {
    if (!item || typeof item !== 'object') return null;

    const nama = typeof item.name === 'string' ? item.name.trim() : '';
    const sks = Number(item.sks);
    const nilai = typeof item.grade === 'string' ? item.grade.trim().toUpperCase() : '';

    if (!nama || !Number.isInteger(sks) || sks < 1 || sks > 6) return null;
    if (!Object.prototype.hasOwnProperty.call(BOBOT_VALID, nilai)) return null;

    const bobot = BOBOT_VALID[nilai];
    const poin = Number((sks * bobot).toFixed(2));
    const id = Number.isFinite(Number(item.id)) ? Number(item.id) : Date.now() + Math.random();

    return {
        id,
        name: nama,
        sks,
        grade: nilai,
        weight: bobot,
        points: poin
    };
}

export function muat() {
    try {
        const mentah = localStorage.getItem(KUNCI);
        if (!mentah) {
            return [...cadanganMemori];
        }

        const parsed = JSON.parse(mentah);
        if (!Array.isArray(parsed)) {
            return [...cadanganMemori];
        }

        const dataSah = parsed
            .map(normalisasiItem)
            .filter(Boolean);

        cadanganMemori = [...dataSah];
        return [...dataSah];
    } catch {
        return [...cadanganMemori];
    }
}

export function simpan(data) {
    const daftarSah = Array.isArray(data)
        ? data.map(normalisasiItem).filter(Boolean)
        : [];

    cadanganMemori = [...daftarSah];

    try {
        localStorage.setItem(KUNCI, JSON.stringify(daftarSah));
        return { ok: true };
    } catch {
        return {
            ok: false,
            pesan: 'Penyimpanan browser tidak tersedia atau penuh. Data tetap dipakai sementara di sesi ini.'
        };
    }
}