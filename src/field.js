'use strict'
import * as sound from './sound.js'


const carrot_size = 80;

export default class Field{
    constructor(carrotCount, bugCount){
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game_field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click', event => this.onClick(event));
        
    }

    init() {
        this.field.innerHTML = '';//시작할 때 마다 필드 리셋
        this._addItem('carrot', this.carrotCount, 'img/carrot.png')
        this._addItem('bug', this.bugCount, 'img/bug.png')
    }

    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }

    _addItem(className, count, imgPath){
        const x1 = 0;
        const y1 =0;
        const x2 = this.fieldRect.width - carrot_size; //당근 사이즈만큼 빼줘야 그림이 필드를 넘어가지 않는다
        const y2 = this.fieldRect.height - carrot_size; //당근 사이즈만큼 빼줘야 그림이 필드를 넘어가지 않는다
        for(let i=0; i <count; i++){
            const item = document.createElement('img');
    
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
    
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            item.style.left = `${x}px`
            item.style.top = `${y}px`
            this.field.appendChild(item);
        }
    }

    onClick(event) {
        const target = event.target;
        if(target.matches('.carrot')){
            // console.log('당근')
            target.remove();
            sound.playCarrot();
            this.onItemClick && this.onItemClick('carrot');
        }else if(target.matches('.bug')){
            this.onItemClick && this.onItemClick('bug');
        }
        
    }
    
}

function randomNumber(min, max){
    return Math.random() * (max-min) + min;
}
function playSound(sound) {
    sound.currentTime= 0;
    sound.play();
}
