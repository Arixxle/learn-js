<style>
img{
	border: 5px solid #eaa;
}
</style>
###### tags: js30
# JavaScript 30 Day02
[toc]
## Day02
旋轉控制
```css=
transform-origin: 50%;
```
預設是50%，意思就是在物件，由左到右的中間，如果設100%，就是物件的最右邊，0%就是物件的最左邊
![](https://i.imgur.com/ub9hkIh.png)

把指針調到12點鐘位置
```css=
transform: rotate(90deg);
```
加入動畫秒數，就能讓旋轉變得平滑
all-待查
```css=
transition: all .5s;
```
點小方框可以改變指針移動的特效
![](https://i.imgur.com/560aAnF.png)
![](https://i.imgur.com/RjgaHdx.png)

在開發者工具條好動畫效果，直接複製貼到css
```css=
transition-timing-function: cubic-bezier(0.37, 2.87, 0.58, 1);
```
下面的設定，會讓function每隔一段時間就印出hi(1秒 = 1000毫秒?)
```javascript=
    function setDate() {
      console.log('hi')
    }

    setInterval(setDate, 1000);//好像是設為毫秒，待查
```
抓出now的時間
再把now.getSeconds 指定給seconds
就會持續印出每一秒的累加
```javascript=
    function setDate() {
      const now = new Date();
      const seconds = now.getSeconds();
      console.log(seconds);
    }
```
![](https://i.imgur.com/CAVQGLY.png)

```javascript=
    const secondHand = document.querySelector('.second-hand')//選取想改變的物件

    function setDate() {
      const now = new Date();
      const seconds = now.getSeconds();
      const secondsDegrees = ((seconds / 60) * 360);//把秒數除60就可以得到百分比，再乘以360算出旋轉角度
      secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    };//改變transform角度
```
這裡藥補90是因為css預設開始值是90deg，所以要讓js控制的指針起始點跟css相同，秒數根指針才對得上
```javascript=
((seconds / 60) * 360 + 90);
```
到這邊算完成，但09:57講到一個問題，當指針走到12點鐘位置，其他指針會跟著一起閃動一下，不太確定原因是什麼-待查