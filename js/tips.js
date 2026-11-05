// Fitur dasar halaman Tips Belajar. Data disimpan di localStorage browser.
const readStore = (key) => {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
};
const writeStore = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// Study Planner
const scheduleForm = document.querySelector('#schedule-form');
const scheduleList = document.querySelector('#schedule-list');
let schedules = readStore('studyspace-schedules');

function renderSchedules() {
  if (!scheduleList) return;
  scheduleList.innerHTML = '';
  if (!schedules.length) {
    scheduleList.innerHTML = '<li class="empty-state">Belum ada jadwal. Tambahkan agenda belajarmu.</li>';
    return;
  }
  schedules.forEach((item, index) => {
    const li = document.createElement('li');
    const text = document.createElement('span');
    text.textContent = `${item.title} · ${item.date}`;
    const button = document.createElement('button');
    button.className = 'button button-secondary';
    button.type = 'button';
    button.textContent = 'Hapus';
    button.addEventListener('click', () => {
      schedules.splice(index, 1); writeStore('studyspace-schedules', schedules); renderSchedules();
    });
    li.append(text, button); scheduleList.append(li);
  });
}
if (scheduleForm) {
  scheduleForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.querySelector('#schedule-title').value.trim();
    const date = document.querySelector('#schedule-date').value;
    if (!title || !date) return;
    schedules.push({ title, date }); writeStore('studyspace-schedules', schedules);
    scheduleForm.reset(); renderSchedules();
  });
  renderSchedules();
}

// Pomodoro Timer
const timerDisplay = document.querySelector('#timer-display');
if (timerDisplay) {
  const modeLabel = document.querySelector('#timer-mode');
  const focusInput = document.querySelector('#focus-minutes');
  const breakInput = document.querySelector('#break-minutes');
  const startButton = document.querySelector('#timer-start');
  const resetButton = document.querySelector('#timer-reset');
  const switchButton = document.querySelector('#timer-switch');
  let mode = 'focus', remaining = 25 * 60, interval = null;

  const getDuration = () => (mode === 'focus' ? Number(focusInput.value) : Number(breakInput.value)) * 60;
  const renderTimer = () => {
    const min = Math.floor(remaining / 60).toString().padStart(2, '0');
    const sec = (remaining % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${min}:${sec}`;
    modeLabel.textContent = mode === 'focus' ? 'Waktu Fokus' : 'Waktu Istirahat';
  };
  const stopTimer = () => { clearInterval(interval); interval = null; startButton.textContent = 'Mulai'; };
  startButton.addEventListener('click', () => {
    if (interval) { stopTimer(); return; }
    startButton.textContent = 'Jeda';
    interval = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) { stopTimer(); remaining = 0; }
      renderTimer();
    }, 1000);
  });
  resetButton.addEventListener('click', () => { stopTimer(); remaining = getDuration(); renderTimer(); });
  switchButton.addEventListener('click', () => { stopTimer(); mode = mode === 'focus' ? 'break' : 'focus'; remaining = getDuration(); renderTimer(); });
  [focusInput, breakInput].forEach(input => input.addEventListener('change', () => {
    if (!interval) { remaining = getDuration(); renderTimer(); }
  }));
  renderTimer();
}

// To-Do List
const taskForm = document.querySelector('#task-form');
const taskList = document.querySelector('#task-list');
const taskProgress = document.querySelector('#task-progress');
let tasks = readStore('studyspace-tasks');
function renderTasks() {
  if (!taskList) return;
  taskList.innerHTML = '';
  const completed = tasks.filter(task => task.done).length;
  taskProgress.textContent = `${completed} dari ${tasks.length} tugas selesai`;
  if (!tasks.length) { taskList.innerHTML = '<li class="empty-state">Belum ada tugas.</li>'; return; }
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'; checkbox.checked = task.done;
    checkbox.addEventListener('change', () => { tasks[index].done = checkbox.checked; writeStore('studyspace-tasks', tasks); renderTasks(); });
    const text = document.createElement('span'); text.textContent = task.title;
    if (task.done) text.style.textDecoration = 'line-through';
    label.append(checkbox, text);
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'button button-secondary'; remove.textContent = 'Hapus';
    remove.addEventListener('click', () => { tasks.splice(index, 1); writeStore('studyspace-tasks', tasks); renderTasks(); });
    li.append(label, remove); taskList.append(li);
  });
}
if (taskForm) {
  taskForm.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('#task-input');
    if (!input.value.trim()) return;
    tasks.push({ title: input.value.trim(), done: false }); writeStore('studyspace-tasks', tasks); input.value = ''; renderTasks();
  });
  renderTasks();
}

// Study Notes
const noteForm = document.querySelector('#note-form');
const noteList = document.querySelector('#note-list');
let notes = readStore('studyspace-notes');
function renderNotes() {
  if (!noteList) return;
  noteList.innerHTML = '';
  if (!notes.length) { noteList.innerHTML = '<li class="empty-state">Belum ada catatan.</li>'; return; }
  notes.forEach((note, index) => {
    const li = document.createElement('li');
    const title = document.createElement('span'); title.textContent = note.title;
    const actions = document.createElement('div');
    const open = document.createElement('button'); open.type = 'button'; open.className = 'button button-secondary'; open.textContent = 'Buka';
    open.addEventListener('click', () => { document.querySelector('#note-title').value = note.title; document.querySelector('#note-content').value = note.content; });
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'button button-secondary'; remove.textContent = 'Hapus';
    remove.addEventListener('click', () => { notes.splice(index, 1); writeStore('studyspace-notes', notes); renderNotes(); });
    actions.append(open, remove); li.append(title, actions); noteList.append(li);
  });
}
if (noteForm) {
  noteForm.addEventListener('submit', event => {
    event.preventDefault();
    const title = document.querySelector('#note-title').value.trim();
    const content = document.querySelector('#note-content').value.trim();
    if (!title || !content) return;
    notes.push({ title, content }); writeStore('studyspace-notes', notes); noteForm.reset(); renderNotes();
  });
  renderNotes();
}
