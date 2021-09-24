const variousCourseSwiper = new Swiper(".variousCourse-swiper", {
  slidesPerView: 1.5,
  spaceBetween: 30,
});
const recommendSwiper = new Swiper(".recommend-swiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  grid: {
    rows: 3,
    fill: 'row',
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      grid: {
        rows: 2, 
      },
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 3,
      grid: {
        rows: 2, 
      },
      spaceBetween: 30,
    },
  },
  direction: 'horizontal',
});
const teacherSwiper = new Swiper(".teacher-swiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  grid: {
    rows: 4,
    fill: 'row',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      grid: {
        rows: 1, 
      },
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 3,
      grid: {
        rows: 1, 
      },
      spaceBetween: 30,
    },
  },
  direction: 'horizontal',
});
const recommendCourseSwiper = new Swiper(".recommendCourse-swiper", {
  slidesPerView: 1.5,
  spaceBetween: 30,
  breakpoints: {
    768: {
      slidesPerView: 3,
    },
    992:{
      slidesPerView: 4,
    }
  }
});
const chooseLevelSwiper = new Swiper(".chooseLevel-swiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  grid: {
    rows: 3,
    fill: 'row',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      grid: {
        rows: 1, 
      },
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 3,
      grid: {
        rows: 1, 
      },
      spaceBetween: 20,
    },
  },
  direction: 'horizontal',
});