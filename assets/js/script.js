/* =====================================================================
   HAPPY BIRTHDAY — SCRIPT.JS
   Sections: 0 Config · 1 Preloader · 2 Cursor · 3 Magnetic buttons ·
   4 Scroll progress · 5 Scroll reveals · 6 Timeline/Gallery/Reasons ·
   7 Flip cards · 8 Letter · 9 Music player · 10 Gift box · 11 Lightbox
   ===================================================================== */

/* =====================================================================
   0. CONFIG — edit only this section for your own words
   ===================================================================== */
const CONFIG = {
  letterLines: [
    "Happy Birthday, Love. ❤️",
    "On your special day, I just want you to know how deeply I love you.",
    "You are the most beautiful part of my life, and every moment with you is a blessing I never take for granted.",
    "Your smile makes my darkest days brighter, and your love gives my heart a place to call home. Thank you for being my happiness,",
    "my peace, and my greatest gift. I promise to stand by your side, cherish you, and love you a little more with every passing day.",
    "I hope this birthday brings you as much joy as you bring into my life. Happy Birthday once again, my dearest Santaraaaaa.",
    "I love you more than words will ever be able to say.",
    "I Love You Forever ❤️",
  ],
};

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const hasGSAP = typeof gsap !== "undefined";
if (hasGSAP && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================================
     1. PRELOADER
     ===================================================================== */
  const preloader = document.getElementById("preloader");
  const revealHero = () => {
    document
      .querySelectorAll(".hero .reveal-up")
      .forEach((el) => el.classList.add("is-visible"));
  };

  window.addEventListener("load", () => {
    const delay = reduceMotion ? 150 : 1300;
    setTimeout(() => {
      preloader.classList.add("hidden");
      revealHero();
      if (hasGSAP && window.ScrollTrigger)
        setTimeout(() => ScrollTrigger.refresh(), 400);
    }, delay);
  });
  // Fallback in case 'load' never fires (e.g. slow/missing assets)
  setTimeout(() => {
    if (!preloader.classList.contains("hidden")) {
      preloader.classList.add("hidden");
      revealHero();
    }
  }, 4500);

  /* =====================================================================
     2. CUSTOM CURSOR (desktop / fine pointer only)
     ===================================================================== */
  const isFinePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");

  if (isFinePointer && cursorDot && cursorRing) {
    const ringX = hasGSAP
      ? gsap.quickTo(cursorRing, "x", { duration: 0.35, ease: "power3" })
      : null;
    const ringY = hasGSAP
      ? gsap.quickTo(cursorRing, "y", { duration: 0.35, ease: "power3" })
      : null;

    window.addEventListener("mousemove", (e) => {
      cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
      if (ringX && ringY) {
        ringX(e.clientX);
        ringY(e.clientY);
      } else {
        cursorRing.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
      }
    });

    document
      .querySelectorAll(
        'button, a, input[type="range"], .gallery-item, .flip-card',
      )
      .forEach((el) => {
        el.addEventListener("mouseenter", () =>
          cursorRing.classList.add("cursor-active"),
        );
        el.addEventListener("mouseleave", () =>
          cursorRing.classList.remove("cursor-active"),
        );
      });
  } else if (cursorDot && cursorRing) {
    cursorDot.style.display = "none";
    cursorRing.style.display = "none";
  }

  /* =====================================================================
     3. MAGNETIC BUTTONS (desktop only)
     ===================================================================== */
  if (isFinePointer && hasGSAP) {
    document.querySelectorAll(".magnetic").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const relX = e.clientX - (r.left + r.width / 2);
        const relY = e.clientY - (r.top + r.height / 2);
        gsap.to(el, {
          x: relX * 0.3,
          y: relY * 0.3,
          duration: 0.4,
          ease: "power3",
        });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
      });
    });
  }

  /* =====================================================================
     4. SCROLL PROGRESS BAR
     ===================================================================== */
  const progressBar = document.getElementById("scrollProgressBar");
  window.addEventListener(
    "scroll",
    () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      progressBar.style.width = scrolled + "%";
    },
    { passive: true },
  );

  /* =====================================================================
     5. GENERIC SCROLL-REVEAL HELPER (uses GSAP ScrollTrigger, falls back
        to IntersectionObserver if GSAP/ScrollTrigger fails to load)
     ===================================================================== */
  function revealOnScroll(
    selector,
    { stagger = 110, sectionTrigger = null } = {},
  ) {
    const els = gsap && document.querySelectorAll(selector);
    const nodes = document.querySelectorAll(selector);
    if (!nodes.length) return;

    nodes.forEach((el, i) => {
      el.style.transitionDelay = (i % 12) * stagger + "ms";
    });

    if (hasGSAP && window.ScrollTrigger) {
      ScrollTrigger.batch(selector, {
        start: "top 85%",
        once: true,
        onEnter: (batch) =>
          batch.forEach((el) => el.classList.add("is-visible")),
      });
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 },
      );
      nodes.forEach((el) => io.observe(el));
    }
  }

  /* =====================================================================
     6. TIMELINE · GALLERY · REASONS reveals + hero parallax
     ===================================================================== */
  revealOnScroll(".timeline-card", { stagger: 130 });
  revealOnScroll(".reason-card", { stagger: 90 });
  revealOnScroll(".promise-section .reveal-up", { stagger: 0 });

  if (hasGSAP && window.ScrollTrigger) {
    gsap.to(".hero-media", {
      yPercent: 14,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  /* =====================================================================
     7. FLIP CARDS (tap / keyboard support in addition to CSS :hover)
     ===================================================================== */
  document.querySelectorAll(".flip-card").forEach((card) => {
    card.addEventListener("click", () => card.classList.toggle("is-flipped"));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.classList.toggle("is-flipped");
      }
    });
  });

  /* =====================================================================
     8. INTERACTIVE LETTER
     ===================================================================== */
  const letterTextEl = document.getElementById("letterText");
  CONFIG.letterLines.forEach((line, i) => {
    const p = document.createElement("p");
    p.textContent = line;
    if (i === CONFIG.letterLines.length - 1) p.classList.add("letter-final");
    letterTextEl.appendChild(p);
  });
  const letterParas = letterTextEl.querySelectorAll("p");

  const envelopeBtn = document.getElementById("envelopeBtn");
  const letterPaper = document.getElementById("letterPaper");
  let letterOpened = false;

  envelopeBtn.addEventListener("click", () => {
    if (letterOpened) return;
    letterOpened = true;
    envelopeBtn.classList.add("is-open");
    envelopeBtn.setAttribute("aria-expanded", "true");

    setTimeout(
      () => {
        letterPaper.classList.add("is-open");
        letterPaper.removeAttribute("aria-hidden");
        letterParas.forEach((p, i) => {
          setTimeout(
            () => p.classList.add("is-visible"),
            reduceMotion ? 0 : i * 350,
          );
        });
      },
      reduceMotion ? 50 : 500,
    );
  });

  /* =====================================================================
     9. MUSIC PLAYER
     ===================================================================== */
  const audio = document.getElementById("bgMusic");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const iconPlay = playPauseBtn.querySelector(".icon-play");
  const iconPause = playPauseBtn.querySelector(".icon-pause");
  const seekBar = document.getElementById("seekBar");
  const volumeBar = document.getElementById("volumeBar");
  const currentTimeEl = document.getElementById("currentTime");
  const durationTimeEl = document.getElementById("durationTime");

  audio.volume = 0.7;

  function formatTime(sec) {
    if (!isFinite(sec) || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  }

  function setPlayingState(isPlaying) {
    iconPlay.hidden = isPlaying;
    iconPause.hidden = !isPlaying;
    playPauseBtn.setAttribute(
      "aria-label",
      isPlaying ? "Pause song" : "Play song",
    );
  }

  function tryPlayAudio() {
    const p = audio.play();
    if (p && p.catch)
      p.catch(() => {
        /* autoplay blocked or file missing — ignore */
      });
  }

  playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
      tryPlayAudio();
    } else {
      audio.pause();
    }
  });
  audio.addEventListener("play", () => setPlayingState(true));
  audio.addEventListener("pause", () => setPlayingState(false));

  audio.addEventListener("loadedmetadata", () => {
    seekBar.max = audio.duration || 100;
    durationTimeEl.textContent = formatTime(audio.duration);
  });
  audio.addEventListener("timeupdate", () => {
    seekBar.value = audio.currentTime;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  });
  seekBar.addEventListener("input", () => {
    audio.currentTime = seekBar.value;
  });
  volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value / 100;
  });

  // Music should only start after the first genuine user interaction
  let musicStarted = false;
  const startMusicOnce = () => {
    if (musicStarted) return;
    musicStarted = true;
    tryPlayAudio();
  };
  document
    .getElementById("beginStoryBtn")
    .addEventListener("click", startMusicOnce);
  document.addEventListener("click", startMusicOnce, { once: true });

  document.getElementById("beginStoryBtn").addEventListener("click", () => {
    document
      .getElementById("our-story")
      .scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  });
  document.getElementById("scrollIndicator").addEventListener("click", () => {
    document
      .getElementById("our-story")
      .scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* =====================================================================
     10. GIFT BOX
     ===================================================================== */
  const giftBoxBtn = document.getElementById("giftBoxBtn");
  const giftConfetti = document.getElementById("giftConfetti");
  const giftMessage = document.getElementById("giftMessage");
  const confettiColors = ["#d4af37", "#f5f5f5", "#e9cc7a", "#8a2536"];
  let giftOpened = false;

  function spawnConfetti() {
    const count = reduceMotion ? 0 : window.innerWidth < 600 ? 22 : 40;
    for (let i = 0; i < count; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.style.background = confettiColors[i % confettiColors.length];
      giftConfetti.appendChild(piece);

      const angle = Math.random() * Math.PI - Math.PI / 2 - Math.PI / 2;
      const distance = 80 + Math.random() * 140;
      const endX = Math.cos(angle) * distance;
      const endY = Math.sin(angle) * distance - 60;
      const rotation = Math.random() * 720 - 360;

      if (hasGSAP) {
        gsap.fromTo(
          piece,
          { opacity: 1, x: 0, y: 0, rotation: 0 },
          {
            opacity: 0,
            x: endX,
            y: endY,
            rotation,
            duration: 1.1 + Math.random() * 0.6,
            ease: "power2.out",
            onComplete: () => piece.remove(),
          },
        );
      } else {
        piece.style.opacity = "0";
        setTimeout(() => piece.remove(), 1200);
      }
    }
  }

  giftBoxBtn.addEventListener("click", () => {
    if (giftOpened) return;
    giftOpened = true;
    giftBoxBtn.classList.add("is-open");
    spawnConfetti();
    setTimeout(
      () => giftMessage.classList.add("is-visible"),
      reduceMotion ? 100 : 500,
    );
  });

  /* =====================================================================
     11. MEMORY GALLERY LIGHTBOX
     ===================================================================== */
  const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");
  let currentIndex = 0;
  let lastFocusedEl = null;

  function openLightbox(index) {
    currentIndex = index;
    const img = galleryItems[index].querySelector("img");
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCounter.textContent = `${index + 1} / ${galleryItems.length}`;
    lastFocusedEl = document.activeElement;
    lightbox.hidden = false;
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  function showRelative(delta) {
    currentIndex =
      (currentIndex + delta + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
  }

  galleryItems.forEach((item, i) =>
    item.addEventListener("click", () => openLightbox(i)),
  );
  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", () => showRelative(-1));
  lightboxNext.addEventListener("click", () => showRelative(1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showRelative(-1);
    if (e.key === "ArrowRight") showRelative(1);
  });
});
