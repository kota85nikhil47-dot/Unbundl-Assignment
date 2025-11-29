// Helper selectors
const qs = (s, root = document) => root.querySelector(s);
const qsa = (s, root = document) => [...root.querySelectorAll(s)];

// YEAR
qs("#year").textContent = new Date().getFullYear();

// NAV TOGGLE
const navToggle = qs("#navToggle");
const mobileNav = qs("#mobileNavPanel");

navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  mobileNav.style.display = expanded ? "none" : "block";
});

mobileNav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    mobileNav.style.display = "none";
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// SMOOTH SCROLL
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const id = link.getAttribute("href");
  if (!id || id === "#") return;

  const target = document.querySelector(id);
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

// TESTIMONIAL SLIDER
const tests = qsa("#testCards .test");
let index = 0;

function show(i) {
  tests.forEach((t, idx) => {
    t.style.display = idx === i ? "flex" : "none";
  });
}

qs("#nextTest").addEventListener("click", () => {
  index = (index + 1) % tests.length;
  show(index);
});

qs("#prevTest").addEventListener("click", () => {
  index = (index - 1 + tests.length) % tests.length;
  show(index);
});

// FORM SUBMIT
qs("#contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = qs("[name='name']").value.split(" ")[0];
  e.target.innerHTML = `<p><strong>Thanks, ${name}!</strong> We’ll reach out shortly.</p>`;
});
