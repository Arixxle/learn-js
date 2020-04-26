<style>
img{
	border: 5px solid #eaa;
}
</style>

###### tags: js30
# JavaScript 30 Day07
[toc]
# Day07
## `.some()`
查找陣列中是否有符合條件之項目?若有即回傳true
```javascript=
// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
```
```javascript=
    const isAdult = people.some(function (person) {
      const currentYear = (new Date()).getFullYear();
      if (currentYear - person.year >= 19) {
        return true;
      }
    })
    console.log(isAdult);//true
		
	    /* 簡便寫法 */
    const isAdult = people.some((person) =>  ((new Date()).getFullYear()) - person.year >= 19)
    console.log(isAdult);//true
		
```

## `.every()`
比對陣列中所有物件，是否皆符合條件，若有即回傳true
```
    // Array.prototype.every() // is everyone 19 or older?
```
```javascript=
    const allAdults = people.every((person) =>  ((new Date()).getFullYear()) - person.year >= 19)
    console.log(allAdults);//false
```

## `.find()`
類似`.filter()`，但是只會回傳你要找的那一個
```
    // Array.prototype.find()
    // Find is like filter, but instead returns just the one you are looking for
    // find the comment with the ID of 823423
```
```javascript=
    const comment = comments.find(function (comment) {
      if (comment.id === 823423) {
        return true
      }
    })
    console.log(comment);

    /* 簡便寫法 */
    const comment = comments.find(comment => comment.id === 823423)
    console.log(comment);
```
![](https://i.imgur.com/2SHjtM4.png)


## `.findId()` + `.splice()` + `.slice()`
```
    // Array.prototype.findIndex()
    // Find the comment with this ID
    // delete the comment with the ID of 823423
```
```javascript=
    const index = comments.findIndex(comment => comment.id === 823423);
    console.log(index);
    /* 刪除方法1 */
    comments.splice(index, 1);
    console.table(comments);
    /* 刪除方法2 */
    const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1)
    ]
    console.table(newComments);
```