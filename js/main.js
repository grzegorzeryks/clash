/*jshint esversion: 6 */

let asideMenu = document.querySelector('aside');
let menuButton = document.querySelector('.aside-button');
let monsta = document.querySelector('.monsta');
let hero = document.querySelector('.hero');
let healthLeft = document.querySelector('.health-left');
let healthRight = document.querySelector('.health-right');
let healthCountLeft = 100;
let healthCountRight = 100;
let win = document.querySelector('.win');
let atak = document.querySelector('.atak');
let defend = document.querySelector('.defend');
let feint = document.querySelector('.feint');
let rightAction = document.querySelector('.right-action');
let leftAction = document.querySelector('.left-action');
//sounds
let evil = new Audio('./snd/evilsound.mp3');
let heroAtakSound = new Audio('./snd/slash2.mp3');
let heroBlockSound = new Audio('./snd/colision.mp3');
let fatalitySnd = new Audio('./snd/fatality.mp3');
let loseSound = new Audio('./snd/evillaugh.mp3');
let eagleSound = new Audio('./snd/eagle.mp3');

let myAction = 0;
// enemyaction = 0 feint
// enemy action  = 1 attack
//enemy action = 2 defend

// random enemyAction attack function
function randomAttack() {
  let enemyAction = Math.floor(Math.random() * 3);
  showEnemyAction(enemyAction);
  if (enemyAction === 0 && myAction === 1) {
    heroBlockSound.play();
    attackVsFeint();
  } else if (enemyAction === 2 && myAction === 2 || enemyAction === 1 && myAction === 1 || enemyAction === 0 && myAction === 0) {
    tie();
  } else if (enemyAction === 0 && myAction === 2) {
    feintVsAttack();
  } else if (enemyAction === 1 && myAction === 0) {
    feintVsAttack();
  } else if (enemyAction === 1 && myAction === 2) {
    heroBlockSound.play();
    attackVsFeint();
  } else if (enemyAction === 2 && myAction === 0) {

    attackVsFeint();
  } else if (enemyAction === 2 && myAction === 1) {
    feintVsAttack()
  }

  console.log(enemyAction + ' enemy action');

}

//showEnemyAction
function showEnemyAction(e) {
  if (e === 1) {
    showEnemyActionInner('Atak!');
  } else if (e === 2) {
    showEnemyActionInner('Obrona!');
  } else {
    showEnemyActionInner('Sztuczka!');
  }
}

function showEnemyActionInner(el) {
  leftAction.classList.add('right-action-show');
  leftAction.innerHTML = '<p>' + el + '</p>';
  setTimeout(function() {
    leftAction.classList.remove('right-action-show');
  }, 1400);
}



// atak vs feint choice
function attackVsFeint() {
  heroAtakSound.play();
  hero.classList.add('slashRun');
  monsta.classList.add('monstaRun');
  disallowAttackClick(); //odpinam funkcje
  console.log('disallow click');
  setTimeout(function() {
    hero.classList.remove('slashRun');
    monsta.classList.remove('monstaRun');
    healthCountLeft = healthCountLeft - 25;
    healthLeft.style.width = healthCountLeft + '%';
    // podpięcie ponowne animacji ataku
    setTimeout(function() {
      allowAttackClick();
    }, 1300);
    console.log(healthCountLeft);
    fatality(); //checking if health zero, fatality initiated

  }, 1400); // this time is a delay for health bar animation
  checkWinner();
}

//attack vs block
function attackVsBlock() {
  monsta.classList.add('monstaAtack');
  hero.classList.add('defendRun');
  heroBlockSound.play();
  disallowDefendClick();
  setTimeout(function() {
    hero.classList.remove('defendRun');
    monsta.classList.remove('monstaAtack');
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


//fatality action animation
let fatalityButton = document.querySelector('.fatality-button');
let eagleAnimation = document.querySelector('.orel');
let footerElement = document.querySelector('footer');


function fatality() {
  if (healthCountLeft === 0) {
    console.log('fatality inititated');
    fatalitySnd.play();
    setTimeout(() => {
      healthLeft.classList.add('skullmove');
    }, 500);
    footerElement.classList.add('hide-footer');
    fatalityButton.style.bottom = '30px';
    fatalityButton.addEventListener('click', function() {
      eagleSound.play();
      eagleAnimation.classList.add('orel-fly');
      heroAtakSound.play();
      monsta.classList.add('monstaRun');
      hero.classList.add('feintRun');
      healthCountLeft = healthCountLeft - 25;
      console.log('enemy health' + healthCountLeft);
      checkWinner();
      setTimeout(() => {
        eagleAnimation.classList.remove('orel-fly');
        footerElement.classList.remove('hide-footer');
        monsta.classList.remove('monstaRun');
        hero.classList.remove('feintRun');
        fatalityButton.style.bottom = '-300px';
      }, 3000);
    });
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
  //player lost
  else if (healthCountRight <= 0) {
    console.log('my health' + healthCountRight);
    loseSound.play();
    setTimeout(() => {
      restoreMonsterToFullHealth();
    }, 2000);

  }
}

function restoreMonsterToFullHealth() {
  healthCountLeft = 100;
  healthCountRight = 100;
  let restart = healthCountLeft + '%';
  healthLeft.style.width = restart;
  healthRight.style.width = restart;
}

// show action function
function showAction(e) {
  rightAction.classList.add('right-action-show');
  rightAction.innerHTML = '<p>' + e + '</p>';
  setTimeout(function() {
    rightAction.classList.remove('right-action-show');
  }, 1400);
}




//głowna funkcja ataku
function attack() {
  showAction('Atak!');
  myAction = 1;
  randomAttack(); //odpalamy funkcje porwonujaca atak z randomem przeciwnika
  console.log(myAction + ' my action');
}

//głowna funkcja obrony
function defenseAction() {
  showAction('Obrona!');
  myAction = 2;
  randomAttack();
  console.log(myAction + ' my action');
}

//głowna funkcja zmyłki
function feintAction() {
  showAction('Sztuczka!');
  myAction = 0;
  randomAttack();
  console.log(myAction + ' my action');
}

// Monster win actions
function feintVsAttack() {
  hero.classList.add('lose');
  heroAtakSound.play();
  monsta.classList.add('monstaAtack');
  disallowFeintClick();
  healthCountRight = healthCountRight - 25;
  setTimeout(function() {
    hero.classList.remove('lose');
    monsta.classList.remove('monstaAtack');

    console.log(healthCountRight);
    healthRight.style.width = healthCountRight + '%';
    allowFeintClick();

  }, 1400);
  checkWinner();
}

// player vs monsta tie
function tie() {
  hero.classList.add('defendRun');
  heroBlockSound.play();
  monsta.classList.add('monstaDefend');
  disallowDefendClick();
  setTimeout(function() {
    hero.classList.remove('defendRun');
    monsta.classList.remove('monstaDefend');
    allowDefendClick();
  }, 1400);
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

let sarmackiLogo = document.querySelector('.sarmacki-logo');

menuButton.addEventListener('click', showMenu);

function showMenu() {
  if (asideMenu.style.left !== '0px') {
    asideMenu.style.left = '0px';
    setTimeout(function() {
      sarmackiLogo.style.left = '-40px';
    }, 600);
  } else {
    asideMenu.style.left = '-125px';
    setTimeout(function() {
      sarmackiLogo.style.left = '-255px';
    }, 600);
  }
}





// odpalamy funkcje
allowAttackClick();
allowDefendClick();
allowFeintClick();
