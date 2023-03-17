window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)
window.addEventListener('load', getWeather)
window.addEventListener('load', getLang)
window.addEventListener('load', setBg)
window.addEventListener('load', setView)




const setIcon = document.querySelector('.satings__ico');
const setings = document.querySelector('.setings');
setIcon.addEventListener('click', () => {
	setings.classList.toggle('show')
});
const settingsElement = {
	RU: ['Язык', 'Источники', 'тег', 'Плеер', 'Список дел', 'Погода', 'Дата и время', 'Приветствие', 'Цитаты', 'Таких нет', 'Ошибка!'],
	EN: ['Language', 'Sources', 'tag', 'Player', 'To-do', 'Weather', 'Time and date', 'Greeting', 'Quotes', 'invalid request', 'Erorr!']
}
const greetingTranslation = {
	RU: ['Спокойной ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер', 'Ru-ru', 'Скорость вестра:', 'м/с', 'Влажность:', '[Введите имя]', '[Введите задачу]', 'Введите что-нибуть корректоное : )', 'Минск', `Ошибка! я такой город не знаю`, 'Ошибка! Пустя строка тут не пройдет, попробуй что-нибудь ввести'],
	EN: ['Good night', 'Good morning', 'Good afternoon', 'Good evneng', 'En-en', 'Wind speed:', 'm/s', 'Humidity:', '[Entar name]', '[Entar the task]', 'Enter something correct :)', 'Minsk', `Error! city not found for`, 'Error! Nothing to geocode for "!'],
}

let tag = ''

const form = document.forms.settings;
const settLang = form.elements.Language
const settBgS = form.elements.Sources
const settTag = form.elements.tag
const settPlay = form.elements.Player
const settToDo = form.elements.Todo
const settW = form.elements.Weather
const settT = form.elements.Time
const settG = form.elements.Greeting
const settQ = form.elements.Quotes
let pageLang = settLang.value
const error = document.querySelector('.error')
//* set Page language

function getLang() {
	pageLang = settLang.value
	if (!localStorage.enterCity) {
		city.value = greetingTranslation[pageLang][11]
	}
	task.placeholder = greetingTranslation[pageLang][9]
	name.placeholder = greetingTranslation[pageLang][8]
	getQuotes()
	getWeather()
	settLang.previousSibling.textContent = settingsElement[pageLang][0]
	settBgS.previousSibling.textContent = settingsElement[pageLang][1]
	settTag.placeholder = settingsElement[pageLang][2]
	settPlay.previousSibling.textContent = settingsElement[pageLang][3]
	settToDo.previousSibling.textContent = settingsElement[pageLang][4]
	settW.previousSibling.textContent = settingsElement[pageLang][5]
	settT.previousSibling.textContent = settingsElement[pageLang][6]
	settG.previousSibling.textContent = settingsElement[pageLang][7]
	settQ.previousSibling.textContent = settingsElement[pageLang][8]
	if (error.textContent) {
		error.textContent = settingsElement[pageLang][9]
	}
	setPlaceholders()
}

settLang.addEventListener('change', getLang)
settBgS.addEventListener('change', () => {
	setBg()
	if (settBgS.value == 'git') {
		settTag.style.display = 'none'
		error.textContent = ''
	} else (settTag.style.display = 'inline')
})

settTag.addEventListener('change', () => {
	tag = settTag.value
	setBg()
})
//! hiden 
let body = document.querySelector('body')
const player = document.querySelector('.player')
const todo = document.querySelector('.todo')
const weather = document.querySelector('.weather')
const greetingContainer = document.querySelector('.greeting-container')
const footer = document.querySelector('.footer')

function setView() {
	if (settPlay.checked) {
		player.classList.remove('remove')
	} else {
		player.classList.add('remove')
	}
	if (!settToDo.checked) {
		todo.classList.add('remove')
	} else {
		todo.classList.remove('remove')
	}
	if (!settW.checked) {
		weather.classList.add('remove')
	} else {
		weather.classList.remove('remove')
	}
	if (!settT.checked) {
		time.classList.add('remove')
		pageDate.classList.add('remove')
	} else {
		time.classList.remove('remove')
		pageDate.classList.remove('remove')
	}
	if (!settG.checked) {
		greetingContainer.classList.add('remove')
	} else {
		greetingContainer.classList.remove('remove')
	}
	if (!settQ.checked) {
		footer.classList.add('remove')
	} else {
		footer.classList.remove('remove')
	}
}
body.addEventListener('change', chack)
function chack(event) {
	if (event.target.classList.contains('hiden')) {
		setView()
	}
}


//!!!!===========================
const task = document.querySelector('.todo__text');
const toDoActive = document.querySelector('.todo__active');
const toDoDone = document.querySelector('.todo__done');
const toDoAdd = document.querySelector('.todo__add');
const todoItems = document.querySelector('.todo__items')
let toDoActiveList = []
let toDoDoneList = []
const time = document.querySelector('.time')
const pageDate = document.querySelector('.date') //* get date element
const greeting = document.querySelector('.greeting') //* get span for greeding
const name = document.querySelector('.name')

//FlickrAPI git UnsplashAPI



function setPlaceholders() {
	name.placeholder = greetingTranslation[pageLang][8];
	task.placeholder = greetingTranslation[pageLang][9];
}

setPlaceholders()
// ! ------- =========== ======================= Time and Date

function showTimeDate() {
	const date = new Date();
	const options = { weekday: 'long', month: 'long', day: 'numeric' };
	const currentDate = date.toLocaleDateString(greetingTranslation[pageLang][4], options);
	const currentTime = date.toLocaleTimeString('ru-RU');
	time.textContent = currentTime;
	pageDate.textContent = currentDate;
	setTimeout(showTimeDate, 1000);
}

showTimeDate()  //! Shoew time in the page

// ! =========================================== Gredeeng
let linkValue = ''
function getTimeOfDay(lang) {
	const date = new Date();
	const hours = date.getHours();
	const x = Math.floor(hours / 6)
	greeting.textContent = greetingTranslation[lang][x];

	const linkText = (num) => { // get time of day
		switch (num) {
			case 1: return linkValue = `morning`;
			case 2: return linkValue = `afternoon`;
			case 3: return linkValue = `evening`;
			case 0: return linkValue = `night`;
		};
	};
	linkText(x)
	setTimeout(getTimeOfDay, 1000, pageLang);
};

getTimeOfDay(pageLang)


//! ==================================== - Set and get Local Storage
function setLocalStorage() {
	localStorage.setItem('name', name.value);
	localStorage.setItem('city', city.value);
	localStorage.setItem('tsak', todoItems.innerHTML);
	localStorage.setItem('donetsak', toDoDoneitems.innerHTML)
	localStorage.setItem('settLang', settLang.value)
	localStorage.setItem('settBgS', settBgS.value)
	localStorage.setItem('settTag', settTag.value)
	localStorage.setItem('settPlay', settPlay.checked)
	localStorage.setItem('settToDo', settToDo.checked)
	localStorage.setItem('settW', settW.checked)
	localStorage.setItem('settT', settT.checked)
	localStorage.setItem('settQ', settQ.checked)
	localStorage.setItem('settG', settG.checked)
}
function strToBull(str) {
	return str == 'true' ? true : false;
}
function getLocalStorage() {
	console.log(Object.keys(localStorage).length == 0)
	if (!Object.keys(localStorage).length == 0) {
		name.value = localStorage.getItem('name');
		if (!localStorage.enterCity) {
			city.value = greetingTranslation[pageLang][11]
		} else city.value = localStorage.getItem('city');
		settLang.value = localStorage.getItem('settLang');
		pageLang = settLang.value;
		settBgS.value = localStorage.getItem('settBgS');
		settTag.value = localStorage.getItem('settTag');
		tag = settTag.value
		settPlay.checked = strToBull(localStorage.getItem('settPlay'));
		settToDo.checked = strToBull(localStorage.getItem('settToDo'));
		settW.checked = strToBull(localStorage.getItem('settW'));
		settT.checked = strToBull(localStorage.getItem('settT'));
		settQ.checked = strToBull(localStorage.getItem('settQ'));
		settG.checked = strToBull(localStorage.getItem('settG'));
		tag = settTag.value
	} else {
		settLang.value = 'EN'
		city.value = greetingTranslation[pageLang][11]
		getWeather()
		name.value = ''
		tag = linkValue
	}
	todoItems.innerHTML = localStorage.getItem('tsak')
	toDoDoneitems.innerHTML = localStorage.getItem('donetsak')
}

//! ==================================== - Background slider
let bgNum = getRandomNum(1, 20)
function getRandomNum(min, max) {
	return (min + Math.floor(Math.random() * (max - 1)))
}

function setBg() {
	const img = new Image();
	if (settBgS.value == 'git') {
		img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${linkValue}/${(String(bgNum).padStart(2, 0))}.jpg`
		img.addEventListener('load', () => {
			body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${linkValue}/${(String(bgNum).padStart(2, 0))}.jpg')`;
		})
	} else if (settBgS.value == 'UnsplashAPI') {
		setUnsplasBg(img)
	} else if (settBgS.value == 'FlickrAPI') {
		setFlickrBg(img)
	}
	if (settBgS.value == 'git') {
		settTag.style.display = 'none'
		error.textContent = ''
	} else {
		(settTag.style.display = 'inline')
	}

	sliderNext.addEventListener('click', getSliderNext)
	slidePrev.addEventListener('click', getSlidePrev)
}

function getSliderNext() {
	sliderNext.removeEventListener('click', getSliderNext);
	{ (bgNum < 20) ? bgNum++ : bgNum = 1; };
	setBg()
}

function getSlidePrev() {
	slidePrev.removeEventListener('click', getSlidePrev);
	{ (bgNum > 1) ? bgNum-- : bgNum = 20; };
	setBg()
}


async function setUnsplasBg(img) {
	const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=BWq0i9wnLwS8iFA9Aj638QX6jNyDoWjp-Dw3f5zjOQQ`;
	const res = await fetch(url);
	const date = await res.json();
	try {
		img.src = date.urls.regular;
		img.addEventListener('load', () => {
			setTimeout(body.style.backgroundImage = `url('${date.urls.regular}')`, 500)
			error.textContent = ''
		})
	}
	catch {
		if (date.errors[0] == "No photos found.") {
			error.textContent = settingsElement[pageLang][9]
		} else {
			setings.classList.add('show')
			error.textContent = settingsElement[pageLang][10]
		}
	}
}

async function setFlickrBg(img) {
	const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=7f74eae9c9528b5ae12c00e8f67ed93f&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;
	const res = await fetch(url);
	const date = await res.json();
	try {
		if (date.photos.pages) {
			img.src = date.photos.photo[getRandomNum(0, date.photos.photo.length - 1)].url_l;
			img.addEventListener('load', () => {
				setTimeout(body.style.backgroundImage = `url('${img.src}')`, 500)
				error.textContent = ''
			})
		} else { error.textContent = settingsElement[pageLang][10] }
	} catch {
		setings.classList.add('show')
		error.textContent = settingsElement[pageLang][9] //? БОРАБОТКА КРИВОГО ТЕГОА
	}
}

const slidePrev = document.querySelector('.slide-prev')
const sliderNext = document.querySelector('.slide-next')




//! =========================================- Wether widget
const city = document.querySelector('.city')
city.addEventListener('change', getWeather)
city.addEventListener('change', () => {
	localStorage.setItem('enterCity', true)
})

async function getWeather() {
	try {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${pageLang}&appid=386f7825b15d18dd5a129be7bbe1c5c7&units=metric`;
		const res = await fetch(url);
		const data = await res.json()
		weatherIcon.className = 'weather-icon owf';
		weatherIcon.classList.add(`owf-${data.weather[0].id}`);
		tempereture.textContent = `${Math.floor(data.main.temp)}°C`;
		weatherDiscription.textContent = data.weather[0].description;
		wind.textContent = `${greetingTranslation[pageLang][5]} ${Math.floor(data.wind.speed)} ${greetingTranslation[pageLang][6]}`;
		humidity.textContent = `${greetingTranslation[pageLang][7]} ${Math.floor(data.main.humidity)}%`;
		weatherError.textContent = ''
	} catch {
		tempereture.textContent = '';
		weatherDiscription.textContent = '';
		tempereture.textContent = '';
		wind.textContent = '';
		humidity.textContent = '';
		if (city.value) {
			weatherError.textContent = `${greetingTranslation[pageLang][12]} '${city.value}'`
		} else {
			weatherError.textContent = greetingTranslation[pageLang][13]
		}
	}
}


const weatherIcon = document.querySelector('.weather-icon')
const tempereture = document.querySelector('.temperature')
const weatherDiscription = document.querySelector('.weather-description')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const weatherError = document.querySelector('.weather-error')

//! ===========================================- Greeting widget

async function getQuotes() {
	const quotes = `data${pageLang}.json`;
	const res = await fetch(quotes);
	const data = await res.json();
	quote.textContent = (data[quotesNum].text);
	author.textContent = (data[quotesNum].author);
	quoteButton.addEventListener('click', changeQuote)
}

const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const quoteButton = document.querySelector('.change-quote')
let quotesNum = getRandomNum(0, 7)

getQuotes()

function changeQuote() {
	quoteButton.removeEventListener('click', changeQuote)
	{ quotesNum == 7 ? quotesNum = 0 : quotesNum++ }
	setTimeout(getQuotes, 1000)
}


let deg = 0;

quoteButton.addEventListener('click', go)

function go() {
	let id = setInterval(rotate, 1);
	function rotate() {
		quoteButton.removeEventListener('click', go)
		quoteButton.style.WebkitTransform = "rotate(" + deg + "deg)";
		{ (deg == 360) ? deg = 0 : deg += 1.5; }
		if (deg == 0) {
			quoteButton.style.WebkitTransform = "rotate(" + deg + "deg)";
			quoteButton.addEventListener('click', go)
			clearInterval(id)
		}
	}
};

//! ================================================- Audio player
const sounds = ['Ennio Morricone', 'River Flows In You', 'Summer Wind']
playNow = 0

const playNext = document.querySelector('.play-next')
const playPrev = document.querySelector('.play-prev')
const playList = document.querySelector('.play-list')
const play = document.querySelector('.play')
const audio = new Audio();
let isPlay = false


play.addEventListener('click', starStopPlayer)
playNext.addEventListener('click', letsPlayNext)
playPrev.addEventListener('click', letsPlayPrev)

sounds.forEach(element => {
	let li = document.createElement('li')
	li.classList.add('sound')
	li.textContent = element
	playList.append(li)
})
const progress = document.querySelector('progress')
const trackName = document.querySelector('.track__name')
const trackTime = document.querySelector('.track__time')
let soundList = document.querySelectorAll('.sound')
const speeker = document.querySelector('.speeker')

speeker.addEventListener('click', () => {
	if (isPlay) {
		if (audio.volume == 0) {
			speeker.style.backgroundImage = 'url(../momentum/assets/svg/volume+.svg)'
			audio.volume = 1;
			range.volume = 100;
		} else {
			speeker.style.backgroundImage = 'url(../momentum/assets/svg/volume-.svg)'
			audio.volume = 0;
			range.volume = 0;
		}
	}
})
function playAudio() {
	trackName.textContent = sounds[playNow]
	audio.src = `../momentum/assets/sounds/${sounds[playNow]}.mp3`;
	audio.currentTime = 0;
}

range.onchange = function () {
	if (this.value == this.min) {
		audio.volume = 0;
		speeker.style.backgroundImage = 'url(../momentum/assets/svg/volume-.svg)'
	} else if (this.value == this.max) {
		audio.volume = 1;
	} else {
		speeker.style.backgroundImage = 'url(../momentum/assets/svg/volume+.svg)'
		audio.volume = this.value / 100
	}
}
setInterval(() => {
	if (isPlay) {
		trackTime.textContent = `${Math.floor(audio.currentTime / 60)}:${Math.floor(audio.currentTime % 60)} / ${Math.floor(audio.duration / 60)}:${Math.floor(audio.duration % 60)}`
		progress.value = audio.duration / 100 * audio.currentTime
	}
}, 150);

function myFunction() {
	let x = event.clientX - 20;
	let y = event.clientY;
	let width = progress.clientWidth;
	if (x >= 0 && x <= width + 10) {
		audio.currentTime = (x / (width * 0.01)) * audio.duration / 100
		progress.value = x / (width * 0.01);
	}
	console.log(x)
}
progress.addEventListener('mousedown', myFunction)


playAudio()
function starStopPlayer() {
	if (isPlay) {
		audio.pause();
		isPlay = false;
		play.classList.toggle('pause')
	} else {
		audio.play();
		isPlay = true;
		soundList[playNow].classList.add('isPaly')
		play.classList.toggle('pause')
	};
}

function letsPlayNext() {
	soundList[playNow].classList.remove('isPaly')
	if (playNow == sounds.length - 1) {
		playNow = 0
	} else {
		playNow++
	}
	soundList[playNow].classList.toggle('isPaly')
	playAudio()
	if (isPlay == true) {
		audio.play()
	}
}

function letsPlayPrev() {
	soundList[playNow].classList.remove('isPaly')
	if (playNow == 0) {
		playNow = sounds.length - 1
	} else {
		playNow -= 1
	}
	soundList[playNow].classList.toggle('isPaly')
	playAudio()
	if (isPlay == true) {
		audio.play()
	}
}
audio.addEventListener('ended', letsPlayNext)

//! ============================================== - ToDo list

function getTask() {
	if (!(task.value.length === 0 || !task.value.trim())) {
		toDoActiveList.push(task.value)
		let div = document.createElement('div')
		let p = document.createElement('p')
		let doneBth = document.createElement('button')
		let deleteBth = document.createElement('button')
		doneBth.classList.add('welldone')
		deleteBth.classList.add('trash')
		div.classList.add('task')
		p.classList.add('taskText')
		p.textContent = task.value
		div.prepend(deleteBth)
		div.prepend(doneBth)
		div.prepend(p)
		todoItems.prepend(div)
		task.placeholder = greetingTranslation[pageLang][9];
	} else {
		task.value = ''
		task.placeholder = greetingTranslation[pageLang][10];
	}
	task.value = ''
	showeTask()
}

toDoAdd.addEventListener('click', getTask)
task.addEventListener('change', getTask)

document.addEventListener('click', function (event) {
	if (event.target.classList.contains('welldone')) {
		event.target.parentNode.classList.add('doneTask')
		event.target.classList.add('doneTask')
		setTimeout(() => {
			event.target.style.display = 'none'
			toDoDoneitems.prepend(todoItems.removeChild(event.target.parentNode))
		}, 150);
	}
	if (event.target.classList.contains('trash')) {
		event.target.parentNode.classList.add('deleteTask')
		setTimeout(() => {
			event.target.parentNode.remove()
		}, 150)
	}
})

const toDoDoneitems = document.createElement('div')

toDoDoneitems.classList.add('todo__active-done')

function showeDoneTask() {
	try {
		todoItems.parentNode.replaceChild(toDoDoneitems, todoItems)
		toDoDone.classList.add('isPaly')
		toDoActive.classList.remove('isPaly')
	}
	catch {
		return null
	}
}

function showeTask() {
	try {
		toDoDone.classList.remove('isPaly')
		toDoActive.classList.add('isPaly')
		toDoDoneitems.parentNode.replaceChild(todoItems, toDoDoneitems)
	}
	catch {
		return null
	};
};

toDoDone.addEventListener('click', showeDoneTask);
toDoActive.addEventListener('click', showeTask);

//!=======================================- Setings 

//console.log('Выполнены все пункты ТЗ кроме\n- можно запустить и остановить проигрывания трека кликом по кнопке Play/Pause рядом с ним в плейлисте +3\nОценка 157 балла\nДописывал в ночь, не успел как следует протестить, если что-то отвалилсоь, напишите мне в Дискорд\n')

