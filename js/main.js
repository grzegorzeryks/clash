console.log('elo działam');

var head = document.querySelector('.warcze');
var snd = new Audio("evil.mp3");
var animState = head.style.animationPlayState;
console.log(animState);

head.addEventListener('click', function(){
    snd.play();
    head.classList.toggle('run');
  });
