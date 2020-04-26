<style>
img{
	border: 5px solid #eaa;
}
</style>
###### tags: js30
# JavaScript 30 Day04
[toc]
## Day04
Array map() reduce() filter() sort() 操作示範

素材：
```htmlmixed=
    const inventors = [
      { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
      { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
      { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
      { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
      { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
      { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
      { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
      { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
      { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
      { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
      { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
      { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
    ];

    const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];
```
題目：
```
// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
(篩選出生於1500-1599的人)
```
### `filter()` 
- 需要傳入function，並回傳boolean，當回傳true，會保留值
- 對原陣列篩選，回傳原陣列的一部分
```javascript=
const fifteen = inventors.filter(function (inventor) {
  if (inventor.year >= 1500 && inventor.year <=1599){
    return true; //keep it!
  };
})
console.log(fifteen);
```
![](https://i.imgur.com/1fr3dof.png)

小技巧，用`consolt.table()`可以印出表格
```javascript=
console.table(fifteen);
```
![](https://i.imgur.com/Sbi6k5N.png)

可以寫成arrow function
```javascript=
const fifteen = inventors.filter(inventor => {
  if (inventor.year >= 1500 && inventor.year <=1599){
    return true; //keep it!
  };
})
console.table(fifteen);
```
因為只有一行判斷是，且只需要回傳true，所以可以寫成一行
```javascript=
const fifteen = inventors.filter(inventor => (inventor.year >= 1500 && inventor.year <= 1599))
console.table(fifteen);
```

### `map()`
- 對陣列中所有el加工，回傳同一個陣列（加工後結果）
```
// Array.prototype.map()
// 2. Give us an array of the inventors first and last names
```

```javascript=
/* 寫法一 */
const fullName = inventors.map(inventor => inventor.first + ' ' + inventor.last );
/* 寫法二 */
const fullName = inventors.map(inventor => `${inventor.first} ${inventor.last}`);
console.log(fullName);
```

### `sort()`
:::warning
不太懂原理
:::
```
// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
```
```javascript=
const ordered = inventors.sort(function (a, b) {
  
});
```
`a` = firstPerson `b` = secondPerson

```javascript=
const ordered = inventors.sort(function (a, b) {
  if (a.year > b.year){
    return 1;
  } else {
    return -1;
  }
});
console.table(ordered);
```

三元運算子
```javascript=
const ordered = inventors.sort((a, b) => a.year > b.year ? 1 : -1);
```
![](https://i.imgur.com/AoLfEAu.png)

### `reduce()`
- 將array中所有的值加總並回傳
```
// Array.prototype.reduce()
// 4. How many years did all the inventors live all together?
```

```javascript=
const totalYears = inventors.reduce((total, inventor) => {
  return total + (inventor.passed - inventor.year)
});
console.log(totalYears);
```
reduce((a, b) ... )
`a` 最後的回傳值（若陣列尚未結束，會接收上一輪的回傳值）
`b` b每一次要累加的值（參數）

問題：會印出奇怪的數字（因為一開始total沒有給預設值）
![](https://i.imgur.com/NigrrE4.png)

給total一個預設值 0 就可以得出合理的數字
```javascript=
const totalYears = inventors.reduce((total, inventor) => {
  return total + (inventor.passed - inventor.year)
}, 0);
```
![](https://i.imgur.com/dFNPrYH.png)


### `sort()`中階（當傳入資料非為數字，需進行提取比較）
```
// 5. Sort the inventors by years lived
```
```javascript=
const oldest = inventors.sort(function(a, b){
  const lastGuy = a.passed - a.year;
  const nextGuy = b.passed - b.year;
  return lastGuy > nextGuy ? -1 : 1;
});
console.table(oldest);
```
![](https://i.imgur.com/9omWdGd.png)

### 抓取網頁中的元素並篩選
```
// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
```
先找到網頁中想選取的元素，是用什麼包起來
![](https://i.imgur.com/OFnw386.png)

選取
```javascript=
const category = document.querySelector('.mw-category')
```
![](https://i.imgur.com/KBMrBFf.png)

抓出所有的`<a>`
```javascript=
const category = document.querySelector('.mw-category');
const links = category.querySelectorAll('a');
```
![](https://i.imgur.com/37DbTqF.png)

這行效果同上
```javascript=
const category = document.querySelectorAll('.mw-category a');
```
![](https://i.imgur.com/sZD4Mbj.png)

這行的目的，是想要選到`a`中的文字內容
```javascript=
const deSelctor = links.map(link => link.textContent);
```
出錯了！？因為querySelector 回傳的NodeList ==不是一個陣列==，無法用`.map()`
![](https://i.imgur.com/1FhTuT8.png)

因此要先把前一步的結果轉成Array
```javascript=
/* 寫法一 */
const links = Array.from(category.querySelectorAll('a'));

/* 寫法二(ES6) */
const links = [...category.querySelectorAll('a')];
```
![](https://i.imgur.com/JbgWjVW.png)

加入`filter()`過濾出`includes()`包含特定文字的內容
```javascript=
const category = document.querySelector('.mw-category');
const links = Array.from(category.querySelectorAll('a'));
const deSelector = links
                    .map(link => link.textContent)
                    .filter(streetName => streetName.includes('de'));
```
過濾出包含`de` 字元的地址
![](https://i.imgur.com/Qcel9DB.png)

### 陣列.sort()
```
// 7. sort Exercise
// Sort the people alphabetically by last name
```
```javascript=
const alpha = people.sort(function(lastOne, nextOne){
  console.log(lastOne);
});
```
![](https://i.imgur.com/igAqqZc.png)

`.split()`將字串轉成陣列
```javascript=
const alpha = people.sort(function(lastOne, nextOne){
  const parts = lastOne.split(', ');
  console.log(parts);
});
```
![](https://i.imgur.com/xmSprZA.png)

這一步有點妙，不是太清楚，他將split的結果，分別對應到放在陣列中的last/first，這樣就可以個別印出值。
```javascript=
const alpha = people.sort(function(lastOne, nextOne){
  const [last, first] = lastOne.split(', ');
  console.log(last, first);
});
```
![](https://i.imgur.com/66bLPJC.png)

同樣的法把nextOne也split，接著就可以回傳比較結果
```javascript=
const alpha = people.sort(function(lastOne, nextOne){
  const [aLast, aFirst] = lastOne.split(', ');
  const [bLast, bFirst] = nextOne.split(', ');
  return aLast > bLast ? 1 : -1 ;
});
console.log(alpha);
```
![](https://i.imgur.com/HosKrBV.png)


### 查找陣列中重複的值，並計算重複次數
```
// 8. Reduce Exercise
// Sum up the instances of each of these
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];
```

```javascript=
 const transportation = data.reduce((obj, item) => {
    console.log(item);
  }, {})
```
function後的`{}`是reduce一開始會丟盡obj的東西，因為最後的結果想要是個object，所以一開始先給空的object

正常來說，會在最後的obj中放:
car: 0;
truck: 0;
先把key/value準備好，但這個寫法在此例中太多要羅列
所以改用以下寫法：
```javascript=
  const transportation = data.reduce((obj, item) => {
    if (!obj[item]){ //如果沒有這個key value pair
      obj[item] = 0; //做一個 kvp給它
    }
    obj[item]++; // 如果有，value + 1
    return obj; //回傳整個obj
  }, {});
  console.log(transportation);
```

結果就會得到一個object，裡面是每一個字詞出現的數量
![](https://i.imgur.com/27CVMrb.png)