<style>
img{
	border: 5px solid #eaa;
}
</style>
###### tags: js30
# JavaScript 30 Day08
[toc]
# Day08

```javascript=
先選取到HTML Canvas物件標籤
const canvas = document.querySelector('#draw');
// console.log(canvas)

Canvas的運作是靠context，先選取出來
const ctx = canvas.getContext('2d');
```
![](https://i.imgur.com/6sczOLV.png)

設定畫布的寬高，使與視窗大小相等
```javascript=
canvas.width = window.innerWidth
canvas.height = window.innerHeight
```
設置畫筆樣式
```javascript=
ctx.strokeStyle = '#BADA55'; //畫筆顏色
ctx.lineJoin = 'round'; //兩條線相交時的轉角類型
ctx.linCap = 'round';//起始與結束點的類型
```
準備一些後面會用到的控制變數
```javascript=
let isDrawing = false;//後面要做滑鼠點下才繪製會用到
let lastX = 0;//後面要用來記錄滑鼠起始/結束的位置點會用到
let lastY = 0;//後面要用來記錄滑鼠起始/結束的位置點會用到
```
測試滑鼠監聽是否正常
```javascript=
function draw(e) {
  console.log(e);
}
canvas.addEventListener('mousemove', draw);//要怎麼判定要監聽什麼?
```

設定當滑鼠點下時才觸發行為
```javascript=
function draw(e) {
  if (!isDrawing) return; //stop the fn from running when they are not moused
  console.log(e);
}
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
```
啟動繪製效果
```javascript=
function draw(e) {
  if (!isDrawing) return; //stop the fn from running when they are not moused
  // console.log(e);
  ctx.beginPath();//產生一個新路徑，產生後再使用繪圖指令來設定路徑。
  ctx.moveTo(lastX, lastY);//移動畫筆到指定的(x, y)座標點
  ctx.lineTo(e.offsetX, e.offsetY);//從目前繪圖點畫一條直線到指定的(x, y)座標點。
  ctx.stroke();//畫
}
```
![](https://i.imgur.com/fHgJhU8.png)

function draw 持續更新起始點/結束點座標
```javascript=
[lastX, lastY] = [e.offsetX, e.offsetY]
```
這樣就可以做出畫筆效果，但還是有一點問題，如果畫筆移動到其他地方開始，還是會抓到上次滑鼠結束點，而產生直線
![](https://i.imgur.com/5Tj0Xdd.png)

因此在滑鼠點下時也要更新座標
```javascript=
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true; //這裡不加分號會壞
  [lastX, lastY] = [e.offsetX, e.offsetY]
});

/* 改變畫筆粗細 */
ctx.lineWidth = 50;
```
![](https://i.imgur.com/1QH6Byk.png)

hsl光譜，h從0-360剛好會跑一圈
![](https://i.imgur.com/dSDJbae.png)
![](https://i.imgur.com/JYyuuEf.png)

```javascript=
let hue = 0;//色相
/* 設定畫筆初始顏色 */
function draw(e) {
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

/* at the end */
hue++;//遞增色相值
  if (hue >= 360) {
    hue = 0;
  }//超過360歸零，不歸零也沒差，就是hue的數字會一直往上加
}
```
![](https://i.imgur.com/oOeMdQx.png)

```javascript=
//做一個軸向判定
let direction = true;

function draw(e) {
//當軸向大於或小於某個值，進行翻轉
if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction
  }

//透過兩個軸向，做漸變放大，或漸變縮小
if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--; 
  }
}
```
![](https://i.imgur.com/359jFbh.png)

也有控制疊加屬性的選項
```javascript=
ctx.globalCompositeOperation = 'multiply';
```
![](https://i.imgur.com/KemKn8L.png)
[詳細參考](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)