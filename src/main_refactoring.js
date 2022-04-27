'use strict'
import PopUp from './popup.js'
import Field from './field.js'
import * as sound from './sound.js'


const carrot_count = 5;
const bug_count = 5;
const GAME_DURATION_SEC=5;


const gameBtn = document.querySelector('.game_button')
const gameTimer = document.querySelector('.game_timer')
const gameScore = document.querySelector('.game_score')




let started = false; //게임 시작 되었는지 안되었는지, false 면 시작이 안됐단 소리
let score= 0; // 최종점수 기억
let timer = undefined; //남은 시간

const gameFinishBanner = new PopUp();

gameFinishBanner.setClickListener(()=>{
    startGame();
});

const gameField = new Field(carrot_count,bug_count);

gameField.setClickListener(onItemClick);

function onItemClick(item){
    if(!started){
        return;
    }
    if(item === 'carrot'){
        score++;
        updateScoreBoard();
        if(score === carrot_count){
            finishiGame(true);
        }
    }else if(item === 'bug'){
        finishiGame(false);
    }
};


gameBtn.addEventListener('click', ()=>{
    if(started){//게임이 시작 되었다면
        stopGame();
    }else{
        startGame();
    }
    
});


function startGame(){
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    sound.playBackground();
};

function stopGame(){
    started = false;
    stopGameTimer();
    hideGameButton();
    gameFinishBanner.showWithText('REPLAY??')
    // showPopUpWithText('REPLAY??');
    sound.playAlert();
    sound.stopBackground();
};

function  finishiGame(win){
    started = false;
    hideGameButton();
    if(win){
        sound.playwin();
    }else{
        sound.playBug();
    }
    stopGameTimer();
    sound.stopBackground();
    gameFinishBanner.showWithText(win? 'YOU WON!' : 'YOU LOST...');
};


function showStopButton(){
    const icon =gameBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';
};

function hideGameButton(){
    gameBtn.style.visibility = 'hidden';
};

function showTimerAndScore(){
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer(){ 
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(()=>{
        if(remainingTimeSec <=0){
            clearInterval(timer);
            finishiGame(carrot_count === score);
            return;
        }
        updateTimerText(--remainingTimeSec);
    },1000);
};

function stopGameTimer(){
    clearInterval(timer);//위에서 timer에 clearInterval 만들었었으니까 그거 쓰면 됨
};

function updateTimerText(time){
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}

function initGame(){
    score= 0;
    gameScore.innerText = carrot_count;
    gameField.init();
}


function updateScoreBoard(){
    gameScore.innerText = carrot_count - score;
}
