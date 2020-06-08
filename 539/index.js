
const db = require('./db')

function createCounter() {
  var counter = {}
  for(let i = 1; i <= 39; i++) {
    let index = i.toString().padStart(2, '0')
    counter[index] = 0
  }
  return counter
}

function sortCounter(counter){
  var counter_array = []
  var total = 0
  for(c in counter) {
    total = total + counter[c]
  }

  Object.keys(counter).forEach(i => {
    const n = counter[i]

    counter_array.push({
      number: i,
      count: n,
      occupy: ((n / total) * 100).toFixed(2) + '%'
    })
  })

  counter_array = counter_array.sort(function (a, b) {
    return a.count < b.count ? 1 : -1;
  })

  return counter_array
}


const rows = db.get('dailycash').value()
let counter = createCounter()
rows.forEach(r => {

  // console.log(r)
  r.numbers.forEach(n => {
    counter[n] ++
  })

})

  var r = sortCounter(counter)
  console.log(r)
