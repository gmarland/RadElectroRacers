"use4 strict";

angular.module("rer").controller("IndexCtrl", ["$scope", "$routeParams", function($scope, $routeParams) {
	$scope.playerOneWins = 0; // Current number of player one wins
	$scope.playerTwoWins = 0; // Current number of player two wins

	$scope.maxWins = 3; // number of games a player needs to win

	// Variables for tracking the state of the game

	$scope.gameInProgress = false;
	$scope.gameOver = false;

	$scope.startMatch = false;
	$scope.countDown = 3;
	$scope.imageCounterSrc = "/img/" + $scope.countDown + ".png";

	$scope.isWinner = false;
	$scope.isLoser = false;

	// Load sounds only once so that they can be reused

	$scope.themeTune = new Audio("/sounds/song.wav");
	$scope.themeTune.loop = true;
	$scope.themeTune.volume = 0.5;

	$scope.countdownBeep1 = new Audio("/sounds/beep1.wav");
	$scope.countdownBeep1.volume = 0.6;

	$scope.countdownBeep2 = new Audio("/sounds/beep2.wav");

	// Method to start the game
	$scope.singlePayerGame = function() {
		$scope.gameInProgress = true;

		$scope.countDownMatch();
	};

	// Starts the countown for the game t begin
	$scope.countDownMatch = function() {
		$scope.stopSong();

		$scope.playCounter(3);

		var countdowner = setInterval(function() {
			$scope.countDown--;

			if ($scope.countDown !== 0)  $scope.playCounter();
			else {
				clearInterval(countdowner);

				$scope.startMatch = true;
			}

			$scope.imageCounterSrc = "/img/" + $scope.countDown + ".png";
			$scope.$apply();
		}, 800)
	};

	// Start the next match
	$scope.nextMatch = function() {
		$scope.startMatch = false;
		$scope.countDown = 3;
		$scope.imageCounterSrc = "/img/" + $scope.countDown + ".png";
		$scope.$apply();

		$scope.countDownMatch();
	};

	// Set to the game over state i.e. someone has won the game
	$scope.setGameOver = function() {
		if ($scope.playerOneWins > $scope.playerTwoWins) $scope.isWinner = true;
		else $scope.isLoser = true;

		$scope.gameOver = true;

		$scope.$apply();
	};

	// Starts new game when it is set to the game over state
	$scope.newGame = function() {
		$scope.gameOver = false;

		$scope.playerOneWins = 0;
		$scope.playerTwoWins = 0;

		$scope.isWinner = false;
		$scope.isLoser = false;

		$scope.startMatch = false;
		$scope.countDown = 3;
		$scope.imageCounterSrc = "/img/" + $scope.countDown + ".png";

		$scope.countDownMatch();
	};

	// Make the counter sound during a countdown
	$scope.playCounter = function() {
		setTimeout(function() {
			var counterBeep = null;

			// the 3 and 3 make a different lower pitched beep
			if (($scope.countDown === 3) || ($scope.countDown === 2)) {
				$scope.countdownBeep1.currentTime = 0;
				$scope.countdownBeep1.play();
			}
			else {
				$scope.countdownBeep2.currentTime = 0;
				$scope.countdownBeep2.play();
			}
		}, 0);
	};

	// Pleayers the rocking intro song
	$scope.playSong = function() {
		setTimeout(function() {
			$scope.themeTune.currentTime = 0;
			$scope.themeTune.play();
		}, 0);
	};

	// Stop the rock
	$scope.stopSong = function() {
		if($scope.themeTune) $scope.themeTune.pause()
	};

	$scope.playSong();
}]);