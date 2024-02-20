let currentSlide = 1;
const slides = document.querySelectorAll('.slide');
const slideCount = slides.length;
const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const counter = document.querySelector('.slide-counter');

counter.textContent = currentSlide + ' / ' + slideCount;

if (innerWidth<989) {
  var slideWidth = 100;
  setInterval(() => {
    if (currentSlide < slideCount) {
      currentSlide++;
      slider.style.transform = 'translateX(' + -((currentSlide - 1) * slideWidth) + '%)';
      counter.textContent = currentSlide + ' / ' + slideCount;
    }
    if (currentSlide === 6) {
      currentSlide = 0;
    }
  },1000);
} else {
  var slideWidth = 33;
}

prevBtn.addEventListener('click', () => {
  if (currentSlide > 1) {
    currentSlide--;
    slider.style.transform = 'translateX(' + -((currentSlide - 1) * slideWidth) + '%)';
    counter.textContent = currentSlide + ' / ' + slideCount;
  }
});

nextBtn.addEventListener('click', () => {
  if (currentSlide < slideCount) {
    currentSlide++;
    slider.style.transform = 'translateX(' + -((currentSlide - 1) * slideWidth) + '%)';
    counter.textContent = currentSlide + ' / ' + slideCount;
  }
});

/*ЭТАПЫ*/

if (innerWidth<989) {
  let currentCard = 1;
  const cards = document.querySelectorAll('.card');
  const cardCount = 5;
  const cardr = document.querySelector('.cards');
  const prevBtnGrid = document.querySelector('.prev-grid');
  const nextBtnGrid = document.querySelector('.next-grid');
  const counterGrid = document.querySelector('.slide-counter-grid');

  counter.textContent = currentCard + ' / ' + cardCount;


  prevBtnGrid.addEventListener('click', () => {
    if (currentCard > 1) {
      currentCard--;
      cardr.style.transform = 'translateX(' + -((currentCard - 1) * 100) + '%)';
    }
    if (currentCard === 1) {
      currentCard = 6;
    }
  });

  nextBtnGrid.addEventListener('click', () => {
    if (currentCard < cardCount) {
      currentCard++;
      cardr.style.transform = 'translateX(' + -((currentCard - 1) * 100) + '%)';
    }
    if (currentCard === 5) {
      currentCard = 0;
    }
  });
}