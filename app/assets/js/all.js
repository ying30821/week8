$(function() {
  console.log('Hello Bootstrap5');
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