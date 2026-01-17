const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = express.Router();

function signToken(user) {
  const secret = process.env.JWT_SECRET || 'dev-secret-change-me';
  return jwt.sign({ sub: user._id.toString(), email: user.email }, secret, { expiresIn: '7d' });
}

function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length).trim() : null;

    if (!token) {
      return res.status(401).json({ ok: false, message: 'Missing auth token' });
    }

    const secret = process.env.JWT_SECRET || 'dev-secret-change-me';
    const payload = jwt.verify(token, secret);
    req.auth = { userId: payload.sub, email: payload.email };
    return next();
  } catch (_err) {
    return res.status(401).json({ ok: false, message: 'Invalid or expired token' });
  }
}

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body || {};

    if (!username || !email || !password) {
      return res.status(400).json({ ok: false, message: 'username, email, and password are required' });
    }

    if (String(password).length < 6) {
      return res.status(400).json({ ok: false, message: 'Password must be at least 6 characters' });
    }

    const existing = await User.findOne({ email: String(email).toLowerCase().trim() }).lean();
    if (existing) {
      return res.status(409).json({ ok: false, message: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(String(password), 10);

    const user = await User.create({
      username: String(username).trim(),
      email: String(email).toLowerCase().trim(),
      passwordHash
    });

    const token = signToken(user);

    return res.status(201).json({
      ok: true,
      message: 'Registered successfully',
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    return res.status(500).json({ ok: false, message: 'Server error', error: String(err.message || err) });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ ok: false, message: 'email and password are required' });
    }

    const user = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ ok: false, message: 'Invalid email or password' });
    }

    const ok = await bcrypt.compare(String(password), user.passwordHash);
    if (!ok) {
      return res.status(401).json({ ok: false, message: 'Invalid email or password' });
    }

    const token = signToken(user);

    return res.json({
      ok: true,
      message: 'Login successful',
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    return res.status(500).json({ ok: false, message: 'Server error', error: String(err.message || err) });
  }
});

router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.auth.userId).lean();
    if (!user) {
      return res.status(404).json({ ok: false, message: 'User not found' });
    }

    return res.json({
      ok: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (err) {
    return res.status(500).json({ ok: false, message: 'Server error', error: String(err.message || err) });
  }
});

module.exports = router;
