/*
todo: 
  - 按下 click me 按鈕後，會在 #text-wrap 內貼上一個 Errr 的 div
   `<div id="text-wrap" class="wrap">
  <div class="err"> Errr * 1</div>
</div>` 
  - 其中 Errr * (counter) , counter 每按一次會增加
    所以會變成 
    Errr * 1   
    Errr * 2
    Errr * 3

*/



// // 這是答案不要看


// let btn = document.querySelector("button")
// let textWrap = document.querySelector("#text-wrap")
// let counter = 2
// btn.addEventListener("click", function(e){
//   textWrap.innerHTML += getTemplate(counter++)
// })

// function getTemplate(i){
//   return `
//     <div id="text-wrap" class="wrap">
//       <div class="err"> Errr * ${i}</div>
//     </div> 
//     `
// }
