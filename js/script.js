

var navLinks = document.querySelectorAll( 'nav a' );

var scrollOffset = 0;

animateScroll();

imagesLoaded( 'body', { background: 'section' }, 
			 function() {
	document.querySelector('#loading').className = 'loaded';
	setTimeout (function() {
		AOS.init( {duration: 1000});
	}, 1000);
} );

for (var i= 0; i< navLinks.length; i++){
	navLinks[i].addEventListener('click', selectLink);
	navLinks[i].addEventListener('click', setScrollOffset);
}

function selectLink() {
	for (var i = 0; i < navLinks.length; i++){
		navLinks[i].className = '';
	}
	this.className = 'selected';
}

function setScrollOffset ( event ) {
	event.preventDefault();
	var section = document.querySelector(this.hash);
	scrollOffset = section.offsetTop;
	requestAnimationFrame( animateScroll );
}

function animateScroll() {
	var scrollPosition = document.documentElement.scrollTop||document.body.scrollTop;
	var scrollDistance = Math.round( scrollOffset - scrollPosition);
	if (scrollDistance > 0) {
		scrollPosition += Math.ceil( scrollDistance / 10);
		requestAnimationFrame(animateScroll);
	} else if (scrollDistance < 0){	
		scrollPosition += Math.floor( scrollDistance / 10);
		requestAnimationFrame( animateScroll); 
	} 
	document.documentElement.scrollTop = scrollPosition;
	document.body.scrollTop = scrollPosition;
}
