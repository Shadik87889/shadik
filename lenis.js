// Initialize Lenis with premium configuration
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Quartic easing
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1,
  smoothTouch: false, // Default false for better mobile performance
  touchMultiplier: 2,
});

// Basic Request Animation Frame loop
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Integration with GSAP ScrollTrigger
// This ensures animations stay perfectly synced with the smooth scroll
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  // Update ScrollTrigger on Lenis scroll event
  lenis.on("scroll", ScrollTrigger.update);

  // Add Lenis's ticker to GSAP's ticker
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Disable lag smoothing in GSAP to prevent jumps during heavy loads
  gsap.ticker.lagSmoothing(0);
}

// Handle Anchor Links Smoothly
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId && targetId !== "#") {
      lenis.scrollTo(targetId);
    }
  });
});
