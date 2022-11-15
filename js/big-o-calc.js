/**
 * The calculate button. Retrieves the code from the code box and processes it when clicked.
 */
var getBigOBtn = document.getElementById("calculate-btn");
getBigOBtn.onclick = function() {
    var codeInput = document.getElementById("editor")
    var code = codeInput.value.trim();
    code = code.replace( /\r?\n|\r/g, "" );

    processUserCode(code);
}

/**
 * Big O API parses the code and returns the Big-O complexity. A multiple choice question is generated
 * with the correct answer being the calculated Big-O complexity.
 * @param {*} code - The code entered in the code box
 */
function processUserCode(code) {
    let url = 'https://rl43w8txr4.execute-api.us-east-1.amazonaws.com/getBigO'
    const data = { "code": code }
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(data => {return data.json()})
    .then(result => { 
        createQuiz(result);
    })

}

/**
 * Creates a multiple-choice question based on the result of the Big-O complexity calculation
 * @param {*} result - The result of the Big-O complexity calculation
 */
function createQuiz(result) {
  let bigOValues = ["O(N)", "O(N^2)", "O(N^3)", "O(logN)", "O(NlogN)"];
  let newValue = bigOValues.filter(x => x != result);

  let quizArr = []
  for (let i = 0; i < 4; i++) {
    quizArr.push("");
  }

    let randomIndex = Math.floor(Math.random() * 4);
    quizArr[randomIndex] = result;
    let arr = shuffle(newValue);
    for(let i = 0; i < 4; i++)
    {
        if(quizArr[i] != result)
        {
            quizArr[i] = arr[i]
        }
    }
    showQuiz(quizArr, result);
}

/**
 * Randomly orders the multiple-choice answers
 * @param {*} array - The multiple choice answers
 * @returns - the array in random order
 */
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}