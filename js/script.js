/* StudySpace - script bersama untuk semua halaman */
const $ = id => document.getElementById(id);
const page = document.body.dataset.page;

/* ---------- Auth (demo, disimpan di browser) ---------- */
const isAuth = () => { try { return !!localStorage.getItem('ss_user'); } catch (e) { return false; } };
const setUser = v => { try { v ? localStorage.setItem('ss_user', v) : localStorage.removeItem('ss_user'); } catch (e) {} };
const getUser = () => { try { return localStorage.getItem('ss_user') || ''; } catch (e) { return ''; } };

// Belum login -> ke login. Sudah login -> jangan tampilkan login.
if (!isAuth() && page !== 'login') location.replace('login.html');
else if (isAuth() && page === 'login') location.replace('index.html');

if ($('userName')) $('userName').textContent = getUser() || 'Nama';

/* ---------- Login ---------- */
if ($('loginForm')) {
  $('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const email = e.target.querySelector('input[type=email]').value;
    const raw = email.split('@')[0].replace(/[._-]+/g, ' ').trim();
    setUser(raw.replace(/\b\w/g, c => c.toUpperCase()) || 'Pelajar');
    location.href = 'index.html'; // ganti dengan proses login ke server
  });
}

/* ---------- Timer ---------- */
if ($('clock')) {
  const clock = $('clock'), startBtn = $('startBtn');
  const durations = { pomodoro: 25, short: 5, long: 15 };
  let mode = 'pomodoro', remaining = durations.pomodoro * 60, ticking = null;
  const fmt = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  const draw = () => {
    clock.textContent = fmt(remaining);
    clock.style.setProperty('--p', (1 - remaining / (durations[mode] * 60)).toFixed(4));
    document.title = (ticking ? fmt(remaining) + ' · ' : '') + 'Timer · StudySpace';
  };
  const stop = () => { clearInterval(ticking); ticking = null; startBtn.textContent = 'Mulai'; };
  const reset = () => { stop(); remaining = durations[mode] * 60; draw(); };

  startBtn.onclick = () => {
    if (ticking) { stop(); startBtn.textContent = 'Lanjut'; return; }
    startBtn.textContent = 'Jeda';
    ticking = setInterval(() => {
      remaining--; draw();
      if (remaining <= 0) { stop(); alert('Waktu habis!'); reset(); }
    }, 1000);
  };
  $('resetBtn').onclick = reset;
  document.querySelectorAll('.mode').forEach(b => b.onclick = () => {
    mode = b.dataset.mode;
    document.querySelectorAll('.mode').forEach(x => x.setAttribute('aria-pressed', x === b));
    reset();
  });
  $('setBtn').onclick = () => {
    const open = $('settings').classList.toggle('open');
    $('setBtn').setAttribute('aria-expanded', open);
  };
  [['inPomodoro', 'pomodoro'], ['inShort', 'short'], ['inLong', 'long']].forEach(([id, key]) =>
    $(id).onchange = e => {
      durations[key] = Math.max(1, +e.target.value || durations[key]);
      if (mode === key) reset();
    });
}

/* ---------- Planner ---------- */
if ($('plannerGrid')) {
  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const hourH = 70, startHour = 8, endHour = 16;
  const events = [ // [hari, mulai, selesai, judul, tipe]
    [0, 8, 10, 'Matematika', 'a'], [0, 10.3, 11.8, 'Latihan soal', 'a'],
    [1, 9.5, 13, 'Proyek kelompok', 'b'],
    [2, 12, 16, 'Belajar mandiri', 'a'],
    [3, 8, 10, 'Fisika', 'a'], [3, 10.3, 14, 'Praktikum', 'a'],
    [5, 8, 12, 'Les tambahan', 'b'], [5, 13.5, 16, 'Baca buku', 'b'],
    [6, 11, 13.5, 'Evaluasi mingguan', 'a']
  ];
  const h = (endHour - startHour + 1) * hourH;
  let html = '<div><div class="day-head" style="background:none"></div><div class="times" style="height:' + h + 'px">';
  for (let t = startHour; t <= endHour; t++)
    html += '<span style="top:' + ((t - startHour) * hourH) + 'px">' + String(t).padStart(2, '0') + ':00</span>';
  html += '</div></div>';
  days.forEach((d, i) => {
    html += '<div class="day"><div class="day-head">' + d + '</div><div class="day-body" style="--h:' + h + 'px">';
    events.filter(e => e[0] === i).forEach(e => {
      html += '<div class="ev ' + e[4] + '" style="top:' + ((e[1] - startHour) * hourH) + 'px;height:' + ((e[2] - e[1]) * hourH - 4) + 'px">' + e[3] + '</div>';
    });
    html += '</div></div>';
  });
  $('plannerGrid').innerHTML = html;
}

/* ---------- Tips & Panduan ---------- */
const ICON = {
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  note: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21.2l7.8-7.8 1.1-1.1a5.5 5.5 0 0 0 0-7.8z"/>'
};
const svgIcon = n => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[n] + '</svg>';
const tipIcons = ['calendar', 'clock', 'note'];
const guideIcons = ['book', 'clock', 'note', 'target', 'zap', 'heart'];
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
if ($('tipsList')) {
  $('tipsList').innerHTML = ['Study planner', 'Teknik Pomodoro', 'Catatan efektif'].map((t, i) =>
    '<div class="tip"><div class="thumb" aria-hidden="true">' + svgIcon(tipIcons[i]) + '</div><div class="body"><h2>' + t + '</h2><p>' + lorem +
    ' Lihat selengkapnya…</p><a class="more" href="artikel.html" aria-label="Baca ' + t + '">→</a></div></div>').join('');
}
if ($('guideList')) {
  $('guideList').innerHTML = ['Mulai belajar', 'Mengatur waktu', 'Membuat catatan', 'Persiapan ujian', 'Fokus dan konsentrasi', 'Menjaga motivasi'].map((t, i) =>
    '<div class="guide"><div class="thumb" aria-hidden="true">' + svgIcon(guideIcons[i]) + '</div><h2>' + t + '</h2><p>' + lorem +
    ' Lihat selengkapnya…</p><a class="more" href="artikel.html" aria-label="Baca ' + t + '">→</a></div>').join('');
}

/* ---------- Sumber belajar ---------- */
if ($('resGrid')) {
  // Semua konten di bawah ini placeholder Lorem Ipsum. Tidak ada link ke situs luar.
  const lorem2 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.';
  const resources = [
    { t: 'Lorem ipsum dolor sit amet', type: 'Artikel', d: lorem2, internal: true },
    { t: 'Consectetur adipiscing elit', type: 'Artikel', d: lorem2, internal: true },
    { t: 'Sed do eiusmod tempor', type: 'Artikel', d: lorem2, internal: true },
    { t: 'Ut enim ad minim veniam', type: 'Artikel', d: lorem2, internal: true },
    { t: 'Quis nostrud exercitation', type: 'Kursus', d: lorem2 },
    { t: 'Duis aute irure dolor', type: 'Kursus', d: lorem2 },
    { t: 'Excepteur sint occaecat', type: 'Kursus', d: lorem2 },
    { t: 'Nemo enim ipsam voluptatem', type: 'Jurnal', d: lorem2 }
  ];
  const render = f => {
    $('resGrid').innerHTML = resources.filter(r => f === 'all' || r.type === f).map(r => {
      const inner = '<span class="tag">' + r.type + '</span><h2>' + r.t + '</h2><p>' + r.d + '</p>' +
        '<span class="go">' + (r.internal ? 'Baca artikel →' : 'Lorem ipsum →') + '</span>';
      // Artikel membuka halaman contoh internal; lainnya hanya tampilan (bukan link).
      return r.internal
        ? '<a class="res t-' + r.type + '" href="artikel.html">' + inner + '</a>'
        : '<div class="res t-' + r.type + '">' + inner + '</div>';
    }).join('');
  };
  document.querySelectorAll('.chip').forEach(c => c.onclick = () => {
    document.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', x === c));
    render(c.dataset.f);
  });
  render('all');
}

/* ---------- Pengaturan ---------- */
if ($('saveName')) {
  const store = {
    get(k, d) { try { const v = localStorage.getItem('ss_' + k); return v === null ? d : v === '1'; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('ss_' + k, v ? '1' : '0'); } catch (e) {} }
  };
  document.querySelectorAll('input[data-key]').forEach(i => {
    i.checked = store.get(i.dataset.key, i.checked);
    i.onchange = () => store.set(i.dataset.key, i.checked);
  });
  $('setName').value = getUser();
  $('saveName').onclick = () => {
    const v = $('setName').value.trim();
    if (!v) { $('saveMsg').textContent = 'Nama tidak boleh kosong.'; return; }
    setUser(v); $('saveMsg').textContent = 'Nama tersimpan.';
  };
  $('logoutBtn').onclick = () => { setUser(''); location.href = 'login.html'; };
}
