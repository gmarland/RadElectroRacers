angular.module("rer.game.assets.bike", []).service("$bike", ["$trail", "Player", "Enemy", function($trail, Player, Enemy) {
    return {
		_width: 20,
		_height: 10.5,
		_length: 5,

		_rays: {
			"n": new THREE.Vector3(0, 0, -1), // north
			"s": new THREE.Vector3(0, 0, 1), // south
			"e": new THREE.Vector3(1, 0, 0), // east
			"w": new THREE.Vector3(-1, 0, 0) //west
	   },

		create: function(type, x, z, direction) {
			var that = this;

			var bike = new THREE.Object3D();
			
			bike.name = "bike";
			bike.dead = false;
			bike.bikeType = type;
			bike.speed = 7.5;
			bike.direction = direction;
			bike.ticksSinceTurn = 0;

			bike.trails = [];

			var loader = new THREE.ObjectLoader();

			if (type == "player") bike.add(loader.parse(Player));
			else bike.add(loader.parse(Enemy));

			if (direction == "e") {
				bike.position.x = this._width/2;
				bike.position.z = z;
			}
			else {
				bike.position.x = (this._width/2)*-1;
				bike.position.z = z;
				bike.rotateY(Math.PI)
			}

			bike.caster = new THREE.Raycaster(), new THREE.Raycaster();

			switch(this.direction) {
				case "n":
  					bike.caster.set(bike.position, this._rays["n"]);
					break;
				case "s":
  					bike.caster.set(bike.position, this._rays["s"]);
					break;
				case "e":
  					bike.caster.set(bike.position, this._rays["e"]);
					break;
				case "w":
  					bike.caster.set(bike.position, this._rays["w"]);
					break;
			}

			// Add object methods

			bike.drive = function(scene) {
				switch(this.direction) {
					case "n":
						this.position.z -= this.speed;
	  					this.caster.set(this.position, that._rays["n"]);
						break;
					case "s":
						this.position.z += this.speed;
	  					this.caster.set(this.position, that._rays["s"]);
						break;
					case "e":
						this.position.x += this.speed;
	  					this.caster.set(this.position, that._rays["e"]);
						break;
					case "w":
						this.position.x -= this.speed;
	  					this.caster.set(this.position, that._rays["w"]);
						break;
				}

				if (bike.trails.length === 0) bike.trails.push($trail.create(this.bikeType, this.position.x, this.position.z, this.position.x, this.position.z));

				var startX = bike.trails[(bike.trails.length-1)].startPoint.x,
					startZ = bike.trails[(bike.trails.length-1)].startPoint.z;

				scene.remove(bike.trails[(bike.trails.length-1)]);

				bike.trails[(bike.trails.length-1)] = null;
				bike.trails[(bike.trails.length-1)] = $trail.create(this.bikeType, startX, startZ, this.position.x, this.position.z);

				scene.add(bike.trails[(bike.trails.length-1)]);

				this.ticksSinceTurn++;
			};

			bike.getClosestWallCollision = function(walls) {
				// Check for wall collisions
				var wallCollisions = this.caster.intersectObjects(walls, true);

				wallCollisions.sort(function(a,b) {
					return a.distance > b.distance ? 1 : a.distance < b.distance ? -1 : 0;
				});

				if (wallCollisions.length > 0) return wallCollisions[0].distance;
				else return null;
			};

			bike.getClosestTrailCollision = function(trails) {
				var closestCollision = null;

				// Check my own trail collisions
				if (this.trails.length > 1) {
					var myTrailCollisions = this.caster.intersectObjects(this.trails.slice(0, (this.trails.length-1)), true);

					myTrailCollisions.sort(function(a,b) {
						return a.distance > b.distance ? 1 : a.distance < b.distance ? -1 : 0;
					});

					if (myTrailCollisions.length) closestCollision = myTrailCollisions[0].distance;
				}

				// Check other trail collisions
				if ((trails) && (trails.length > 0)) {
					var trailCollisions = this.caster.intersectObjects(trails, true);

					trailCollisions.sort(function(a,b) {
						return a.distance > b.distance ? 1 : a.distance < b.distance ? -1 : 0;
					});

					if (trailCollisions.length > 0) {
						if (closestCollision !== null) {
							if (trailCollisions[0].distance < closestCollision) closestCollision = trailCollisions[0].distance;
						}
						else closestCollision = trailCollisions[0].distance;
					}
				}

				return closestCollision;
			};

			bike.previewPath = function(direction, walls, trails) {
				this.caster.set(this.position, that._rays[direction]);

				var closestWallCollision = this.getClosestWallCollision(walls),
					closestTrailCollision = this.getClosestTrailCollision(trails);

				if ((closestTrailCollision) && (closestWallCollision > closestTrailCollision)) return closestTrailCollision;
				else return closestWallCollision;
			};

			bike.enemyAI = function(walls, trails) {
				function getRandomInt(min, max) {
				    return Math.floor(Math.random() * (max - min + 1)) + min;
				}

				if (this.ticksSinceTurn > 20) {
					if (getRandomInt(0, 15) === 0) {
						var newDirection = this.direction;

						switch(this.direction) {
							case "n":
							case "s":
								var clostestCollisionC = this.previewPath(this.direction, walls, trails),
									clostestCollisionW = this.previewPath("w", walls, trails),
									clostestCollisionE = this.previewPath("e", walls, trails);

								if (((clostestCollisionC < clostestCollisionW) && (clostestCollisionC < clostestCollisionW)) || (getRandomInt(0, 1) === 1)) {
									if (clostestCollisionW > clostestCollisionE) newDirection = "w";
									else if (clostestCollisionE > clostestCollisionW) newDirection = "e";
									else {
										if (getRandomInt(0, 1) === 1) newDirection = "w";
										else newDirection = "e";
									}
								}
								break;
							case "e":
							case "w":
								var clostestCollisionC = this.previewPath(this.direction, walls, trails),
									clostestCollisionN = this.previewPath("n", walls, trails),
									clostestCollisionS = this.previewPath("s", walls, trails);

								if (((clostestCollisionC < clostestCollisionN) && (clostestCollisionC < clostestCollisionS)) || (getRandomInt(0, 1) === 1)) {
									if (clostestCollisionN > clostestCollisionS) newDirection = "n";
									else if (clostestCollisionS > clostestCollisionN) newDirection = "s";
									else {
										if (getRandomInt(0, 1) === 1) newDirection = "n";
										else newDirection = "s";
									}
								}
								break;
						}

						if (newDirection != this.direction) {
							var clostCollision = this.previewPath(newDirection, walls, trails);

							if ((clostCollision == null) || (clostCollision >= 200)) {
								this.setDirection(newDirection);
							}
							else this.caster.set(this.position, that._rays[this.direction]);
						}
						else this.caster.set(this.position, that._rays[this.direction]);
					}
				}
				
				if (this.ticksSinceTurn > 1) {
					var closestWallCollision = this.getClosestWallCollision(walls),
						closestTrailCollision = this.getClosestTrailCollision(trails);

					var isWallCollision = false;
					if (closestWallCollision !== null) isWallCollision = ((closestWallCollision < 30) && (closestWallCollision > 12));
					
					var isTrailCollition = false;
					if (closestTrailCollision !== null) isTrailCollition = ((closestTrailCollision < 60) && (closestTrailCollision > 30));

					if (isWallCollision || isTrailCollition) {
						var newDirection = this.direction;

						switch(this.direction) {
							case "n":
							case "s":
								var clostestCollisionW = this.previewPath("w", walls, trails),
									clostestCollisionE = this.previewPath("e", walls, trails);

								if (clostestCollisionW > clostestCollisionE) newDirection = "w";
								else if (clostestCollisionE > clostestCollisionW) newDirection = "e";
								else {
									if (getRandomInt(0, 1) === 1) newDirection = "w";
									else newDirection = "e";
								}
								break;
							case "e":
							case "w":
								var clostestCollisionN = this.previewPath("n", walls, trails),
									clostestCollisionS = this.previewPath("s", walls, trails);

								if (clostestCollisionN > clostestCollisionS) newDirection = "n";
								else if (clostestCollisionS > clostestCollisionN) newDirection = "s";
								else {
									if (getRandomInt(0, 1) === 1) newDirection = "n";
									else newDirection = "s";
								}
								break;
						}

						this.setDirection(newDirection);
					}
				}
			};

			bike.isCollided = function(walls, trails) {
				// Check for wall collisions
				var wallCollisions = this.caster.intersectObjects(walls, true);

				wallCollisions.sort(function(a,b) {
					return a.distance > b.distance ? 1 : a.distance < b.distance ? -1 : 0;
				});

				if ((wallCollisions.length) && (wallCollisions[0].distance < (that._width/2))) return true;

				// Check my own trail collisions
				if (this.trails.length > 1) {
					var myTrailCollisions = this.caster.intersectObjects(this.trails.slice(0, (this.trails.length-1)), true);

					myTrailCollisions.sort(function(a,b) {
						return a.distance > b.distance ? 1 : a.distance < b.distance ? -1 : 0;
					});

					if ((myTrailCollisions.length) && (myTrailCollisions[0].distance < (that._width/2))) return true;
				}

				// Check other trail collisions
				if ((trails) && (trails.length > 0)) {
					var trailCollisions = this.caster.intersectObjects(trails, true);

					trailCollisions.sort(function(a,b) {
						return a.distance > b.distance ? 1 : a.distance < b.distance ? -1 : 0;
					});

					if ((trailCollisions.length) && (trailCollisions[0].distance < (that._width/2))) return true;
				}

				return false;
			};

			bike.setDirection = function(direction) {
				var startX = this.position.x,
					startZ = this.position.z;

				switch(direction) {
					case "n":
						if ((this.direction == "e") || (this.direction == "w")) {
							if (this.direction == "e")  this.rotateY( Math.PI / 2 );
							if (this.direction == "w")  this.rotateY( ((Math.PI / 2)*-1) );

							this.direction = "n";
		  					this.caster.set(this.position, that._rays["n"]);

							bike.trails.push($trail.create(this.bikeType, startX, startZ, this.position.x, this.position.z));
						}
						break;
					case "s":
						if ((this.direction == "e") || (this.direction == "w")) {
							if (this.direction == "e")  this.rotateY( ((Math.PI / 2)*-1) );
							if (this.direction == "w")  this.rotateY( Math.PI / 2 );

							this.direction = "s";
		  					this.caster.set(this.position, that._rays["s"]);

							bike.trails.push($trail.create(this.bikeType, startX, startZ, this.position.x, this.position.z));
						}
						break;
					case "e":
						if ((this.direction == "n") || (this.direction == "s")) {
							if (this.direction == "n")  this.rotateY( ((Math.PI / 2)*-1) );
							if (this.direction == "s")  this.rotateY( Math.PI / 2 );

							this.direction = "e";
		  					this.caster.set(this.position, that._rays["e"]);

							bike.trails.push($trail.create(this.bikeType, startX, startZ, this.position.x, this.position.z));
						}
						break;
					case "w":
						if ((this.direction == "n") || (this.direction == "s")) {
							if (this.direction == "n")  this.rotateY( Math.PI / 2 );
							if (this.direction == "s")  this.rotateY( ((Math.PI / 2)*-1) );

							this.direction = "w";
		  					this.caster.set(this.position, that._rays["w"]);

							bike.trails.push($trail.create(this.bikeType, startX, startZ, this.position.x, this.position.z));
						}
						break;
				}

				this.ticksSinceTurn = 0;
			};

		  	return bike;
		}
	};
}]);
