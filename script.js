(function () {
  "use strict";

  const nav = document.querySelector("#nav");
  const toggle = document.querySelector("#navToggle");
  const year = document.querySelector("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const updateNav = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll(".nav__links a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  const links = Array.from(nav.querySelectorAll(".nav__links a"));
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.toggle("is-active", link.hash === `#${entry.target.id}`));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach((section) => observer.observe(section));
  }
})();
