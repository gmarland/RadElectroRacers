"use strict";

/* App Module */
angular.module("rer", []) // Overall module

// Import other modules
var module = angular.module("main", [
	"rer",
	"rer.game.assets.wall",
	"rer.game.assets.bike",
	"rer.game.assets.trail",
	"rer.game.models.player",
	"rer.game.models.enemy",
	"rer.game.assets.explosion",
	"rer.game.base",
	"rer.game.skybox",
	"rer.game.scene",
	"ngRoute"]);

module.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  	$routeProvider.when("/", { templateUrl: "/partials/main/index.html", controller: "IndexCtrl"});
  	$routeProvider.when("/:sessionId", { templateUrl: "/partials/main/index.html", controller: "IndexCtrl"});

  	$locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
}]);