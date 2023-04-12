let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    startGame();
}


function startGame() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.restart = false;
    document.getElementById('restart-counter').innerHTML = 10;
    loadGameScreen();
}


function fullscreen() {
    let fullscreen = document.getElementById('game-screen');
    enterFullscreen(fullscreen);
}


function leaveFullscreen() {
    exitFullscreen();
}


function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}


function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


function muteAllSounds() {
    world.gameSound = false;
    world.AUDIO_BACKGROUND.pause();
    world.AUDIO_BOSSBATTLE.pause();
    document.getElementById('mute').classList.add('d-none');
    document.getElementById('unmute').classList.remove('d-none');
}


function unmuteAllSounds() {
    world.gameSound = true;
    document.getElementById('mute').classList.remove('d-none');
    document.getElementById('unmute').classList.add('d-none');
}


function showInfo() {
    document.getElementById('info-screen').classList.remove('d-none');
}


function closeInfo() {
    document.getElementById('info-screen').classList.add('d-none');
}


function loadGameScreen() {
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('end-screen').classList.add('d-none');
    document.getElementById('start-btn').classList.add('d-none');
    document.getElementById('restart-screen').classList.add('d-none');
    document.getElementById('mute').classList.remove('d-none');
    document.getElementById('unmute').classList.add('d-none');
    document.getElementById('loading-screen').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('d-none');
    }, 1000)
}


window.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement !== null) {
        document.getElementById('enter-fullscreen').classList.add('d-none');
        document.getElementById('exit-fullscreen').classList.remove('d-none');
    } else {
        document.getElementById('enter-fullscreen').classList.remove('d-none');
        document.getElementById('exit-fullscreen').classList.add('d-none');
    }
})


window.addEventListener('resize', () => {
    if (window.innerWidth <= 900 && window.innerHeight <= 480) {
        document.getElementById('game-screen').classList.remove('d-none');
        document.getElementById('mobile-overlay').classList.add('d-none');
        document.getElementById('mobile-btn-container').classList.remove('d-none');
        document.getElementById('enter-fullscreen').classList.add('d-none');
    } else if (window.innerWidth <= 900) {
        document.getElementById('game-screen').classList.add('d-none');
        document.getElementById('mobile-overlay').classList.remove('d-none');
    } else if (document.fullscreenElement == null) {
        document.getElementById('enter-fullscreen').classList.remove('d-none');
        document.getElementById('game-screen').classList.remove('d-none');
        document.getElementById('mobile-overlay').classList.add('d-none');
        document.getElementById('mobile-btn-container').classList.add('d-none');
    }
})
