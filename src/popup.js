'use strict';

export default class PopUp {
    constructor(){
        //멤버변수 : 특정 객체와 연결된 변수
        this.popUp = document.querySelector('.popup');
        this.popUpText = document.querySelector('.pop-up_message');
        this.popUpRefresh = document.querySelector('.pop-up_refresh');
        this.popUpRefresh.addEventListener('click',()=>{
            this.onClick && this.onClick();
            this.hide();
        });
    }

    setClickListener(onClick){
        this.onClick = onClick;
    }

    showWithText(text){
        this.popUpText.innerHTML = text;
        this.popUp.classList.remove('pop-up_hide');
    }
    

    hide(){
        this.popUp.classList.add('pop-up_hide');
    }
}
