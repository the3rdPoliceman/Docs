// config settings
let framesPerSecond = 200.0;
let averageTimeToFindSomethingInteresting = 1200.0; // average time in ms to find something of interest
let interestTimeLimit = 8000.0;  // maximum time to retain interest, in ms
let speedLimit = 15.0;  // max pixels per frame to move in any direction per frame
let accelerationLimit = 25; // maximum acceleration (in pixels per frame) per frame
let attractionToMiddleOfScreen = 0.2;

// constants
const MS_PER_SECOND = 1000.0

// main code
let ball = document.getElementById('useless-ball');
let speedX = 0.0;
let speedY = 0.0;
let accelerationRange = accelerationLimit * 2 + 1;
let speedYcurrentInterestLevel = 0;
let msPerRefresh = Math.floor((1.0/framesPerSecond) * MS_PER_SECOND);
let framesToFindSomethingInteresting = Math.floor(averageTimeToFindSomethingInteresting/msPerRefresh)

// start loop
let id = setInterval(refresh, msPerRefresh);
function refresh() {
	if (speedYcurrentInterestLevel > 0){
		speedYcurrentInterestLevel--;
		return;
	}

	let foundSomethingInteresting = Math.floor(Math.random() * framesToFindSomethingInteresting) == 0;
	if (foundSomethingInteresting){
		speedYcurrentInterestLevel = Math.floor(Math.random() * interestTimeLimit/MS_PER_SECOND * framesPerSecond);
        speedX = 0.0;
        speedY = 0.0;
		return;
	}

    let speedXAdjustment = (Math.floor(Math.random() * accelerationRange) - accelerationLimit)/10;
    let speedYAdjustment = (Math.floor(Math.random() * accelerationRange) - accelerationLimit)/10;
    speedX = Math.min(speedX + speedXAdjustment, speedLimit);
    speedY = Math.min(speedY + speedYAdjustment, speedLimit);
    speedX = Math.max(speedX + speedYAdjustment, -1 * speedLimit);
    speedY = Math.max(speedY + speedYAdjustment, -1 * speedLimit);

    let currentTop = ball.style.top.replace("px", ""); 
    let currentLeft = ball.style.left.replace("px", ""); 
    currentTop = (currentTop.length == 0) ? 0 : parseInt(currentTop);
    currentLeft = (currentLeft.length == 0) ? 0 : parseInt(currentLeft);

    let viewportWidth = getViewport()[0];
    let viewportHeight = getViewport()[1];
    let halfViewportWidth = viewportWidth/2;
    let halfViewportHeight = viewportHeight/2;

    let xRatio = (halfViewportWidth - currentLeft)/halfViewportWidth;
    let yRatio = (halfViewportHeight - currentTop)/halfViewportHeight;

    speedX += xRatio * attractionToMiddleOfScreen;
    speedY += yRatio * attractionToMiddleOfScreen;
    
    let movementTop = 0 + speedY;
    let movementLeft = 0 + speedX;
    
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