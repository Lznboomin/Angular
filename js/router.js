var app = angular.module('myApp', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: "index.html"
    })
    .when('/todo', {
        templateUrl: "todo.html"
    })
    .when('/examples', {
        templateUrl: "examples.html"
    })  
    .when('/resources', {
        templateUrl: "resources.html"
    })
    .when('/game', {
        templateUrl: "game.html"
    })
    .when('/feedback', {
        templateUrl: "feedback.html"
    })
    .when('/thankyou', {
        templateUrl: "thank_you.html"
    });
});