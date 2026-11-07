/* ============================================================
   EGS CHRONOS - SHARED HELPERS (navbar, footer, toast, utils)
   Every page loads this file so the menu is written only once.
   ============================================================ */

function esc(str) {
  return String(str == null ? "" : str).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function initials(name) {
  const p = String(name).trim().split(/\s+/);
  return ((p[0] || "")[0] + (p.length > 1 ? p[p.length - 1][0] : (p[0] || "")[1] || "")).toUpperCase();
}
function statusLabel(s) { return s === "verified" ? "Verified" : s === "rejected" ? "Rejected" : "Pending"; }
function shortDept(d) {
  return d || "";
}

function renderNav(active) {
  const user = currentUser();
  let links = `
    <a href="index.html" class="${active === "home" ? "active" : ""}">Home</a>
    <a href="explore.html" class="${active === "explore" ? "active" : ""}">Explore Talent</a>`;
  if (user) {
    if (user.role === "student") links += `<a href="dashboard.html" class="${active === "dashboard" ? "active" : ""}">My Dashboard</a>`;
    if (user.role === "faculty" || user.role === "admin") links += `<a href="admin.html" class="${active === "admin" ? "active" : ""}">${user.role === "admin" ? "Admin Panel" : "Review Panel"}</a>`;
    links += `<span class="muted">Hi, ${esc(user.name.split(" ")[0])}</span>
              <button class="btn btn-dark btn-sm" id="logoutBtn">Logout</button>`;
  } else {
    links += `<a class="btn btn-dark btn-sm" href="login.html">Login</a>`;
  }
  const el = document.getElementById("nav");
  if (!el) return;
  el.innerHTML = `
  <header class="nav"><div class="container">
    <a class="brand" href="index.html"><span class="mark">C</span><span>EGS <b>CHRONOS</b></span></a>
    <button class="nav-toggle" id="navToggle" aria-label="Menu">&#9776;</button>
    <nav class="nav-links" id="navLinks">${links}</nav>
  </div></header>`;
  document.getElementById("navToggle").onclick = () => document.getElementById("navLinks").classList.toggle("open");
  const lb = document.getElementById("logoutBtn");
  if (lb) lb.onclick = () => { logout(); location.href = "index.html"; };
}

function renderFooter() {
  const el = document.getElementById("footer");
  if (!el) return;
  el.innerHTML = `<footer><div class="container">
    <img src="assets/logo.png" alt="EGS Pillay logo">
    E.G.S. Pillay Engineering College, Nagapattinam &middot; EGS Chronos &ndash; Student Achievement &amp; Skill Discovery Portal
  </div></footer>`;
}

let toastTimer;
function toast(msg) {
  let t = document.getElementById("toast");
  if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
}

/* Redirect away if user is not allowed on this page */
function requireRole(roles) {
  const u = currentUser();
  if (!u || !roles.includes(u.role)) { location.href = "login.html"; return null; }
  return u;
}

/* Fill a <select> with options */
function fillSelect(sel, items, firstLabel) {
  sel.innerHTML = (firstLabel ? `<option value="">${esc(firstLabel)}</option>` : "") +
    items.map(i => `<option value="${esc(i)}">${esc(i)}</option>`).join("");
}

/* Reusable HTML for one achievement card (used on profile + dashboard) */
function achievementHTML(a, actions) {
  const tags = (a.tags || []).map(t => `<span class="chip">${esc(t)}</span>`).join("");
  return `<div class="card ach">
    <div style="flex:1">
      <h4>${esc(a.title)}</h4>
      <div class="muted">${esc(a.category)} &middot; ${esc(a.level)} &middot; ${esc(a.date || "")}</div>
      <p>${esc(a.description)}</p>
      <div class="chips">${tags}</div>
      ${a.sourceUrl ? `<p><a class="src" href="${esc(a.sourceUrl)}" target="_blank" rel="noopener">View original source &rarr;</a></p>` : ""}
      ${actions || ""}
    </div>
    <span class="badge ${a.status}">${statusLabel(a.status)}</span>
  </div>`;
}
