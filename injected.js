var player, sessId;

var waitForNetflix = setInterval(
    function() {
        videoPlayer = netflix.appContext.state.playerApp.getAPI().videoPlayer;
        if (videoPlayer)
            sessId = videoPlayer.getAllPlayerSessionIds()[0];
        if (sessId)
            player = videoPlayer.getVideoPlayerBySessionId(sessId);
        if (player)
            clearInterval(waitForNetflix);
        console.log('Waiting for player...')
    }, 500
);


var currentTimeout;

function mainLoop() {
    var timeout = 300;

    const g = navigator.getGamepads()[0];
    if (!g) {
        console.log('No gamepad!');
        return;
    }

    if (Math.abs(g.axes[0]) > 0.8)
        player.seek(player.getCurrentTime() + g.axes[0] * 10000);
    else if (Math.abs(g.axes[1]) > 0.8) {
        player.setVolume(player.getVolume() - 0.1 * g.axes[1]);
        timeout = 150
    }
    else if (g.buttons[1].pressed && player.isPlaying())
        player.pause();
    else if (g.buttons[1].pressed && player.isPaused())
        player.play();
    else
        timeout = 50;
    currentTimeout = timeout = setTimeout(mainLoop, timeout);
}

setTimeout(mainLoop, 5000);