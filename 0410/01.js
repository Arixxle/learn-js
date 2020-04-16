let fruits = [ 'apple', 'banana', 'cherry', 'pear', 'watermelon']
/* Method 1st */
function selectFruit(params) {
  for (let p of params) {
    console.log(`I love ${p}`)
  }
}
let someFruits = fruits.slice(1, 4)
selectFruit(someFruits)

/* Method 2nd */
function selectFruit2nd(params) {
  for (let i = 1; i < params.length - 1; i ++) {
    console.log(`I love ${fruits[i]}`)
  }
}
selectFruit2nd(fruits)