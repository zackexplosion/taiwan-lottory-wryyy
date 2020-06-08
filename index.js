const MAX_NUMBER = 10
const MAX_NUMBER_LENGTH = 1
const TOTAL_LOTTERY = 100
var sold_numbers = {}
var total = 0
var lotterys = []
for(let i = 1;  i <= MAX_NUMBER;i++) {
  var index = i
  if(i < 10) {
    index = "0" + i
  }
  sold_numbers['_'+ index.toString()] = 0
}
function getNumber () {
  var i = parseInt(Math.random() * MAX_NUMBER) + 1
  if(i < 10) {
    i = "0" + i
  }
  return i.toString()
}

function notNumber(x) {

  var i = getNumber()

  if(x.includes(i)) {
   i = notNumber(x)
  }

  return i
}

function createLottery() {
  var result = []

  for (let index = 0; index < MAX_NUMBER_LENGTH; index++) {
    let i = getNumber()
    if(result.includes(i)) {
      i = getNumber()
    }

    // i = notNumber(['10', '07'])

    sold_numbers['_'+i]++
    result.push(i)
  }

  return result
}

for (let index = 0; index < TOTAL_LOTTERY; index++) {
  var a = createLottery()
  // console.log(a)
  lotterys.push(a)
}

const TOTAL = TOTAL_LOTTERY * MAX_NUMBER_LENGTH
Object.keys(sold_numbers).forEach(k => {
  var c = sold_numbers[k]
  var p = c / TOTAL
  sold_numbers[k] = {
    count: c,
    percentage: (p * 100).toFixed(2) + '%'
  }
})


function openLottery() {
  var result = []

  for (let index = 0; index < MAX_NUMBER_LENGTH; index++) {
    let i = getNumber()
    if(result.includes(i)) {
      i = getNumber()
    }

    // i = notNumber(['10', '07'])

    result.push(i)
  }

  return result
}

console.log(lotterys)
console.log(sold_numbers)


while(true) {
  var winner = openLottery()
  // console.log('winner', winner)
  var have_winner = false

  lotterys.forEach(_ => {
    var nowin = []
    _.forEach((__, index) => {
      if(winner[index] !== ___) {
        nowin.push(true)
      }
    })
    // console.log('奶子！')
  })

  if(lotterys.includes(winner)) {
    console.log('奶子！')
  } else {
    // console.log('沒中哭哭喔', winner)
  }
}




// console.log(i)


// var i = '123123123123'

// setInterval(function(){
//   var i = new Date().getTime()
//   console.log(i)
// }, 1000)



var winner = [ 6, 8, 2, 5 ]

// console.log(winner)

