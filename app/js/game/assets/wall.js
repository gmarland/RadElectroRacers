angular.module("rer.game.assets.wall", []).service("$wall", [function() {
    return {
		_wallWidth: 10,
		_wallHeight: 20,

		create: function(x1, z1, x2, z2) {
			var that = this;

			var wall = new THREE.Object3D();
			wall.name = "wall";

			wall.startPoint = {
				x: x1,
				z: z1
			};

			wall.endPoint = {
				x: x2,
				z: z2
			};

			var wallGeometry = this.createWall(x1, z1, x2, z2),
				wallMesh = new THREE.Mesh(wallGeometry, new THREE.MeshLambertMaterial({
				color: 0x7A378B, 
				side:THREE.DoubleSide 
			}));

			// Receive shadows

			wallMesh.receiveShadow = true;

			wall.add(wallMesh);

		  	return wall;
		},

		getWallWidth: function() {
			return this._wallWidth;
		},

		getWallHeight: function() {
			return this._wallHeight;
		},

		createWall: function(x1, z1, x2, z2) {
			var wallGeometry = new THREE.Geometry();

			if ((x1 === x2) || (z1 === z2)) {
				wallGeometry.vertices.push(new THREE.Vector3(x1-(this._wallWidth/2), 0, z1-(this._wallWidth/2)));
				wallGeometry.vertices.push(new THREE.Vector3(x1-(this._wallWidth/2), 0, z2+(this._wallWidth/2)));

				wallGeometry.vertices.push(new THREE.Vector3(x2+(this._wallWidth/2), 0, z1-(this._wallWidth/2)));
				wallGeometry.vertices.push(new THREE.Vector3(x2+(this._wallWidth/2), 0, z2+(this._wallWidth/2)));

				wallGeometry.vertices.push(new THREE.Vector3(x1-(this._wallWidth/2), this._wallHeight, z1-(this._wallWidth/2)));
				wallGeometry.vertices.push(new THREE.Vector3(x1-(this._wallWidth/2), this._wallHeight, z2+(this._wallWidth/2)));

				wallGeometry.vertices.push(new THREE.Vector3(x2+(this._wallWidth/2), this._wallHeight, z1-(this._wallWidth/2)));
				wallGeometry.vertices.push(new THREE.Vector3(x2+(this._wallWidth/2), this._wallHeight, z2+(this._wallWidth/2)));
			}

			wallGeometry.faces.push( new THREE.Face3( 0, 1, 4 ) );
			wallGeometry.faces.push( new THREE.Face3( 4, 5, 1 ) );

			wallGeometry.faces.push( new THREE.Face3( 3, 2, 7 ) );
			wallGeometry.faces.push( new THREE.Face3( 7, 6, 2 ) );

			wallGeometry.faces.push( new THREE.Face3( 1, 3, 5 ) );
			wallGeometry.faces.push( new THREE.Face3( 5, 7, 3 ) );

			wallGeometry.faces.push( new THREE.Face3( 0, 2, 4 ) );
			wallGeometry.faces.push( new THREE.Face3( 4, 6, 2 ) );

			wallGeometry.faces.push( new THREE.Face3( 4, 5, 7 ) );
			wallGeometry.faces.push( new THREE.Face3( 6, 7, 4 ) );

			wallGeometry.faces.push( new THREE.Face3( 0, 1, 3 ) );
			wallGeometry.faces.push( new THREE.Face3( 0, 2, 3 ) );

			wallGeometry.computeFaceNormals();

			return wallGeometry;
		}
	};
}]);
