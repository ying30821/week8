AOS.init();
const main = document.querySelector('main');

if (main.dataset.page === 'course') {
  const courseModal = new bootstrap.Modal(document.getElementById('courseModal'))
  const courseModelImg = document.querySelector(".js-modal-img");
  const courseModelTitle = document.querySelector(".js-modal-title");
  const courseModelTeacher = document.querySelector(".js-modal-teacher");

  const courseCard = document.querySelectorAll('.js-courseCard');
  courseCard.forEach(item => {
    item.addEventListener("click", e => {
      e.preventDefault();
      changeCourseContent(item);
      courseModal.show();
    });
  });
  function changeCourseContent(item) {
    courseModelImg.setAttribute("src", item.querySelector('img').getAttribute("src"));
    courseModelTitle.textContent = item.querySelector('h5').textContent;
    courseModelTeacher.textContent = item.querySelector('p').textContent;
  }
}
if (main.dataset.page === 'reservation-choose') {
  const lessonArea = document.querySelector('.js-lessonArea');
  const lessonCard = document.querySelectorAll('.js-lessonCard');
  const levelArea = document.querySelector('.js-levelArea');
  const levelCard = document.querySelectorAll(".js-levelCard");
  const lessonArrow = document.querySelectorAll(".lesson-arrow");
  const courseText = document.querySelector(".js-courseText");
  const continueBtn = document.querySelector(".js-contReserve");
  let lesson = '首次';
  let level = '基礎';
  let course;
  let lastLessonIndex, lastLevelIndex;
  lessonArea.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.nodeName === "BUTTON") {
      const nowLessonIndex = e.target.dataset.lessonIndex;
      if (levelArea.classList.contains("d-none")) levelArea.classList.remove("d-none");
      if (courseText.classList.contains("d-none")) courseText.classList.remove("d-none");
      if (continueBtn.classList.contains("d-none")) continueBtn.classList.remove("d-none");
      renderLesson(nowLessonIndex);
      renderLevel("0");
      renderCourseText();
    }
  });
  levelArea.addEventListener("click", e => {
    e.preventDefault();
    if (e.target.closest(".js-levelCard")) {
      let nowLevel = e.target.closest(".js-levelCard").dataset.levelIndex;
      renderLevel(nowLevel);
      renderCourseText();
    }
  });
  function renderLesson(index) {
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
  }
  function renderLevel(index) {
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
  }
  function renderCourseText() {
    course = `${lesson}體驗課程-${level}`;
    courseText.querySelector("span").textContent = course;
  }
}
if (main.dataset.page === 'reservation-apply') {
  const course = document.querySelector('.js-course');
  const form = document.querySelector(".js-form");
  const datepicker = document.querySelector('input[name="日期"]');
  const inputs = document.querySelectorAll("input[type=text],input[type=number],select");
  const msgs = document.querySelectorAll('[data-msg]');
  const sendFormBtn = document.querySelector(".js-sendFormBtn");
  const constraints = {
    日期: {
      presence: {
        message: "是必填欄位"
      },
    },
    姓名: {
      presence: {
        message: "是必填欄位"
      },
    },
    年齡: {
      presence: {
        message: "是必填欄位"
      },
    },
    性別: {
      presence: {
        message: "是必填欄位"
      },
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
    },
  };
  let errors = {};
  let myReserve = {};

  inputs.forEach((item) => {
    item.addEventListener("change", formValidate);
  });
  sendFormBtn.addEventListener("click", e => {
    e.preventDefault();
    formValidate();
    if (errors) return;
    inputs.forEach(item => {
      const key = item.getAttribute('name');
      if (!myReserve[key]) myReserve[key] = '';
      myReserve[key] = item.value;
    });
    let str = '';
    const arr = Object.entries(myReserve);
    arr.forEach((item, index) => {
      str += `${item[0]}=${item[1]}`;
      if (index !== arr.length - 1) {
        str += '&';
      }
    })
    document.location.href = `./reservation-done.html?${str}`;
  });
  init();
  function init() {
    splitUrl();
    initDatepicker();
  }
  function initDatepicker() {
    if (datepicker) {
      const myDatepicker = new Datepicker(datepicker, {
        nextArrow: '>',
        prevArrow: '<',
        buttonClass: 'btn primary',
      });
    }
  }
  function formValidate() {
    inputs.forEach(item => item.classList.remove("is-invalid"));
    msgs.forEach(item => item.textContent = "");
    errors = validate(form, constraints);
    if (errors) {
      Object.keys(errors).forEach(item => {
        const msg = document.querySelector(`[data-msg=${item}]`);
        const input = document.querySelector(`[name=${item}]`);
        input.classList.add("is-invalid");
        let str = "";
        if (errors[item].length > 1) {
          str = errors[item].join("<br>");
        } else {
          str = errors[item];
        }
        msg.innerHTML = str;
      })
    }
  }
  function splitUrl() {
    let url = location.href;
    if (url.indexOf('?') != -1) {
      let temp = url.split("?");
      if (!myReserve.course) myReserve.course = '';
      myReserve.course = decodeURI(temp[1]);
      course.textContent = myReserve.course || '首次體驗課程-基礎';
    }
  }
}
if (main.dataset.page === 'reservation-done') {
  let myReserve = {};
  init();
  function init() {
    splitUrl();
    renderReserveData();
  }
  function splitUrl() {
    let url = location.href;
    if (url.indexOf('?') != -1) {
      let temp = url.split("?");
      let temp2 = temp[1].split("&");
      for (let i = 0; i < temp2.length; i++) {
        const temp3 = temp2[i].split("=");
        const key = decodeURI(temp3[0]);
        const value = decodeURI(temp3[1]);
        if (!myReserve[key]) myReserve[key] = '';
        myReserve[key] = value;
      };
    }
  }
  function renderReserveData() {
    if (Object.keys(myReserve).length > 0) {
      const reserves = document.querySelectorAll('[data-reserve]');
      reserves.forEach(item => {
        const key = item.getAttribute('data-reserve');
        item.textContent = myReserve[key];
      });
    }
  }
}