$(document).ready(function(){
  $('.btn-add').on('click', function(){
    event.stopPropagation();
    event.preventDefault();
    var path = $("#input_img").val();
    var n = Math.floor(Math.random()*50) + 1
    if (path.includes('?random=')) {
      $('#pic-box').append(`<img src="${path}${n}" alt="" class="w-50 img-o p-2">`).fadeIn()
    } else {
      $('#pic-box').append(`<img src="${path}" alt="" class="w-50 img-o p-2">`).fadeIn()
    }
  })
  $('.btn-rm').on('click', function(){
    event.stopPropagation();
    event.preventDefault();
    $('img').remove()
  })
})
