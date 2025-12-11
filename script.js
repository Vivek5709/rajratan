
        const logos = document.querySelectorAll(".logos img");

        function revealLogos() {
            logos.forEach((logo) => {
                const pos = logo.getBoundingClientRect().top;
                const screen = window.innerHeight;

                if (pos < screen - 60) {
                    logo.classList.add("show");
                }
            });
        }

        window.addEventListener("scroll", revealLogos);
        revealLogos();  // run on load

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

function revealHistory() {
    document.querySelectorAll(".fade-up").forEach((el) => {
        const pos = el.getBoundingClientRect().top;
        const screen = window.innerHeight;
        if (pos < screen - 60) el.classList.add("visible");
    });
}
window.addEventListener("scroll", revealHistory);
revealHistory();


const counters = document.querySelectorAll('.count');
let started = false;

function runCounter() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let current = 0;
    const speed = target / 100;

    const updateCount = () => {
      if (current < target) {
        current += speed;
        counter.innerText = Math.floor(current).toLocaleString() + "+";
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target.toLocaleString() + "+";
      }
    };
    updateCount();
  });
}

const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !started) {
    runCounter();
    started = true;
  }
});
observer.observe(document.querySelector('.stats-strip'));


// Scroll animation for heading + cards
  (function () {
    const heading = document.querySelector(".sevenr-heading");
    const cards = document.querySelectorAll(".sevenr-card");

    if (!("IntersectionObserver" in window)) {
      // Fallback: show everything if browser doesn't support IO
      heading && heading.classList.add("visible");
      cards.forEach(card => card.classList.add("visible"));
      return;
    }

    const options = { threshold: 0.15 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("sevenr-heading")) {
            entry.target.classList.add("visible");
          } else if (entry.target.classList.contains("sevenr-card")) {
            // add a small delay based on index for staggered effect
            const index = Array.from(cards).indexOf(entry.target);
            entry.target.style.transitionDelay = (0.1 * index) + "s";
            entry.target.classList.add("visible");
          }
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (heading) observer.observe(heading);
    cards.forEach(card => observer.observe(card));
  })();



  function openChatWithWave() {
    const overlay = document.getElementById("chat-wave-overlay");
    const icon = document.getElementById("chat-launcher");

    const rect = icon.getBoundingClientRect();

    const wave = document.createElement("div");
    wave.classList.add("wave-circle");
    wave.style.left = `${rect.left + rect.width / 2}px`;
    wave.style.top = `${rect.top + rect.height / 2}px`;
    overlay.appendChild(wave);

    const size = Math.max(window.innerWidth, window.innerHeight) * 2;

    setTimeout(() => {
        wave.style.width = `${size}px`;
        wave.style.height = `${size}px`;
    }, 10);

    setTimeout(() => {
        window.location.href = "C:/Users/Vivek/rajaratan industries/rajaratan-chatbot/frontend/index.html"; // ✨ Chat page path here
    }, 600);
}



const textPanel = document.querySelector('.text-panel');
const video = document.getElementById('scrollVideo');

let prevScroll = 0;

textPanel.addEventListener('scroll', () => {
  const maxScroll = textPanel.scrollHeight - textPanel.clientHeight;
  const scrollPos = textPanel.scrollTop;
  const scrollProgress = scrollPos / maxScroll;

  video.currentTime = scrollProgress * video.duration;

  if (scrollPos > prevScroll) {
    video.playbackRate = 1;
  } else {
    video.playbackRate = -1;
  }

  video.play();
  prevScroll = scrollPos;
});

let timer;
textPanel.addEventListener('scroll', () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    video.pause();
  }, 80);
});

const closeNav = document.querySelector(".close-nav");

closeNav.addEventListener("click", () => {
    navLinks.classList.remove("active");
});


const circularObserver = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.classList.add("appear");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".fade-css").forEach(el=>{
  circularObserver.observe(el);
});


(function(){

  // --- REAL 100% Reliable Mobile/Tablet Detection ---
  const ua = navigator.userAgent.toLowerCase();
  const isMobile =
    ua.includes("iphone") ||
    ua.includes("android") ||
    ua.includes("ipad") ||
    ua.includes("ipod");

  if (isMobile) {
    console.log("Mobile detected → Auto-scroll OFF");
    return;
  }

  console.log("Desktop detected → Auto-scroll ON");

  const panel = document.querySelector('.panel1');
  const nextSection = document.querySelector('.sevenr-intro');

  if (!panel || !nextSection) return;

  let atBottom = false;

  panel.addEventListener('wheel', function(e){
    const maxScroll = panel.scrollHeight - panel.clientHeight;
    const current = panel.scrollTop;

    if (e.deltaY > 0) {
      if (current >= maxScroll - 2) {
        if (!atBottom) {
          atBottom = true;
        } else {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        atBottom = false;
      }
    }
  }, { passive: true });

})();
