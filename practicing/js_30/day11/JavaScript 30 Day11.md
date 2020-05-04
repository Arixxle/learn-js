<style>
img{
	border: 5px solid #eaa;
}
</style>
###### tags: js30
# JavaScript 30 Day11
[toc]
## 選取物件
事前準備，先將所有會用到的東西選起來
```javascript=
/* Get our elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
```

## 定義控制影片play的開關
```javascript=
/* Build out functions */
function togglePlay() {
  if (video.paused){
  //paused 是影片標籤自帶的屬性
    video.play();
  } else {
    video.pause();
  }
  //play() pause() 是影片標籤的方法
}
```

也可以寫成這樣
```javascript=
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
	//定義一個會回傳字串的三元運算子
  video[method]();
  //讓video執行，不過這個原理是什麼不太清楚，有點玄妙
}
```
## 綁定play事件
針對影片div 還有撥放按鈕綁(hook up)事件
```javascript=
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
```

## play按鈕的paly / pause 切換
```javascript=
//先監聽video的狀態
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
//判斷影片狀態，如果是暫停中，就顯示'▶'，如果是撥放中，就顯示'❙❙'
function updateButton() {
  const icon = this.paused ? '▶' : '❙❙';
  toggle.textContent = icon;
}
```

## 快進/快退
![](https://i.imgur.com/0D1MbZp.png)

針對每一個快轉按鈕監聽
```javascript=
skipButtons.forEach( button => { 
  button.addEventListener('click', skipButton);
});
```
如果html 有`data-`這樣的屬性，那JS就可以用`dataset`抓到這個屬性
```javascript=
function skipButton() {
  console.log(this.dataset)
}
```
![](https://i.imgur.com/PX8JETo.png)

```javascript=
function skipButton() {
  console.log(this.dataset.skip);//這裡可以印出data-skip 的值
  video.currentTime += parseFloat(this.dataset.skip);
//因為this.dataset.skip回傳是字串，用parseFloat轉成數字就可以運算
}
```
video.currentTime - 待查，應該是video特有的屬性

## 音量與撥放速度
對range進行監聽，並把值印出
```javascript=
ranges.forEach(range => range.addEventListener('change', handleRangUpdate));
//這行是只有當值改變時才會起作用
ranges.forEach(range => range.addEventListener('mousemove', handleRangUpdate));
//另外再監聽mousemove，目的是讓拖拉range時就會改變值，直接對影片有影響。

function handleRangUpdate() {
  video[this.name] = this.value;
/*上面這行，會根據監聽事件，產出以下兩行
  video[playbackRange] = n
  video[volume] = n
	為了達成這個效果，html tag在命名時，
	就要刻意取跟video屬性相同的名稱
*/
}
```
![](https://i.imgur.com/sOLTLFv.png)

## progressbar
### 跟隨進度填色
![](https://i.imgur.com/Jx5Swl3.png)
```javascript=
function handleProgress(){
  const percent = (video.currentTime / video.duration) * 100;
  //currentTime duration 都是影片的屬性
	progressBar.style.flexBasis = `${percent}%`;
//flexBasis <- 是css中的一個屬性
}

video.addEventListener('timeupdate', handleProgress);
//監聽影片的timeupdate，當有變化就執行handleProgress
```

### 點選改變進度
![](https://i.imgur.com/0lCT9zO.png)
原理:通過計算寬度的百分比，來對應影片的時間

```javascript=
function scrub(e) {
  console.log(e);
}
progress.addEventListener('click', scrub);
```
監聽progress，並把event印出來看看，這中間有個屬性offsetX可以用，他會顯示你點擊的x位置
![](https://i.imgur.com/ZgzQNoB.png)
```javascript=
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
```
`.offsetX` / `.offsetWidth` - 待查

### 拖拉progressbar改變影片進度
```javascript=
progress.addEventListener('click', scrub);
//這行只有監聽click，所以只能點擊才有作用
```
要達到拖拉就能觸發的效果，需要結合mousemove+mousedown
```javascript=
let mousedown = false;
//做一個開關
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
//監聽，當mousedown/mouseup時改變狀態
progress.addEventListener('mousemove', (e) => {
  if (mousedown) {
    scrub(e);
  }
});
//當mousemove時，判斷現在滑鼠狀態，如果是mousedown就執行scrub()
```

```javascript=
progress.addEventListener('mousemove', (e) => {
  if (mousedown) {
    scrub(e);
  }
});
//上面這行還可以簡化如下
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
```