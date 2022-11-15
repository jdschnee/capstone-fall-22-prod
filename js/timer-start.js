const startBtn = document.querySelector("#start");
const pauseBtn = document.querySelector("#pause");
const duration = document.querySelector("#duration");
const circle = document.querySelector("circle");

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let currentOffset;
let decrement;

const timer = new Timer(startBtn, pauseBtn, duration, {
  /**
   * Creates a green circle around the timer
   */
  onStart() {
    // console.log('Timer Started')
    currentOffset = 0;
    circle.setAttribute('stroke', '#0bdf24');
    decrement = perimeter / (duration.value / .01);
    currentOffset -= decrement;
  },
  /**
   * The green circle around the timer moves as the timer ticks
   */
  onTick() {
    // console.log('Timer Ticked')
    circle.setAttribute('stroke-dashoffset', currentOffset);
    currentOffset -= decrement;
  },
  /**
   * When the timer is complete, displays a red circle around the timer and save the user's score
   */
  onComplete() {
    circle.setAttribute('stroke', 'red');
    circle.setAttribute('stroke-dashoffset', 0);
    // console.log('Timer Completed');

    localStorage.setItem('mostRecentScore', score);
    setTimeout(() => window.location.href="/quiz-complete.html",
    2000)
  }
});
   