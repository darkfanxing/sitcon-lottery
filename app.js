var number = 0;
var isAnimate = false;
var animation;

var result = [7, 2, 3, 4, 5, 6, Math.floor(Math.random() * 2)];
var drawOrder = 0;
var animationTime = 385;

function resetOpacity(specifiedNumber=0) {
  for (let i = 0; i < 15; i++) {
    let lottoBall = document.getElementById(`number-${i}`);
    if (i != specifiedNumber) {
      lottoBall.style.opacity = 0;
    } else {
      lottoBall.style.opacity = 1;
    }
  }
}

function addLottoBall() {
  for (let number = 14; number >= 0; number--) {
    if (number < 10) {
      var numberText = "0" + String(number);
    } else {
      var numberText = number;
    }
  
    document.getElementById("lotto-ball").innerHTML += `<div id="number-${number}" class="number animation">${numberText}</div>`
  }
}

function changeNumber() {
  let lottoBall = document.getElementById(`number-${number}`)
  lottoBall.style.opacity = 1;
  if (number != 0) {
    document.getElementById(`number-${number - 1}`).style.opacity = 0;
  } else {
    document.getElementById("number-14").style.opacity = 0;
  }
  
  if (number < 14) {
    number += 1;
  } else {
    number = 0;
  }
}

function accelerateChangeNumber() {
  changeNumber();
  
  if (animationTime >= 100) {
    // final: 65ms
    animationTime -= 40;
    clearInterval(animation);
    animation = setInterval(accelerateChangeNumber, animationTime);
  }
}

addLottoBall();
resetOpacity();

document.getElementById("btn").onclick = () => {
  
  if(!isAnimate) {
    if (animationTime == 385) {
      animation = setInterval(accelerateChangeNumber, animationTime);
      isAnimate = true;
    }
  } else {
    if (animationTime <= 100) {
      clearInterval(animation);

      let selectedNumber;
      if (result[drawOrder] - 10 < 0) {
        selectedNumber = 14 - Math.abs(result[drawOrder] - 10)
      } else {
        selectedNumber = result[drawOrder] - 10
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

        if (animationTime <= 1000) {
          animationTime += 100;
          clearInterval(animation);
          animation = setInterval(decelerateChangeNumber, animationTime);
        } else {
          clearInterval(animation);

          setTimeout(() => {
            resetOpacity(number);

            if (drawOrder < 5) {
              drawOrder += 1;
              document.getElementById("zone-one").innerHTML += `<div class="selected-ball">${number}</div>`
            } else {
              let zoneTwo = document.getElementById("zone-two");
              if (zoneTwo.indexOf)
              zoneTwo.innerHTML += `<div class="selected-ball">${number}</div>`
            }
            animationTime = 385;

          }, Math.floor(Math.random() * 1500) + 2000)
        }
      }
      isAnimate = false;
    }
  }
}
