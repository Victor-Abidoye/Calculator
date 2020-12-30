// Declaring a variable for the Large display th tag
var display = document.getElementById('dis')
// Declaring a variable for the small display th tag
var solution = document.getElementById('solve')
// Initializing a false value to show that no operration key (+, -, /, *) has been pressed
var operated = false
// counts the number of chraters that are on the large td (display)
var charCount = 0
// Sets the valoe of the question (is last last key press an operation key?) to false
var isLastPressOps = false
// Declare a variable to count the number of operation keys pressed
var opscount = 0
var isLastPressEqul = false
var isLastPressOps = false
var isLastPressNum = false
var isdec = false

var sign;
var figure = ""
var smallscr = ""
var lastAdd = ""
var isLastPressPom = false
var openBracCount = 0
var isLastPressBracClose = false

// var aud=document.createElement('audio');
// NUMBERS
document.querySelectorAll('.num').forEach(function (digit) {
    digit.addEventListener('click', function () {
        // aud.pause();
        // aud.src = 'song.mp3';

        // aud.play();

        // call the concat function which regulates the font size of the large td.innerText
        concat()
        // If the maximun number of character allowed is not exceeded, then allow to add a new number
        if (concat()) {
            // if no input yet or an operation has just been pressed, clear the disply td and allow the press disply of  a new number

            if (opscount && isLastPressOps) {
                display.innerText = digit.innerText
                operated = false
            }else if (
              display.innerText == '0' || operated && display.innerText[display.innerText.length - 1] != '.' ) {
              display.innerText = digit.innerText
              operated = false
              charCount++
              isLastPressOps = false
            } else {
                if (operated && display.innerText[display.innerText.length - 1] == '.') {
                    display.innerText = digit.innerText
                } else {
                    display.innerText += digit.innerText
                }
                charCount++
                isLastPressOps = false
            }
            figure = display.innerText
        }
        isLastPressEqul = false
        isLastPressOps = false
        isLastPressNum = true
        isLastPressBracClose = false
        if (isdec) {
            isdec = true
        } else {
            isdec = false
        }
    })
})

// CLEAR
document.getElementById('clear').addEventListener('click', function () {
    // First check if the large td has (display has been cleared first) then clear the small td(solve)
    if (display.innerText == '0') {
        solution.innerText = ''
    }
    display.style.fontSize = '60px'
    display.innerText = 0
    charCount = 0
    isLastPressOps = false
    document.getElementById('clear').innerText = 'C'
    opscount = 0
    isLastPressEqul = false
    isLastPressOps = false
    isLastPressNum = false
    isdec = false
    openBracCount = 0
})

// OPS
document.querySelectorAll('.ops').forEach(function (operation) {
    operation.addEventListener('click', function () {
         sign = operation.innerText
        //if the last key pressed was ann operation, then just change the last character in the small td (solve)
        if (isLastPressOps) {
            solution.innerHTML = solution.innerHTML.slice(0, solution.innerText.length - 1) + operation.innerText
            isLastPressOps = true
        } else {
            // If the small td (solve) is empty, then show in solve, the content of display and the operation pressed
            if (solution.innerText == '') {
                operated = true
                charCount = 0
                isLastPressOps = true
                opscount++
                if (display.innerText[display.innerText.length - 1] == '.') {
                    solution.innerText += display.innerText.slice(0, display.innerText.length - 1) + operation.innerText
                    display.innerText = display.innerText.slice(0, display.innerText.length - 1)
                } else {
                    solution.innerText = display.innerText + operation.innerText
                }

            } else {
                if (display.innerText[display.innerText.length - 1] == '.') {
                    solution.innerText += display.innerText.slice(0, display.innerText.length - 1) + operation.innerText
                    display.innerText = display.innerText.slice(0, display.innerText.length - 1)
                    opscount++
                    operated = true
                } else {
                    if (isLastPressEqul) {
                        solution.innerText = display.innerText + operation.innerText
                    } else if (isLastPressBracClose) {
                        solution.innerText += operation.innerText
                        console.log(solution.innerText)
                    } else {
                        solution.innerText += display.innerText + operation.innerText
                        opscount++
                    }
                    isLastPressOps = true
                    operated = true
                    charCount = 0
                }
            }
        }
        isLastPressOps = true
        if (opscount > 1 && openBracCount == 0) {
            solve()
        }
        isLastPressEqul = false
        isLastPressNum = false
        isdec = false
        isLastPressBracClose = false
    })
})

// DOT
function dot () {
    if (!isdec) {
        if (operated) {
        display.innerText = '0.'
        charCount += 2
        operated = false
    } else {
        if (!isNaN(display.innerText[display.innerText.length - 1])) {
            display.innerText += '.'
            charCount++
        }
            isLastPressEqul = false
            isLastPressOps = false
            isLastPressNum = false
            isdec = true
            isLastPressBracClose = false
        }

    }


}



// concat Function
function concat () {
    // When called on number press it changes the content of the clear button gron 'C' to 'CE'
    document.getElementById('clear').innerText = 'CE'
    // When the number of characters in display exceeds 42, the fontsize decreses and returns a true
    if (charCount < 43) {
        if (charCount > 12) {
          display.style.fontSize = 765 / charCount  + 'px'
        } else {
          display.style.fontSize = '60px'
        }
        return true
    } else {
        return false
    }
}

// EQUAL
function equal () {
    var result;
    if (openBracCount > 0) {
        if (solution.innerText[solution.innerText.length - 1] == '-' && display.innerText[0] == '-') {
            solution.innerText = solution.innerText + '(' + display.innerText + ')'
        } else if (solution.innerText[solution.innerText.length - 1] == ')') {
            solution.innerText =
            solution.innerText + ')'.padEnd(openBracCount, ')')
            openBracCount = 0
        } else {
            solution.innerText = solution.innerText + display.innerText

        }
        result = solve()
        if (openBracCount > 0) {
            solution.innerText =
                solution.innerText + ')'.padEnd(openBracCount, ')')
        }
        openBracCount = 0
        display.innerText = result
    } else if (opscount = 1) {
        if (isLastPressNum || (isLastPressOps && !isNaN(display.innerText.substr(1)))) {
            var show = solve()
            solution.innerText += display.innerText
            display.innerText = show
        }else if (!isLastPressEqul) {
            result = calcfunc()
            display.innerText = result
            solution.innerText += lastAdd
        } else {
            result = calcfunc()
            solution.innerText = display.innerText + sign + figure
            display.innerText = result
        }
    } else {
        if (!isLastPressEqul) {
            result = calcfunc()
            solution.innerText = display.innerText + lastAdd
            display.innerText = result
        }
        result = calcfunc()
        solution.innerText = lastAdd + figure
        display.innerText = result
    }
     concat()
     charCount = 0
    isLastPressEqul = true
    isLastPressOps = false
    isLastPressNum = false
    isLastPressBracClose = false
}


// BACKSPACE
function backSpace () {
    var x = ""
    if (!isLastPressOps) {
        x = display.innerText[display.innerText.length - 1]
    console.log(x)
    if (display.innerText.length != 1) {
        display.innerText = display.innerText.substring(0, display.innerText.length - 1)
        charCount--

    } else {
        display.innerText = '0'
    }
    console.log(charCount)
    if (charCount == 0) {
        display.innerText = '0'
    }
    figure = display.innerText
    }
}


//POM
function pom () {
    // if display panel contains only 0, return and do nothing
    if (display.innerHTML == 0) {
        return
    }

    // if the first character in the display panel is "-", remove when (POM) is pressed else add a "-"
    if (display.innerText[0] == '-') {
        display.innerText = display.innerText.substr(1, display.innerText.length)
        charCount--
    } else {
        display.innerText = '-' + display.innerText.substr(0, display.innerText.length)
        charCount++
    }
    // set as true to indicate that the last keypress was a (POM)
    isLastPressPom = true
}



//OPEN BRACKET
document.getElementById("openBrac").addEventListener('click', function () {

    if (isLastPressEqul) {
      solution.innerText = '('
      openBracCount = 1
      isLastPressEqul = false
      isLastPressBracClose = false
      isLastPressNum = false
      isLastPressOps = false
      isLastPressEqul = false
      isLastPressPom = false
    } else  {
        if (solution.innerText[solution.innerText.length - 1] == ')') {
            opscount = 0
            console.log('me')
            solution.innerText = '('
            openBracCount = 1
        } else {
          solution.innerText += '('
            openBracCount++
        }
    }
})


// CLOSE BRACKET
document.getElementById('closeBrac').addEventListener('click', function () {
    // if one or more brackets have been opened already,
    if (openBracCount > 0) {
        // if the last pressed button was not a bracket close do the necessary, else just add a close bracket
        if (!isLastPressBracClose) {
            // Upload the new solution panel content
            solution.innerText += display.innerText + ')'
            openBracCount--
            // solve the arithmetic value of the solution panel if the there are no excess open brackets and there is an operation
            if (openBracCount == 0 && opscount) {
               let x = solve()
                display.innerText = x
                concat()
            }
        } else {
            solution.innerText += ")"
            openBracCount--
        }

        isLastPressBracClose = true
        isLastPressNum = false
        isLastPressOps = false
        isLastPressEqul = false
        isLastPressPom = false
    }
})

function calcfunc () {
    var mine = ""
    var x = ""
    if (isLastPressOps || isLastPressPom) {
        mine = solution.innerText
        lastAdd = display.innerText
    } else {
        mine = solution.innerText + sign
        lastAdd = figure
    }
    if (lastAdd[0] == '-' && mine[mine.length - 1] == '-') {
        mine = mine.substr(0, mine.length - 1)
        solution.innerText = solution.innerText.substr(0, solution.innerText.length - 1)
    }
    if (isLastPressPom) {
        x = lastAdd + sign + figure
    } else {
        x = mine + lastAdd
    }
    x = x.replace(/×/g, '*').replace(/÷/g, '/')
    charCount = String(eval(x)).length
    return eval(x)
}

function solve () {
  var solving = ''
  if (
    opscount > 1 ||
    (opscount == 1 && isLastPressNum) ||
    (opscount == 1 && isLastPressOps) ||
    (opscount == 1 && isLastPressBracClose)
  ) {
    solving = solution.innerText.substr(0, solution.innerText.length)

      if (
        // if the last character in the solution and display panel are both "-" change then to one single "+"
      display.innerText[0] == '-' &&
      solving[solving.length - 1] == '-' &&
      openBracCount > 0
    ) {
      solving =
        solving
          .substr(0, solving.length - 1)
          .replace(/×/g, '*')
          .replace(/÷/g, '/') +
        '+' +
        display.innerText.substr(1, display.innerText.length - 1)
    } else if (
      display.innerText[0] == '-' &&
      solving[solving.length - 1] == '-'
    ) {
      solving =
        solution.innerText.substr(0, solution.innerText.length) +
        '(' +
        display.innerText +
        ')'
    } else if (openBracCount > 0) {
      solving = solution.innerText + ')'.padEnd(openBracCount, ')')
      solving = solving.replace(/×/g, '*').replace(/÷/g, '/')
    } else if (
      openBracCount == 0 &&
      solution.innerText[solution.innerText.length - 1] == ')'
    ) {
      solving = solution.innerText
      solving = solving.replace(/×/g, '*').replace(/÷/g, '/')
    } else {
      solving =
        solving.replace(/×/g, '*').replace(/÷/g, '/') + display.innerText
    }
    var result = eval(solving)
    charCount = String(result).length
    return result
  }
}


function factorial (x) {
    var fact;
    if (x == 1 || x == 0) {
        return 1
    }
    for (i = 0; i < x; i++) {
        fact = x * factorial(x - 1)
    }
    return fact
}

// ×
// ÷

// function proper (p) {
//    p =  p.replace(/[a-z]+/, '')
// }

// if (isLastPressEqul) {
//     var hold = display.innerText
//     if (!isLastPressPom) {
//         var y = ''
//         for (i = 0; i < hold.length; i++) {
//         if (!isNaN(hold[i])) {
//             y += hold[i]
//         }
//         solution.innerText = "negate(" + y + ")"
//         }
//     } else {
//         solution.innerText = "negate(" + solution.innerText + ")"
//     }
// } else if (isLastPressOps) {
//     if (!isLastPressPom) {
//         var p1 = 'negate(' + display.innerText + ')'
//         solution.innerText = solution.innerText + "negate(" + display.innerText + ")"
//     } else {
//         solution.innerText = "negate(" + solution.innerText + ")"
//     }
// }