function escapeHtml(value = '') {
  return String(value).replace(/[&<>]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[character]));
}

function escapeAttribute(value = '') {
  return escapeHtml(value).replace(/"/g, '&quot;');
}

function hexWithAlpha(hex, alpha) {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return hex;
  const numeric = parseInt(clean, 16);
  return `rgba(${numeric >> 16},${(numeric >> 8) & 255},${numeric & 255},${alpha})`;
}

window.MakerFormat = { escapeHtml, escapeAttribute, hexWithAlpha };
