/*jshint esversion: 6 */

let head = document.querySelector('.warcze');
let monsta = document.querySelector('.monsta');
let hero = document.querySelector('.hero');
let healthLeft = document.querySelector('.health-left');
let healthCountLeft = 100;
let win = document.querySelector('.win');
let atak = document.querySelector('.atak');
let defend = document.querySelector('.defend');

//sounds
let evil = new Audio('./snd/evilsound.mp3');
let heroAtakSound = new Audio('./snd/slash.wav');
let heroBlockSound = new Audio('./snd/colision.mp3');

// atak vs feint choice
function attackVsFeint() {
  heroAtakSound.play();
  hero.classList.add('slashRun');
  monsta.classList.add('monstaRun');
  disallowAttackClick(); //odpinam funkcje

  setTimeout(function() {
    hero.classList.remove('slashRun');
    monsta.classList.remove('monstaRun');
    healthCountLeft = healthCountLeft - 25;
    healthLeft.style.width = healthCountLeft + '%';
    fatality(); //checking if health === 0
    allowAttackClick(); // podpięcie ponowne animacji ataku
  }, 1400); // this time is a delay for health bar animation
}

//attack vs block
function attackVsBlock() {

  hero.classList.add('defendRun');
  heroBlockSound.play();
  disallowDefendClick();
  setTimeout(function(){
    hero.classList.remove('defendRun');
    allowDefendClick();
  }, 1400);
}


//attack vs attack



function fatality() {
  if (healthCountLeft === 0) {
    setTimeout(() => {
      healthLeft.classList.add('skullmove');
    }, 500);
  }

}



//funkcja sprawdzajaca czy życie = 0
function checkWinner() {
  if (healthCountLeft === 0) {
    setTimeout(() => {
      win.style.display = 'block';
      win.style.animationPlayState = 'running';
      evil.play();
      restoreMonsterToFullHealth();
      healthLeft.classList.remove('skullmove');

      setTimeout(() => {
        win.style.display = 'none';
      }, 2000);
    }, 2000);

  }
}

function restoreMonsterToFullHealth() {
  healthCountLeft = 100;
  let restart = healthCountLeft + '%';
  healthLeft.style.width = restart;
}

//głowna funkcja ataku (atak vs feint)
function attack() {
  attackVsFeint();
  checkWinner();
}

//głowna funkcja obrony
function defense() {
  attackVsBlock();
}

function allowDefendClick() {
  defend.addEventListener('click', defense);
}

function disallowDefendClick(){
  defend.removeEventListener('click', defense);
}


//funkcja dopinajaca atak na klik
function allowAttackClick() {
  atak.addEventListener('click', attack);
}
// funkcja odpinajaca atak
function disallowAttackClick() {
  atak.removeEventListener('click', attack);
}


// odpalamy dodanie funkcji
allowAttackClick();
allowDefendClick();
