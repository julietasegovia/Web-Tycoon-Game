require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const app    = express();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-in-production';
const PORT       = process.env.PORT || 3005;

app.use(express.json());
// At the top where you have app.use(cors());
app.use(cors({
  origin: true,  // Allow any origin temporarily for debugging
  credentials: true
}));

// ── Middleware: verify Bearer token ──────────────────────────────────────────

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    req.user = jwt.verify(header.slice(7), JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}

// ── POST /api/auth/signup ────────────────────────────────────────────────────

app.post('/api/auth/signup', async (req, res) => {
  console.log("holaaaaaaaaaaaaaaaaaaaaaaa llegue ")
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existing) {
      return res.status(400).json({ message: 'Email or username already taken' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user   = await prisma.user.create({
      data: { username, email, password: hashed },
    });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    console.log('🌱 New farmer joined:', user.username);
    res.status(201).json({ user: { id: user.id, username: user.username, email: user.email }, token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// ── POST /api/auth/login ─────────────────────────────────────────────────────

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  console.log("Database URL Check:", process.env.DATABASE_URL);
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ user: { id: user.id, username: user.username, email: user.email }, token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// ── GET /api/auth/me ─────────────────────────────────────────────────────────

app.get('/api/auth/me', requireAuth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, username: true, email: true, createdAt: true },
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/game/state', requireAuth, async (req, res) => {
  try {
    const save = await prisma.gameState.findUnique({
      where: { userId: req.user.id }
    });
    res.json({ state: save ? JSON.parse(save.data) : null }); // ← parse on read
  } catch (err) {
    console.error('GET /api/game/state error:', err.message);
    res.status(500).json({ message: 'Failed to load game state' });
  }
});

app.put('/api/game/state', requireAuth, async (req, res) => {
  try {
    const { state } = req.body;
    const save = await prisma.gameState.upsert({
      where:  { userId: req.user.id },
      update: { data: JSON.stringify(state) }, // ← stringify on write
      create: { userId: req.user.id, data: JSON.stringify(state) },
    });
    res.json({ updatedAt: save.updatedAt });
  } catch (err) {
    console.error('PUT /api/game/state error:', err.message);
    res.status(500).json({ message: 'Failed to save game state' });
  }
});

// ── POST /api/auth/logout ────────────────────────────────────────────────────
// JWTs are stateless — the real logout happens client-side (AuthContext clears
// localStorage). This endpoint exists so the frontend call doesn't 404.

app.post('/api/auth/logout', requireAuth, (_req, res) => {
  res.json({ ok: true });
});

// ── Start ────────────────────────────────────────────────────────────────────

// Change this line at the bottom of server.js:
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Farm server running on http://0.0.0.0:${PORT}`);
});