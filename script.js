window.addEventListener(
  "load",
  () => {
    document.body.classList.add("loaded");
  },
  { once: true }
);
setTimeout(() => document.body.classList.add("loaded"), 900);

const menuBtn = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const closeMobileMenu = () => {
  if (!menuBtn || !navMenu) return;
  if (!navMenu.classList.contains("open")) return;
  navMenu.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "Open Menu");
};

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = navMenu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuBtn.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");
    document.body.classList.toggle("menu-open", isOpen);
  });

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  window.addEventListener("scroll", closeMobileMenu, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMobileMenu();
  });
  document.addEventListener("click", (event) => {
    if (!document.body.classList.contains("menu-open")) return;
    if (navMenu.contains(event.target) || menuBtn.contains(event.target)) return;
    closeMobileMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileMenu();
  });
}

const prefersReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
const revealEls = document.querySelectorAll(".reveal");
if (prefersReduced || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("show"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.06, rootMargin: "0px 0px -5% 0px" }
  );
  revealEls.forEach((el) => observer.observe(el));
}

document.querySelectorAll(".accordion-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const panel = btn.nextElementSibling;
    const active = btn.classList.toggle("active");
    panel.style.maxHeight = active ? panel.scrollHeight + "px" : null;
  });
});

const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.reset();
  });
}

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    const btn = contactForm.querySelector('button[type="submit"]');
    const status = contactForm.querySelector(".form-status");
    const hasRealSubmit = contactForm.getAttribute("action");

    if (btn) {
      btn.disabled = true;
      btn.textContent = "Sending...";
    }
    if (status) {
      status.textContent = "Sending your message...";
      status.classList.add("show");
    }

    if (hasRealSubmit) return;

    e.preventDefault();
    setTimeout(() => {
      if (status) status.textContent = "Thank you. Your message has been received.";
      contactForm.reset();
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Send Message";
      }
    }, 650);
  });
}
