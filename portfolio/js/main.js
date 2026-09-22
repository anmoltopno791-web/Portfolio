/* =========================================================
   Main
   ========================================================= */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------
     1. Initial render of data-driven sections
     --------------------------------------------------------- */
  renderList(document.getElementById("skills-grid"), SKILL_GROUPS, renderSkillGroup);
  renderList(document.getElementById("projects-grid"), PROJECTS, renderProjectCard);
  renderList(document.getElementById("experience-timeline"), EXPERIENCE, renderTimelineItem);
  renderList(document.getElementById("education-timeline"), EDUCATION, renderTimelineItem);

  document.getElementById("footer-year").textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     2. Mobile nav toggle
     --------------------------------------------------------- */
  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");

  function closeNav() {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the mobile menu after choosing a link
  siteNav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  /* ---------------------------------------------------------
     3. Scroll spy — highlight the nav link for the section
        currently in view
     --------------------------------------------------------- */
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = `#${entry.target.id}`;
        const link = navLinks.find((l) => l.getAttribute("href") === id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => spyObserver.observe(section));

  /* ---------------------------------------------------------
     4. Theme toggle (light / dark), persisted in localStorage
     --------------------------------------------------------- */
  const themeToggle = document.getElementById("theme-toggle");
  const root = document.documentElement;
  const STORAGE_KEY = "portfolio-theme";

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      themeToggle.setAttribute("aria-pressed", "true");
    } else {
      root.removeAttribute("data-theme");
      themeToggle.setAttribute("aria-pressed", "false");
    }
  }

  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  }

  themeToggle.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  /* ---------------------------------------------------------
     5. Hero terminal typewriter (one-time on load)
     --------------------------------------------------------- */
  const output = document.getElementById("terminal-output");
  const cursor = document.getElementById("terminal-cursor");

  function renderTerminalInstant() {
    output.textContent = TERMINAL_LINES.map((l) => `${l.prompt}\n${l.output}`).join("\n\n");
  }

  function typeTerminal() {
    let lineIndex = 0;
    let charIndex = 0;
    let phase = "prompt"; // "prompt" -> pause -> "output"
    let buffer = "";

    function step() {
      if (lineIndex >= TERMINAL_LINES.length) {
        cursor.style.display = "inline-block";
        return;
      }
      const line = TERMINAL_LINES[lineIndex];
      const text = phase === "prompt" ? line.prompt : line.output;

      if (charIndex < text.length) {
        buffer += text[charIndex];
        output.textContent = buffer;
        charIndex += 1;
        setTimeout(step, 22);
        return;
      }

      if (phase === "prompt") {
        buffer += "\n";
        phase = "output";
        charIndex = 0;
        setTimeout(step, 200);
        return;
      }

      buffer += "\n\n";
      phase = "prompt";
      charIndex = 0;
      lineIndex += 1;
      setTimeout(step, 260);
    }

    step();
  }

  if (prefersReducedMotion) {
    renderTerminalInstant();
  } else {
    typeTerminal();
  }

  /* ---------------------------------------------------------
     6. Skill bars fill in once, when scrolled into view
     --------------------------------------------------------- */
  const skillTicks = document.querySelectorAll(".skill-tick");

  if (prefersReducedMotion) {
    skillTicks.forEach((tick) => {
      if (tick.dataset.filled === "true") tick.classList.add("is-filled");
    });
  } else {
    const skillObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const group = entry.target;
          group.querySelectorAll(".skill-tick").forEach((tick, i) => {
            if (tick.dataset.filled === "true") {
              setTimeout(() => tick.classList.add("is-filled"), i * 40);
            }
          });
          observer.unobserve(group);
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll(".skill-group").forEach((group) => skillObserver.observe(group));
  }

  /* ---------------------------------------------------------
     7. Back-to-top button
     --------------------------------------------------------- */
  const backToTop = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 600);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  /* ---------------------------------------------------------
     8. Contact form validation
     --------------------------------------------------------- */
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");

  const validators = {
    name: (value) => (value.trim().length >= 2 ? "" : "Enter your name (at least 2 characters)."),
    email: (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Enter a valid email address."),
    subject: (value) => (value.trim().length >= 3 ? "" : "Give it a short subject line."),
    message: (value) => (value.trim().length >= 10 ? "" : "Message should be at least 10 characters."),
  };

  function validateField(field) {
    const value = field.value;
    const errorMessage = validators[field.name](value);
    const wrapper = field.closest(".form-field");
    const errorEl = document.getElementById(`error-${field.name}`);

    wrapper.classList.toggle("has-error", Boolean(errorMessage));
    errorEl.textContent = errorMessage;
    return !errorMessage;
  }

  Object.keys(validators).forEach((name) => {
    const field = form.elements[name];
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.closest(".form-field").classList.contains("has-error")) {
        validateField(field);
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fields = Object.keys(validators).map((name) => form.elements[name]);
    const results = fields.map(validateField);
    const isValid = results.every(Boolean);

    if (!isValid) {
      statusEl.textContent = "Please fix the errors above and try again.";
      statusEl.className = "form-status is-error";
      fields.find((f) => !validateField(f))?.focus();
      return;
    }

    // No backend is wired up here — this simulates a successful send.
    // Replace this block with a fetch() call to your API or form service.
    statusEl.textContent = `Thanks — your message is on its way. I'll reply within a couple of days.`;
    statusEl.className = "form-status is-success";
    form.reset();
    form.querySelectorAll(".form-field").forEach((f) => f.classList.remove("has-error"));
  });
})();
