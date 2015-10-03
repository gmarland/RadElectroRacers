angular.module("rer.game.assets.explosion", []).service("$explosion", [function() {
    return {
		_startRadius: 10,

		create: function(x, z) {
			var that = this;

			var explosion = new THREE.Object3D();
			explosion.name = "explosion";
			explosion.startRadius = this._startRadius;

			var outerSphere = new THREE.Mesh(new THREE.SphereGeometry(this._startRadius, 32, 32 ), new THREE.MeshBasicMaterial({
				color: 0xff0000,
				side:THREE.DoubleSide,
				transparent: true,
				opacity: 0.7
			}));

			explosion.add(outerSphere);

			explosion.position.x = x;
			explosion.position.z = z;

		  	return explosion;
		}
	};
}]);
