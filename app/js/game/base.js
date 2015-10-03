angular.module("rer.game.base", []).service("$base", [function() {
    return {
		_width: 900,
		_length: 600,

		create: function() {
			var that = this;
			var plane = new THREE.Mesh(new THREE.PlaneGeometry(this._width, this._length), new THREE.MeshBasicMaterial({ 
				color: 0x323738, 
				side: THREE.DoubleSide
			}));

			plane.rotation.x = (Math.PI/2);

			plane.getWidth = function() {
				return that._width;
			}

			plane.getLength = function() {
				return that._length;
			}
			
		  	return plane;
		}
	};
}]);