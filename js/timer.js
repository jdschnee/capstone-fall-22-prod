/**
 * Class for the timer used in the quiz
 */
class Timer {
  /**
   * Create a timer
   * @param {*} startBtn - The start button
   * @param {*} pauseBtn - The pause button
   * @param {*} duration - The time duration of the timer in seconds
   * @param {*} callbacks - Callback functions to be called when the timer starts, ticks, and completes
   */
  constructor(startBtn, pauseBtn, duration, callbacks) {
    this.startBtn = startBtn;
    this.pauseBtn = pauseBtn;
    this.duration = duration;
    
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.startBtn.addEventListener('click', this.start);
    this.pauseBtn.addEventListener('click', this.pause);
    this.duration.addEventListener('click', this.pause)

    // this.interval = 10;
  }

  /**
   * The time remaining on the timer
   */
  get timeRemaining() {
    return parseFloat(this.duration.value);
  }

  set timeRemaining(time) {
    this.duration.value = time.toFixed(2);
  }

  /**
   * Decrements the remaining time
   */
  decrementTimeRemaining = () => {
    this.timeRemaining = this.timeRemaining - (this.interval * .001);
  }

  /**
   * Starts the timer
   */
  start = () => {
    this.interval = 10;
    if (this.onStart) {
      this.onStart();
    }

    if (this.intervalId) {
      this.pause();
    }

    this.tick();

    if (this.timeRemaining) {
      this.intervalId = setInterval(this.tick, this.interval);
    }
    
  }

  /**
   * Calls onTick and decrements the remaining time on each tick
   */
  tick = () => {
    console.log('inside tick', this.timeRemaining)
    if (parseFloat(this.duration.value) > 0) {
      if (this.onTick) {
        this.onTick();
      }
      this.decrementTimeRemaining();
    } else if (parseFloat(this.duration.value) <= 0) {
      if (this.onComplete) {
        this.onComplete();
      }
      this.pause();
    }

  }

  /**
   * Pauses the timer
   */
  pause = () => {
    clearInterval(this.intervalId)
  }

  onDurationChange() {

  }
}