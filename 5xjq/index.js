$(document).ready(function () {
  $('#btn').on('click',function(){
    // $('h1').toggle('slow')
    // $('h1').toggleClass('hide')
    $('h1').toggleClass('large')

  })

  let counter = 0;
  $('#addItem').on('click', function(){
    $('#container').append(`<li class='item'>Item${counter}</li>`)
    counter++
  })

  // $('.item').on('click', function(){
  //   console.log('item clicked')
  // })元素上不存在，會綁不到事件

  $('#container').on('click', '.item', function() {
    $(this).toggleClass('large')
  })

  // let counter = 0;
  // $('#addItem').on('click', function() {
  //   $('#container').append(`<li>Item${counter}</li>`)
  //   counter++
  // })

  // $('h1').on('mouseover',function(){
  //   for (let i = 0; i < 5; i++) {
  //     alert('booom!!')      
  //   }
  // })

  
  // 這裡可以加其他事件

})