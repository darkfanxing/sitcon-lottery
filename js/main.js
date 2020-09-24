const randomIndex = 3;
let number = 0;
let drawOrder = 0;
let animationTime = 525; // Millisecond
let isPlayAnimation = false;
let isClickWindow = false;
let result = [13, 3, 10, 2, 6, Math.floor(Math.random() * 3)];
let lottoBallNumber = 14;
let audio, animation, reduceVolume;
let selectedNumber; // the number(index) that start to decelerate before get lotto number

let lottoBall = document.getElementById("lotto-ball");
let zoneOne = document.getElementById("zone-one");
let zoneTwo = document.getElementById("zone-two");
let lottoBallCompass = document.getElementById("lotto-ball-background-compass");

function resetOpacity(specifiedNumber = 0) {
  for (let i = 0; i <= lottoBallNumber; i++) {
    let lottoBall = document.getElementById(`number-${i}`);
    if (i != specifiedNumber) {
      lottoBall.style.opacity = 0;
    } else {
      lottoBall.style.opacity = 1;
    }
  }
}

function addLottoBall() {
  lottoBall.innerHTML = "";
  for (let number = lottoBallNumber; number >= 0; number--) {
    if (number < 10) {
      var numberText = "0" + String(number);
    } else {
      var numberText = number;
    }

    lottoBall.innerHTML += `<div id="number-${number}" class="number">${numberText}</div>`
  }
}

function changeNumber() {
  let lottoBall = document.getElementById(`number-${number}`)
  lottoBall.style.opacity = 1;
  if (number != 0) {
    document.getElementById(`number-${number - 1}`).style.opacity = 0;
  } else {
    document.getElementById(`number-${lottoBallNumber}`).style.opacity = 0;
  }

  if (number < lottoBallNumber) {
    number += 1;
  } else {
    number = 0;
  }
}

function constantVelocityChangeNumber() {
  changeNumber();
  
  clearInterval(animation);
  animation = setInterval(constantVelocityChangeNumber, animationTime);
}

// animation
function drawNumberSelectedAnimation(zoneNum) {
  let time = 250
  let lottoBallBackground = document.getElementById("lotto-ball-background-circle");

  setTimeout(() => {
    lottoBallBackground.style.backgroundColor = "#77B55A";
    lottoBallBackground.style.transform = "scale(0.95)";

    lottoBallCompass.style.transition = "all 0.25s";
    lottoBall.style.transition = "all 0.25s";
    
    lottoBallCompass.style.transform = "scale(0)";
    lottoBall.style.transform = "scale(0.9)";
    
    setTimeout(() => {
      lottoBallBackground.style.transitionTimingFunction = "cubic-bezier(.84, 0, .44, .99)";
      lottoBallBackground.style.transform = "scale(1.2)";

      lottoBall.style.transitionTimingFunction = "cubic-bezier(.84, 0, .44, .99)";
      lottoBall.style.transform = "scale(1.6)";
      
      setTimeout(() => {
        lottoBallBackground.style.transitionTimingFunction = "linear";
        lottoBallBackground.style.transform = "scale(1)";
        lottoBallBackground.style.backgroundColor = "black";

        lottoBall.style.transitionTimingFunction = "linear";
        lottoBall.style.transform = "scale(1)";
        
        lottoBallCompass.style.transform = "scale(1)";
        
        setTimeout(() => {
          lottoBall.style.transition = "";
          lottoBallCompass.style.transition = "";
          lottoBallCompass.style.transform = "";

          if (zoneNum === 1) {
            if (number < 10) {
              var numberText = "0" + String(number);
            } else {
              var numberText = number;
            }

            zoneOne.innerHTML += `<div class="selected-ball">${numberText}</div>`;
          } else {
            if (number < 10) {
              var numberText = "0" + String(number);
            } else {
              var numberText = number;
            }
            zoneTwo.innerHTML += `<div class="selected-ball" style="color: #77B55A; border-color: #77B55A;">${numberText}</div>`;

            setTimeout(() => {
              let zoneContainer = document.getElementById("zone-container");
              let drawLotteryContainer = document.getElementById("draw-lottery-container");

              zoneOne.style.transitionDuration = "1.5s";
              zoneTwo.style.transitionDuration = "1.5s";

              zoneOne.style.transform = "translate(0px, 0px)";
              zoneTwo.style.transform = "translate(0px, 0px)";

              zoneContainer.classList.add("end-transition");
              zoneContainer.style.transform = "translate(0px, -90%)";

              drawLotteryContainer.classList.add("end-transition");
              drawLotteryContainer.style.opacity = 0;
              
              zoneOne.style.transitionDuration = "1s";
              zoneOne.style.opacity = "1";
            }, 1500)
          }

          setTimeout(() => {
            lottoBall.click();
          }, time)
        }, time)
      }, time)
    }, time)
  }, time)
}

function changeToSpecifiedNumber() {
  changeNumber();

  if (number == selectedNumber) {
    clearInterval(animation)
    animation = setInterval(decelerateChangeNumber, animationTime);
  }
}

function decelerateChangeNumber() {
  changeNumber();
  clearInterval(animation);

  if (animationTime <= 200 * randomIndex) {
    animationTime = (animationTime + 200) * 1.5;
    animation = setInterval(decelerateChangeNumber, animationTime);
  } else {
    setTimeout(() => {
      resetOpacity(number);

      if (drawOrder < 5) {
        drawOrder += 1;
        drawNumberSelectedAnimation(1);
        animationTime = 525;
        isPlayAnimation = false;
      } else {
        drawNumberSelectedAnimation(2);

        reduceVolume = setInterval(() => {
          if (audio.volume <= 0.2) {
            audio.volume = parseInt(0);
            clearInterval(reduceVolume);
          } else {
            audio.volume -= 0.2;
          }
        }, 250)
        animationTime = 525;
      }

      lottoBallCompass.classList.remove("rotate-animation");
    }, 1000)
  }
}

addLottoBall();
resetOpacity();

document.getElementsByTagName("html")[0].onclick = () => {
  if (!isClickWindow) {
    isClickWindow = true;
    audio = new Audio('assets/bgm.mp3');
    audio.play();

    zoneTwo.style.opacity = 0.2;

    zoneOne.classList.add("end-transition");
    zoneTwo.classList.add("end-transition");
    
    zoneOne.style.transitionTimingFunction = "cubic-bezier(.21, .96, .24, .78)";
    zoneTwo.style.transitionTimingFunction = "cubic-bezier(.21, .96, .24, .78)";
    
    zoneOne.style.transform = "translate(0px, 0px)"
    zoneTwo.style.transform = "translate(0px, 0px)"

    setTimeout(() => {
      zoneOne.classList.remove("end-transition");
      zoneTwo.classList.remove("end-transition");
    }, 2050)
  }

  if (!isPlayAnimation) {
    // animatnioTime = 525 is meant we can start draw
    if (animationTime == 525) {      
      animationTime = 45;
      // if there is had 5 ball at zone 1
      if (drawOrder == 5) {
        // if no any lotto ball at zone 2
        if (zoneTwo.innerHTML.indexOf("selected-ball") == -1) {
          lottoBallCompass.classList.add("rotate-animation")

          zoneOne.classList.add("end-transition");
          zoneTwo.classList.add("end-transition");

          zoneOne.style.opacity = 0.2;
          zoneTwo.style.opacity = 1;
                    
          zoneOne.style.transitionTimingFunction = "cubic-bezier(.21, .92, .4, .9)";
          zoneTwo.style.transitionTimingFunction = "cubic-bezier(.21, .92, .4, .9)";

          zoneOne.style.transform = "translate(0px, 100px)";
          zoneTwo.style.transform = "translate(0px, -100px)";
          
          lottoBallNumber = 2;
          number = 0;

          addLottoBall();
          resetOpacity();

          animation = setInterval(constantVelocityChangeNumber, animationTime);
          setTimeout(() => {
            lottoBall.click();
          }, Math.floor(Math.random() * 500 + 1000))
        }
      } else {
        animation = setInterval(constantVelocityChangeNumber, animationTime);
        setTimeout(() => {
          lottoBall.click();
        }, Math.floor(Math.random() * 500 + 1000))
      }

      // is playing animatiion now
      isPlayAnimation = true;
    }
  } else {
    // animatnioTime = 45 is meant we can decelerate it and get lotto number
    if (animationTime == 45) {
      // cancel constant velocity animation
      clearInterval(animation);

      // get the number(index) that start to decelerate before get lotto number
      if (lottoBallNumber == 14) {
        if (result[drawOrder] - randomIndex < 0) {
          selectedNumber = lottoBallNumber - Math.abs(result[drawOrder] - randomIndex + 1)
        } else {
          selectedNumber = result[drawOrder] - randomIndex;
        }
      } else {
        selectedNumber = Math.floor(Math.random() * 3);
      }

      animation = setInterval(changeToSpecifiedNumber, animationTime);
    }
  }
}