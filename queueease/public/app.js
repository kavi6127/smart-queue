// public/app.js - shared frontend logic

async function postJson(url, body){
  const res = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(body || {})
  });
  return res.json();
}

async function getJson(url){
  const res = await fetch(url);
  return res.json();
}

/* ---------- index.html logic ---------- */
if (document.getElementById('getTokenBtn')) {
  const nameInput = document.getElementById('name');
  const serviceInput = document.getElementById('service');
  const getTokenBtn = document.getElementById('getTokenBtn');
  const resultDiv = document.getElementById('result');
  const tokenSpan = document.getElementById('tokenSpan');
  const posSpan = document.getElementById('posSpan');
  const servingSpan = document.getElementById('servingSpan');
  const countSpan = document.getElementById('countSpan');
  const nextList = document.getElementById('nextList');

  getTokenBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim() || 'Guest';
    const service = serviceInput.value || 'General';
    try {
      const data = await postJson('/api/token', { name, service });
      if (data.ok) {
        tokenSpan.textContent = data.token;
        posSpan.textContent = data.position;
        resultDiv.style.display = 'block';
      } else {
        alert('Failed to get token');
      }
    } catch (e) {
      alert('Network error');
    }
  });

  async function refreshStatus(){
    try {
      const s = await getJson('/api/status');
      if (s.ok) {
        servingSpan.textContent = s.serving ? `${s.serving.token} — ${s.serving.name}` : '—';
        countSpan.textContent = s.queueCount;
        nextList.innerHTML = s.nextTokens.map(t => `<li>${t.token} — ${t.name} (${t.service})</li>`).join('');
      }
    } catch (e) {
      // silent
    }
  }

  refreshStatus();
  setInterval(refreshStatus, 2000);
}

/* ---------- admin.html logic ---------- */
if (document.getElementById('nextBtn')) {
  const nextBtn = document.getElementById('nextBtn');
  const skipBtn = document.getElementById('skipBtn');
  const statusMsg = document.getElementById('statusMsg');
  const servingAdmin = document.getElementById('servingAdmin');
  const queueLen = document.getElementById('queueLen');
  const upcoming = document.getElementById('upcoming');

  nextBtn.addEventListener('click', async () => {
    statusMsg.textContent = 'Calling next...';
    const r = await postJson('/api/next', {});
    statusMsg.textContent = r.ok ? `Now serving ${r.serving.token}` : (r.message || 'No tokens');
  });

  skipBtn.addEventListener('click', async () => {
    const r = await postJson('/api/skip', {});
    statusMsg.textContent = r.ok ? 'Skipped current' : (r.message || 'Nothing to skip');
  });

  async function refreshAdmin(){
    try {
      const s = await getJson('/api/status');
      if (s.ok) {
        servingAdmin.textContent = s.serving ? `${s.serving.token} — ${s.serving.name}` : '—';
        queueLen.textContent = s.queueCount;
        upcoming.innerHTML = s.nextTokens.map(t => `<li>${t.token} — ${t.name} (${t.service})</li>`).join('');
      }
    } catch (e) { }
  }

  refreshAdmin();
  setInterval(refreshAdmin, 2000);
}
