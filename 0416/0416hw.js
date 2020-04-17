
  // function transcript(string){
  //   for (const s of string) {
  //     if (s ===  'A') {
  //       return 'U'
  //     }
  //   }
  // }

/* RNA transscription */
let RandomSource = {
  transcript: function (params){
    let fnString = ''
    for (let x = 0; x <= params.length; x++) {
      // var result = list.join('')
      function stop(arr) {
        if (arr.includes('UAA') || arr.includes('UAG')|| arr.includes('UGA')) {
          return 'trun'
        }
      }

      if (stop(fnString)) {
        console.log(fnString) 
        return null
      } else {
        if (params[`${x}`] === 'C') {
          fnString += 'G'
          // list.push('G')
        } else if (params[`${x}`] === 'G'){
          fnString += 'C'
          // list.push('C')
        } else if (params[`${x}`] === 'A'){
          fnString += 'U'
          // list.push('U')
        } else if (params[`${x}`] === 'T'){
          fnString += 'A'
          // list.push('A')
        }
      }
    }

    console.log(fnString)
  }
}
// RandomSource.transcript('ACTGCTAGCTAG')

/* DNA字串產生器 */
let a = 'ACTG'
let randomString
function getRandomString(resource, len) {
  var s = ''
  for (let i = 0; i < len; i++) {
    var n = Math.floor(Math.random()*4)
    result = resource[`${n}`]
    s = s + result
  }
  console.log(s)
  return s;
}
RandomSource.transcript(getRandomString(a,20))
// RandomSource.transcript(getRandomString(a,7))