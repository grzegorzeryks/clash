var head = document.querySelector('.warcze');
var snd = new Audio('evilsound.mp3');
var slashSound = new Audio('slash.wav');

head.addEventListener('click', function() {

  setTimeout(function() {
    head.classList.remove('run')
  }, 1000);
});

//slash parent
var slash = document.querySelector('.slash');
var state = true;

slash.addEventListener('click', (function() {
  slashSound.play();
  slash.classList.add('slashRun');

  setTimeout(function() {
    slash.classList.remove('slashRun');
    snd.play();
    head.classList.add('run');
    setTimeout(() => {
      head.classList.remove('run');
    }, 3000)

  }, 2000);
}));

// document.getElementById("p2").style.color = "blue";
