"use strict";

var app = angular.module("rer.game.scene", []);

app.directive("scene", function($window, $document, $parse, $base, $wall, $bike, $explosion, $skybox) {
    return {
        restrict: "E",
        scope: {},
        link: function(scope, element, attr, ctrl) {
			var that = this;

	    	scope.scene = null;

	    	scope.camera = null;
	    	scope.controls = null;
	    	
	    	scope.renderer = null;

	    	scope.base = null;

	    	scope.walls = [];

	    	scope.playerOneBike = null;
	    	scope.playerTwoBike = null;

	    	// Load sounds only once 

			scope.engine = new Audio("/sounds/bike.wav");
			scope.engine.loop = true;
			scope.engine.volume = 0.4;

			scope.explode = new Audio("/sounds/explode.wav");

			// --------------- Setting up scene

			function buildScene() {
				scope.scene = new THREE.Scene();
				scope.camera = new THREE.PerspectiveCamera(75, $("#main-body").width()/$("#main-body").height(), 0.1, 2000 );

				scope.camera.position.y = 380;
				scope.camera.position.z = 380;

				scope.camera.lookAt(new THREE.Vector3(0,0,0));

				scope.renderer = new THREE.WebGLRenderer({ antialias: true });
				scope.renderer.setSize($("#main-body").width()-3, $("#main-body").height()-3);
				scope.renderer.shadowMapEnabled = true;
				scope.renderer.shadowMapType = THREE.PCFSoftShadowMap;

				$("#main-body").append(scope.renderer.domElement);
			}

			function addLighting() {
				var ambientLight = new THREE.AmbientLight(0xfefefe); 
		      
				var directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); 
				directionalLight.position.set(80, 100, 250); 
				directionalLight.castShadow = true;
				directionalLight.shadowDarkness = 0.1;
				directionalLight.shadowCameraVisible = false;
	    		directionalLight.shadowCameraFar = 1000;

				scope.scene.add(ambientLight); 
		      	scope.scene.add(directionalLight);
			}

			function createRenderScene() {
				var that = this;

				var render = function () {
					requestAnimationFrame( render );

					update();

					scope.renderer.render(scope.scene, scope.camera);
				};

				render();
			}

			function bindEvents() {
				var that = this;

				$window.addEventListener( "resize", function() {
					scope.camera.aspect = $("#main-body").width()/$("#main-body").height();
				    scope.camera.updateProjectionMatrix();

					scope.renderer.setSize($("#main-body").width()-3, $("#main-body").height()-3);
				}, false);

				$window.addEventListener("keydown", function(e) {
					if (scope.playerOneBike) {
						switch(e.keyCode) {
							case 38: 
								scope.playerOneBike.setDirection("n");
								break;
							case 40: 
								scope.playerOneBike.setDirection("s");
								break;
							case 39: 
								scope.playerOneBike.setDirection("e");
								break;
							case 37: 
								scope.playerOneBike.setDirection("w");
								break;
						}
					}
				}, false);
			}

			function startGame() {
				if (scope.playerOneBike) {
					for (var i=0; i<scope.playerOneBike.trails.length; i++) {
						scope.scene.remove(scope.playerOneBike.trails[i]);
						scope.playerOneBike.trails[i] = null;
					}
					scope.playerOneBike.trails = null;
					scope.playerOneBike = null;
				}

				if (scope.playerTwoBike) {
					for (var i=0; i<scope.playerTwoBike.trails.length; i++) {
						scope.scene.remove(scope.playerTwoBike.trails[i]);
						scope.playerTwoBike.trails[i] = null;
					}	

					scope.playerTwoBike.trails = null;
					scope.playerTwoBike = null;
				}

				scope.playerOneBike = $bike.create("player", 0, 0, "e");
				scope.scene.add(scope.playerOneBike);

				scope.playerTwoBike = $bike.create("enemy", 0, 0, "w");
				scope.scene.add(scope.playerTwoBike);

				playBikeEngine();
			}

			function playBikeEngine() {
				scope.engine.currentTime = 0;
				scope.engine.play();
			}

			function stopBikeEngine() {
				scope.engine.pause();
			}

			function update() {
				if ((scope.playerOneBike) && (!scope.playerOneBike.dead)) {
					var enemyTrails = [];
					if (scope.playerTwoBike) enemyTrails = scope.playerTwoBike.trails;

					scope.playerOneBike.drive(scope.scene);

					if (scope.playerOneBike.isCollided(scope.walls, enemyTrails)) {
						scope.$parent.playerTwoWins++;

						bikeCrashed("playerOne");
					}
				}

				if ((scope.playerTwoBike) && (!scope.playerTwoBike.dead)) {
					var playerTrails = [];
					if (scope.playerOneBike) playerTrails = scope.playerOneBike.trails;

					 scope.playerTwoBike.enemyAI(scope.walls, playerTrails);

					scope.playerTwoBike.drive(scope.scene);

					if (scope.playerTwoBike.isCollided(scope.walls, playerTrails)) {
						scope.$parent.playerOneWins++;

						bikeCrashed("playerTwo");
					}
				}
			}

			function bikeCrashed(winner) {
				function createExplosion() {
					var bike = null;

					if (winner == "playerOne") bike = scope.playerOneBike;
					else bike = scope.playerTwoBike;

					var explosion = $explosion.create(bike.position.x, bike.position.z);
					scope.scene.add(explosion);

					var explosionTicker = 1;

					var explosionTimer = setInterval(function() {
						explosion.scale.x = explosionTicker*0.2;
						explosion.scale.y = explosionTicker*0.2;
						explosion.scale.z = explosionTicker*0.2;
						explosionTicker++;

						if (explosionTicker === 20) {
							clearInterval(explosionTimer);
							scope.scene.remove(explosion);
							explosion = null;
						}
					}, 5);
				}

				stopBikeEngine();

				createExplosion();

				scope.explode.currentTime = 0;
				scope.explode.play();

				scope.playerOneBike.dead = true;
				scope.playerTwoBike.dead = true;

				scope.scene.remove(scope.playerTwoBike);
				scope.scene.remove(scope.playerOneBike);

				if ((scope.$parent.playerOneWins != scope.$parent.maxWins) && 
					(scope.$parent.playerTwoWins != scope.$parent.maxWins)) scope.$parent.nextMatch();
				else scope.$parent.setGameOver();
			}

			buildScene();

			addLighting();

			scope.scene.add($skybox.create());

			scope.base = $base.create();

			scope.scene.add(scope.base);

			// Create the bounding walls
			scope.walls.push($wall.create((scope.base.getWidth()/2)*-1, ((scope.base.getLength()/2)*-1), (scope.base.getWidth()/2), ((scope.base.getLength()/2)*-1))); // top
			scope.walls.push($wall.create((scope.base.getWidth()/2)*-1, (scope.base.getLength()/2), (scope.base.getWidth()/2), (scope.base.getLength()/2))); // bottom
			scope.walls.push($wall.create((scope.base.getWidth()/2)*-1, ((scope.base.getLength()/2)*-1)+$wall.getWallWidth(), ((scope.base.getWidth()/2)*-1), (scope.base.getLength()/2)-$wall.getWallWidth())); // left
			scope.walls.push($wall.create((scope.base.getWidth()/2), ((scope.base.getLength()/2)*-1)+$wall.getWallWidth(), (scope.base.getWidth()/2), (scope.base.getLength()/2)-$wall.getWallWidth())); //right

			for (var i=0; i<scope.walls.length; i++) {
				scope.scene.add(scope.walls[i]);
			}

			bindEvents();

			createRenderScene();	

			scope.$watch("$parent.startMatch", function(newValue, oldValue)	{
				if(newValue) startGame();
			});
        }
    }
});