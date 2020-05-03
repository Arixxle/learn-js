var students = [
  {name: "John Doe", age: 24},
  {name: "Mary Lee", age: 17},
  {name: "Ash Lee",  age: 38},
  {name: "Bill Doe", age: 25},
]


let result = students.filter(s => s.age >= 18 )
                     .map(s => s.name.split(' '))
                     .map(([_fn, ln]) => ln)
                     .reduce((accu, i) => {
                      if(Object.keys(accu).indexOf(i) < 0) {
                        accu[i] = 1 // return {...accu, i: 1}
                      } else {
                        accu[i] += 1 // return {...accu, i: accu[i] + 1}
                      }
                       return accu
                    }, {})
console.log(result)