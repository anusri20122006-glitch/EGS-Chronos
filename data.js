/* ============================================================
   EGS CHRONOS - DATA LAYER
   This file acts as the "database". It stores everything in the
   browser's localStorage so the site works with NO server.
   (Later you can replace these functions with a real backend.)
   ============================================================ */

const DB_KEY = "egs_chronos_db_v1";
const SESSION_KEY = "egs_chronos_session_v1";

const DEPARTMENTS = [
  "Information Technology",
  "Computer Science Engineering",
  "Electronics and Communication Engineering",
  "Electrical and Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering"
];
const CATEGORIES = ["Certification", "Hackathon", "Internship", "Project", "Research", "Award", "Sports", "Cultural"];
const LEVELS = ["College", "State", "National", "International"];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

/* ---------- Demo data (loaded the first time the site opens) ---------- */
function seedData() {
  const users = [
    { id: "u1", name: "Futtaina A", email: "futtaina@egs.edu", password: "demo123", role: "student",
      dept: DEPARTMENTS[0], year: "3rd Year", about: "Web developer who loves building clean user interfaces and solving database problems.",
      skills: ["Python", "JavaScript", "SQL"] },
    { id: "u2", name: "Ihshanul Thauheeda N", email: "ihshanul@egs.edu", password: "demo123", role: "student",
      dept: DEPARTMENTS[1], year: "3rd Year", about: "Data enthusiast exploring machine learning and analytics projects.",
      skills: ["Python", "Data Analysis", "Machine Learning"] },
    { id: "u3", name: "Anusri T", email: "anusri@egs.edu", password: "demo123", role: "student",
      dept: DEPARTMENTS[2], year: "3rd Year", about: "Embedded systems learner interested in IoT based smart solutions.",
      skills: ["C", "IoT", "Communication"] },
    { id: "u4", name: "Meera S", email: "meera@egs.edu", password: "demo123", role: "student",
      dept: DEPARTMENTS[4], year: "2nd Year", about: "Design-minded student exploring product development.",
      skills: ["CAD", "UI/UX", "Leadership"] },
    { id: "u5", name: "Karthik R", email: "karthik@egs.edu", password: "demo123", role: "student",
      dept: DEPARTMENTS[3], year: "4th Year", about: "Power systems and renewable energy enthusiast.",
      skills: ["MATLAB", "Solar Design", "Public Speaking"] },
    { id: "u6", name: "Divya P", email: "divya@egs.edu", password: "demo123", role: "student",
      dept: DEPARTMENTS[0], year: "4th Year", about: "Full-stack developer with two internships and a passion for open source.",
      skills: ["React", "Node.js", "MongoDB", "Git"] },
    { id: "u7", name: "Arun Kumar V", email: "arun@egs.edu", password: "demo123", role: "student",
      dept: DEPARTMENTS[5], year: "2nd Year", about: "Aspiring structural engineer, state level volleyball player.",
      skills: ["AutoCAD", "STAAD Pro", "Teamwork"] },
    { id: "u8", name: "Sneha M", email: "sneha@egs.edu", password: "demo123", role: "student",
      dept: DEPARTMENTS[1], year: "1st Year", about: "Beginner coder who loves competitive programming.",
      skills: ["C++", "Problem Solving"] },
    { id: "f1", name: "Mr. A. Rajesh", email: "faculty@egs.edu", password: "faculty123", role: "faculty",
      dept: DEPARTMENTS[0], year: "", about: "Assistant Professor, IT", skills: [] },
    { id: "a1", name: "Admin", email: "admin@egs.edu", password: "admin123", role: "admin",
      dept: "", year: "", about: "System administrator", skills: [] },
    /* demo shortcut for the login page hint */
    { id: "u0", name: "Demo Student", email: "student@egs.edu", password: "student123", role: "student",
      dept: DEPARTMENTS[0], year: "2nd Year", about: "This is a demo account. Edit me!", skills: ["HTML", "CSS"] }
  ];

  const A = (id, userId, title, category, level, date, description, tags, sourceUrl, status) =>
    ({ id, userId, title, category, level, date, description, tags, sourceUrl, status });

  const achievements = [
    A("a1", "u1", "Smart India Hackathon Finalist", "Hackathon", "National", "2026-02-10", "Built a campus complaint tracking system and reached the national grand finale.", ["Hackathon", "National"], "https://www.sih.gov.in", "verified"),
    A("a2", "u1", "Python for Everybody Certification", "Certification", "International", "2025-11-04", "Completed the 5-course specialization with distinction.", ["Python", "Certificate"], "https://www.coursera.org", "verified"),
    A("a3", "u2", "ML Internship at DataWorks", "Internship", "National", "2026-01-20", "Worked on a customer churn prediction model during a 2 month internship.", ["Machine Learning", "Internship"], "https://example.com/offer", "verified"),
    A("a4", "u2", "IEEE Paper Presentation", "Research", "National", "2025-12-12", "Presented a paper on student performance analytics.", ["Research", "Data"], "", "pending"),
    A("a5", "u2", "Kaggle Bronze Medal", "Award", "International", "2026-03-02", "Won a bronze medal in a data science competition.", ["Kaggle", "Data Analysis"], "https://www.kaggle.com", "verified"),
    A("a6", "u3", "IoT Smart Irrigation Project", "Project", "College", "2026-01-15", "Designed a soil moisture based automatic watering system.", ["IoT", "Embedded"], "", "verified"),
    A("a7", "u3", "Technical Symposium First Prize", "Award", "State", "2025-10-08", "Won first prize in the circuit debugging event.", ["C", "Electronics"], "", "pending"),
    A("a8", "u4", "CAD Design Certification", "Certification", "National", "2026-01-14", "Completed a computer aided design certification.", ["CAD", "National"], "https://example.com/cad", "verified"),
    A("a9", "u4", "Product Design Project", "Project", "College", "2026-03-11", "Designed a prototype concept focused on usability.", ["UI/UX", "College"], "", "verified"),
    A("a10", "u5", "Solar Rooftop Design Competition", "Award", "State", "2026-02-22", "Second place for a low cost rooftop solar design.", ["Solar Design", "State"], "", "verified"),
    A("a11", "u6", "Google Summer of Code Contributor", "Internship", "International", "2025-09-01", "Contributed to an open source web framework for 3 months.", ["Open Source", "React"], "https://summerofcode.withgoogle.com", "verified"),
    A("a12", "u6", "Full Stack Developer Intern", "Internship", "National", "2026-05-30", "Built REST APIs using Node.js and MongoDB at a startup.", ["Node.js", "MongoDB"], "https://example.com/intern", "verified"),
    A("a13", "u7", "State Level Volleyball Winner", "Sports", "State", "2026-02-02", "Part of the winning university team.", ["Sports", "Teamwork"], "", "verified"),
    A("a14", "u8", "CodeChef Starters 5-Star", "Award", "National", "2026-04-04", "Reached 5-star rating in competitive programming.", ["C++", "Problem Solving"], "https://www.codechef.com", "pending")
  ];
  return { users, achievements };
}

/* ---------- Basic database helpers ---------- */
function loadDB() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { console.warn("Could not read storage", e); }
  const fresh = seedData();
  saveDB(fresh);
  return fresh;
}
function saveDB(db) {
  try { localStorage.setItem(DB_KEY, JSON.stringify(db)); } catch (e) { console.warn("Could not save", e); }
}
function resetDB() {
  localStorage.removeItem(DB_KEY);
  localStorage.removeItem(SESSION_KEY);
  loadDB();
}
function uid(prefix) { return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

/* ---------- Users ---------- */
function getUsers() { return loadDB().users; }
function getUser(id) { return getUsers().find(u => u.id === id); }
function getStudents() { return getUsers().filter(u => u.role === "student"); }
function addUser(user) {
  const db = loadDB();
  if (db.users.some(u => u.email.toLowerCase() === user.email.toLowerCase())) return { ok: false, msg: "This email is already registered." };
  user.id = uid("u");
  db.users.push(user);
  saveDB(db);
  return { ok: true, user };
}
function updateUser(id, changes) {
  const db = loadDB();
  const u = db.users.find(x => x.id === id);
  if (!u) return;
  Object.assign(u, changes);
  saveDB(db);
}
function deleteUser(id) {
  const db = loadDB();
  db.users = db.users.filter(u => u.id !== id);
  db.achievements = db.achievements.filter(a => a.userId !== id);
  saveDB(db);
}

/* ---------- Achievements ---------- */
function getAchievements() { return loadDB().achievements; }
function getAchievementsOf(userId) {
  return getAchievements().filter(a => a.userId === userId).sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}
function addAchievement(a) {
  const db = loadDB();
  a.id = uid("a");
  a.status = "pending";           // always starts as pending until faculty/admin verifies
  db.achievements.push(a);
  saveDB(db);
}
function updateAchievement(id, changes) {
  const db = loadDB();
  const a = db.achievements.find(x => x.id === id);
  if (!a) return;
  Object.assign(a, changes);
  saveDB(db);
}
function deleteAchievement(id) {
  const db = loadDB();
  db.achievements = db.achievements.filter(a => a.id !== id);
  saveDB(db);
}

/* ---------- Login session ---------- */
function login(email, password, role) {
  const u = getUsers().find(x => x.email.toLowerCase() === email.trim().toLowerCase() && x.password === password);
  if (!u) return { ok: false, msg: "Wrong email or password." };
  if (u.role !== role) return { ok: false, msg: "This account is not registered as " + role + "." };
  localStorage.setItem(SESSION_KEY, u.id);
  return { ok: true, user: u };
}
function logout() { localStorage.removeItem(SESSION_KEY); }
function currentUser() {
  const id = localStorage.getItem(SESSION_KEY);
  return id ? getUser(id) : null;
}
