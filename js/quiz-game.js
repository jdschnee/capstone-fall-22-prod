const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

/**
 * Hard-coded example questions.
 * @property {string} question - The question text
 * @property {string }snippet - The example code snippet
 * @property {string} choiceArr - An array of possible answers
 * @property {string} answer - The correct answer
 */
let questions = [
  {
    question: 'What is the correct run-time complexity?',
    snippet: `for(int i = 0; i < n; i++){

}`,
    choiceArr: ['O(N)', 'O(logN)', 'O(N^2)', 'O(N^3)'],
    answer: 'O(N)',
  },
  {
    question: "What is the correct run-time complexity?",
    snippet: `for(int i = 0; i < 10; i++)
{
	System.out.println("i = " + i);
}`,
    choiceArr: ['O(1)', 'O(N)', 'O(NlogN)', 'None of the answers are correct'],
    answer: 'O(1)',
  },
  {
    question: "What's the run-time complexity for the following sorting method?",
    snippet: `bubbleSort(int array[]) {
  int size = array.length;
    
  // loop to access each array element
  for (int i = 0; i < size - 1; i++)
    
    // loop to compare array elements
    for (int j = 0; j < size - i - 1; j++)

      // compare two adjacent elements
      // change > to < to sort in descending order
      if (array[j] > array[j + 1]) {

        // swapping occurs if elements
        // are not in the intended order
        int temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }`,
    choiceArr: ['O(N^2)', 'O(N)', 'O(NlogN)', 'O(N^3)'],
    answer: 'O(N^2)',
  },
  {
    question: "What is the correct run-time complexity?",
    snippet: `for (int i = 1; i < n; i = i * 2){
  System.out.println("Hey - I'm busy looking at: " + i);
}`,
    choiceArr: ['O(logN)', 'O(N^2)', 'O(N)', 'O(NlogN)'],
    answer: 'O(logN)',
  }
]

const SCORE_POINTS = 25
const MAX_QUESTIONS = 4

/**
 * Begins the quiz by resetting the score and question counter
 */
startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

/**
 * If the user has completed the maximum number of questions, takes them to the quiz-complete screen to save their score.
 * Otherwise, displays the next question and update the progress bar.
 */
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('/quiz-complete.html')
  }

  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  // add code for inserting snippet into text area
  let codeEditor = document.querySelector('textarea');
  codeEditor.value = currentQuestion.snippet;

  currentQuestion.choiceArr = shuffle(currentQuestion.choiceArr);
  choices.forEach(choice => {
    const number = choice.dataset['number']
    // choice.innerText = currentQuestion['choice' + number]
    choice.innerHTML = toSup(currentQuestion.choiceArr[number-1]);
  })

  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    // const selectedAnswer = selectedChoice.dataset['number']
    const selectedAnswer = selectedChoice.innerHTML;
    console.log(selectedAnswer)

    let classToApply = selectedAnswer == toSup(currentQuestion.answer) ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()

    }, 500)
  })
})

/**
 * Increases the score by num
 * @param {*} num - The amount to increase the score by
 */
incrementScore = num => {
  score += num
  scoreText.innerText = score
}

startGame()