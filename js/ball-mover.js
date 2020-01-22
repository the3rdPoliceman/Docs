let ball = document.getElementById('useless-ball');

let attractionX = 0.0;
let attractionY = 0.0;

let id = setInterval(frame, 10);

let currentInterestRemaining = 0;

function frame() {
	if (currentInterestRemaining > 0){
		currentInterestRemaining--;
		return;
	}

	let foundSomethingInteresting = Math.floor(Math.random() * 300) == 134;
	if (foundSomethingInteresting){
		let howInteresting = Math.floor(Math.random() * 500);
		currentInterestRemaining = howInteresting;
		return;
	}

    let attractionXAdjustment = Math.floor(Math.random() * 5) - 2;
    let attractionYAdjustment = Math.floor(Math.random() * 5) - 2;
    attractionX = Math.min(attractionX + attractionXAdjustment, 10);
    attractionY = Math.min(attractionY + attractionYAdjustment,10);
    attractionX = Math.max(attractionX + attractionYAdjustment,-10);
    attractionY = Math.max(attractionY + attractionYAdjustment,-10);

    let currentTop = ball.style.top.replace("px", ""); 
    let currentLeft = ball.style.left.replace("px", ""); 
    if (currentTop.length == 0){
        currentTop = 0;
    }
    else{
        currentTop = parseInt(currentTop);
    }

    if (currentLeft.length == 0){
        currentLeft = 0;
    }
    else{
        currentLeft = parseInt(currentLeft);
    }

    if (currentTop < 50){
        attractionY += 1;
    }
    if (currentLeft < 50){
        attractionX += 1;
    }
    if (currentTop > (getViewport()[0] - 50)){
        attractionY -= 1;
    }
    if (currentLeft > (getViewport()[1] - 50)){
        attractionX -= 1;
    }
    if (currentTop < -50){
        attractionY += 1;
    }
    if (currentLeft < -50){
        attractionX += 1;
    }
    if (currentTop > (getViewport()[0] + 50)){
        attractionY -= 1;
    }
    if (currentLeft > (getViewport()[1] + 50)){
        attractionX -= 1;
    }
    
    let movementTop = 0 + attractionY;
    let movementLeft = 0 + attractionX;
    
    let newTop = currentTop + movementTop;
    let newLeft = currentLeft + movementLeft;

    ball.style.top = newTop + 'px'; 
    ball.style.left = newLeft + 'px'; 
}

function getViewport() {

 var viewPortWidth;
 var viewPortHeight;

 // the more standards compliant browsers (mozilla/netscape/opera/IE7) use attractionow.innerWidth and attractionow.innerHeight
 if (typeof window.innerWidth != 'undefined') {
   viewPortWidth = window.innerWidth,
   viewPortHeight = window.innerHeight
 }

// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
 else if (typeof document.documentElement != 'undefined'
 && typeof document.documentElement.clientWidth !=
 'undefined' && document.documentElement.clientWidth != 0) {
    viewPortWidth = document.documentElement.clientWidth,
    viewPortHeight = document.documentElement.clientHeight
 }

 // older versions of IE
 else {
   viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
   viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
 }
 return [viewPortWidth, viewPortHeight];
}