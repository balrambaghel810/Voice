/* -----------------------------------FAQ---------------------------------------- */

// const { response } = require("express");

document.addEventListener("DOMContentLoaded", function () {
  var accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach(function (header) {
    header.addEventListener("click", function () {
      var parent = this.parentElement;
      var content = this.nextElementSibling;

      parent.classList.toggle("active");
      if (content.style.height === "0px" || content.style.height === "") {
        content.style.height = content.scrollHeight + "px";
      } else {
        content.style.height = "0";
      }
      var icon = this.querySelector("i");
      icon.classList.toggle("rotate");
    });
  });
});

// <!-- ---------------------------------------------footer --------------------------------------------------------------------- -->

document.getElementById("year").textContent = new Date().getFullYear();
// _______________________Bottom to Top _________________________________________

let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  // document.body.scrollTop = 0;
  // document.documentElement.scrollTop = 0;
}
// ----------------------------responsive navbar--------------------
document.getElementById("menu-icon").addEventListener("click", function () {
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("active");
});
