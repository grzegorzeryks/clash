/*jshint esversion: 6 */

let asideMenu = document.querySelector('aside');
let menuButton = document.querySelector('.aside-button');
let monsta = document.querySelector('.monsta');
let hero = document.querySelector('.hero');
let healthLeft = document.querySelector('.health-left');
let healthCountLeft = 100;
let win = document.querySelector('.win');
let atak = document.querySelector('.atak');
let defend = document.querySelector('.defend');
let feint = document.querySelector('.feint');
//sounds
let evil = new Audio('./snd/evilsound.mp3');
let heroAtakSound = new Audio('./snd/slash2.mp3');
let heroBlockSound = new Audio('./snd/colision.mp3');
let fatalitySnd = new Audio('./snd/fatality.mp3');

let myAction = 0;
// enemyaction = 0 feint
// enemy action  = 1 attack
//enemy action = 2 defend

// random enemyAction attack function
function randomAttack() {
  let enemyAction = Math.floor(Math.random() * 3);
  if (enemyAction === 0 && myAction === 1) {
    attackVsFeint();
  } else if (enemyAction === 1 && myAction === 0) {
    feintVsBlock();
  } else if (enemyAction === 1 && myAction === 2) {
    attackVsBlock();
  }
  console.log(enemyAction + ' enemy action');
}



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
    allowAttackClick(); // podpięcie ponowne animacji ataku

    console.log(healthCountLeft);
    fatality(); //checking if health zero, fatality initiated

  }, 1400); // this time is a delay for health bar animation
  checkWinner();
}

//attack vs block
function attackVsBlock() {

  hero.classList.add('defendRun');
  heroBlockSound.play();
  disallowDefendClick();
  setTimeout(function() {
    hero.classList.remove('defendRun');
    allowDefendClick();
  }, 1400);
}


//feint vs defence
function feintVsBlock() {
  hero.classList.add('feintRun');
  heroAtakSound.play();
  monsta.classList.add('monstaRun');
  disallowFeintClick();
  setTimeout(function() {
    hero.classList.remove('feintRun');
    monsta.classList.remove('monstaRun');
    healthCountLeft = healthCountLeft - 25;
    healthLeft.style.width = healthCountLeft + '%';
    allowFeintClick();
    fatality();
  }, 1400);
  checkWinner();
}



function fatality() {
  if (healthCountLeft === 0) {
    console.log('fatality inititated');
    fatalitySnd.play();
    setTimeout(() => {
      healthLeft.classList.add('skullmove');
    }, 500);
  }

}



//funkcja sprawdzajaca czy życie < 0
function checkWinner() {
  if (healthCountLeft <= 0) {
    console.log('checking winner');


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
  myAction = 1;
  randomAttack(); //odpalamy funkcje porwonujaca atak z randomem przeciwnika
  console.log(myAction + ' my action');
}

//głowna funkcja obrony
function defenseAction() {
  myAction = 2;
  randomAttack();
  console.log(myAction + ' my action');
}

//głowna funkcja zmyłki
function feintAction() {
  myAction = 0;
  randomAttack();
  console.log(myAction + ' my action');
}
// funkcje dopinające i odpinające defendAction
function allowDefendClick() {
  defend.addEventListener('click', defenseAction);
}

function disallowDefendClick() {
  defend.removeEventListener('click', defenseAction);
}

// funkcje dopinające i odpinające feintAction
function allowFeintClick() {

  feint.addEventListener('click', feintAction);
}

function disallowFeintClick() {
  feint.removeEventListener('click', feintAction);
}

//funkcja dopinajaca atak na klik
function allowAttackClick() {
  atak.addEventListener('click', attack);
}
// funkcja odpinajaca atak
function disallowAttackClick() {
  atak.removeEventListener('click', attack);
}

//Menu code


console.log(menuButton);
menuButton.addEventListener('click', showMenu);

function showMenu() {
  if (asideMenu.style.left !== '0px') {
    asideMenu.style.left = '0px';
  } else {
    asideMenu.style.left = '-50px';
  }
}


// odpalamy funkcje
allowAttackClick();
allowDefendClick();
allowFeintClick();
