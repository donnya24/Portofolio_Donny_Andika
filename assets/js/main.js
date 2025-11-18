// Init AOS
document.addEventListener("DOMContentLoaded", function () {
  if (window.AOS) {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }

  // Typing effect for name
  const nameElement = document.querySelector(".name-scrolling");
  const names = ["Donny", "Andika", "Kurniawan"];
  let nameIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150;

  function typeWriter() {
    if (!nameElement) return;
    const currentName = names[nameIndex];

    if (isDeleting) {
      nameElement.textContent = currentName.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 100;
    } else {
      nameElement.textContent = currentName.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 150;
    }

    if (!isDeleting && charIndex === currentName.length) {
      typingSpeed = 2000; // pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      nameIndex = (nameIndex + 1) % names.length;
      typingSpeed = 500; // pause before next
    }

    setTimeout(typeWriter, typingSpeed);
  }

  setTimeout(() => typeWriter(), 500);

  // IntersectionObserver for fade-in-up on sections
  const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting)
        entry.target.classList.add("animate-fade-in-up");
    });
  }, observerOptions);

  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });

  // Smooth scrolling for nav links (offset header)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
      }
    });
  });

  // Preload images
  const preloadImages = () => {
    const sources = [
      "assets/images/undraw/profil_donny.png",
      "assets/images/skills/html.png",
      "assets/images/skills/css.png",
      "assets/images/skills/js.png",
      "assets/images/skills/php.png",
      "assets/images/skills/mysql.png",
      "assets/images/skills/figma.png",
      "assets/images/skills/vscode.png",
      "assets/images/skills/netbeans.png",
      "assets/images/skills/flutter.png",
      "assets/images/skills/dart.png",
      "assets/images/skills/Draw.io.png",
      "assets/images/skills/Bootstrap.png",
    ];
    sources.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  };
  preloadImages();

  // Contact cards floating + hover polish
  const contactCards = document.querySelectorAll(".contact-card");
  contactCards.forEach((card, index) => {
    const delay = index * 0.5;
    card.style.animationDelay = `${delay}s`;
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-15px) scale(1.05)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });

  // Dark mode persist
  const root = document.documentElement;
  function setInitialDarkMode() {
    const saved = localStorage.getItem("darkMode") === "true";
    // Alpine will set class via binding; we just keep the storage synced
    if (saved) root.classList.add("dark");
  }
  setInitialDarkMode();

  // Show/hide scrollTop button (driven via Alpine as well)
  window.addEventListener("scroll", () => {
    // No-op here; Alpine x-data already handles showScrollTop state.
  });
});
