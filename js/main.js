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

function attack() {
  slashSound.play();
  slash.classList.add('slashRun');
  monsta.classList.add('monstaRun');

  setTimeout(function() {
    slash.classList.remove('slashRun');
    monsta.classList.remove('monstaRun');

    let hRchange = healthCountRight + '%';

    healthLeft.style.width = hRchange;
    allowAttackClick()
  }, 1400);
  healthCountRight = healthCountRight - 25;

  if(healthCountRight <= 0) {
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
atak.removeEventListener('click', attack);
}


atak.addEventListener('click', attack );

function allowAttackClick(){
  atak.addEventListener('click', attack );
}
// document.getElementById("p2").style.color = "blue";
