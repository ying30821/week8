"use strict";

$(function () {
  console.log('Hello Bootstrap5');
});
var variousCourseSwiper = new Swiper(".variousCourse-swiper", {
  slidesPerView: 1.5,
  spaceBetween: 30
});
var recommendSwiper = new Swiper(".recommend-swiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  grid: {
    rows: 3,
    fill: 'row'
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      grid: {
        rows: 2
      },
      spaceBetween: 30
    },
    992: {
      slidesPerView: 3,
      grid: {
        rows: 2
      }
    }
  },
  direction: 'horizontal'
});
var teacherSwiper = new Swiper(".teacher-swiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  grid: {
    rows: 4,
    fill: 'row'
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      grid: {
        rows: 1
      },
      spaceBetween: 30
    },
    992: {
      slidesPerView: 3,
      grid: {
        rows: 1
      }
    }
  },
  direction: 'horizontal'
});
var recommendCourseSwiper = new Swiper(".recommendCourse-swiper", {
  slidesPerView: 1.5,
  spaceBetween: 30,
  breakpoints: {
    768: {
      slidesPerView: 3
    },
    992: {
      slidesPerView: 4
    }
  }
});
var chooseCourseSwiper = new Swiper(".chooseCourse-swiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  grid: {
    rows: 3,
    fill: 'row'
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      grid: {
        rows: 1
      },
      spaceBetween: 30
    },
    992: {
      slidesPerView: 2.5,
      grid: {
        rows: 1
      }
    }
  },
  direction: 'horizontal'
}); //datepicker

var elem = document.querySelector('input[name="datepicker"]');
var datepicker = new Datepicker(elem, {
  nextArrow: '>',
  prevArrow: '<',
  buttonClass: 'btn primary'
});
//# sourceMappingURL=all.js.map
