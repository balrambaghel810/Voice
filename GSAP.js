var tl = gsap.timeline()
tl.from(".animation", {
  opacity: 0,
  duration: 1,
  delay: 0.5,
  stagger: 0.3
})
// -----------------------h2---------------
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // GSAP ScrollTrigger bounce animation for multiple h2 tags
  gsap.utils.toArray("h2").forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 4,
        // markers: true,

        // pin: true,
        toggleActions: "play none none none"
      },
      duration: 1.5,
      y: -100,
      opacity: 0,
      ease: "bounce",       // Bounce effect
    });
  });
});
// --------------------6 section----------------------

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Select all elements with the class "right"
const elements = document.querySelectorAll(".right");

// Apply GSAP animation with ScrollTrigger to each element
elements.forEach(element => {
  gsap.from(element, {
    opacity: 0,
    duration: 2,
    x: 500,
    scrollTrigger: {
      trigger: element,
      scroller: "body",
      start: "top 50%",
      end: 'top 40%',
      scrub: 4,
      pin: true
    }
  });
});






// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Select all elements with the class "right"
const leftelements = document.querySelectorAll(".left");

// Apply GSAP animation with ScrollTrigger to each element
leftelements.forEach(element => {
  gsap.from(element, {
    opacity: 0,
    duration: 2,
    x: -500,
    scrollTrigger: {
      trigger: element,
      scroller: "body",
      // markers: true,
      start: "top 50%",
      end: 'top 40%',
      scrub: 4,
      pin: true,
    }
  });
});




// --------------------------------------------

gsap.registerPlugin(ScrollTrigger);

function createCardAnimation(card) {
  return gsap.timeline({
    scrollTrigger: {
      trigger: card,
      start: "top 80%", // When the top of the card is 80% from the top of the viewport
      end: "top 30%", // When the top of the card is 30% from the top of the viewport
      scrub: 1, // Smooth scrubbing
      // markers: true, // Enable markers for debugging
    }
  })
    .fromTo(card, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
    .fromTo(card, { scale: 0.8 }, { scale: 1, duration: 0.5 });
}

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  createCardAnimation(card);
});

// --------------------------------1 row 3 cards-------------
// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Select all cards elements
const cardss = document.querySelectorAll(".cards");

// Apply animations to each card
cards.forEach(card => {
  gsap.fromTo(card,
    {
      opacity: 0,
      y: 50
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: card,
        // markers: true,
        start: "top 80%", // When the top of the card is 80% from the top of the viewport
        end: "top 30%", // When the top of the card is 30% from the top of the viewport
        scrub: true // Smooth scrubbing
      }
    }
  );
});