import { tampilToast, tampilKonfirmasi } from './ui-pustaka.js';
let courses = [];

// Skala Bobot Nilai Matkul
const GRADE_WEIGHTS = {
    'A': 4.00,
    'AB': 3.50,
    'B': 3.00,
    'BC': 2.50,
    'C': 2.00,
    'D': 1.00,
    'E': 0.00
};

// Elemen DOM
const courseForm = document.getElementById('courseForm');
const inputName = document.getElementById('courseName');
const inputSks = document.getElementById('courseSks');
const selectGrade = document.getElementById('courseGrade');
const previewPoints = document.getElementById('previewPoints');

const errCourseName = document.getElementById('errCourseName');
const errCourseSks = document.getElementById('errCourseSks');
const errCourseGrade = document.getElementById('errCourseGrade');

const ipkDisplay = document.getElementById('ipkDisplay');
const predicateBadge = document.getElementById('predicateBadge');
const totalSksDisplay = document.getElementById('totalSksDisplay');
const totalCoursesDisplay = document.getElementById('totalCoursesDisplay');
const totalPointsDisplay = document.getElementById('totalPointsDisplay');

const emptyState = document.getElementById('emptyState');
const loadingState = document.getElementById('loadingState');
const tableContainer = document.getElementById('tableContainer');
const courseTableBody = document.getElementById('courseTableBody');

const btnSample = document.getElementById('btnSample');
const btnResetAll = document.getElementById('btnResetAll');
const targetIpkInput = document.getElementById('targetIpk');
const targetDisplay = document.getElementById('targetDisplay');
const targetProgress = document.getElementById('targetProgress');
const targetProgressFill = document.getElementById('targetProgressFill');
const targetMessage = document.getElementById('targetMessage');
const currentTargetIpk = document.getElementById('currentTargetIpk');
const tabButtons = [...document.querySelectorAll('[role="tab"]')];
const tabPanels = [...document.querySelectorAll('[role="tabpanel"]')];
const profileForm = document.getElementById('profileForm');
const profileName = document.getElementById('profileName');
const profileNrp = document.getElementById('profileNrp');
const profileProgram = document.getElementById('profileProgram');
const profilePhotoInput = document.getElementById('profilePhoto');
const profilePhotoPreview = document.getElementById('profilePhotoPreview');
const profilePhotoPlaceholder = document.getElementById('profilePhotoPlaceholder');
const profilePhotoName = document.getElementById('profilePhotoName');
const profileMessage = document.getElementById('profileMessage');
const btnRemovePhoto = document.getElementById('btnRemovePhoto');
const PROFILE_STORAGE_KEY = 'kalkulatorIpkProfile';
let profilePhotoData = '';
let selectedPhotoName = '';

function activatePanel(panelId, moveFocus = false) {
    const panel = document.getElementById(panelId);
    const button = tabButtons.find(item => item.dataset.panel === panelId);
    if (!panel || !button) return;

    tabButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
    });
    tabPanels.forEach(item => {
        const active = item === panel;
        item.hidden = !active;
        item.classList.toggle('is-active', active);
    });
    if (moveFocus) panel.focus();
}

tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => activatePanel(button.dataset.panel));
    button.addEventListener('keydown', event => {
        let nextIndex = index;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabButtons.length;
        else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = tabButtons.length - 1;
        else return;
        event.preventDefault();
        const nextTab = tabButtons[nextIndex];
        activatePanel(nextTab.dataset.panel);
        nextTab.focus();
    });
});

document.querySelector('.brand').addEventListener('click', event => {
    event.preventDefault();
    activatePanel('panelOverview');
});

document.querySelectorAll('[data-go]').forEach(button => {
    button.addEventListener('click', () => {
        const tab = tabButtons.find(item => item.dataset.panel === button.dataset.go);
        activatePanel(button.dataset.go);
        tab?.focus();
    });
});

document.querySelectorAll('.media-art').forEach(image => {
    image.addEventListener('error', () => {
        image.hidden = true;
        const fallback = image.parentElement.querySelector('.media-fallback');
        if (fallback) fallback.hidden = false;
    });
});

targetIpkInput.addEventListener('input', updateTarget);
profileForm.addEventListener('submit', saveProfile);
profilePhotoInput.addEventListener('change', previewProfilePhoto);
btnRemovePhoto.addEventListener('click', removeProfilePhoto);
loadProfile();

// -------------------------------------------------------------
// EVENT LISTENER
// -------------------------------------------------------------

// 1. EVENT: submit (Pengiriman Formulir)
courseForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm()) {
        addCourse();
    }
});

// 2. EVENT: input (Validasi Real-time pada Input Nama Matkul & SKS)
inputName.addEventListener('input', function() {
    validateCourseName();
});

inputSks.addEventListener('input', function() {
    validateCourseSks();
    updatePreviewPoints();
});

// 3. EVENT: change (Perubahan Dropdown Nilai & Perhitungan Otomatis Poin Mutu)
selectGrade.addEventListener('change', function() {
    validateCourseGrade();
    updatePreviewPoints();
    updateGradeAppearance(true);
});

// 4. EVENT: click (Tombol Sampel Data & Hapus Semua)
btnSample.addEventListener('click', loadSampleData);
btnResetAll.addEventListener('click', resetAllData);
courseTableBody.addEventListener('click', function(e) {
    const tombol = e.target.closest('.btn-del');
    if (!tombol) return;
    deleteCourse(Number(tombol.dataset.id));
});

document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        courseForm.requestSubmit();
    }
});

// -------------------------------------------------------------
// FUNGSI VALIDASI
// -------------------------------------------------------------

function validateCourseName() {
    const val = inputName.value.trim();
    if (!val) {
        showError(inputName, errCourseName, 'Nama mata kuliah tidak boleh kosong.');
        return false;
    } else if (val.length < 3) {
        showError(inputName, errCourseName, 'Nama mata kuliah minimal 3 karakter.');
        return false;
    } else {
        clearError(inputName, errCourseName);
        return true;
    }
}

function validateCourseSks() {
    const val = Number(inputSks.value);
    if (inputSks.value.trim() === '' || !Number.isFinite(val)) {
        showError(inputSks, errCourseSks, 'SKS wajib diisi angka.');
        return false;
    } else if (!Number.isInteger(val) || val < 1 || val > 6) {
        showError(inputSks, errCourseSks, 'Jumlah SKS harus bilangan bulat antara 1 sampai 6.');
        return false;
    } else {
        clearError(inputSks, errCourseSks);
        return true;
    }
}

function validateCourseGrade() {
    const val = selectGrade.value;
    if (!val) {
        showError(selectGrade, errCourseGrade, 'Silakan pilih nilai huruf.');
        return false;
    } else {
        clearError(selectGrade, errCourseGrade);
        return true;
    }
}

function validateForm() {
    const isNameValid = validateCourseName();
    const isSksValid = validateCourseSks();
    const isGradeValid = validateCourseGrade();
    const isValid = isNameValid && isSksValid && isGradeValid;
    if (!isValid) shakeInvalidFields();
    return isValid;
}

function shakeInvalidFields() {
    [inputName, inputSks, selectGrade].forEach(input => {
        if (!input.classList.contains('is-invalid')) return;
        input.classList.remove('is-shaking');
        void input.offsetWidth;
        input.classList.add('is-shaking');
    });
}

function showError(inputElem, errElem, message) {
    inputElem.classList.add('is-invalid');
    errElem.textContent = message;
}

function clearError(inputElem, errElem) {
    inputElem.classList.remove('is-invalid');
    errElem.textContent = '';
}

function updateGradeAppearance(animate = false) {
    const gradeClasses = ['grade-e', 'grade-d', 'grade-c', 'grade-bc', 'grade-b', 'grade-ab', 'grade-a'];
    selectGrade.classList.remove(...gradeClasses, 'grade-drop');
    if (!selectGrade.value) return;

    selectGrade.classList.add(`grade-${selectGrade.value.toLowerCase()}`);
    if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        void selectGrade.offsetWidth;
        selectGrade.classList.add('grade-drop');
    }
}

function updatePreviewPoints() {
    const sks = Number(inputSks.value) || 0;
    const grade = selectGrade.value;
    const weight = GRADE_WEIGHTS[grade] !== undefined ? GRADE_WEIGHTS[grade] : 0;
    const points = sks * weight;
    previewPoints.textContent = points.toFixed(2);
}

// -------------------------------------------------------------
// LOGIKA PEMROSESAN DATA & UI STATE
// -------------------------------------------------------------

function showLoading(callback) {
    emptyState.hidden = true;
    tableContainer.hidden = true;
    loadingState.hidden = false;

    setTimeout(() => {
        loadingState.hidden = true;
        callback();
    }, 300);
}

function addCourse() {
    const name = inputName.value.trim();
    const sks = Number(inputSks.value);
    const grade = selectGrade.value;
    const weight = GRADE_WEIGHTS[grade];
    const points = sks * weight;

    const newCourse = {
        id: Date.now(),
        name: name,
        sks: sks,
        grade: grade,
        weight: weight,
        points: points
    };

    showLoading(() => {
        courses.push(newCourse);
        resetForm();
        renderUI();
        tampilToast(`${name} ditambahkan.`);
    });
}

function deleteCourse(id) {
    showLoading(() => {
        courses = courses.filter(item => item.id !== id);
        renderUI();
        tampilToast('Mata kuliah dihapus.', 'danger');
    });
}

function resetForm() {
    courseForm.reset();
    updateGradeAppearance();
    previewPoints.textContent = '0.00';
    clearError(inputName, errCourseName);
    clearError(inputSks, errCourseSks);
    clearError(selectGrade, errCourseGrade);
}

function resetAllData() {
    tampilKonfirmasi({
        judul: 'Hapus semua mata kuliah?',
        isi: 'Seluruh data mata kuliah akan dihapus dan tidak bisa dikembalikan.'
    }, () => {
        showLoading(() => {
            courses = [];
            renderUI();
            tampilToast('Semua mata kuliah dihapus.', 'danger');
        });
    });
}

function loadSampleData() {
    const sampleData = [
        { id: 1, name: 'Pemrograman Web', sks: 3, grade: 'A', weight: 4.0, points: 12.0 },
        { id: 2, name: 'Sistem Operasi', sks: 2, grade: 'AB', weight: 3.5, points: 7.0 },
        { id: 3, name: 'Matematika Diskrit', sks: 3, grade: 'B', weight: 3.0, points: 9.0 }
    ];

    showLoading(() => {
        courses = [...sampleData];
        renderUI();
    });
}

// -------------------------------------------------------------
// RENDER & KALKULASI HASIL
// -------------------------------------------------------------
 function renderUI() {
     if (courses.length === 0) {
         emptyState.style.display = '';
         emptyState.hidden = false;
         tableContainer.hidden = true;
         btnResetAll.hidden = true;
        
        ipkDisplay.textContent = '0.00';
        totalSksDisplay.textContent = '0';
        totalCoursesDisplay.textContent = '0';
        totalPointsDisplay.textContent = '0.00';
        predicateBadge.textContent = 'Belum Ada Data';
        predicateBadge.style.background = 'rgba(255,255,255,0.1)';
        document.getElementById('overviewStatus').textContent = 'Belum ada mata kuliah yang dicatat.';
        updateTarget();
        return;
    }

    emptyState.style.display = 'none';
    emptyState.hidden = true;
    tableContainer.hidden = false;
    btnResetAll.hidden = false;

    courseTableBody.innerHTML = '';
    let totalSks = 0;
    let totalPoints = 0;

    courses.forEach((item, index) => {
        totalSks += item.sks;
        totalPoints += item.points;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${escapeHtml(item.name)}</strong></td>
            <td class="text-center">${item.sks}</td>
            <td class="text-center">${item.grade} (${item.weight.toFixed(2)})</td>
            <td class="text-center">${item.points.toFixed(2)}</td>
            <td class="text-center">
                <button class="btn-del" data-id="${item.id}">Hapus</button>
            </td>
        `;
        courseTableBody.appendChild(row);
    });

    const ipk = totalSks > 0 ? (totalPoints / totalSks) : 0;

    const previousIpk = ipkDisplay.textContent;
    ipkDisplay.textContent = ipk.toFixed(2);
    if (previousIpk !== ipkDisplay.textContent && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        ipkDisplay.animate(
            [{ opacity: 0.45, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }],
            { duration: 240, easing: 'ease-out' }
        );
    }
    totalSksDisplay.textContent = totalSks;
    totalCoursesDisplay.textContent = courses.length;
    totalPointsDisplay.textContent = totalPoints.toFixed(2);
    document.getElementById('overviewStatus').textContent = `${courses.length} mata kuliah tercatat dengan total ${totalSks} SKS.`;

    updatePredicate(ipk);
    updateTarget();
}

function updateTarget() {
    const rawTarget = Number(targetIpkInput.value);
    const target = Number.isFinite(rawTarget) ? Math.min(4, Math.max(0, rawTarget)) : 0;
    const totalSks = courses.reduce((sum, item) => sum + item.sks, 0);
    const totalPoints = courses.reduce((sum, item) => sum + item.points, 0);
    const ipk = totalSks ? totalPoints / totalSks : 0;
    const progress = target ? Math.min(100, (ipk / target) * 100) : 100;

    targetDisplay.textContent = target.toFixed(2);
    currentTargetIpk.textContent = ipk.toFixed(2);
    targetProgress.setAttribute('aria-valuenow', progress.toFixed(0));
    targetProgressFill.style.transform = `scaleX(${progress / 100})`;

    if (!courses.length) {
        targetMessage.textContent = 'Tambahkan mata kuliah untuk melihat perkembangan targetmu.';
    } else if (ipk >= target) {
        targetMessage.textContent = 'Target tercapai. Pertahankan konsistensi belajarmu.';
    } else {
        targetMessage.textContent = `Masih ${(target - ipk).toFixed(2)} poin menuju target. IPK dihitung dari mata kuliah yang sudah dicatat.`;
    }
}

function loadProfile() {
    try {
        const savedProfile = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || 'null');
        if (!savedProfile) return;
        profileName.value = savedProfile.name || '';
        profileNrp.value = savedProfile.nrp || '';
        profileProgram.value = savedProfile.program || '';
        profilePhotoData = savedProfile.photo || '';
        selectedPhotoName = savedProfile.photoName || '';
        updateProfilePhotoPreview();
    } catch (error) {
        profileMessage.textContent = 'Data profil tersimpan tidak dapat dibaca. Silakan isi kembali.';
    }
}

function previewProfilePhoto() {
    const file = profilePhotoInput.files[0];
    if (!file) return;

    const supportedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!supportedTypes.includes(file.type)) {
        profilePhotoInput.value = '';
        profileMessage.textContent = 'Pilih foto berformat JPG, PNG, atau WebP.';
        return;
    }
    if (file.size > 2 * 1024 * 1024) {
        profilePhotoInput.value = '';
        profileMessage.textContent = 'Ukuran foto maksimal 2 MB.';
        return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => {
        profilePhotoData = reader.result;
        selectedPhotoName = file.name;
        updateProfilePhotoPreview();
        profileMessage.textContent = 'Foto siap digunakan. Simpan profil untuk menerapkan perubahan.';
    });
    reader.addEventListener('error', () => {
        profileMessage.textContent = 'Foto tidak dapat dibaca. Coba pilih file lain.';
    });
    reader.readAsDataURL(file);
}

function updateProfilePhotoPreview() {
    profilePhotoPreview.hidden = !profilePhotoData;
    profilePhotoPlaceholder.hidden = Boolean(profilePhotoData);
    profilePhotoPreview.src = profilePhotoData || '';
    profilePhotoName.textContent = selectedPhotoName || (profilePhotoData ? 'Foto profil tersimpan' : 'Belum ada foto dipilih');
    btnRemovePhoto.hidden = !profilePhotoData;
}

function removeProfilePhoto() {
    profilePhotoData = '';
    selectedPhotoName = '';
    profilePhotoInput.value = '';
    updateProfilePhotoPreview();
    profileMessage.textContent = 'Foto dihapus. Simpan profil untuk menerapkan perubahan.';
}

function saveProfile(event) {
    event.preventDefault();
    if (!profileForm.reportValidity()) return;

    const profile = {
        name: profileName.value.trim(),
        nrp: profileNrp.value.trim(),
        program: profileProgram.value.trim(),
        photo: profilePhotoData,
        photoName: selectedPhotoName
    };

    try {
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
        profileMessage.textContent = 'Profil berhasil disimpan di perangkat ini.';
        tampilToast('Profil berhasil disimpan.');
    } catch (error) {
        profileMessage.textContent = 'Profil tidak dapat disimpan. Hapus foto atau gunakan foto yang lebih kecil.';
    }
}

function updatePredicate(ipk) {
    let predicate = '';
    let bgColor = '';

    if (ipk >= 3.51) {
        predicate = 'Dengan Pujian (Cum Laude)';
        bgColor = '#10b981';
    } else if (ipk >= 3.00) {
        predicate = 'Sangat Memuaskan';
        bgColor = '#2563eb';
    } else if (ipk >= 2.75) {
        predicate = 'Memuaskan';
        bgColor = '#f59e0b';
    } else {
        predicate = 'Cukup';
        bgColor = '#ef4444';
    }

    predicateBadge.textContent = predicate;
    predicateBadge.style.backgroundColor = bgColor;
}

function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function(m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[m];
    });
}

renderUI();