

var scrollOffset = 0;
animateScroll();

//load in audio
var audio = new Audio('audio/bangers.mp3');

function stopAudio()
{
	audio.pause();
	audio.currentTime = 0;
}

//Loading page
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

	//Play audio or don't
	index == 4 ? audio.play() : stopAudio();

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

	//Doof doof
	if(index == 4)
	{
		BPM = 125;
		setInterval(doof, 1000 * 60 / 125);
	}
	else
	{
		clearInterval(); //sthawp
		document.querySelector('.speaker').classList.remove('doof');
	}
}

function doof()
{
	document.querySelector('.speaker').AnimationPlayState
}

function stopDoof()
{

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
var jsonUrl = "https://rawgit.com/Tomahawk145/gay-frogs/master/js/Page3Descriptions.json"
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

	//Update the background with blurred slide images
	updateBG(this.currentSlide)
}

function updateCaptions(i) 
{
	document.querySelector('.captionTitle').innerHTML = data[i].title;
	document.querySelector('.captionBody').innerHTML = data[i].body;
}

function updateBG(i)
{	
	var img = "url(css/" + (i+1) +".jpg" + ")";	
	document.getElementById("BGChange").style.backgroundImage = img;
}

//Twitter form
//Text validation
$('#message').on('input', remaining); //Event to call function every keypress
$(document).ready(remaining) //Also call once after the page is ready to get size + set color
function remaining() 
{
	//Find out how many letters are remaining and show user
	var me = document.querySelector('#message');
    var remain = me.maxLength - me.value.length; 
	$('#remaining').text(remain);
	
	//Set to red or blue depending on if the amount is valid
	$('#remaining').css('color', remain <= 0 ? 'red' : '#263350');
}

//Text submission
$('#twitter').on('submit', checkForm); //Event to call function on click
function checkForm(event) 
{
    event.preventDefault(); //Stop default behevaiour
    var twit = $('#message').val();
    tweet = encodeURIComponent(twit); //Filter out any special characters that might stuff up the URL
	if (twit.length > 0)
	{
        window.open('https://twitter.com/intent/tweet?text=' + tweet, '', 'top="500",left="500",menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600')
	} else 
	{
        alert("Your tweet can't be empty! Or is that just what the Illuminati wants you to think????")
    }
}