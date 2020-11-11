// MODAL  ON LOAD 
const modalLoadButton = document.querySelector('.modal__load-btn')
const modalLoadContainer = document.querySelector('.modal__load-container')

window.onload = () => modalLoadContainer.style.display = "block"
modalLoadContainer.onclick = () => modalLoadContainer.remove()

// SWIPER

let mySwiper = new Swiper('.swiper-container', {
// Optional parameters
freeMode: true, 
observer: true,
observeParents: true,
observeSlideChildren: true,
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


// Open modal for add tasks

const modalDetails = document.querySelector('.modal__details-container')
const keepItBtn = document.querySelector('.keep-it__btn')

keepItBtn.onclick = function(e) {
  e.preventDefault();
  let entrada = document.querySelector('.entrada__task')

  if ((entrada.value).length <= 0) {
    swal("Digite algo!", "Para conseguirmos seguir, é necessário que escreva algo.", "error");
  } else {
    let entradaModal = document.querySelector('#todo')
    entradaModal.value = entrada.value
    modalDetails.style.display = "block"
  }
  entrada.value = ""
}

// Add task

const modalAddButton = document.querySelector('.modal__details-btn')

modalAddButton.onclick = function(e) {
  e.preventDefault();
  let taskNome = document.querySelector('#todo')
  let taskData = document.querySelector('#time')
  let taskFriend = document.querySelector('#friend')

  if((taskNome.value).length === 0) {
    swal("Digite algo!", "Para conseguirmos seguir, é necessário adicionar uma task.", "error");
  } else {
    let task = new CriadorObjeto(taskNome.value, taskData.value, taskFriend.value)
    controleLocalStorage(task)
    modalDetails.style.display = "none"
  }
  taskNome.value = ""
  taskData.value = ""
  taskFriend.value = ""
}

// OBJECT CONSTRUCTOR

class CriadorObjeto {
  constructor(taskName, taskData, taskFriend) {
    this.id = Date.now(),
    this.task = taskName,
    this.data = taskData,
    this.friend = taskFriend,
    this.hide = false
  }
}

// SWIPER ELEMENTS CONSTRUCTOR

function CriadorMiniBox(entrada) {
  if (entrada.hide === false) {
    mySwiper.appendSlide(`<div class="swiper-slide" id="${entrada.id}"> <div class="swiper__mini-box"> <p class="mini-box__text">${entrada.task}</p> <button class="mini-box__button">Click for details</button> </div> </div>`)

    const elementos = document.querySelectorAll('.swiper-slide')
    elementos.forEach(elemento => elemento.addEventListener('click', detailsTask)
    ) 
  }
}

function CriadorMiniBoxStorage(entrada) {
  entrada.forEach(elemento => CriadorMiniBox(elemento))
}

/*
DETAILS TASK MODAL
*/

const modalVisualizadorTask = document.querySelector('.modal__details-open-container')

function detailsTask(e) {
let acessandoCofreTasks = localStorage.getItem('cofreTarefas')
let convertendoTasks = JSON.parse(acessandoCofreTasks)
let elementoPai = e.target.closest('div .swiper-slide')
let idSwiperElemento = elementoPai.id
idSwiperElemento = Number(idSwiperElemento)

for(let i = 0; i < convertendoTasks.length; i++) {
 if (convertendoTasks[i].id === idSwiperElemento) {
    let task = convertendoTasks[i]
   
    const showTaskName = document.querySelector('.task-name')
    const showTaskData = document.querySelector('.task-data')
    const showTaskFriend = document.querySelector('.task-friend')

    showTaskName.innerText = task.task
    showTaskData.innerText = task.data
    showTaskFriend.innerText = task.friend

    modalVisualizadorTask.style.display = "block"

    const excluirBtn = document.querySelector('.modal__details-excluir-btn')
    excluirBtn.addEventListener('click', function() {
      modalVisualizadorTask.style.display = "none";

      excluirTask(convertendoTasks, task, elementoPai)
      showTaskData.value = ""
      showTaskFriend.value = ""
    })
  }
  
}
}

// Botao excluir - modal

function excluirTask(storage, task, e) {
  task.hide = true;
  e.style.display = "none"
  localStorage.setItem('cofreTarefas', JSON.stringify(storage))
}

// Botao fechar - modal

let modalClose = document.querySelector('.close-btn')

modalClose.addEventListener('click', function(e) {
  console.log(e)
  const showTaskFriend = document.querySelector('.task-friend')
  const showTaskData = document.querySelector('.task-data')

  modalVisualizadorTask.style.display = "none"
  showTaskData.value = ""
  showTaskFriend.value = ""
})

// Botao limpar

const limpatBtn = document.querySelector('.limpar-btn')

limpatBtn.onclick = function() {
localStorage.clear('cofreTarefas')
window.location.reload()
}
