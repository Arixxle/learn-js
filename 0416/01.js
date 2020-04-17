let res34 = 
  [1, 2, 3, 4, 5].map(i => i + 1)
                 .filter(i => i % 2 === 0)
                 .reduce((accu, i) => accu + i, 0)

console.log(res34)