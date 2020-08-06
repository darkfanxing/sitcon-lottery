var number = 0;
var isAnimate = false;
var result = [10, 11, 12, 13, 14, Math.floor(Math.random() * 2)];
var drawOrder = 0;
var animationTime = 525;
var lottoBallNumber = 14;
var animation;

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
  console.log(animationTime)
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

document.getElementsByTagName("body")[0].onclick = () => {  
  if(!isAnimate) {
    if (animationTime == 525) {
      document.getElementById("lotto-ball-background").classList.add("rotate-animation")

      if (drawOrder == 5) {
        if (document.getElementById("zone-two").innerHTML.indexOf("selected-ball") == -1) {
          lottoBallNumber = 2;
          number = 0;
          addLottoBall();
          resetOpacity();
          animation = setInterval(accelerateChangeNumber, animationTime);
          isAnimate = true;
        }
      } else {
        animation = setInterval(accelerateChangeNumber, animationTime);
        isAnimate = true;
      }

      
    }
  } else {
    if (animationTime == 45) {
      clearInterval(animation);
      let selectedNumber;
      
      let randomIndex = Math.floor(Math.random() * 6 + 5);
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

            if (drawOrder < 5) {
              drawOrder += 1;
              document.getElementById("zone-one").innerHTML += `<div class="selected-ball">${number}</div>`
            } else {
              let zoneTwo = document.getElementById("zone-two");
              zoneTwo.innerHTML += `<div class="selected-ball">${number}</div>`
            }

            document.getElementById("lotto-ball-background").classList.remove("rotate-animation")
            animationTime = 525;

          }, Math.floor(Math.random() * 1100 + 1000))
        }
      }
      isAnimate = false;
    }
  }
}
