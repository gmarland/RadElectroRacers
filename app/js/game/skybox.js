angular.module("rer.game.skybox", []).service("$skybox", [function() {
    return {
		_skyDistance: 1500,

		_skyMaterial: new THREE.MeshBasicMaterial({
			color: 0x111111, 
			side:THREE.DoubleSide 
		}),

		create: function() {
			var skyGeometry = new THREE.BoxGeometry(this._skyDistance, this._skyDistance, this._skyDistance),
				skyMesh = new THREE.Mesh(skyGeometry, this._skyMaterial);

		  	return skyMesh;
		}
	};
}]);