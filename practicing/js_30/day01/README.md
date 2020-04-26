<style>
img{
	border: 5px solid #eaa;
}
</style>
###### tags: js30

# JavaScript 30 Day01
[toc]

[keycodes](https://keycode.info/)
```javascript=
  window.addEventListener('keydown', function name(e) {
    console.log(e.keyCode)
  });
```
這是在監聽window應該是視窗事件
fc中的e表示event，是視窗發生事件後會回傳的東西
用`console.log(e)`，就會看到，當按下鍵盤，會印出event，看起來是一個object
![](https://i.imgur.com/etpy3wL.png)
`console.log(e.keyCode)` 就能印出key對應的號碼
![](https://i.imgur.com/juFHMmk.png)
把聲音讀入
data-key - 待查
```htmlmixed=
  <audio data-key="65" src="sounds/clap.wav"></audio>
  <audio data-key="83" src="sounds/hihat.wav"></audio>
  <audio data-key="68" src="sounds/kick.wav"></audio>
  <audio data-key="70" src="sounds/openhat.wav"></audio>
  <audio data-key="71" src="sounds/boom.wav"></audio>
  <audio data-key="72" src="sounds/ride.wav"></audio>
  <audio data-key="74" src="sounds/snare.wav"></audio>
  <audio data-key="75" src="sounds/tom.wav"></audio>
  <audio data-key="76" src="sounds/tink.wav"></audio>
```
document - 待查
querySelector - 待查
```javascript=
  window.addEventListener('keydown', function name(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);//選取標籤audio，屬性為data-key="${e.keyCode}"
    console.log(audio)//印出結果，確認有選到對的el
  });
```

![](https://i.imgur.com/OOcQKH0.png)

```javascript=
  window.addEventListener('keydown', function name(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    console.log(audio);
    if (!audio) return ;//stop the function from running all together
    audio.currentTime = 0; //rewind to the start 
    audio.play();//播放音效
});
```
`if (!audio) return` 不知道幹嘛用?按了其他案件會回傳null，所以加了這行，但還是會null

`audio.currentTime = 0;` 當音效播放中，再按key會無法撥放，因為js覺得你已經在播，就無法做到連續撥放效果，要把currentTime設為零，就可以連續按+撥放

加入這兩行，確認有抓到想要的div
```javascript=
const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
console.log(key);
```
![](https://i.imgur.com/Cfrq5pA.png)

加入playing class 增加效果
```javascript=
key.classList.add('playing');
```
![](https://i.imgur.com/eyFQCoe.png)

選到所有.key物件
```javascript=
 const keys = document.querySelectorAll('.key');
```
![](https://i.imgur.com/OIzda4A.png)

上一步傳會array，用forEach轉出來，每個個別監聽，當transitionend，移除
```javascript=
  const keys = document.querySelectorAll('.key');
  keys.forEach(key => key.addEventListener('transitionend', removeTransition
  ));//('事件', fuction)
```
寫removeTransition，用consle.log看看會印出什麼
```javascript=
  function removeTransition(e) {
    console.log(e);
  }
```
結果印出一堆(因為這個物件身上有一堆屬性都有transition，所以都被監並印出來)
![](https://i.imgur.com/nY3uoBR.png)

但是我們在意的只有transform(就是按鈕黃框被觸發後不會自動消失)

所以我們只要監聽transform就好
```javascript=
  function removeTransition(e) {
    if(e.propertyName !== 'transform') return; //skip it if it's not a transform
  }
```

這時，當transform撥放完畢後，你就可以選到這個物件
![](https://i.imgur.com/vjoyBfP.png)

當物件transition撥放完，就remove class
```javascript=
  function removeTransition(e) {
    if (e.propertyName !== 'transform') return; //skip it if it's not a transform
    this.classList.remove('playing');
  };
```
`.classList` 把class叫出來，並可以對其進行操作(add/remove/toggle...etc)

整理程式碼
把撥放音樂的code獨立出來做一個function
把window事件監聽丟到最下面，並把觸發的function 指定為 playSound
```javascript=
  function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    // console.log(audio);
    if (!audio) return ;//stop the function from running all together
    audio.currentTime = 0; //rewind to the start 
    audio.play();
    // console.log(key);;
    key.classList.add('playing'); 
  };

  function removeTransition(e) {
    if (e.propertyName !== 'transform') return; //skip it if it's not a transform
    // console.log(this.classList);
    this.classList.remove('playing');
  };

  const keys = document.querySelectorAll('.key');
  keys.forEach(key => key.addEventListener('transitionend', removeTransition
  ));

  window.addEventListener('keydown', playSound);
```