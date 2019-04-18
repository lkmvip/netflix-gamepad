var player, sessId;

// https://stackoverflow.com/questions/10455626/keydown-simulation-in-chrome-fires-normally-but-not-the-correct-key/12522769#12522769
function triggerKeyboardEvent(el, keyCode)
{
    if (el == undefined)
        return;

    var eventObj = document.createEventObject ?
        document.createEventObject() : document.createEvent("Events");
  
    if(eventObj.initEvent){
      eventObj.initEvent("keydown", true, true);
    }
  
    eventObj.keyCode = keyCode;
    eventObj.which = keyCode;
    
    el.dispatchEvent ? el.dispatchEvent(eventObj) : el.fireEvent("onkeydown", eventObj); 
  
} 


var currentTimeout;

function mainLoop() {
    var timeout = 300;
    var video = document.getElementsByTagName('video')[0];

    const g = navigator.getGamepads()[0];
    if (!g) {
        console.log('No gamepad!');
        return;
    }

    if (g.axes[0] < -0.8)
        triggerKeyboardEvent(video, 37)
    else if (g.axes[0] > 0.8)
        triggerKeyboardEvent(video, 39)
    else if (g.axes[1] < -0.8)
        triggerKeyboardEvent(video, 38)
    else if (g.axes[1] > 0.8)
        triggerKeyboardEvent(video, 40)
    else if (g.buttons[0].pressed)
        triggerKeyboardEvent(video, 77)
    else if (g.buttons[1].pressed)
        triggerKeyboardEvent(video, 32)
    else if (g.buttons[9].pressed)
        triggerKeyboardEvent(video, 70)
    else
        timeout = 50;
    currentTimeout = setTimeout(mainLoop, timeout);
}

setTimeout(mainLoop, 2500);