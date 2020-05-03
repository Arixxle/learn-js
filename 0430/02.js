let brds = [
  "the oo design",
  "oomygush",
  "moon"
]
for(let s of brds) {
  let rgx = /\boo\b/
  console.log(rgx.exec(s))
}