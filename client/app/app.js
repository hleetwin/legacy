angular.module('app', [
  'app.facebook',
  'app.home',
  'app.map',
  'app.maker',
  'app.services',
  'ngRoute',
  'ngMap'
])
.config(function ($routeProvider, $httpProvider) {

  $routeProvider
    .when('/', {
      redirectTo: '/home'
    })
    .when('/home', {
      templateUrl: 'app/home/home.html',
      controller: 'HomeController'
    })
    .when('/facebook', {
      templateUrl: 'app/facebook/facebook.html',
      controller: 'FacebookController'
    })
    .when('/map', {
      templateUrl: 'app/map/map.html',
      controller: 'MapController'
    })
    .when('/mapMaker', {
      templateUrl: 'app/mapMaker/mapMaker.html',
      controller: 'MapMakerController'
    })
    .when('/logout', {
      redirectTo: '/home'
    })
    .when('/directions', {
      templateUrl: 'app/map/directions.html',
      controller: 'MapController'
    })
    .otherwise({
      redirectTo: '/home'
    });

})

.run(function ($rootScope, NgMap) {
  NgMap.getMap().then(function(map) {
    $rootScope.map = map;
  });
});
