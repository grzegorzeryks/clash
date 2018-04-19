let head = document.querySelector('.warcze');
let evil = new Audio('evilsound.mp3');
let slashSound = new Audio('slash.wav');
let monsta = document.querySelector('.monsta');
let slash = document.querySelector('.slash');
let healthLeft = document.querySelector('.health-left');
let healthCountRight = 100;
let win = document.querySelector('.win');

//slash parent
let atak = document.querySelector('.atak');

atak.addEventListener('click', (function() {
  slashSound.play();
  slash.classList.add('slashRun');
  monsta.classList.add('monstaRun');

  setTimeout(function() {
    slash.classList.remove('slashRun');
    monsta.classList.remove('monstaRun');

    let hRchange = healthCountRight + '%';

    healthLeft.style.width = hRchange;
  }, 1400);
  healthCountRight = healthCountRight - 25;

  if (healthCountRight > 0) {
    return healthCountRight;
  } else {
    setTimeout(() => {
      win.style.display = 'block';
      win.style.animationPlayState = 'running';
      evil.play();
      healthCountRight = 100;
      console.log(healthCountRight);
      let restart = healthCountRight + '%';

      healthLeft.style.width = restart;
      //zmień to na podmianke klasy potem
      //settimeouta do zmiany nunning na paused
      setTimeout(() => {
        win.style.display = 'none';

      }, 2000)
    }, 2000);

  }
}));

// document.getElementById("p2").style.color = "blue";
