// let res23 = "sadfaasdf!!!".match(/\w\w\w\w!!/)
// console.log(res23)

// "A123456789"
// "235234523A"
// "ASFDASDFA4"
// ["A123456789", "235234523A", "ASFDASDFA4"]
// let idList = ["A123456789", "235234523A", "ASFDASDFA4"]
// let id8 = "A123456789".match(/[A-Z]\d{9}/)
// console.log(id8);

// let id12 = ["A123456789", "235234523A", "ASFDASDFA4"].map(x => x.match(/[A-Z]\d{9}/))
// console.log(id12);

/*
let tels = [ "02-2882-5252", "28825252", 
"02-28825252", "0228825252"]

for(let s of tels) {
  // let res = /(\d\d-)?(\d{4}-?\d{4})$/.exec(s);
  let res = s.match(/(\d\d-)?(\d{4}-?\d{4})$/);
  console.log(res);
}
*/

let exts = ["foo.rb", "bar.js", "foobarb.py"]
for(let f of exts) {
  // let res = /(\w{1,}\.js$|\w{1,}\.rb$)/
  // let res29 = f.match(/(\w{1,}\.js$|\w{1,}\.rb$)/);
  let res29 = f.match(/(\w+)(\.js|\.rb)$/);
  // console.log(res.exec(f))
  console.log(res29 ? `${res29[1]} : right` : "null")
}

let exts32 = ["foo.rb", "bar.js", "foobarb.py", "js.rb.py"]
for(let s of exts32) {
  let fileRgx = /(\w{1,}\.js$|\w{1,}\.rb$)/
  // console.log(fileRgx.exec(s))
  console.log(fileRgx.exec(s) ? `${fileRgx.exec(s)[1]} : right`: "null")
}