"use strict"
console.log(`Баллы за задачи: 125.\nИтог: 100 баллов\nСлайдер изображений в секции destinations +50 \nна десктоп варианте при клике на урезанную картинку слева или справа изображение меняется по принципу карусели (например если нажать правую картинку та что была в центре на уезжает налево, а та что была видна наполовину оказывается справа). Слайдер может быть как конечным так и бесконечным - данный критерий не должен влиять на оценку + 20 \nТри точки внизу отображают "номер слайда", то есть каждому слайду соответствует свой кружочек, который становится активным при нахождении соответствующего ему слайда в центре. На мобильном варианте картинка одна, но поверх нее появляются стрелочки навигации (можно сделать как карусель или же затемнять кнопку если слайдер достиг края) +20\nАнимации плавного перемещения для слайдера +10 \n Нажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап + 50 \nлогин попап соответствует верстке его закрытие происходит при клике вне попапа +25\nлогин попап имеет 2 инпута (логин и пароль) при нажатии на кнопку Sign In показывается браузерный алерт с введенными данными (для реализации можно использовать тег ) +25\nНажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал а просто меняет его наполнение). +25`)

let pageHeader__Nav = document.querySelector('.pageHeader__Nav');
let Burger = document.querySelector('.Burger');
let H_S = document.querySelector('.H_S');
let Cross = document.querySelector('.Cross')
let Nav = document.querySelector('.pageNav');
let MenuClose = function(){
	pageHeader__Nav.classList.remove('active');
	Burger.classList.remove('active');
	H_S.classList.remove('active');
};

Cross.addEventListener('click', MenuClose);
H_S.addEventListener('click', MenuClose);
Nav.addEventListener('click', MenuClose);
Burger.addEventListener('click', function(){
	pageHeader__Nav.classList.toggle('active');
	Burger.classList.toggle('active');
	H_S.classList.toggle('active');
});

let PopUp = document.querySelector('.PopUp')
let PopUpContent = document.querySelector('.PopUp__content')
let AccountNav = document.querySelector('.Account_nav')
let HeaderButton = document.querySelector('.pageHeader__Button')

let addPopUpTaglet = (...elements) => {
	elements.forEach(element => {
		element.addEventListener('click', () => {
			PopUp.classList.toggle('PopUp__active'); 
			PopUpContent.classList.toggle('PopUp__content__active');
		});
	});
};

PopUp.addEventListener('click', (event) => {
	if (event.target.classList.contains('PopUp')){
		PopUp.classList.toggle('PopUp__active'); 
		PopUpContent.classList.toggle('PopUp__content__active');
	}
});

addPopUpTaglet(AccountNav, HeaderButton)

let alertButton = document.querySelector('.SingUp__button')

alertButton.addEventListener('click', () =>{
	let mail = document.getElementById('mail').value;
	let pass = document.getElementById('pass').value;
	alert(`Ваш E-mail: ${mail} \n Ваш пороль: ${pass}`)
});

//* ====================add Login to Sing UP trahcsorm========================

let register = document.querySelector('.register__link')
register.addEventListener('click', ()=> {
	document.querySelector('.SingInWith').classList.toggle('DisplayNone')
	document.querySelector('.Forgot').classList.toggle('DisplayNone')

	if (!register.classList.contains('LogInPopUp')){
		document.querySelector('.PopUp__Heading-text').innerHTML = 'Create account'
		document.querySelector('.register__text').innerHTML = 'Already have an account? '
		register.innerHTML = 'Log in'
		alertButton.innerHTML = 'Sing Up'
		register.classList.toggle('LogInPopUp')

	} else {
		document.querySelector('.PopUp__Heading-text').innerHTML = 'Log in to your account'
		document.querySelector('.register__text').innerHTML = 'Don’t have an account? '
		register.innerHTML = 'Register'
		alertButton.innerHTML = 'Sing In'
		register.classList.toggle('LogInPopUp')
	}
});
//*=========================Slider =====================================
const leftArrow = document.querySelector('.Arrow__left');
const leftRight = document.querySelector('.Arrow__right');
let sliderStart = document.querySelector('.Slider__item-start');
let sliderEnd = document.querySelector('.Slider__item-end');
let Slaid = document.querySelectorAll('.Slaid')
let Slaider = document.querySelector('.Slider')
const SlaidConst = Slaid
let translateXValue =0
let roundValue = 0
let round = document.querySelectorAll('.Slider__Round')
let checIndicator = () =>{
	if(roundValue == 0){
		Slaid[1].classList.add('Toleft')
		round[1].classList.add('mid')
		Slaid[2].classList.remove('Toleft')
		Slaid[3].classList.remove('Toleft')
		round[0].classList.remove('mid')
		round[2].classList.remove('mid')
	} else if(roundValue == 1){
		Slaid[2].classList.add('Toleft')
		round[2].classList.add('mid')
		round[1].classList.remove('mid')
		round[0].classList.remove('mid')
	} else if(roundValue == 2){
		Slaid[3].classList.add('Toleft')
		round[0].classList.add('mid')
		round[2].classList.remove('mid')
		round[1].classList.remove('mid')
	} else if(roundValue == -1){
		Slaid[0].classList.add('Toleft')
		Slaid[2].classList.remove('Toleft')
		round[0].classList.add('mid')
		round[2].classList.remove('mid')
		round[1].classList.remove('mid')
	} else if(roundValue == -2){
		Slaid[1].classList.remove('Toleft')
		round[2].classList.add('mid')
		round[0].classList.remove('mid')
		round[1].classList.remove('mid')
	}
	console.log(roundValue)
}
checIndicator()
leftArrow.addEventListener('click', () => {
	if(translateXValue < 210){
		translateXValue += 105
		roundValue -= 1
	} else{
		translateXValue = 0
		roundValue = 0
	}
		Slaid.forEach((element)  =>{
			element.style.transform =`translateX(${translateXValue}%)`
		})
		checIndicator()
})
leftRight.addEventListener('click', () => {
	if(translateXValue > -210){
		translateXValue -= 105
		roundValue += 1
	} else{
		translateXValue = 0
		roundValue = 0
	}
	Slaid.forEach((element)  =>{
		element.style.transform =`translateX(${translateXValue}%)`
		checIndicator()
	})
})






