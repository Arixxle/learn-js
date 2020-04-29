











// 這是答案不要看

// let btn = document.querySelector('.btn')

// btn.addEventListener("click", function(e){
//   e.target.classList.toggle("is-active")
// }, false)



// ==== 事件補充 ====
// e.target 是指，發起事件的那位
// e.currentTarget 是目前正在觸發事件的那位 （有可能透過捕捉或冒泡觸發）
// this 代表 currentTarget ( 但是要小心用 arrow function )

// let btn = document.querySelector('.btn')

// let delBtn = document.querySelector('span')

// btn.addEventListener("click", function(e){
//   console.log('father target', e.target)
//   console.log('father currentTarget', e.currentTarget)
// }, false)

// delBtn.addEventListener("click", function(e){
//   console.log('child target', e.target)
//   console.log('child currentTarget', e.currentTarget)
//   // e.stopPropagation()
// }, false)
