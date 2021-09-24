"use strict";

$(function () {//console.log('Hello Bootstrap5');
});
AOS.init(); //datepicker

var elem = document.querySelector('input[name="datepicker"]');

if (elem !== null) {
  var datepicker = new Datepicker(elem, {
    nextArrow: '>',
    prevArrow: '<',
    buttonClass: 'btn primary'
  });
}

var main = document.querySelector('main'); //課程介紹

if (main.dataset.page === 'course') {
  var changeCourseContent = function changeCourseContent(item) {
    courseModelImg.setAttribute("src", item.querySelector('img').getAttribute("src"));
    courseModelTitle.textContent = item.querySelector('h5').textContent;
    courseModelTeacher.textContent = item.querySelector('p').textContent;
  };

  var courseModal = new bootstrap.Modal(document.getElementById('courseModal'));
  var courseModelImg = document.querySelector(".js-modal-img");
  var courseModelTitle = document.querySelector(".js-modal-title");
  var courseModelTeacher = document.querySelector(".js-modal-teacher");
  var courseCard = document.querySelectorAll('.js-courseCard');
  courseCard.forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      changeCourseContent(item);
      courseModal.show();
    });
  });
} //預約介面


if (main.dataset.page === 'reservation-choose') {
  var renderLevel = function renderLevel(activeIndex) {
    if (lessonArrow[activeIndex].classList.contains("d-none")) {
      lessonCard.forEach(function (item) {
        item.classList.add("d-none");
      });
      lessonCard[activeIndex].classList.remove("d-none");
      lessonCard[activeIndex].classList.add("card__lesson--active");
      lessonArrow[activeIndex].classList.remove("d-none");
      levelArea.classList.remove("d-none");
    } else {
      lessonCard.forEach(function (item) {
        item.classList.remove("d-none");
      });
      lessonCard[activeIndex].classList.remove("card__lesson--active");
      lessonArrow[activeIndex].classList.add("d-none");
      levelArea.classList.add("d-none");
      finalChoose.classList.add("d-none");
      contReserve.classList.add("d-none");
    }
  };

  var renderFinalChoose = function renderFinalChoose() {
    finalChoose.querySelector("span").textContent = "".concat(lesson, "\u9AD4\u9A57\u8AB2\u7A0B-").concat(level);
  };

  var lesson = '首次';
  var level = '基礎';
  var lessonArea = document.querySelector('.js-lessonArea');
  var lessonCard = document.querySelectorAll('.js-lessonCard');
  var lessonArrow = document.querySelectorAll(".lesson-arrow");
  var levelArea = document.querySelector('.js-levelArea');
  var finalChoose = document.querySelector(".js-finalChoose");
  var contReserve = document.querySelector(".js-contReserve");
  var lastLessonIndex;
  lessonArrow.forEach(function (item) {
    item.classList.add("d-none");
  });
  levelArea.classList.add("d-none");
  finalChoose.classList.add("d-none");
  contReserve.classList.add("d-none"); //OnClickEvent

  lessonArea.addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.nodeName === "BUTTON") {
      var nowLessonIndex = e.target.dataset.lessonIndex;

      if (contReserve.classList.contains("d-none")) {
        finalChoose.classList.remove("d-none");
        contReserve.classList.remove("d-none");
      }

      if (nowLessonIndex !== lastLessonIndex && lastLessonIndex !== undefined) {
        lessonCard[lastLessonIndex].classList.remove("card__lesson--active");
        lessonArrow[lastLessonIndex].classList.add("d-none");
        levelArea.classList.add("d-none");
      }

      if (nowLessonIndex === "0") {
        lesson = "首次";
        renderLevel(0);
        lastLessonIndex = "0";
      } else if (nowLessonIndex === "1") {
        lesson = "短期";
        renderLevel(1);
        lastLessonIndex = "1";
      } else if (nowLessonIndex === "2") {
        lesson = "長期";
        renderLevel(2);
        lastLessonIndex = "2";
      }

      renderFinalChoose();
    }
  });
  levelArea.addEventListener("click", function (e) {
    e.preventDefault();
    var levelCard = document.querySelectorAll(".js-levelCard");

    if (e.target.closest(".js-levelCard") !== null) {
      levelCard.forEach(function (item) {
        item.classList.remove("card__level--active");
      });
      e.target.closest(".js-levelCard").classList.add("card__level--active");
      var nowLevel = e.target.closest(".js-levelCard").dataset.levelIndex;

      if (nowLevel === "0") {
        level = "基礎";
      } else if (nowLevel === "1") {
        level = "中階";
      } else if (nowLevel === "2") {
        level = "高階";
      }

      renderFinalChoose();
    }
  });
}
"use strict";

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
      },
      spaceBetween: 30
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
      },
      spaceBetween: 30
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
var chooseLevelSwiper = new Swiper(".chooseLevel-swiper", {
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
    1200: {
      slidesPerView: 3,
      grid: {
        rows: 1
      },
      spaceBetween: 20
    }
  },
  direction: 'horizontal'
});
//# sourceMappingURL=all.js.map
