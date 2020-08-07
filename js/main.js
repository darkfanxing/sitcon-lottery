var number = 0;
var isAnimate = false;
var result = [10, 11, 12, 13, 14, Math.floor(Math.random() * 3)];
var drawOrder = 0;
var animationTime = 525;
var lottoBallNumber = 14;
var animation;
var audio;
var reduceVolume;

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
  
  clearInterval(animation);
  animation = setInterval(accelerateChangeNumber, animationTime);
}

addLottoBall();
resetOpacity();

let test = false;
document.getElementsByTagName("html")[0].onclick = () => {
  if (!test) {
    audio = new Audio('assets/bgm.mp3');
    audio.play();
    test = true;

    let zoneOne = document.getElementById("zone-one");
    let zoneTwo = document.getElementById("zone-two");
    zoneOne.classList.add("end-transition");
    zoneTwo.classList.add("end-transition");
    zoneTwo.style.transitionDuration = "1s";
    document.getElementById("zone-one").style.transitionTimingFunction = "cubic-bezier(.21, .96, .24, .78)";
    document.getElementById("zone-two").style.transitionTimingFunction = "cubic-bezier(.21, .96, .24, .78)";
    zoneOne.style.transform = "translate(0px, 0px)"
    zoneTwo.style.transform = "translate(0px, 0px)"
    zoneTwo.style.opacity = 0.2;
    setTimeout(() => {
      zoneOne.classList.remove("end-transition");
      zoneTwo.classList.remove("end-transition");
    }, 2050)
  }

  if (!isAnimate) {
    if (animationTime == 525) {
      if (drawOrder == 5) {
        if (document.getElementById("zone-two").innerHTML.indexOf("selected-ball") == -1) {
          document.getElementById("zone-one").classList.add("end-transition");
          document.getElementById("zone-two").classList.add("end-transition");
          document.getElementById("zone-one").style.opacity = 0.2;
          document.getElementById("zone-two").style.opacity = 1;
          document.getElementById("zone-one").style.transitionDuration = "1s";
          document.getElementById("zone-two").style.transitionDuration = "1s";
          document.getElementById("zone-one").style.transitionTimingFunction = "cubic-bezier(.21, .92, .4, .9)";
          document.getElementById("zone-two").style.transitionTimingFunction = "cubic-bezier(.21, .92, .4, .9)";

          document.getElementById("zone-one").style.transform = "translate(0px, 100px)";
          document.getElementById("zone-two").style.transform = "translate(0px, -100px)";
          document.getElementById("lotto-ball-background-compass").classList.add("rotate-animation");
          lottoBallNumber = 2;
          number = 0;
          addLottoBall();
          resetOpacity();
          animationTime = 45;
          animation = setInterval(accelerateChangeNumber, animationTime);
          isAnimate = true;
          setTimeout(() => {
            document.getElementById("lotto-ball").click();
          }, Math.floor(Math.random() * 500 + 1000))
        }
      } else {
        document.getElementById("lotto-ball-background-compass").classList.add("rotate-animation")
        animationTime = 45;
        animation = setInterval(accelerateChangeNumber, animationTime);
        setTimeout(() => {
          document.getElementById("lotto-ball").click();
        }, Math.floor(Math.random() * 500 + 1000))
        isAnimate = true;
      }
    }
  } else {
    if (animationTime == 45) {
      clearInterval(animation);
      let selectedNumber;

      let randomIndex = 3;
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

      function changeToSpecifiedNumber() {
        changeNumber();

        if (number == selectedNumber) {
          clearInterval(animation)
          animation = setInterval(decelerateChangeNumber, animationTime);
        }
      }

      function decelerateChangeNumber() {
        changeNumber();

        if (animationTime <= 200 * randomIndex) {
          animationTime = (animationTime + 200) * 1.5;
          clearInterval(animation);
          animation = setInterval(decelerateChangeNumber, animationTime);
        } else {
          clearInterval(animation);

          setTimeout(() => {
            resetOpacity(number);

            let testTime = 250;

            function drawNumberSelected(zoneNum) {
              setTimeout(() => {
                document.getElementById("lotto-ball-background-circle").style.backgroundColor = "#77B55A";
                document.getElementById("lotto-ball-background-circle").style.transform = "scale(0.95)";

                document.getElementById("lotto-ball-background-compass").style.transition = "all 0.25s";
                document.getElementById("lotto-ball").style.transition = "all 0.25s";
                document.getElementById("lotto-ball-background-compass").style.transform = "scale(0)";
                setTimeout(() => {
                  document.getElementById("lotto-ball-background-circle").style.transitionTimingFunction = "cubic-bezier(.84, 0, .44, .99)";
                  document.getElementById("lotto-ball-background-circle").style.transform = "scale(1.2)";

                  document.getElementById("lotto-ball").style.transitionTimingFunction = "cubic-bezier(.84, 0, .44, .99)";
                  document.getElementById("lotto-ball").style.transform = "scale(1.6)";
                  setTimeout(() => {
                    document.getElementById("lotto-ball-background-circle").style.transitionTimingFunction = "linear";
                    document.getElementById("lotto-ball-background-circle").style.transform = "scale(1)";
                    document.getElementById("lotto-ball-background-circle").style.backgroundColor = "black";

                    setTimeout(() => {
                      document.getElementById("lotto-ball").style.transitionTimingFunction = "linear";
                      document.getElementById("lotto-ball").style.transform = "scale(1)";
                      document.getElementById("lotto-ball-background-compass").style.transform = "scale(1)";
                      setTimeout(() => {
                        document.getElementById("lotto-ball").style.transition = "";
                        document.getElementById("lotto-ball-background-compass").style.transition = "";
                        document.getElementById("lotto-ball-background-compass").style.transform = "";

                        if (zoneNum === 2) {
                          let zoneTwo = document.getElementById("zone-two");
                          zoneTwo.innerHTML += `<div class="selected-ball" style="color: #77B55A; border-color: #77B55A;">${number}</div>`;

                          setTimeout(() => {
                            document.getElementById("zone").classList.add("end-transition");

                            document.getElementById("draw-lottery").classList.add("end-transition");
                            document.getElementById("draw-lottery").style.opacity = 0;
                            document.getElementById("zone-one").style.transitionDuration = "1s";
                            document.getElementById("zone-one").style.opacity = "1";
                            document.getElementById("zone").style.transform = "translate(0px, -90%)";
                          }, 1000)
                        } else {
                          document.getElementById("zone-one").innerHTML += `<div class="selected-ball">${number}</div>`;
                        }

                        setTimeout(() => {
                          document.getElementById("lotto-ball").click();
                        }, 250)
                      }, testTime)
                    },250)
                  }, testTime)
                }, testTime)
              }, testTime)
            }

            if (drawOrder < 5) {
              drawOrder += 1;
              drawNumberSelected(1);
              animationTime = 525;
              isAnimate = false;
            } else {
              drawNumberSelected(2);

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

            document.getElementById("lotto-ball-background-compass").classList.remove("rotate-animation");
          }, 1000)
        }
      }
    }
  }
}