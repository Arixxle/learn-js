const RNADOM_QUOTE_API_URL = 'https://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

/* 監聽input中的改變 */ 
// quoteInputElement.addEventListener('input', () => {
//   console.log('changed');
// })




/* 比對input內的文字，來標注正確與錯誤提示 */ 
quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span');
  const arrayValue = quoteInputElement.value.split('')
  const inputIndex = quoteInputElement.value.length
  // console.log(inputIndex)
  // console.log(arrayQuote[inputIndex])

  
  // console.log(arrayQuote[1]);
  let correct = true
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index] //這段不懂 index? 
    // characterSpan.classList.add('selected')
    if (character == null){
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      arrayQuote[inputIndex].classList.add('selected')
      arrayQuote[inputIndex + 1 ].classList.remove('selected')
      arrayQuote[inputIndex - 1 ].classList.remove('selected')
      correct = false
    } else if (character === characterSpan.innerText){
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')    
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
    }
  })
  if (correct) renderNextQuote()
})


function getRandomQuote() {
  return  fetch(RNADOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

/* 下面這段可以在console中印出抓到的api content內容 */ 
// async function getNextQuote() {
//   const quote = await getRandomQuote()
//   console.log(quote);
// }
// getNextQuote()

/* 把quote內容文字一個一個分開，加上span塞回畫面中 */ 
async function renderNextQuote() {
  const quote = await getRandomQuote()
  quoteDisplayElement.innerHTML = ''
  //將quote內容逐字分開
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span');
    // characterSpan.classList.add('selected')
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null
  startTimer()
}

let startTime
function startTimer() {
  timerElement.innerText = '0'
  startTime = new Date() //這會把時間設為current time


  setInterval(() => { //不太明白setInterval原理
    timerElement.innerText = getTimerTime()
    // timer.innerText = getTimerTime() //為什麼這行timer也抓得到timerElement?
  }, 1000)

  /* 可以用監聽來做觸發，但時間不對，雖然沒觸發可是時間已經開始跑 */
  // quoteInputElement.addEventListener('input', () => {
  //   setInterval(() => {
  //     timerElement.innerText = getTimerTime()
  //   }, 1000)
  // })
}

function getTimerTime() {
 return Math.floor((new Date() - startTime) / 1000)
}

function playSound(e) {
  const sound = document.getElementById('keyboard-sound')
  // if (!sound) return ;//stop the function from running all together
  sound.currentTime = 0; //rewind to the start 
  sound.play();
}


renderNextQuote()
window.addEventListener('keydown', playSound);