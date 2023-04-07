function slider(){

const slider = document.querySelector(".slider");
const images = document.querySelectorAll(".slider img");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentSlide = 0;

function showSlide(slideIndex) {
  if (slideIndex < 0) {
    slideIndex = images.length - 1;
  } else if (slideIndex >= images.length) {
    slideIndex = 0;
  }
  slider.style.transform = `translateX(-${slideIndex * 100}%)`;
  currentSlide = slideIndex;
}

function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPrevSlide() {
  showSlide(currentSlide - 1);
}

prevButton.addEventListener("click", showPrevSlide);
nextButton.addEventListener("click", showNextSlide);

setInterval(showNextSlide, 5000);
}

export default slider;
