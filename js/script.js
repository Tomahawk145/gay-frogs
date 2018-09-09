

var scrollOffset = 0;
animateScroll();

imagesLoaded('body', { background: 'section' },
	function () {
		document.querySelector('#loading').className = 'loaded';
	});

//Get all nav links
var navLinks = document.querySelectorAll('nav a');
for (var i = 0; i < navLinks.length; i++) {
	navLinks[i].addEventListener('click', selectLink);
	navLinks[i].addEventListener('click', setScrollOffset);
}

function selectLink() {
	var index = -1;
	for (var i = 0; i < navLinks.length; i++) {
		if (navLinks[i] == this) index = i; //find where me is
		navLinks[i].className = '';
	}
	this.className = 'selected';

	//First page anims
	if (index == 0) {
		document.querySelector('h1.headbox').innerHTML = "The Museum of alternate facts";
		var img = document.querySelector('#header img');
		if (img.classList.contains("img-appear")) //Reverse if going backwards
		{
			img.classList.remove("img-appear");
			img.classList.add("img-appear-reverse");
		}
	}
	else {
		document.querySelector('h1.headbox').innerHTML = "Museum of alternate facts";
		document.querySelector('#header img').classList.add("img-appear");
		document.querySelector('#header img').classList.remove("img-appear-reverse");
	}
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
var data = "";

//Use this when running from file
var jsonUrl = "https://cdn.rawgit.com/Tomahawk145/gay-frogs/72112f8e/js/Page3Descriptions.json"
//Use this when running hosted
//var jsonUrl = "js/Page3Descriptions.json" 
$.getJSON(jsonUrl, function (json) {
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

	//Update the background
	updateBG(this.currentSlide)
}

function updateCaptions(i) {
	//Update captions
	document.querySelector('.captionTitle').innerHTML = data[i].title;
	document.querySelector('.captionBody').innerHTML = data[i].body;
}

function updateBG(i)
{	
	var img = "url(css/" + (i+1) +".jpg" + ")";	
	document.getElementById("BGChange").style.backgroundImage = img;
}