// QueueEase Backend - Node.js + Express
// Author: Kavi Mani

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ----------------------------
// IN-MEMORY DATABASE
// ----------------------------
let nextSerial = 1;           // generates A1, A2, A3...
const queue = [];             // active waiting list
let serving = null;           // current person being served

// Generate a token like A1, A2, A3
function generateToken() {
  const token = `A${nextSerial}`;
  nextSerial++;
  return token;
}

// ----------------------------
// API ENDPOINTS
// ----------------------------

// POST /api/token → citizen requests a token
app.post('/api/token', (req, res) => {
  const { name = 'Guest', service = 'General' } = req.body || {};
  const token = generateToken();
  const entry = { token, name, service, createdAt: Date.now() };
  queue.push(entry);
  const position = queue.length;
  console.log(`Token issued: ${token} (${name}, ${service})`);
  res.json({ ok: true, token, position });
});

// GET /api/status → fetch queue status for public view
app.get('/api/status', (req, res) => {
  res.json({
    ok: true,
    serving,
    queueCount: queue.length,
    nextTokens: queue.slice(0, 10), // show next 10 tokens
  });
});

// POST /api/next → admin serves next person
app.post('/api/next', (req, res) => {
  if (queue.length === 0) {
    serving = null;
    return res.json({ ok: false, message: 'No tokens in queue' });
  }
  const next = queue.shift();
  serving = { ...next, startedAt: Date.now() };
  console.log(`Now serving: ${serving.token} (${serving.name})`);
  return res.json({ ok: true, serving });
});

// POST /api/skip → admin skips current person (send to end)
app.post('/api/skip', (req, res) => {
  if (!serving) return res.json({ ok: false, message: 'No token currently serving' });
  const skipped = { token: serving.token, name: serving.name, service: serving.service, createdAt: Date.now() };
  queue.push(skipped);
  console.log(`Skipped: ${serving.token}`);
  serving = null;
  res.json({ ok: true, message: 'Token skipped' });
});

// GET /api/reset → (optional) reset the queue (for demo)
app.get('/api/reset', (req, res) => {
  queue.length = 0;
  serving = null;
  nextSerial = 1;
  console.log('Queue reset');
  res.json({ ok: true });
});

// ----------------------------
// START SERVER
// ----------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ QueueEase running at http://localhost:${PORT}`));
