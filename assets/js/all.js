"use strict";

AOS.init();
var main = document.querySelector('main');

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
}

if (main.dataset.page === 'reservation-choose') {
  var renderLesson = function renderLesson(index) {
    if (lastLessonIndex) {
      lessonCard[lastLessonIndex].classList.remove("card__lesson--active");
      lessonArrow[lastLessonIndex].classList.add('d-none');
    }

    lessonCard[index].classList.add("card__lesson--active");
    lessonArrow[index].classList.remove('d-none');

    switch (index) {
      case "0":
        lesson = "首次";
        break;

      case "1":
        lesson = "短期";
        break;

      case "2":
        lesson = "長期";
        break;
    }

    lastLessonIndex = index;
  };

  var renderLevel = function renderLevel(index) {
    if (lastLevelIndex) {
      levelCard[lastLevelIndex].classList.remove("card__level--active");
    }

    levelCard[index].classList.add("card__level--active");

    switch (index) {
      case "0":
        level = "基礎";
        break;

      case "1":
        level = "中階";
        break;

      case "2":
        level = "高階";
        break;
    }

    lastLevelIndex = index;
  };

  var renderCourseText = function renderCourseText() {
    myReserve.course = "".concat(lesson, "\u9AD4\u9A57\u8AB2\u7A0B-").concat(level);
    courseText.querySelector("span").textContent = myReserve.course;
  };

  var lessonArea = document.querySelector('.js-lessonArea');
  var lessonCard = document.querySelectorAll('.js-lessonCard');
  var levelArea = document.querySelector('.js-levelArea');
  var levelCard = document.querySelectorAll(".js-levelCard");
  var lessonArrow = document.querySelectorAll(".lesson-arrow");
  var courseText = document.querySelector(".js-courseText");
  var continueBtn = document.querySelector(".js-contReserve");
  var myReserve = {};
  var lesson = '首次';
  var level = '基礎';
  var lastLessonIndex, lastLevelIndex;
  lessonArea.addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.nodeName === "BUTTON") {
      var nowLessonIndex = e.target.dataset.lessonIndex;
      if (levelArea.classList.contains("d-none")) levelArea.classList.remove("d-none");
      if (courseText.classList.contains("d-none")) courseText.classList.remove("d-none");
      if (continueBtn.classList.contains("d-none")) continueBtn.classList.remove("d-none");
      renderLesson(nowLessonIndex);
      renderLevel("0");
      renderCourseText();
    }
  });
  levelArea.addEventListener("click", function (e) {
    e.preventDefault();

    if (e.target.closest(".js-levelCard")) {
      var nowLevel = e.target.closest(".js-levelCard").dataset.levelIndex;
      renderLevel(nowLevel);
      renderCourseText();
    }
  });
  continueBtn.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.setItem("myReserve", JSON.stringify(myReserve));
    document.location.href = './reservation-apply.html';
  });
}

if (main.dataset.page === 'reservation-apply') {
  var init = function init() {
    _myReserve = JSON.parse(localStorage.getItem("myReserve")) || {};
    course.textContent = _myReserve.course || '首次體驗課程-基礎';
    initDatepicker();
  };

  var initDatepicker = function initDatepicker() {
    if (datepicker) {
      var myDatepicker = new Datepicker(datepicker, {
        nextArrow: '>',
        prevArrow: '<',
        buttonClass: 'btn primary'
      });
    }
  };

  var formValidate = function formValidate() {
    inputs.forEach(function (item) {
      return item.classList.remove("is-invalid");
    });
    msgs.forEach(function (item) {
      return item.textContent = "";
    });
    errors = validate(form, constraints);

    if (errors) {
      Object.keys(errors).forEach(function (item) {
        var msg = document.querySelector("[data-msg=".concat(item, "]"));
        var input = document.querySelector("[name=".concat(item, "]"));
        input.classList.add("is-invalid");
        var str = "";

        if (errors[item].length > 1) {
          str = errors[item].join("<br>");
        } else {
          str = errors[item];
        }

        msg.innerHTML = str;
      });
    }
  };

  var course = document.querySelector('.js-course');
  var form = document.querySelector(".js-form");
  var datepicker = document.querySelector('input[name="日期"]');
  var inputs = document.querySelectorAll("input[type=text],input[type=number],select");
  var msgs = document.querySelectorAll('[data-msg]');
  var sendFormBtn = document.querySelector(".js-sendFormBtn");
  var constraints = {
    日期: {
      presence: {
        message: "是必填欄位"
      }
    },
    姓名: {
      presence: {
        message: "是必填欄位"
      }
    },
    年齡: {
      presence: {
        message: "是必填欄位"
      }
    },
    性別: {
      presence: {
        message: "是必填欄位"
      }
    },
    Email: {
      presence: {
        message: "是必填欄位"
      },
      email: {
        message: "不是正確格式"
      }
    },
    手機號碼: {
      presence: {
        message: "是必填欄位"
      },
      format: {
        pattern: "[0-9]+",
        message: "只能輸入數字"
      },
      length: {
        is: 10,
        message: "長度不正確"
      }
    }
  };
  var errors = {};
  var _myReserve = {};
  inputs.forEach(function (item) {
    item.addEventListener("change", formValidate);
  });
  sendFormBtn.addEventListener("click", function (e) {
    e.preventDefault();
    formValidate();
    if (errors) return;
    inputs.forEach(function (item) {
      var key = item.getAttribute('name');
      if (!_myReserve[key]) _myReserve[key] = '';
      _myReserve[key] = item.value;
    });
    localStorage.setItem("myReserve", JSON.stringify(_myReserve));
    document.location.href = './reservation-done.html';
  });
  init();
}

if (main.dataset.page === 'reservation-done') {
  var _init = function _init() {
    _myReserve2 = JSON.parse(localStorage.getItem("myReserve")) || {};
    renderReserveData();
  };

  var renderReserveData = function renderReserveData() {
    if (Object.keys(_myReserve2).length > 0 && _myReserve2.姓名) {
      var reserves = document.querySelectorAll('[data-reserve]');
      reserves.forEach(function (item) {
        var key = item.getAttribute('data-reserve');
        item.textContent = _myReserve2[key];
      });
    }
  };

  var _myReserve2 = {};

  _init();
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
