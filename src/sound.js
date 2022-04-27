'use strict'

const bugSound = new Audio('./sound/bug_pull.mp3');
const wonSound = new Audio('./sound/game_win.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const carrotSound = new Audio('./sound/carrot_pull.mp3');

export function playCarrot(){
    playSound(carrotSound);
};

export function playBug(){
    playSound(bugSound);
};
export function playwin(){
    playSound(wonSound);
};
export function playAlert(){
    playSound(alertSound);
};
export function playBackground(){
    playSound(bgSound)
};

export function stopBackground(){
    stopSound(bgSound)
};

function playSound(sound) {
    sound.currnetTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
};