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


  



})








