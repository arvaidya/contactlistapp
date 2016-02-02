var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function(){

    $http.get('/contactList').success(function(response){

    	console.log("Received data from server");

    	$scope.contactsList = response;
    });
};

refresh();

    $scope.addContact = function(){
    	console.log($scope.contact);

    	$http.post('/addContact',$scope.contact).success(function(response){
    		console.log(response);
    		refresh();
    	});

    };

    $scope.remove = function(id){
    	console.log(id);

    	$http.delete('/deleteContact/' + id).success(function(response){
    		refresh();
    	});
    };

    $scope.edit = function(id){
    	console.log(id);

    	$http.get('/editContact/' + id).success(function(response){
    		$scope.contact = response;
    	});
    }


    $scope.update = function(id){
    	console.log(id);

    	/*$http.get('/editContact/' + id).success(function(response){
    		$scope.contact = response;
    	});*/
    }
   
}]);