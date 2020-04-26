<style>
img{
	border: 5px solid #eaa;
}
</style>
###### tags: js30
# JavaScript 30 Day03
[toc]
## Day03
CSS中寫變數＋給初始值的方法
```css=
  :root{
    --base: #fab;
    --spacting: 10px;
    --blur: 10px;
  }

  img{
    padding: var(--spacting);
    background: var(--base);
    filter: blur(var(--blur));
  }

  .hl{
    color: var(--base);
  }
```
選到class-contorls & tag - input
```javascript=
const inputs = document.querySelectorAll('.controls input');
```
在console中 proto可以看到可用的方法
![](https://i.imgur.com/yrvkvoM.png)

如果做一個陣列，就可以看到有許多方法
![](https://i.imgur.com/agwPimI.png)

由此可知，用`document.querySelectorAll` 選到的不是Array

定義一個方法，可以印出本身的值
並且把選到的物件用forEach轉出來，各自監聽，當change，執行handleUpdate
```javascript=
    function handleUpdate() {
      console.log(this.value);
    }

    inputs.forEach(input => input.addEventListener('change', handleUpdate));
```
當改變頁面拉霸時，就會看到印出值
![](https://i.imgur.com/ZQLuoPl.png)

這行可以監聽整個滑鼠移動的值
```javascript=
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
```

`dataset`會監聽html中所有用data-開頭的屬性，並回傳值
（data-是可以自由命名定義的 e.g data-name, data-cool）
![](https://i.imgur.com/diyHSxk.png)
此例是監聽data-sizing，這應該是因為，作者要改變css的變數中，有一些值必須帶單位，但是單位不能隨著拉霸變動，所以要獨立出來，方便後面取值
![](https://i.imgur.com/MUwgCHO.png)

這段看起來是把後綴抓出來
```javascript=
const suffix = this.dataset.sizing || '';
```
![](https://i.imgur.com/zXoSePS.png)


這段，他為了要能選到:root中的變數名稱，所以故意在input中寫個name，很聰明的寫法

![](https://i.imgur.com/jiNyTiz.png)

用這行就可以抓到name中的值
```javascript=
console.log(this.name);
```
![](https://i.imgur.com/PCQyxyg.png)

控制css variable的變化
```javascript=
document.documentElement.style.setProperty(`--${this.name}`,this.value + suffix);
```
`document`整份文件
`.documentElement`文件中所有元件(whole html)
`style` style？
`setProperty` 設定屬性
會在html標籤中增加一個style inline屬性，就可以控制全站的css variable
![](https://i.imgur.com/40x8ylV.png)