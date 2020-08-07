var number = 0;
var isAnimate = false;
var result = [6, 11, 0, 9, 2, Math.floor(Math.random() * 3)];
var drawOrder = 0;
var animationTime = 525;
var lottoBallNumber = 14;
var animation;
var audio;
var reduceVolume;

function resetOpacity(specifiedNumber=0) {
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
  document.getElementById("lotto-ball").innerHTML = "";
  for (let number = lottoBallNumber; number >= 0; number--) {
    if (number < 10) {
      var numberText = "0" + String(number);
    } else {
      var numberText = number;
    }
  
    document.getElementById("lotto-ball").innerHTML += `<div id="number-${number}" class="number">${numberText}</div>`
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

function accelerateChangeNumber() {
  changeNumber();
  
  if (animationTime >= 100) {
    // final: 45ms
    animationTime -= 60;
    clearInterval(animation);
    animation = setInterval(accelerateChangeNumber, animationTime);
  }
}

addLottoBall();
resetOpacity();



let test = false;
document.getElementsByTagName("html")[0].onclick = () => {
  if (!test) {
    audio = new Audio('assets/bgm2.mp3');
    audio.play();
    test = true;
  }

  if(!isAnimate) {
    if (animationTime == 525) {
      if (drawOrder == 5) {
        if (document.getElementById("zone-two").innerHTML.indexOf("selected-ball") == -1) {
          document.getElementById("zone-one").style.opacity = 0.75;
          document.getElementById("lotto-ball-background-circle").style.backgroundColor = "#77B55A";
          document.getElementById("lotto-ball-background-compass").classList.add("rotate-animation");
          lottoBallNumber = 2;
          number = 0;
          addLottoBall();
          resetOpacity();
          animation = setInterval(accelerateChangeNumber, animationTime);
          setTimeout(() => {
            document.getElementById("lotto-ball").click();
          }, 3500 + Math.floor(Math.random() * 1500))
          isAnimate = true;
        }
      } else {
        document.getElementById("lotto-ball-background-compass").classList.add("rotate-animation")
        animation = setInterval(accelerateChangeNumber, animationTime);
        setTimeout(() => {
          document.getElementById("lotto-ball").click();
        }, 3500 + Math.floor(Math.random() * 1500))
        isAnimate = true;
      }
    }
  } else {
    if (animationTime == 45) {
      clearInterval(animation);
      let selectedNumber;
      
      let randomIndex = Math.floor(Math.random() * 3 + 3);
      if (lottoBallNumber == 14) {
        
        if (result[drawOrder] - randomIndex < 0) {
          selectedNumber = lottoBallNumber - Math.abs(result[drawOrder] - randomIndex)
        } else {
          selectedNumber = result[drawOrder] - randomIndex - 1
        }
      } else {
        selectedNumber = Math.floor(Math.random() * 3);
      }

      animation = setInterval(changeToSpecifiedNumber, animationTime);

      function changeToSpecifiedNumber() {
        changeNumber();

        if (number == selectedNumber) {
          clearInterval(animation)
          animation = setInterval(decelerateChangeNumber, animationTime);
        }
      }

      function decelerateChangeNumber() {
        changeNumber();

        if (animationTime <= 100 * randomIndex) {
          animationTime += 100;
          clearInterval(animation);
          if (animationTime >= 100 * (randomIndex - 1)) {
            animation = setInterval(decelerateChangeNumber, Math.floor(Math.random() * 1035 + 1065));  
          } else {
            animation = setInterval(decelerateChangeNumber, animationTime);
          }
        } else {
          clearInterval(animation);

          setTimeout(() => {
            resetOpacity(number);
            
            let testTime = 250;

            if (drawOrder < 5) {
              drawOrder += 1;
              document.getElementById("lotto-ball-background-circle").style.transform = "scale(0.95)";
              setTimeout(() => {
                document.getElementById("lotto-ball-background-circle").style.transitionTimingFunction = "cubic-bezier(.84, 0, .44, .99)";
                document.getElementById("lotto-ball-background-circle").style.transform = "scale(1.2)";
                setTimeout(() => {
                  document.getElementById("lotto-ball-background-circle").style.transitionTimingFunction = "linear";
                  document.getElementById("lotto-ball-background-circle").style.transform = "scale(1)";
                  setTimeout(() => {
                    document.getElementById("zone-one").innerHTML += `<div class="selected-ball">${number}</div>`;
                  }, )
                }, testTime)
              }, testTime)
            } else {
              document.getElementById("lotto-ball-background-circle").style.transform = "scale(0.95)";
              setTimeout(() => {
                document.getElementById("lotto-ball-background-circle").style.transitionTimingFunction = "cubic-bezier(.84, 0, .44, .99)";
                document.getElementById("lotto-ball-background-circle").style.transform = "scale(1.2)";
                setTimeout(() => {
                  document.getElementById("lotto-ball-background-circle").style.transitionTimingFunction = "linear";
                  document.getElementById("lotto-ball-background-circle").style.transform = "scale(1)";
                  setTimeout(() => {
                    let zoneTwo = document.getElementById("zone-two");
                    zoneTwo.innerHTML += `<div class="selected-ball" style="color: #77B55A; border-color: #77B55A;">${number}</div>`;
                    
                    setTimeout(() => {
                      document.getElementById("zone").classList.add("end-transition");
                      
                      document.getElementById("draw-lottery").classList.add("end-transition");
                      document.getElementById("draw-lottery").style.opacity = 0;
                      document.getElementById("zone").style.transform = "translate(0px, -90%)";
                    }, 1000)
                  }, testTime)
                }, testTime)
              }, testTime)

              reduceVolume = setInterval(() => {
                audio.volume -= 0.2;
                if(audio.volume == 0.2) {
                  audio.volume = parseInt(0);
                  clearInterval(reduceVolume);
                }
              }, 500)
            }

            document.getElementById("lotto-ball-background-compass").classList.remove("rotate-animation");
            setTimeout(() => {
              document.getElementById("lotto-ball").click();
            }, 1000)
            
            animationTime = 525;

          }, Math.floor(Math.random() * 1100 + 1000))
        }
      }
      isAnimate = false;
    }
  }
}