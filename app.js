const icon = document.querySelector("i");
let minutesSpan = document.querySelector(".minutes");
let secondsSpan = document.querySelector(".seconds");
let round = document.querySelector(".cycleCompleted");
let seconds = 60;
let minutes = 1;
let timerStarted = false;
let timer;
let onBreak = false;

//user clicks on timer button
const clickedTimer = () => {
  //change timer icons to pause/play and start/stop timer
  if(!timerStarted) {
    changeTimer(true, "fa-play", "fa-pause");
    startTimer(seconds, minutes);
  } else {
    changeTimer(false, "fa-pause", "fa-play");
    stopTimer();
  }
}

//change icon to pause or play
const changeTimer = (status, oldIcon, newIcon) => {
  icon.classList.remove(oldIcon);
  icon.classList.add(newIcon);
  timerStarted = status;
}

const playSoundAndStop = () => {
  const audio = new Audio('sound/guitar.mp3');
  audio.play();
  stopTimer();
}

//start timer
const startTimer = (secondsStart, minutesStart) => {
  seconds = secondsStart;
  minutes = minutesStart;
  minutesSpan.innerHTML = `${minutes}`;
  timer = setInterval(() => {  
    seconds--;

    //display seconds
    if(seconds < 10) {
      secondsSpan.innerHTML = `0${seconds}`;
    } else {
      secondsSpan.innerHTML = seconds;
    }

    if(minutes === 0 && seconds === 59) {
      //start new timer -> 25 minutes intervall
      if (onBreak) {
        onBreak = false;
        playSoundAndStop();
        startTimer(59, 24);
      //start new timer - break -> 5 minutes intervall
      } else {
        onBreak = true;
        round.innerHTML = Number(round.innerHTML) + 1;
        playSoundAndStop();
        if (round.innerHTML !== 4) {
          startTimer(59, 4);
        }
      }
    } else if (seconds === 0) {
      seconds = 60;
    //change and display minutes
    } else if (seconds === 59) {
      minutes--;
      minutesSpan.innerHTML = `${minutes}`;
    }
  }, 1000);
}

//pause timer
const stopTimer = () => {
  clearInterval(timer);
}