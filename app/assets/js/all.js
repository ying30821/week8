$(function() {
  //console.log('Hello Bootstrap5');
});
AOS.init();

//datepicker
const elem = document.querySelector('input[name="datepicker"]');
if(elem!==null){
const datepicker = new Datepicker(elem, {
  nextArrow: '>',
  prevArrow: '<',
  buttonClass: 'btn primary',
}); 
}
const main=document.querySelector('main');

//課程介紹
if(main.dataset.page==='course'){
  const courseModal = new bootstrap.Modal(document.getElementById('courseModal'))
  const courseModelImg=document.querySelector(".js-modal-img");
  const courseModelTitle=document.querySelector(".js-modal-title");
  const courseModelTeacher= document.querySelector(".js-modal-teacher");

  const courseCard =document.querySelectorAll('.js-courseCard');
  courseCard.forEach(item=>{
    item.addEventListener("click",e=>{
      e.preventDefault();
      changeCourseContent(item);
      courseModal.show();
    });
  });
  function changeCourseContent(item){
    courseModelImg.setAttribute("src", item.querySelector('img').getAttribute("src"));
    courseModelTitle.textContent=item.querySelector('h5').textContent;
    courseModelTeacher.textContent=item.querySelector('p').textContent;
  }
}

//預約介面
if(main.dataset.page==='reservation-choose'){
  let lesson='首次';
  let level='基礎';
  const lessonArea=document.querySelector('.js-lessonArea');
  const lessonCard=document.querySelectorAll('.js-lessonCard');
  const lessonArrow = document.querySelectorAll(".lesson-arrow");
  const levelArea=document.querySelector('.js-levelArea');
  const finalChoose=document.querySelector(".js-finalChoose");
  const contReserve=document.querySelector(".js-contReserve");
  let lastLessonIndex;
  lessonArrow.forEach((item) => {
    item.classList.add("d-none");
  });
  levelArea.classList.add("d-none");
  finalChoose.classList.add("d-none");
  contReserve.classList.add("d-none");
  //OnClickEvent
  lessonArea.addEventListener('click',e=>{
    e.preventDefault();
    if(e.target.nodeName==="BUTTON"){
      let nowLessonIndex=e.target.dataset.lessonIndex;
      if(contReserve.classList.contains("d-none")){
        finalChoose.classList.remove("d-none");
        contReserve.classList.remove("d-none");
      }
      if(nowLessonIndex!==lastLessonIndex &&lastLessonIndex!==undefined){
        lessonCard[lastLessonIndex].classList.remove("card__lesson--active");
        lessonArrow[lastLessonIndex].classList.add("d-none");
        levelArea.classList.add("d-none");
      }
      if(nowLessonIndex==="0"){
        lesson="首次";
        renderLevel(0);
        lastLessonIndex="0";
      }
      else if(nowLessonIndex==="1"){
        lesson="短期";
        renderLevel(1);
        lastLessonIndex="1";
      }
      else if(nowLessonIndex==="2"){
        lesson="長期";
        renderLevel(2);
        lastLessonIndex="2";
      }
      renderFinalChoose();
    }
  });
  levelArea.addEventListener("click",e=>{
    e.preventDefault();
    let levelCard = document.querySelectorAll(".js-levelCard");
    if(e.target.closest(".js-levelCard")!==null){
      levelCard.forEach((item) => {
      item.classList.remove("card__level--active");
      });
      e.target.closest(".js-levelCard").classList.add("card__level--active");
      let nowLevel=e.target.closest(".js-levelCard").dataset.levelIndex;
      if(nowLevel==="0"){
        level="基礎";
      }
      else if(nowLevel==="1"){
        level="中階";
    }
      else if(nowLevel==="2"){
        level="高階";
      }
      renderFinalChoose();
    }
  });
  function renderLevel(activeIndex){
    if(lessonArrow[activeIndex].classList.contains("d-none")){
      lessonCard.forEach(item=>{
        item.classList.add("d-none");
      })
      lessonCard[activeIndex].classList.remove("d-none");
      lessonCard[activeIndex].classList.add("card__lesson--active");
      lessonArrow[activeIndex].classList.remove("d-none");
      levelArea.classList.remove("d-none");
    }
    else{
      lessonCard.forEach(item=>{
        item.classList.remove("d-none");
      })
      lessonCard[activeIndex].classList.remove("card__lesson--active");
      lessonArrow[activeIndex].classList.add("d-none");
      levelArea.classList.add("d-none");
      finalChoose.classList.add("d-none");
      contReserve.classList.add("d-none");
    }
  }
  function renderFinalChoose(){
    finalChoose.querySelector("span").textContent=`${lesson}體驗課程-${level}`;
  } 
}