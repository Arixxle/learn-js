<style>
img{
	border: 5px solid #eaa;
}
</style>
###### tags: js30
# JavaScript 30 Day06
[toc]
# Day06
```javascript=
const cities = [];//等一下要製作城市list先給一個空array

const prom = fetch(endpoint)//new fetch 方法//回傳一個promise物件
console.log(prom);
```
![](https://i.imgur.com/7fKfIdE.png)

可以用then，給一個變數，印出來看看
```javascript=
fetch(endpoint).then(blob => console.log(blob))
```
會發現這跟我們想像的不一樣，並不是一包資料，原因是JS不知道你傳的檔案是什麼格式
![](https://i.imgur.com/6qxgrTR.png)

這個回傳物件身上會有一個json方法可以用
![](https://i.imgur.com/Eg8I5x7.png)

`blob.json()`會回傳另一個promise物件，所以可以繼續.then
```javascript=
fetch(endpoint).then(blob => blob.json())
```
這樣抓回來的就會是一包資料了
```javascript=
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => console.log(data))
```
![](https://i.imgur.com/OeNUsdT.png)

或許你會想既然我有資料了，就直接指定給cities這個空陣列
```javascript=
.then(data => cities = data)
```
出錯，原因是我們用const宣告，就不能再被修改，如果改成let，就會過
![](https://i.imgur.com/Q44rf8r.png)

可是有可能我們還是想保證這個變數不會被隨意修改，你可以這樣做
```javascript=
.then(data => cities.push(data))
```
雖然有東西了，但好像怪怪的，是兩層array
![](https://i.imgur.com/VuFhhSQ.png)

可以在data前加 `...` 可以spread再push
```javascript=
.then(data => cities.push(...data))
```
`...`ES6 語法 `展開` [參考](https://medium.com/%E4%B8%80%E5%80%8B%E5%B0%8F%E5%B0%8F%E5%B7%A5%E7%A8%8B%E5%B8%AB%E7%9A%84%E9%9A%A8%E6%89%8B%E7%AD%86%E8%A8%98/javascript-es6-spread-syntax-%E5%B1%95%E9%96%8B%E8%AA%9E%E6%B3%95-e95f8ea66aa1)


做一個可以過濾選項的篩選器
```javascript=
function findMatches(wordToMatch, cities){
  return cities.filter(place => {
    //here we need to figure out if the city on state matckes what was searched
    return palce.city.match()//.match方法必須用到正規表達式
  });
}
```
通常來說你可以`.match(/要搜尋的字/i)`（小括號內是正規表達式）
但這裡我們要搜尋的不是一個固定字，是變數
wordToMatch塞進去`.match(/wordToMatch/i)`
但問題是，正規表達式會把wordToMatch判定為一個你要找的字，那麼要怎麼在正規表達式中帶入變數呢？

```javascript=
function findMatches(wordToMatch, cities){
  return cities.filter(place => {
    //here we need to figure out if the city on state matckes what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    //g -> global 代表會從字串中找到指定字 
    //i -> insensitive(不敏感) 好像是說可以找到小寫？
    return place.city.match(regex) || place.state.match(regex)
    //回傳 city or state 中符合的
  });
}
```
在console中實驗一下，從`cities`中搜尋`'Bos'`，可以順利得出結果
![](https://i.imgur.com/9fw2x0a.png)

製作控制顯示的function
```javascript=
function displayMatches() {
  console.log(this.value);
}
//選取.search
const searchInput = document.querySelector('.search');
//選取.suggestion
const suggestions = document.querySelectorAll('.suggestions');

searchInput.addEventListener('change', displayMatches)
```
再輸入框輸入，並點選一下旁邊畫面(確認change)，console就可以監聽並印出字樣
![](https://i.imgur.com/owTCYuX.png)

改成keyup就可以監聽，當鍵盤回彈，就會觸發函式
```javascript=
searchInput.addEventListener('keyup', displayMatches)
```

接著就可以在dispayMatches中呼叫finMatches並把輸入框的值傳進去做filter
```javascript=
function displayMatches() {
  const matchArray = findMatches(this.value, cities)
  console.log(matchArray);
}
```

```javascript=
function displayMatches() {
  const matchArray = findMatches(this.value, cities)
  //把每個轉出來的物件用.join變成一段html文字，塞給html變數
  const html = matchArray.map(place => {
    return `
      <li>
        <span class="name">${place.city}, ${place.state}</span>
        <span class="population">${place.population}</span>
      </li>
    `;
  }).join('');
  //把suggestions這個物件的內容改成上面的html變數，就可以把轉出來的值塞到畫面中
  suggestions.innerHTML = html;
}
```
完成上面這段，就可以在畫面的輸入框中，打字，出現搜尋結果了

```javascript=
//加入表達事進行搜尋
  const regex = new RegExp(this.value, 'gi')
//把搜尋框的值，用class-hl上色，並取代
const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
  const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${place.population}</span>
      </li>
    `;
  }).join('');
```

這行是幫數字加逗號
```javascript=
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//記得替換一下回傳內容，把加逗號的function帶入
<span class="population">${numberWithCommas(place.population)}</span>
```