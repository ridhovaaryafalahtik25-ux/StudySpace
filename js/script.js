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

/* ---------- Statistik & Study Streak ----------
   Satu objek JSON di localStorage (key: studyspace_stats), dipakai bersama
   oleh index.html, timer.html, dan planner.html. */
const STATS_KEY = 'studyspace_stats';
const DAILY_GOAL = 60; // target fokus harian (menit)
const DAYS_SHORT = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
const DAYS_FULL = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

const escHtml = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const dateKey = d => d.toLocaleDateString('en-CA'); // YYYY-MM-DD, zona waktu lokal
const todayKey = () => dateKey(new Date());
const yesterdayKey = () => { const d = new Date(); d.setDate(d.getDate() - 1); return dateKey(d); };
const weekdayIdx = d => (d.getDay() + 6) % 7; // Senin = 0

const freshStats = () => ({
  streak: { current: 0, longest: 0, lastActiveDate: null },
  daily: { date: todayKey(), focusMinutes: 0, pomodoroSessions: 0, tasksCompleted: 0 },
  weeklyHistory: [],
  focusLog: {}, // menit fokus per tanggal { 'YYYY-MM-DD': menit }, untuk grafik mingguan
  recentActivities: []
});

// Ambil data + lakukan pengecekan reset (hari baru / streak terputus).
const loadStats = () => {
  const base = freshStats();
  let raw = null;
  try { raw = JSON.parse(localStorage.getItem(STATS_KEY)); } catch (e) {}
  const s = raw && typeof raw === 'object' ? {
    streak: { ...base.streak, ...raw.streak },
    daily: { ...base.daily, ...raw.daily },
    weeklyHistory: Array.isArray(raw.weeklyHistory) ? raw.weeklyHistory : [],
    focusLog: raw.focusLog && typeof raw.focusLog === 'object' && !Array.isArray(raw.focusLog) ? raw.focusLog : {},
    recentActivities: Array.isArray(raw.recentActivities) ? raw.recentActivities : []
  } : base;

  const today = todayKey(), last = s.streak.lastActiveDate;
  // Data lama (sebelum ada focusLog): salin menit hari itu supaya grafik tidak kosong.
  if (s.daily.date && s.daily.focusMinutes && s.focusLog[s.daily.date] === undefined) s.focusLog[s.daily.date] = s.daily.focusMinutes;
  if (s.daily.date !== today) s.daily = { date: today, focusMinutes: 0, pomodoroSessions: 0, tasksCompleted: 0 };
  if (last && last !== today && last !== yesterdayKey()) s.streak.current = 0; // terlewat >= 1 hari
  return s;
};
const saveStats = s => { try { localStorage.setItem(STATS_KEY, JSON.stringify(s)); } catch (e) {} };

// Catat aktivitas belajar: sesi Pomodoro selesai (minutes) atau jadwal dicentang (task).
const recordActivity = ({ minutes = 0, task = false, log = '' }) => {
  const s = loadStats(), today = todayKey();
  if (minutes) {
    s.daily.focusMinutes += minutes; s.daily.pomodoroSessions += 1;
    s.focusLog[today] = (s.focusLog[today] || 0) + minutes;
    // simpan maksimal 60 hari terakhir
    Object.keys(s.focusLog).sort().slice(0, -60).forEach(k => delete s.focusLog[k]);
  }
  if (task) s.daily.tasksCompleted += 1;

  if (s.streak.lastActiveDate !== today) {
    s.streak.current = s.streak.lastActiveDate === yesterdayKey() ? s.streak.current + 1 : 1;
    s.streak.lastActiveDate = today;
    if (!s.weeklyHistory.includes(today)) s.weeklyHistory.push(today);
    s.weeklyHistory = s.weeklyHistory.slice(-30);
    if (s.streak.current > s.streak.longest) s.streak.longest = s.streak.current;
  }
  if (log) {
    s.recentActivities.unshift({ text: log, ts: Date.now() });
    s.recentActivities = s.recentActivities.slice(0, 5);
  }
  saveStats(s);
};

const timeAgo = ts => {
  const m = Math.floor((Date.now() - ts) / 60000);
  if (m < 1) return 'Baru saja';
  if (m < 60) return m + ' menit lalu';
  if (m < 1440) return Math.floor(m / 60) + ' jam lalu';
  return Math.floor(m / 1440) + ' hari lalu';
};
const fmtMinutes = m => m >= 60 ? Math.floor(m / 60) + ' jam' + (m % 60 ? ' ' + (m % 60) + ' menit' : '') : m + ' Menit';

// Tampilkan ke index.html (elemen yang tidak ada dilewati).
const renderHome = () => {
  const s = loadStats();
  const activeToday = s.streak.lastActiveDate === todayKey();
  const waiting = !activeToday && s.streak.lastActiveDate === yesterdayKey();

  if ($('streakBadge')) {
    $('streakBadge').dataset.state = activeToday ? 'on' : 'off';
    $('streakCount').textContent = s.streak.current;
    $('streakNote').textContent = activeToday ? 'Streak aman, kamu sudah belajar hari ini!'
      : waiting ? 'Belajar hari ini untuk pertahankan streak!'
      : 'Mulai streak-mu dengan belajar hari ini.';
  }

  if ($('statFocus')) $('statFocus').textContent = fmtMinutes(s.daily.focusMinutes);
  if ($('statTasks')) {
    // Selesai hari ini + jadwal aktif di planner yang jatuh pada hari ini.
    let left = 0;
    try {
      const ev = JSON.parse(localStorage.getItem('ss_events'));
      if (Array.isArray(ev)) left = ev.filter(e => !e.done && e.day === weekdayIdx(new Date())).length;
    } catch (e) {}
    $('statTasks').textContent = s.daily.tasksCompleted + ' / ' + (s.daily.tasksCompleted + left) + ' Jadwal';
  }
  if ($('statBest')) $('statBest').textContent = s.streak.longest + ' Hari';
  if ($('statSessions')) $('statSessions').textContent = s.daily.pomodoroSessions + ' Sesi';

  // Ring progres target harian
  if ($('ringFill')) {
    const mins = s.daily.focusMinutes, pct = Math.min(100, Math.round(mins / DAILY_GOAL * 100));
    const C = 2 * Math.PI * 56; // keliling lingkaran (r = 56)
    $('ringFill').setAttribute('stroke-dasharray', (pct / 100 * C).toFixed(1) + ' ' + C.toFixed(1));
    $('ringFill').classList.toggle('done', pct >= 100);
    if ($('ringPct')) $('ringPct').textContent = pct + '%';
    if ($('ringSvg')) $('ringSvg').setAttribute('aria-label', 'Target harian tercapai ' + pct + ' persen, ' + mins + ' dari ' + DAILY_GOAL + ' menit');
    if ($('goalText')) $('goalText').textContent = mins + ' / ' + DAILY_GOAL + ' menit';
    if ($('goalNote')) $('goalNote').textContent = pct >= 100 ? 'Target hari ini tercapai!' : 'Sisa ' + (DAILY_GOAL - mins) + ' menit lagi';
  }

  // Grafik batang: menit fokus Senin–Minggu minggu ini
  if ($('focusChart')) {
    const now = new Date(), idx = weekdayIdx(now);
    const week = DAYS_SHORT.map((name, i) => {
      const d = new Date(now); d.setDate(now.getDate() - idx + i);
      return { name, full: DAYS_FULL[i], future: i > idx, today: i === idx, v: i > idx ? 0 : (s.focusLog[dateKey(d)] || 0) };
    });
    const total = week.reduce((a, d) => a + d.v, 0), max = Math.max(...week.map(d => d.v));
    const yMax = Math.ceil(Math.max(DAILY_GOAL, max) * 1.2 / 30) * 30; // ada ruang untuk label di atas batang
    const summary = 'Menit fokus per hari minggu ini. ' + week.map(d => d.full + ' ' + d.v).join(', ') + '. Target harian ' + DAILY_GOAL + ' menit.';

    $('focusChart').innerHTML =
      '<div class="bars" role="img" aria-label="' + summary + '">' +
        '<div class="bars-plot" aria-hidden="true">' +
          '<span class="goal-line" style="bottom:' + (DAILY_GOAL / yMax * 100).toFixed(1) + '%"></span>' +
          week.map(d => '<div class="bar-col">' + (d.future ? '' :
            d.v ? '<div class="bar' + (d.today ? ' today' : '') + '" style="height:' + (d.v / yMax * 100).toFixed(1) + '%"><span class="bar-val">' + d.v + '</span></div>'
                : '<div class="bar zero"></div>') + '</div>').join('') +
        '</div>' +
        '<div class="bars-days" aria-hidden="true">' + week.map(d => '<span' + (d.today ? ' class="today"' : '') + '>' + d.name + '</span>').join('') + '</div>' +
      '</div>' +
      '<div class="chart-legend" aria-hidden="true"><span><i class="sw sw-bar"></i>Menit fokus</span><span><i class="sw sw-goal"></i>Target ' + DAILY_GOAL + ' menit</span><span>Skala 0–' + yMax + ' menit</span></div>' +
      (total ? '' : '<p class="chart-empty">Belum ada sesi fokus minggu ini. Selesaikan satu sesi Pomodoro untuk mengisi grafik.</p>');
    if ($('chartTotal')) $('chartTotal').textContent = 'Total ' + fmtMinutes(total);
  }

  if ($('weekDots')) {
    const now = new Date(), idx = weekdayIdx(now);
    $('weekDots').innerHTML = DAYS_SHORT.map((name, i) => {
      const d = new Date(now); d.setDate(now.getDate() - idx + i);
      const on = s.weeklyHistory.includes(dateKey(d));
      return '<li class="wd' + (on ? ' on' : '') + (i === idx ? ' today' : '') + (i > idx ? ' future' : '') +
        '" aria-label="' + name + (on ? ': belajar' : ': belum belajar') + '"><span aria-hidden="true">' + (on ? '✓' : '') + '</span><small>' + name + '</small></li>';
    }).join('');
  }

  if ($('recentList')) {
    $('recentList').innerHTML = s.recentActivities.length
      ? s.recentActivities.map(a => '<li><span class="r-dot" aria-hidden="true"></span><span>' + escHtml(a.text) + ' · <time>' + timeAgo(a.ts) + '</time></span></li>').join('')
      : '<li class="recent-empty">Belum ada aktivitas.</li>';
  }
};
renderHome();
window.addEventListener('storage', renderHome); // sinkron jika timer/planner dibuka di tab lain

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
      if (remaining <= 0) {
        stop();
        // Hanya sesi fokus (Pomodoro) yang dihitung ke streak & statistik.
        if (mode === 'pomodoro') recordActivity({ minutes: durations.pomodoro, log: 'Menyelesaikan ' + durations.pomodoro + ' menit sesi fokus' });
        alert('Waktu habis!'); reset();
      }
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
  const hourH = 70, minStartHour = 8, minEndHour = 16;
  const KEY = 'ss_events';

  // Data contoh, dipakai hanya saat pertama kali (belum ada data tersimpan).
  const seed = [
    [0, 8, 10, 'Matematika', 'a'], [0, 10.3, 11.8, 'Latihan soal', 'a'],
    [1, 9.5, 13, 'Proyek kelompok', 'b'],
    [2, 12, 16, 'Belajar mandiri', 'a'],
    [3, 8, 10, 'Fisika', 'a'], [3, 10.3, 14, 'Praktikum', 'a'],
    [5, 8, 12, 'Les tambahan', 'b'], [5, 13.5, 16, 'Baca buku', 'b'],
    [6, 11, 13.5, 'Evaluasi mingguan', 'a']
  ].map((e, i) => ({ id: 's' + i, day: e[0], start: e[1], end: e[2], title: e[3], type: e[4], done: false, doneAt: null }));

  /* --- helpers --- */
  const pad = n => String(n).padStart(2, '0');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtTime = x => {
    let h = Math.floor(x), m = Math.round((x - h) * 60);
    if (m === 60) { h++; m = 0; }
    return pad(h) + ':' + pad(m);
  };
  const toDec = v => {
    if (!v) return NaN;
    const [h, m] = v.split(':').map(Number);
    return h + m / 60;
  };
  const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const fmtStamp = ts => new Date(ts).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });

  /* --- penyimpanan (localStorage) --- */
  const load = () => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw === null) return seed.map(e => ({ ...e }));
      const v = JSON.parse(raw);
      return Array.isArray(v) ? v : [];
    } catch (e) { return seed.map(e => ({ ...e })); }
  };
  let items = load();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {} };

  /* --- jadwal bentrok ditaruh berdampingan --- */
  const layoutLanes = list => {
    const sorted = [...list].sort((a, b) => a.start - b.start || a.end - b.end);
    const out = [];
    let cluster = [], clusterEnd = -1, laneEnds = [];
    const flush = () => {
      const n = Math.max(...cluster.map(c => c.lane)) + 1;
      cluster.forEach(c => out.push({ e: c.e, lane: c.lane, n }));
      cluster = []; laneEnds = []; clusterEnd = -1;
    };
    sorted.forEach(e => {
      if (cluster.length && e.start >= clusterEnd) flush();
      let l = laneEnds.findIndex(end => end <= e.start);
      if (l === -1) { l = laneEnds.length; laneEnds.push(e.end); } else laneEnds[l] = e.end;
      cluster.push({ e, lane: l });
      clusterEnd = Math.max(clusterEnd, e.end);
    });
    if (cluster.length) flush();
    return out;
  };

  /* --- grid mingguan --- */
  const drawGrid = () => {
    const active = items.filter(e => !e.done);
    const startHour = Math.min(minStartHour, ...active.map(e => Math.floor(e.start)));
    const endHour = Math.max(minEndHour, ...active.map(e => Math.ceil(e.end)));
    const h = (endHour - startHour + 1) * hourH;

    let html = '<div><div class="day-head" style="background:none"></div><div class="times" style="height:' + h + 'px">';
    for (let t = startHour; t <= endHour; t++)
      html += '<span style="top:' + ((t - startHour) * hourH) + 'px">' + pad(t) + ':00</span>';
    html += '</div></div>';

    days.forEach((d, i) => {
      html += '<div class="day"><div class="day-head">' + d + '</div><div class="day-body" style="--h:' + h + 'px">';
      layoutLanes(active.filter(e => e.day === i)).forEach(({ e, lane, n }) => {
        const top = (e.start - startHour) * hourH;
        const height = Math.max(26, (e.end - e.start) * hourH - 4);
        const side = n > 1 ? ';left:calc(' + lane + '*100%/' + n + ');width:calc(100%/' + n + ' - 4px)' : '';
        const label = esc(e.title) + ' · ' + fmtTime(e.start) + '–' + fmtTime(e.end);
        html += '<div class="ev ' + (e.type === 'b' ? 'b' : 'a') + '" style="top:' + top + 'px;height:' + height + 'px' + side + '" title="' + label + '">' +
          esc(e.title) + '<small>' + fmtTime(e.start) + '–' + fmtTime(e.end) + '</small></div>';
      });
      html += '</div></div>';
    });
    $('plannerGrid').innerHTML = html;
  };

  /* --- daftar jadwal (to-do) & riwayat --- */
  const sortItems = (a, b) => a.day - b.day || a.start - b.start;
  const drawLists = () => {
    if (!$('planList')) return;
    const active = items.filter(e => !e.done).sort(sortItems);
    const done = items.filter(e => e.done).sort((a, b) => (b.doneAt || 0) - (a.doneAt || 0));

    $('planList').innerHTML = active.length ? active.map(e =>
      '<li class="plan-item">' +
        '<input type="checkbox" data-done="' + e.id + '" id="chk-' + e.id + '" aria-label="Tandai selesai: ' + esc(e.title) + '">' +
        '<span class="dot ' + (e.type === 'b' ? 'b' : 'a') + '" aria-hidden="true"></span>' +
        '<label for="chk-' + e.id + '" class="pi-main"><b>' + esc(e.title) + '</b>' +
        '<small>' + days[e.day] + ' · ' + fmtTime(e.start) + '–' + fmtTime(e.end) + '</small></label>' +
        '<button type="button" class="pi-btn" data-del="' + e.id + '" aria-label="Hapus ' + esc(e.title) + '">×</button>' +
      '</li>').join('')
      : '<li class="plan-empty">Belum ada jadwal aktif. Tambahkan lewat form di atas.</li>';

    if ($('historyList')) {
      $('historyList').innerHTML = done.length ? done.map(e =>
        '<li class="plan-item is-done">' +
          '<span class="dot ' + (e.type === 'b' ? 'b' : 'a') + '" aria-hidden="true"></span>' +
          '<span class="pi-main"><b>' + esc(e.title) + '</b>' +
          '<small>' + days[e.day] + ' · ' + fmtTime(e.start) + '–' + fmtTime(e.end) + ' · selesai ' + fmtStamp(e.doneAt) + '</small></span>' +
          '<button type="button" class="pi-btn text" data-restore="' + e.id + '">Kembalikan</button>' +
          '<button type="button" class="pi-btn" data-del="' + e.id + '" aria-label="Hapus permanen ' + esc(e.title) + '">×</button>' +
        '</li>').join('')
        : '<li class="plan-empty">Riwayat masih kosong. Jadwal yang kamu centang selesai akan muncul di sini.</li>';
    }

    if ($('countPlan')) $('countPlan').textContent = active.length;
    if ($('countHistory')) $('countHistory').textContent = done.length;
    if ($('planProgress')) $('planProgress').textContent = done.length + ' dari ' + items.length + ' jadwal selesai';
  };

  const drawAll = () => { drawGrid(); drawLists(); };

  /* --- tab Jadwal / Riwayat --- */
  const showTab = which => {
    const hist = which === 'history';
    $('planList').hidden = hist;
    $('historyWrap').hidden = !hist;
    $('tabPlan').setAttribute('aria-pressed', !hist);
    $('tabHistory').setAttribute('aria-pressed', hist);
  };
  if ($('tabPlan') && $('tabHistory')) {
    $('tabPlan').onclick = () => showTab('plan');
    $('tabHistory').onclick = () => showTab('history');
  }

  /* --- form tambah jadwal --- */
  if ($('planForm')) {
    $('planForm').addEventListener('submit', e => {
      e.preventDefault();
      const msg = t => { $('planMsg').textContent = t; };
      const title = $('planTitle').value.trim();
      const start = toDec($('planStart').value), end = toDec($('planEnd').value);
      const day = +$('planDay').value;

      if (!title) return msg('Nama kegiatan tidak boleh kosong.');
      if (isNaN(start) || isNaN(end)) return msg('Isi jam mulai dan jam selesai.');
      if (end <= start) return msg('Jam selesai harus setelah jam mulai.');

      const clash = items.find(x => !x.done && x.day === day && x.start < end && x.end > start);
      items.push({ id: newId(), day, start, end, title, type: $('planType').value, done: false, doneAt: null });
      save();
      e.target.reset();
      drawAll();
      msg(clash ? 'Tersimpan. Perhatian: bentrok dengan "' + clash.title + '".' : 'Jadwal ditambahkan.');
    });
  }

  /* --- aksi di daftar: selesai, hapus, kembalikan --- */
  if ($('planList')) {
    $('planList').addEventListener('change', e => {
      const id = e.target.dataset.done;
      const it = id && items.find(x => x.id === id);
      if (!it) return;
      it.done = true; it.doneAt = Date.now();
      recordActivity({ task: true, log: 'Menyelesaikan jadwal: ' + it.title });
      save(); drawAll();
    });
  }
  const onListClick = e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    if (btn.dataset.del) {
      const it = items.find(x => x.id === btn.dataset.del);
      if (it && confirm('Hapus "' + it.title + '"?')) {
        items = items.filter(x => x.id !== it.id);
        save(); drawAll();
      }
    } else if (btn.dataset.restore) {
      const it = items.find(x => x.id === btn.dataset.restore);
      if (it) { it.done = false; it.doneAt = null; save(); drawAll(); }
    }
  };
  if ($('planList')) $('planList').addEventListener('click', onListClick);
  if ($('historyList')) $('historyList').addEventListener('click', onListClick);

  if ($('clearHistory')) {
    $('clearHistory').onclick = () => {
      if (!items.some(x => x.done)) return;
      if (confirm('Hapus semua riwayat jadwal?')) {
        items = items.filter(x => !x.done);
        save(); drawAll();
      }
    };
  }

  drawAll();
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
const guideIcons = ['book', 'clock', 'note', 'target', 'zap', 'heart'];
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
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
