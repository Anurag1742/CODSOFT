const path = require('path');

const express = require('express');
const dotenv = require('dotenv');

const { connectMongo } = require('./src/db/mongo');
const authRouter = require('./src/routes/auth');

dotenv.config();

const app = express();

app.use(express.json());

// Serve your existing frontend files (index.html, login.html, css, js)
app.use(express.static(path.join(__dirname)));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'landing-page-mongo', time: new Date().toISOString() });
});

app.use('/api/auth', authRouter);

const port = Number(process.env.PORT || 3000);

async function start() {
  await connectMongo(process.env.MONGODB_URI);

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
