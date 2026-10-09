// ---------- Content data ----------
// Repo linki eklemek için ilgili projenin repo alanını doldur (ör. "https://github.com/CrnBilg/proje-adi").
// repo boş string ise kartta "View Code" butonu hiç render edilmez.
const projects = [
  {
    no: "01",
    title: "Web & Mobile Access Testing — İzmirim Kart",
    summary: "Manual and automated black-box testing (BVA, EP, use cases) for login, balance and QR features across web and mobile.",
    tags: ["Selenium IDE", "Java", "JUnit", "ISO 25010"],
    repo: ""
  },
  {
    no: "02",
    title: "Bird Species Database Design",
    summary: "Relational database with 9+ interlinked tables, weak entities and 1:1 / 1:N / M:N relationships, fully normalized.",
    tags: ["MySQL", "ER Modeling", "SQL Scripting"],
    repo: ""
  },
  {
    no: "03",
    title: "MyLibrary — Book Management Application",
    summary: "Desktop app for managing a personal library with full CRUD operations over MySQL via JDBC.",
    tags: ["Java", "Swing", "MySQL", "JDBC"],
    repo: ""
  },
  {
    no: "04",
    title: "AirLink — Vodafone Future Challenge 2025",
    summary: "5G-based drone logistics concept: designed the business model and pitch presentation for an idea competition.",
    tags: ["Business Model", "Pitch", "5G", "Drone Logistics"],
    repo: ""
  },
  {
    no: "05",
    title: "Autonomous Delivery Drone — Project Management",
    summary: "Planned and tracked the project with WBS, schedule and milestones; monitored critical path, cost and resources.",
    tags: ["MS Project", "WBS", "Critical Path"],
    repo: ""
  },
  {
    no: "06",
    title: "TeaLog — Java Desktop Application",
    summary: "Modular MVC desktop application applying Singleton, Observer and Strategy design patterns over MySQL.",
    tags: ["Java", "MVC", "Design Patterns", "MySQL"],
    repo: ""
  }
];

const education = [
  {
    date: "2023 — Present",
    title: "Yaşar University",
    desc: "B.Sc. in Software Engineering",
    logo: "logos/yasar.png"
  },
  {
    date: "2018 — 2022",
    title: "İzmir Turkish College Science High School",
    desc: "",
    logo: "logos/itk.png"
  }
];

const experience = [
  {
    date: "Jun 2026 — Present",
    title: "Software Engineering Intern — Kocaer Çelik",
    desc: "On-site internship in Yunusemre, Manisa, Türkiye."
  },
  {
    date: "2025",
    title: "Vodafone Future Challenge 2025 — Idea Competition",
    desc: "Participant with AirLink, a 5G-based drone logistics concept; developed the business model and pitch presentation."
  },
  {
    date: "May 2025",
    title: "Yaşar Sector Days '25 — Shaping the Future",
    desc: "Attended industry-facing sessions connecting students with the professional software sector."
  },
  {
    date: "Dec 2024",
    title: "Yaşar Career Days '24 — Transformation",
    desc: "Attended career-development sessions focused on industry transformation."
  },
  {
    date: "Ongoing",
    title: "Industrial Engineering Society — Active Member",
    desc: "Contributing to teamwork, communication and organizational activities."
  }
];

const certifications = [
  "MATLAB Onramp",
  "Introduction to Linear Algebra with MATLAB",
  "Introduction to Cybersecurity (Cisco Networking Academy)"
];

const skills = [
  { category: "Languages & Web", items: ["Java", "C / C++", "SQL", "JavaScript", "HTML", "CSS"] },
  { category: "Tools", items: ["MySQL", "JDBC", "Swing", "Selenium IDE", "MS Project", "Excel"] },
  { category: "Soft Skills", items: ["Communication", "Teamwork", "Time Management", "Adaptability", "Problem-Solving", "Student Engagement"] },
  { category: "Spoken Languages", items: ["English — B2", "German — A2"] }
];

// ---------- Rendering ----------
function renderProjects() {
  const grid = document.getElementById("projectGrid");
  grid.innerHTML = projects.map(p => `
    <article class="project-card reveal">
      <span class="project-no" aria-hidden="true">${p.no}</span>
      <h3 class="project-title">${p.title}</h3>
      <p class="project-summary">${p.summary}</p>
      <div class="project-tags">
        ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
      ${p.repo ? `<a class="project-link" href="${p.repo}" target="_blank" rel="noopener">View Code ↗</a>` : ""}
    </article>
  `).join("");
}

function renderTimeline(containerId, data) {
  const el = document.getElementById(containerId);
  el.innerHTML = data.map(item => `
    <li class="timeline-item reveal">
      <span class="timeline-date">${item.date}</span>
      <div class="timeline-body">
        ${item.logo ? `<span class="timeline-logo"><img src="${item.logo}" alt="" loading="lazy"></span>` : ""}
        <div>
          <h3 class="timeline-title">${item.title}</h3>
          ${item.desc ? `<p class="timeline-desc">${item.desc}</p>` : ""}
        </div>
      </div>
    </li>
  `).join("");
}

function renderCertifications() {
  const el = document.getElementById("certList");
  el.innerHTML = certifications.map(c => `<li class="reveal">${c}</li>`).join("");
}

function renderSkills() {
  const el = document.getElementById("skillsGrid");
  el.innerHTML = skills.map(group => `
    <div class="skill-group reveal">
      <h3 class="skill-cat-title">${group.category}</h3>
      <div class="skill-tags">
        ${group.items.map(i => `<span class="tag">${i}</span>`).join("")}
      </div>
    </div>
  `).join("");
}

// ---------- Scroll reveal ----------
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced || !("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => observer.observe(el));
}

// ---------- Theme toggle ----------
function initTheme() {
  const toggle = document.getElementById("themeToggle");
  const stored = localStorage.getItem("theme");
  if (stored) document.documentElement.setAttribute("data-theme", stored);

  toggle.addEventListener("click", () => {
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const current = document.documentElement.getAttribute("data-theme") || (prefersLight ? "light" : "dark");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

// ---------- Mobile nav ----------
function initNav() {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ---------- Navbar scroll state ----------
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// ---------- Init ----------
document.getElementById("year").textContent = new Date().getFullYear();

renderProjects();
renderTimeline("educationTimeline", education);
renderTimeline("experienceTimeline", experience);
renderCertifications();
renderSkills();

initTheme();
initNav();
initNavbarScroll();
initReveal();
