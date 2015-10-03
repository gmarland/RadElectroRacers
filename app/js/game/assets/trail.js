angular.module("rer.game.assets.trail", []).service("$trail", [function() {
    return {
    	_colors: {
    		"player": 0x147CE8,
    		"enemy": 0xFFFF00
    	},

		_width: 1,
		_height: 10,

		create: function(type, x1, z1, x2, z2) {
			var that = this;

			var trail = new THREE.Object3D();
			trail.name = "trail";

			trail.startPoint = {
				x: x1,
				z: z1
			};

			trail.endPoint = {
				x: x2,
				z: z2
			};

			var trailGeometry = this.createTrail(x1, z1, x2, z2),
				trailMesh = new THREE.Mesh(trailGeometry, new THREE.MeshLambertMaterial({
					color: this._colors[type], 
					side:THREE.DoubleSide,
					transparent: true,
					opacity: 0.7
				}));

			trail.add(trailMesh);

		  	return trail;
		},

		createTrail: function(x1, z1, x2, z2) {
			var trailGeometry = new THREE.Geometry();

			if ((x1 === x2) || (z1 === z2)) {
				if (x1 > x2) {
					var tmpX = x1;
					x1 = x2;
					x2 = tmpX;
				} 

				if (z1 > z2) {
					var tmpZ = z1;
					z1 = z2;
					z2 = tmpZ;
				} 

				trailGeometry.vertices.push(new THREE.Vector3(x1-(this._width/2), 0, z1-(this._width/2)));
				trailGeometry.vertices.push(new THREE.Vector3(x1-(this._width/2), 0, z2+(this._width/2)));

				trailGeometry.vertices.push(new THREE.Vector3(x2+(this._width/2), 0, z1-(this._width/2)));
				trailGeometry.vertices.push(new THREE.Vector3(x2+(this._width/2), 0, z2+(this._width/2)));

				trailGeometry.vertices.push(new THREE.Vector3(x1-(this._width/2), this._height, z1-(this._width/2)));
				trailGeometry.vertices.push(new THREE.Vector3(x1-(this._width/2), this._height, z2+(this._width/2)));

				trailGeometry.vertices.push(new THREE.Vector3(x2+(this._width/2), this._height, z1-(this._width/2)));
				trailGeometry.vertices.push(new THREE.Vector3(x2+(this._width/2), this._height, z2+(this._width/2)));
			}

			trailGeometry.faces.push( new THREE.Face3( 0, 1, 4 ) );
			trailGeometry.faces.push( new THREE.Face3( 4, 5, 1 ) );

			trailGeometry.faces.push( new THREE.Face3( 3, 2, 7 ) );
			trailGeometry.faces.push( new THREE.Face3( 7, 6, 2 ) );

			trailGeometry.faces.push( new THREE.Face3( 1, 3, 5 ) );
			trailGeometry.faces.push( new THREE.Face3( 5, 7, 3 ) );

			trailGeometry.faces.push( new THREE.Face3( 0, 2, 4 ) );
			trailGeometry.faces.push( new THREE.Face3( 4, 6, 2 ) );

			trailGeometry.faces.push( new THREE.Face3( 4, 5, 7 ) );
			trailGeometry.faces.push( new THREE.Face3( 6, 7, 4 ) );

			trailGeometry.faces.push( new THREE.Face3( 0, 1, 3 ) );
			trailGeometry.faces.push( new THREE.Face3( 0, 2, 3 ) );

			trailGeometry.computeFaceNormals();

			return trailGeometry;
		}
	};
}]);
