$('button').click(function(e){
  e.preventDefault();
})

$(function() {
  // MODAL  ON LOAD 
  const modalLoadButton = $('.modal__load-btn')
  const modalLoadContainer = $('.modal__load-container')

  modalLoadContainer.show()
  modalLoadButton.click(() => modalLoadContainer.remove())



  // DETAILS BUTTON 
  const detailsButton = $('.details__btn')
  const detailsPop = $('.details__pop')
  const modalDetails = $('.modal__details-container')

  detailsButton.hover(function () {
    $(detailsPop).fadeIn('fast')
  
  }, function() {
    $(detailsPop).fadeOut('slow')
  })

  // --- OPEN MODAL IN DETAILS BUTTON CLICK
  detailsButton.click(function() {
    modalDetails.show()
  })

// SWIPER

  let mySwiper = new Swiper('.swiper-container', {
  // Optional parameters
  spaceBetween: 50,
  slidesPerView: 5,
  freeMode: true,  
})

// Adicionando tasks

const mainKeepItBtn = $('.keep-it__btn')

mainKeepItBtn.click(function() {
  let entrada = $('.entrada__task').val()
if (entrada.length === 0) {
  alert('Insira algo')

} else {
  CriadorObjeto(entrada)
}
})


// keep it modal

$('.modal__details-btn').click(function() {
  let task = $('#todo').val()
  let time = $('#time').val()
  let friend = $('#friend').val()

  CriadorObjeto(task, time, friend)
  $('.modal__details-container').hide()
})


function CriadorObjeto(task, data, friend) {
  let infos = {
    task: task,
    data: data,
    friend: friend,
  }
  localStorageF(infos)
}

let cofreTasks = new Array();

function localStorageF(entrada) {
  cofreTasks.push(entrada)

  $(cofreTasks).each((index, elemento) =>{ 
  localStorage.setItem(index, JSON.stringify(elemento))})
 
  CriadorMiniBox(entrada)
  }


function CriadorMiniBox(entrada) {
mySwiper.appendSlide($('<div class="swiper-slide">').append($('<div class="swiper__mini-box">').append(`<p class="mini-box__text">${entrada.task}</p>`)))

}
})








