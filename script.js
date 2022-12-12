'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(button => {
  button.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////
///selecting elements
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');

const allButtons = document.getElementsByName('button');
const nav = document.querySelector('.nav');
const section1 = document.querySelector('#section--1');

// Create Html

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for your smooth Experience We are to see you here Keep earning money<button class="btn btn-close-cookie">Got it!</button>';

header.prepend(message);

document
  .querySelector('.btn-close-cookie')
  .addEventListener('click', () => message.remove());

////////styles

message.style.backgroundColor = 'grey';
message.style.width = '120%';

console.log(getComputedStyle(message).width);

document.documentElement.style.setProperty('--color-primary', '#39b385');

// attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt, logo.src, logo.className);

/// Smooth scrolling
///////////////////////////////////////
// Button scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to')

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});






//page naavigation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// tab functionalty apply

const tabs = document.querySelectorAll('.operations__tab');

const tabsContainer = document.querySelector('.operations__tab-container');

const tabsContent = document.querySelectorAll('.operations__content');

// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  //if there click happen other than btn
  if (!clicked) return;

  //Adding active class task
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // active content area
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  clicked.classList.add('operations__content--active');

  // active content area
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//// menu fade Animatiion
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(s => {
      if (s !== link) s.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

//nav sticky
// const initialCords = section1.getBoundingClientRect();

//   window.addEventListener('scroll',function(e){
// if(window.scrollY > initialCords.top)nav.classList.add('sticky');
// else nav.classList.remove('sticky');
//   });

//intersectionObservver Api]

//
// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);
const obsCallBack = function (entries) {
  const [entry] = entries;

  if (entry.isIntersecting === false) {
    console.log('im groot');
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const observer = new IntersectionObserver(obsCallBack, {
  root: null,
  threshold: 0,
  rootMargin: '-90px',
});
observer.observe(header);

//////////////////////

const lazyFun = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const lazyLoading = new IntersectionObserver(lazyFun, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  lazyLoading.observe(section);

  section.classList.add('section--hidden');
});

// image lazyness

const imgTargets = document.querySelectorAll('img[data-src]');

const lazyImgFun = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const lazyImgObserver = new IntersectionObserver(lazyImgFun, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTargets.forEach(img => {
  lazyImgObserver.observe(img);
});

///////////slideer
const playSlider = function () {
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const slides = document.querySelectorAll('.slide');
  const dotConatainer = document.querySelector('.dots');
  let curSlide = 0;
  let maxSlide = slides.length;

  ///////funtions
  const createDots = function () {
    slides.forEach((_, i) => {
      dotConatainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (sli) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });
    document
      .querySelector(`.dots__dot[data-slide="${sli}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (Slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - Slide)}%)`;
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
    console.log('Next');
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
    console.log('previous');
  };

  ////initilization
  const int = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };
  int();

  ////// event listners
  btnRight.addEventListener('click', nextSlide);

  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  dotConatainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      console.log(slide);
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
playSlider();
//  event listener

// const logms = ()=>console.log('welcome we are happy to see again')
// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter',logms,);
// h1.addEventListener('mouseleave',()=>{console.log(' we are waitong to see again')
// });
// setTimeout(() => {
//   h1.removeEventListener('mouseenter',logms);
// }, 5000);

// //rgb genrate

// function randomInt() {
//  const randomNum = Math.floor(Math.random()*255)+1
//  console.log(randomNum);
//  return randomNum
// };
// const rgb =  `(rgb${randomInt()},${randomInt()},${randomInt()})`;
// console.log(rgb);

// document.querySelector('.nav__link').addEventListener('click',function(e){
//   this.style.backgroundColor = rgb;
//    console.log('LINK',e.target);
// });
// document.querySelector('.nav__links').addEventListener('click',function(e){
//   this.style.backgroundColor = rgb;
//   console.log('LINK',e.target);
// });
// document.querySelector('.nav').addEventListener('click',function(e){
//   this.style.backgroundColor = rgb;
//   console.log('LINK',e.target);
// });

// // Event Propagation in Practice
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);

//   // Stop propagation
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
// });
