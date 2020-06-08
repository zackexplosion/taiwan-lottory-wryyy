var input = [1, 2, 3, 4, 5, 6, 7]

// 6 6
// 7 210

[1, 2, 3, 4, 5]
[2, 3, 4, 5, 6]
[3, 4, 5, 6, 7]


function getResults(input) {
  var output = []
  var row = []
  var shifter_index = 0
  while(shifter_index < input.length) {
    for (let x = 0; x < 5; x++) {
      let index = shifter_index+x
      if(index >= input.length) index = index - input.length
      let i = input[index]
      row.push(i)
    }
    output.push(row)
    row = []
    shifter_index++
  }

  return output
}

var r = getResults(input)

console.log(r)

// 0  1 2 3 4
// 1 2 3 4 5
// 2 3 4 5 6