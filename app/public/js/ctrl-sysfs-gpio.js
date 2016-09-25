(function(){
'use strict';

angular.module('hipoApp')

.controller('sysfsGpioCtrl',
function( $scope, $http, $interval ) {
	console.log( 'CALL sysfsGpioCtrl' );

	$scope.forward_time  = 100;
	$scope.forward_count = 10;
	$scope.backward_time  = 100;
	$scope.backward_count = 10;

	$scope.forward_rest_count  = 10;
	$scope.backward_rest_count = 10;

	var state_timer;
	
	state_timer = $interval( function () {
//		console.log( "CALL ctrl-Main loop");
		$http({
			url: "/control/state",
			method: "GET",
		}).	success( function(data){

//			console.log( "CALL API /control/state" );
//			console.log(data);

			$scope.forward_rest_count  = data.forward_count;
			$scope.backward_rest_count = data.backward_count;
		});
	}, 100 );

	$scope.$on("$destroy", function(){
		console.log( "PAGE OUT" );
		if (angular.isDefined(state_timer)) {
            $interval.cancel(state_timer);
            state_timer = undefined;
        }
    });
	
	$scope.goStop = function() {
		console.log( "Stop" );

		$http({
			url: "/control/stop",
			method: "GET",
		}).	success( function(data){
			console.log( "CALL API /control/stop" );
		});
	}

	$scope.goForward = function() {
		console.log( "Forward" );
		$http({
			url: "/control/forward",
			method: "GET",
			params: { time: $scope.forward_time , count : $scope.forward_count }
		}).	success( function(data){
			console.log( "CALL API /control/forward" );
		});
	}

	$scope.goBackward = function() {
		console.log( "Backward" );
		$http({
			url: "/control/backward",
			method: "GET",
			params: { time: $scope.backward_time , count : $scope.backward_count }
		}).	success( function(data){
			console.log( "CALL API /control/backward" );
		});

	}


})

;

})();
