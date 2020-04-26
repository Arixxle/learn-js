<style>
img{
	border: 5px solid #eaa;
}
</style>
###### tags: js30
# JavaScript 30 Day05
[toc]

## Day05
先將原本上下堆疊的畫面改為flex，變成並排
```css=
    .panels {
      min-height: 100vh;
      overflow: hidden;
      display: flex;
    }
```
![](https://i.imgur.com/5iJaDN5.jpg)

把每個flex內的子div都加`flex:1;`
這會讓flex物件各自分配1等分的空間，達到均分效果
```css=
    .panel {
      flex: 1;
    }
```
![](https://i.imgur.com/v1uNNXW.jpg)

把panel下所有物件加outline，標示物件關係，方便排版
```css=
    .panel > * {
      outline: 1px solid red;
    }
```
![](https://i.imgur.com/ToWbMCd.jpg)

`display: flex;`
為什麼加flex，會讓裡面的p直接變成並排物件？而且垂直置中？
![](https://i.imgur.com/hewwJq0.jpg)

改變軸線，置中排列
```css=
      flex-direction: column;
      justify-content: center;
      align-items: center;
```
![](https://i.imgur.com/WQDhDMI.jpg)


```css=
    .panel > * {
      flex: 1 0 auto;
    }
```
![](https://i.imgur.com/k3MrY7Q.png)
![](https://i.imgur.com/O2F3lbg.jpg =300x)
```css=
    .panel > * {
      flex: 1 0 auto;
      display: flex;
    }
```
![](https://i.imgur.com/xN44vbs.jpg =300x)
```css=
    .panel > * {
      flex: 1 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
```
![](https://i.imgur.com/aQyAQwB.jpg =300x)

將上下的物件，用transision的方式藏起來
```css=
    .panel > *:first-child{
      transform: translateY(-100%);
    }
    .panel > *:last-child{
      transform: translateY(100%);
    }
```
![](https://i.imgur.com/8Xt1zIo.jpg =300x)

準備一個`.open-active` class ，等等要用來控制物件
```css=
.panel.open-active > *:first-child{ transform: translateY(0); }
.panel.open-active > *:last-child{ transform: translateY(0); }
```
準備`.open`，控制當open時，左右寬度變大
（加flex:5;）- flex-grow

```css=
    .panel.open {
      flex: 5;
      font-size: 40px;
    }
```

製作控制CSS的JS
```javascript=
  <script>
    const panels = document.querySelectorAll('.panel');
    /*把所有panel選起來，指定給一個變數*/
    
    function toggleOpen() {
      this.classList.toggle('open');
    }
    /* 做一個fuction，可以toggle class 'open'*/
    
    panels.forEach(panel => panel.addEventListener('click',toggleOpen));
    /* 把panels中每個panel轉出來監聽，聽'click'，若有就執行toggleOpen */
  </script>
```
點擊就會播放拉寬的動畫
![](https://i.imgur.com/aYJXckq.jpg)

會有動畫效果是因為作者預先在panel寫了以下段CSS
```css=
      transition:
        font-size 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
        flex 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
        background 0.2s;
```

下一步想做：展開後，上下方的物件`p`會滑入，先針對panel監聽，聽什麼時間transition會結束，然後執行toggleActive
```javascript=
panels.forEach(panel => panel.addEventListener('transitionend',toggleActive));
```

定義function toggleActive
印出e的屬性名稱看看會抓到什麼
```javascript=
    function toggleActive(e) {
      console.log(e.propertyName);
    }
```
可以看到，e有transitionend的，有flex-grow & font-size
![](https://i.imgur.com/umQfJe4.png)

判斷，如果e.propertyName包含'flex'，則把這個物件，toggle class 'open-active'
```javascript=
    function toggleActive(e) {
      if(e.propertyName.includes('flex')){
        this.classList.toggle('open-active');
      }
    }
```