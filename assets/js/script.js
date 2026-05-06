const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const slideCount = slides.length;
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const counter = document.querySelector('.slide-counter');

const cardsContainer = document.querySelector('.cards');
const prevBtnGrid = document.querySelector('.prev-grid');
const nextBtnGrid = document.querySelector('.next-grid');
const counterGrid = document.querySelector('.slide-counter-grid');

let currentSlide = 1;
let slideWidth = 100;
let autoInterval = null;

const GROUP_COUNT = 5;
let currentGroup = 1;

function updateCardsPosition() {
    if (window.innerWidth < 989) {
        const offset = -((currentGroup - 1) * 100);
        cardsContainer.style.transform = `translateX(${offset}%)`;
        counterGrid.textContent = `${currentGroup} / ${GROUP_COUNT}`;
        if (prevBtnGrid) prevBtnGrid.style.display = '';
        if (nextBtnGrid) nextBtnGrid.style.display = '';
    } else {
        cardsContainer.style.transform = 'translateX(0)';
        if (counterGrid) counterGrid.textContent = `${GROUP_COUNT} / ${GROUP_COUNT}`;
        if (prevBtnGrid) prevBtnGrid.style.display = 'none';
        if (nextBtnGrid) nextBtnGrid.style.display = 'none';
    }
}

function initCards() {
    const isMobile = window.innerWidth < 989;
    
    if (isMobile) {
        if (currentGroup < 1 || currentGroup > GROUP_COUNT) currentGroup = 1;
        updateCardsPosition();
    } else {
        updateCardsPosition();
    }
}

function updateSliderPosition() {
    const offset = -((currentSlide - 1) * slideWidth);
    slider.style.transform = `translateX(${offset}%)`;
    counter.textContent = `${currentSlide} / ${slideCount}`;
}

function initSlider() {
    const isMobile = window.innerWidth < 989;
    slideWidth = isMobile ? 100 : 33;
    if (currentSlide < 1) currentSlide = 1;
    if (currentSlide > slideCount) currentSlide = slideCount;
    updateSliderPosition();
    
    if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
    }
    
    autoInterval = setInterval(() => {
        if (currentSlide < slideCount) currentSlide++;
        else currentSlide = 1;
        updateSliderPosition();
    }, 4000);
}

prevBtn.addEventListener('click', () => {
    if (currentSlide > 1) currentSlide--;
    else return;
    updateSliderPosition();
});

nextBtn.addEventListener('click', () => {
    if (currentSlide < slideCount) currentSlide++;
    else return;
    updateSliderPosition();
});

if (prevBtnGrid && nextBtnGrid) {
    prevBtnGrid.addEventListener('click', () => {
        if (window.innerWidth < 989) {
            if (currentGroup > 1) {
                currentGroup--;
            } else {
                currentGroup = GROUP_COUNT;
            }
            updateCardsPosition();
        }
    });
    
    nextBtnGrid.addEventListener('click', () => {
        if (window.innerWidth < 989) {
            if (currentGroup < GROUP_COUNT) {
                currentGroup++;
            } else {
                currentGroup = 1;
            }
            updateCardsPosition();
        }
    });
}

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initSlider();
        initCards();
    }, 150);
});

initSlider();
initCards();


function initRunningLine(runningLineElement) {
    const track = runningLineElement.querySelector('.running-line__track');
    const content = runningLineElement.querySelector('.running-line__content');
    if (!track || !content) return;

    const textItems = content.querySelectorAll('.running-line__text');
    const copiesCount = textItems.length;
    if (copiesCount === 0) return;

    let position = 0;
    const speed = 1;
    let animationId = null;

    function step() {
        position -= speed;
        const oneCopyWidth = content.scrollWidth / copiesCount;
        if (Math.abs(position) >= oneCopyWidth) {
            position = 0;
        }
        content.style.transform = `translateX(${position}px)`;
        animationId = requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!animationId) step();
            } else {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
            }
        });
    }, { threshold: 0 });

    observer.observe(track);

    window.addEventListener('resize', () => {
        position = 0;
        if (content) content.style.transform = `translateX(0px)`;
    });
}

document.querySelectorAll('.running-line').forEach(initRunningLine);