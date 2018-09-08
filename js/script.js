
//Get all nav links
var navLinks = document.querySelectorAll('nav a');
var scrollOffset = 0;

animateScroll();

imagesLoaded('body', { background: 'section' },
	function () {
		document.querySelector('#loading').className = 'loaded';
		setTimeout(function () {
			AOS.init({ duration: 1000 });
		}, 1000);
	});

for (var i = 0; i < navLinks.length; i++) {
	navLinks[i].addEventListener('click', selectLink);
	navLinks[i].addEventListener('click', setScrollOffset);
}

function selectLink() {
	for (var i = 0; i < navLinks.length; i++) {
		navLinks[i].className = '';
	}
	this.className = 'selected';
}

function setScrollOffset(event) {
	event.preventDefault();
	var section = document.querySelector(this.hash);
	scrollOffset = section.offsetTop;
	requestAnimationFrame(animateScroll);
}

function animateScroll() {
	var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
	var scrollDistance = Math.round(scrollOffset - scrollPosition);
	if (scrollDistance > 0) {
		scrollPosition += Math.ceil(scrollDistance / 10);
		requestAnimationFrame(animateScroll);
	} else if (scrollDistance < 0) {
		scrollPosition += Math.floor(scrollDistance / 10);
		requestAnimationFrame(animateScroll);
	}
	document.documentElement.scrollTop = scrollPosition;
	document.body.scrollTop = scrollPosition;
}


//Siema stuffff
const mySiema = new Siema({
	onChange: onChangeCallback,
});



//Load in description data from file async
//Since chrome is a tight ass and can't load json from a local file, this needs to be hosted somewhere
//So if you're running locally on a server, 
var data = "";
$.getJSON("js/Page3Descriptions.json", function(json) {
	data = json;
	updateCaptions(0);
});

//daddy javascript... I don't feel so good uwu
var removed = false; //Flag to only trigger once
function onChangeCallback() {
	if (!removed) {
		removed = true;
		var hand = document.querySelector('.pointer');
		hand.classList.add('fade');

		setTimeout(() => {
			hand.remove();
		}, 4000); //delayed remove after fade for E F F I C I E N C Y
	}

	//Update captions
	updateCaptions(this.currentSlide);
}

function updateCaptions(i)
{
	//Update captions
	document.querySelector('.captionTitle').innerHTML = data[i].title;
	document.querySelector('.captionBody').innerHTML = data[i].body;
}
