let head = document.querySelector('.warcze');
let evil = new Audio('evilsound.mp3');
let slashSound = new Audio('slash.wav');
let monsta = document.querySelector('.monsta');
let slash = document.querySelector('.slash');
let healthLeft = document.querySelector('.health-left');
let healthCountRight = 100;
let win = document.querySelector('.win');
let atak = document.querySelector('.atak');

//slash parent

function makeAttackAnimationAndUpdateHealthBar() {
  slashSound.play();
  slash.classList.add('slashRun');
  monsta.classList.add('monstaRun');
  disallowAttackClick();

  setTimeout(function() {
    slash.classList.remove('slashRun');
    monsta.classList.remove('monstaRun');
    healthCountRight = healthCountRight - 50;
    healthLeft.style.width = healthCountRight + '%';
    fatality();
    allowAttackClick();
  }, 1400); // this time is a delay for health bar animation
}

function fatality() {
  if (healthCountRight === 0) {
    setTimeout(() => {
      healthLeft.classList.add('skullmove');
    },500);
  }

}

function restoreMonsterToFullHealth() {
  healthCountRight = 100;
  let restart = healthCountRight + '%';

  healthLeft.style.width = restart;
}

//funkcja sprawdzajaca czy życie = 0
function checkWinner() {
  if (healthCountRight === 0) {
    setTimeout(() => {
      win.style.display = 'block';
      win.style.animationPlayState = 'running';
      evil.play();
      restoreMonsterToFullHealth();
      healthLeft.classList.remove('skullmove')

      setTimeout(() => {
        win.style.display = 'none';
        ;
      }, 2000)
    }, 2000);

  }
}

//głowna funkcja ataku
function attack() {

  makeAttackAnimationAndUpdateHealthBar();
  checkWinner()

}

//funkcja dopinajaca atak na klik
function allowAttackClick() {
  atak.addEventListener('click', attack);
}
// funkcja odpinajaca atak
function disallowAttackClick() {
  atak.removeEventListener('click', attack);
}

allowAttackClick();

// document.getElementById("p2").style.color = "blue";
