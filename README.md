# EGS CHRONOS – Student Achievement & Skill Discovery Portal

A complete front-end website built with plain **HTML, CSS and JavaScript** (exactly the stack in your project's System Requirements slide). No installation of Node, databases or servers is needed.

## Pages included
| File | What it does |
|---|---|
| `index.html` | Home dashboard (hero, live statistics, how it works) |
| `explore.html` | Talent Search – search + filter by department, category, level, year |
| `login.html` | Login portal (Student / Faculty / Admin roles) |
| `register.html` | Student creates a profile (college email `@egs.edu` only) |
| `profile.html` | Public student profile with skills and achievements |
| `dashboard.html` | Student adds / edits / deletes achievements and edits own profile |
| `admin.html` | Faculty & Admin verify or reject achievements; Admin manages students |

## Demo logins
| Role | Email | Password |
|---|---|---|
| Student | student@egs.edu | student123 |
| Faculty | faculty@egs.edu | faculty123 |
| Admin | admin@egs.edu | admin123 |

(Other students such as `futtaina@egs.edu`, `meera@egs.edu` all use password `demo123`.)

## Run on your computer
1. Unzip the folder.
2. Install **VS Code** (https://code.visualstudio.com).
3. In VS Code: File > Open Folder > choose `egs-chronos`.
4. Click the Extensions icon (left bar), search **Live Server** (by Ritwick Dey), click Install.
5. Right-click `index.html` > **Open with Live Server**. The site opens in your browser.

(You can also just double-click `index.html`; it works too.)

## Put it online (free)
**Easiest – Netlify Drop:** go to https://app.netlify.com/drop, drag the whole `egs-chronos` folder onto the page. You get a public link in seconds.

**GitHub Pages:** create a GitHub repository, upload all files, then Settings > Pages > Branch `main` > Save. Your link appears after a minute.

## Important to know
- Data is stored in the visitor's **browser (localStorage)**. Each person sees only their own changes. This is perfect for a demo/review. For a real college-wide system you need a backend + database (see below).
- Passwords are stored in plain text because this is a prototype. Never reuse real passwords.
- To restore sample data: log in as Admin > "Reset demo data".

## Next step: make it a real multi-user system
Replace the functions in `js/data.js` (they are the only place that touch storage) with calls to a backend such as Firebase, Supabase, or Node.js + MySQL/MongoDB. All the pages will keep working because they only call those functions.
