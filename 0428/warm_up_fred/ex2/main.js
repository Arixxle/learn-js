// todo: 
//   當按下 submit 以後，請取得 form 表單內的值並且包裝成一個 object
//   {
//     userName: 'userName',
//     email: 'youremail@email.com',
//     password: 'your password',
//     agree: true
//   }
//   並且使用 console.log 印出結果





// 這是答案不要看 1

// let form = document.forms[0]

// form.addEventListener("submit", function(e){
//   e.preventDefault();
//   let userName = document.querySelector("input[name=userName]").value
//   let email = document.querySelector("input[name=email]").value
//   let password = document.querySelector("input[name=password]")
//   let agree = document.querySelector("input[name=agree]").checked

//   console.log(
//     {
//       userName: userName,
//       email: email,
//       password: password,
//       agree: agree
//     }
//   )
// })


// // 答案 2
// let form = document.forms[0]

// form.addEventListener("submit", function(e){
//   e.preventDefault();

//   console.log(
//     {
//       userName: form.elements["userName"].value,
//       email: form.elements["email"].value,
//       password: form.elements["password"].value,
//       agree: form.elements["agree"].checked
//     }
//   )
// })
