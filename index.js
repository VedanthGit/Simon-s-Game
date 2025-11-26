var buttonColours = ["red", "blue", "green", "yellow"];
const startBtn = document.getElementById("start-btn");
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

startBtn.addEventListener("click", function () {
	if (!started) {
		startBtn.style.display = "none";
		document.getElementById("level-title").textContent = "Level " + level;
		nextSequence();
		started = true;
	}
});

var buttons = document.querySelectorAll(".btn");
buttons.forEach(function (btn) {
	btn.addEventListener("click", function () {
		if (!started) return;

		var userChosenColour = this.id;
		userClickedPattern.push(userChosenColour);

		animatePress(userChosenColour);

		checkAnswer(userClickedPattern.length - 1);
	});
});

function restartOnClick() {
	location.reload();
}

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(nextSequence, 1000);
		}
	} else {
		document.body.classList.add("game-over");
		document.getElementById(
			"level-title"
		).textContent = `Game Over, your score: ${level}`;

		setTimeout(() => {
			document.getElementById("level-title").textContent =
				"Click anywhere to restart";
		}, 8000);

		setTimeout(() => {
			document.body.classList.remove("game-over");
		}, 500);

		setTimeout(() => {
			document.addEventListener("click", restartOnClick);
		}, 10);
	}
}

function nextSequence() {
	userClickedPattern = [];
	level++;
	document.getElementById("level-title").textContent = "Level " + level;
	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	var element = document.getElementById(randomChosenColour);
	element.style.opacity = "1";
	setTimeout(() => {
		element.style.opacity = "0.3";
	}, 100);
	setTimeout(() => {
		element.style.opacity = "1";
	}, 200);
}

function animatePress(currentColor) {
	var activeButton = document.getElementById(currentColor);
	activeButton.classList.add("pressed");

	setTimeout(() => {
		activeButton.classList.remove("pressed");
	}, 100);
}

function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}
