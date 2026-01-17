function getToken() {
  return localStorage.getItem('token');
}

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString();
}

function initialsFromUser(user) {
  const base = (user && (user.username || user.email)) ? String(user.username || user.email) : 'U';
  const cleaned = base.trim().replace(/[^a-zA-Z0-9 ]/g, '');
  const parts = cleaned.split(/\s+/).filter(Boolean);
  const first = (parts[0] || 'U').slice(0, 1);
  const second = (parts[1] || '').slice(0, 1);
  return (first + second).toUpperCase();
}

async function loadProfile() {
  const statusEl = document.getElementById('profile-status');
  const token = getToken();

  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  try {
    const res = await fetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.ok || !data.user) {
      localStorage.removeItem('token');
      window.location.href = 'login.html';
      return;
    }

    document.getElementById('profile-username').textContent = data.user.username || '—';
    document.getElementById('profile-email').textContent = data.user.email || '—';
    document.getElementById('profile-id').textContent = data.user.id || '—';
    document.getElementById('profile-created').textContent = formatDate(data.user.createdAt);
    document.getElementById('profile-updated').textContent = formatDate(data.user.updatedAt);

    const initialsEl = document.getElementById('profile-avatar-initials');
    if (initialsEl) initialsEl.textContent = initialsFromUser(data.user);

    if (statusEl) statusEl.textContent = 'Signed in.';
  } catch (_err) {
    if (statusEl) statusEl.textContent = 'Failed to load profile. Please try again.';
  }
}

function wireLogout() {
  const logoutBtn = document.getElementById('logout-btn');
  const logoutBtn2 = document.getElementById('logout-btn-2');

  if (!logoutBtn) return;

  const handler = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  };

  logoutBtn.addEventListener('click', handler);
  if (logoutBtn2) logoutBtn2.addEventListener('click', handler);
}

document.addEventListener('DOMContentLoaded', () => {
  wireLogout();
  loadProfile();
});
