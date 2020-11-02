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
    if(screen.width > 915) {
      $(detailsPop).fadeIn('fast')
    }
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
  freeMode: true, 
  breakpoints: {

    915: {
      spaceBetween: 20,
      slidesPerView: 5.4,
    },
    718: {
      spaceBetween: 15,
      slidesPerView: 4,
    },

    425: {
      spaceBetween: 10,
      slidesPerView: 3.2,
    },
    320: {
      spaceBetween: 7,
      slidesPerView: 1.2,
    }

  }
})

// INTERATOR LOCAL STORAGE


function controleLocalStorage(objeto) {
  let resgateStorage = localStorage.getItem('cofreTarefas')
 
  if (resgateStorage && resgateStorage.length >= 0 ) {
    let tarefasExistentes = localStorage.getItem('cofreTarefas')
    let tarefasConvertidas = JSON.parse(tarefasExistentes)
    
    let tarefas = [...tarefasConvertidas, objeto];
    localStorage.setItem('cofreTarefas', JSON.stringify(tarefas))

  } else {
    let tarefas = [];
    tarefas.push(objeto)
    localStorage.setItem('cofreTarefas', JSON.stringify(tarefas))
  }
  
  CriadorMiniBox(objeto)
}

if (localStorage.cofreTarefas && (localStorage.cofreTarefas).length > 0) {
  let stringToObject = JSON.parse(localStorage.cofreTarefas)
  CriadorMiniBoxStorage(stringToObject)
}


// CLICK EVENT ONLY NAME TASK

$('.keep-it__btn').click(function() {
  let entrada = $('.entrada__task').val()
  if (entrada.length === 0) {
    alert('Insira algo')
  } else {
    CriadorObjeto(entrada)  
  }
  $('.entrada__task').val("")
  $('#todo').val("")
  $('#time').val("")
  $('#friend').val("")
})


// CLICK EVENT DETAILS TASK

$('.modal__details-btn').click(function() {
  let task = $('#todo').val()
  let time = $('#time').val()
  let friend = $('#friend').val()

  if(task.length === 0) {
    alert('Digite algo')
  } else {
    CriadorObjeto(task, time, friend)
    $('.modal__details-container').hide()

  }

  $('#todo').val("")
  $('#time').val("")
  $('#friend').val("")
})

// OBJECT CONSTRUCTOR

function CriadorObjeto(task, data, friend) {
  let infos = {
    id: Date.now(),
    task: task,
    data: data,
    friend: friend,
    hide: false,
  }
  controleLocalStorage(infos)
}



// SWIPER ELEMENTS CONSTRUCTOR

function CriadorMiniBox(entrada) {
  if (entrada.hide === false) {
    mySwiper.appendSlide($(`<div class="swiper-slide" id="${entrada.id}">`).append($('<div class="swiper__mini-box">').append(`<p class="mini-box__text">${entrada.task}</p>`)).append('<button class="mini-box__button">Click for details</button>'))

  let elementos = $('.swiper-slide')

  elementos.each((index, elemento) => {
    elemento.addEventListener('click', detailsTask)
  }) 

  }

}

function CriadorMiniBoxStorage(entrada) {
  $(entrada).each((index, elemento) => {
    CriadorMiniBox(elemento)
  })
}


/*
DETAILS TASK MODAL
*/

function detailsTask(e) {
  let tarefasExistentesDetail = localStorage.getItem('cofreTarefas')
  let tarefasConvertidasDetail = JSON.parse(tarefasExistentesDetail)

  for(let i = 0; i < tarefasConvertidasDetail.length; i++) {
    let elementoPai = e.target.closest('div .swiper-slide')
    let idElemento = elementoPai.id
    idElemento = Number(idElemento)

    if (tarefasConvertidasDetail[i].id === idElemento) {
      let task = tarefasConvertidasDetail[i]
      console.log(task)

      $('.modal__details-open-container').show()
      $('.task-name').text(task.task)
      $('.task-data').text(task.data)
      $('.task-friend').text(task.friend)

      $('.modal__details-open-btn').click(function() {
        $('.modal__details-open-container').hide()
        excluirTask(tarefasConvertidasDetail, task, elementoPai)
        $('.task-data').text("")
        $('.task-friend').text("")
      })
    }
    
  }
}

function excluirTask(storage, task, e) {
  task.hide = true;
  e.remove()
  localStorage.setItem('cofreTarefas', JSON.stringify(storage))
}

$('.close-btn').click(function() {
  $('.modal__style-bg').hide()
  $('.task-data').text("")
  $('.task-friend').text("")
})


$('.limpar-btn').click(function() {
  localStorage.clear('cofreTarefas')
  window.location.reload()
})
})

