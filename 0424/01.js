let obj = {
  a: 100,
  b: function(x) {
    return x + this.a
  },
  c: x => {
    return x + this.a
  }
}

let f = obj.b

console.log(obj.b(10))
console.log(f(10))

// console.log(module.exports)

let foo = {a: 2}
let bar = {a: 5}

console.log(f.call({a: 9}, 10))
console.log(f.call(bar, 10))
console.log(f.apply(bar,[10, 20,11]))