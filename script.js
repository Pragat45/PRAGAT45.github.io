// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") document.body.classList.add("light");

function updateThemeIcon() {
  themeToggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
}
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  updateThemeIcon();
});

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");

function openMenu() {
  mobileMenu.classList.add("show");
  mobileMenu.setAttribute("aria-hidden", "false");
  // Lock body scroll (feels more polished)
  document.body.style.overflow = "hidden";
}

function closeMenuFn() {
  mobileMenu.classList.remove("show");
  mobileMenu.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

menuBtn.addEventListener("click", openMenu);
closeMenu.addEventListener("click", closeMenuFn);

// Close when clicking backdrop
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) closeMenuFn();
});

// Close on Esc key (expected UX)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("show")) {
    closeMenuFn();
  }
});

// Close menu when clicking a mobile link
document.querySelectorAll(".mobile-link").forEach((a) => {
  a.addEventListener("click", closeMenuFn);
});

// Contact quick email (prefilled mailto)
const sendBtn = document.getElementById("sendBtn");
const msgName = document.getElementById("msgName");
const msgEmail = document.getElementById("msgEmail");
const msgText = document.getElementById("msgText");

function isValidEmail(value) {
  // Simple validation — good enough for front-end UX
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function setFieldError(el, isError) {
  if (!el) return;
  el.style.borderColor = isError ? "rgba(239,68,68,.75)" : "";
}

sendBtn.addEventListener("click", () => {
  const name = msgName.value.trim();
  const email = msgEmail.value.trim();
  const msg = msgText.value.trim();

  // Basic validation: message is required, email optional but must be valid if provided
  const msgMissing = msg.length < 10; // prevents empty/one-word messages
  const badEmail = email.length > 0 && !isValidEmail(email);

  setFieldError(msgText, msgMissing);
  setFieldError(msgEmail, badEmail);

  if (msgMissing) {
    msgText.focus();
    return;
  }
  if (badEmail) {
    msgEmail.focus();
    return;
  }

  const subject = encodeURIComponent(`Portfolio message — ${name || "Recruiter"}`);
  const body = encodeURIComponent(
    `Name: ${name || "-"}\nEmail: ${email || "-"}\n\nMessage:\n${msg}\n`
  );

  window.location.href = `mailto:pragat.pagariya@gmail.com?subject=${subject}&body=${body}`;
});

// Optional: allow Ctrl/Cmd + Enter to send (nice touch)
[msgName, msgEmail, msgText].forEach((el) => {
  el.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      sendBtn.click();
    }
  });
});
