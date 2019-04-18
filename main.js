console.log('Hello, Netflix Gamepad!');

var myScript = document.createElement("script");
myScript.innerHTML = `
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
		var timeout = 1000;

	    const g = navigator.getGamepads()[0];
	    if (!g) {
	    	console.log('No gamepad!');
	    	return;
	    }

	    if (Math.abs(g.axes[0]) > 0.8)
			player.seek(player.getCurrentTime() + g.axes[0] * 10000);
		else if (g.buttons[1].pressed && player.isPlaying())
			player.pause();
		else if (g.buttons[1].pressed && player.isPaused())
			player.play();
		else
			timeout = 50;
		currentTimeout = timeout = setTimeout(mainLoop, timeout);
		// console.log('tick ' + timeout + ' btn ' + g.buttons[1].pressed + ' seek ' + g.axes[0]);
	}

	function mainLoopCancel() {
		clearTimeout(currentTimeout);
	}

	setTimeout(mainLoop, 5000);
`;
document.body.appendChild(myScript);