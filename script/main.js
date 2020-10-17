const preventDefaultButtons = $('button')
preventDefaultButtons.click(function(e){
  e.preventDefault();
})


const modalLoadButton = $('.modal__load-btn')
const modalLoadContainer = $('.modal__load-container')



modalLoadButton.click(function(){
    modalLoadContainer.hide("slow")
  
})