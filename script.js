// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") document.body.classList.add("light");

function updateThemeIcon(){
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

menuBtn.addEventListener("click", () => mobileMenu.classList.add("show"));
closeMenu.addEventListener("click", () => mobileMenu.classList.remove("show"));
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) mobileMenu.classList.remove("show");
});
document.querySelectorAll(".mobile-link").forEach(a => {
  a.addEventListener("click", () => mobileMenu.classList.remove("show"));
});

// Contact quick email
document.getElementById("sendBtn").addEventListener("click", () => {
  const name = document.getElementById("msgName").value.trim();
  const email = document.getElementById("msgEmail").value.trim();
  const msg = document.getElementById("msgText").value.trim();

  const subject = encodeURIComponent(`Portfolio message — ${name || "Recruiter"}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}\n`
  );

  window.location.href = `mailto:pragat.pagariya@gmail.com?subject=${subject}&body=${body}`;
});
