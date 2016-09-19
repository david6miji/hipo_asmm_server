(function(){
'use strict';

angular.module('hipoApp')

.controller('asmmCtrl',
function( $scope, $http, $interval ) {
	console.log( 'CALL asmmCtrl' );
	
	$scope.period_time  	= 10;
	$scope.distance      	= 10;
	
	
	$scope.backward_time  = 100;
	$scope.backward_count = 10;

	$scope.forward_rest_count  = 10;
	$scope.backward_rest_count = 10;
	
	var pushPeriod = function( direction ) {
		var onePeriod = {
			period_time : $scope.period_time,
			distance    : $scope.distance,
			direction	: direction,
		};
		
		var req = $http.post('/asmm/period_push', onePeriod);
		req.success(function(data, status, headers, config) {
			console.log( "CALL API SUCESS : /asmm/period_push" );
			
		});
		req.error(function(data, status, headers, config) {
			console.log( "CALL API FAIL : /asmm/period_push" );
		});	
	}
	
	$scope.goForward = function() {
		console.log( "PUSH Forward" );
		pushPeriod( "forward" );
	}
	
	$scope.goBackward = function() {
		console.log( "PUSH Backward" );
		pushPeriod( "backrward" );
	}

	$scope.goStop = function() {
		console.log( "STOP" );
		$http.get("/asmm/stop")
		.then(function(res) {
			// $scope.myWelcome = res.data;
			console.log( "CALL API SUCESS : /asmm/stop " );
			console.log( res.data );
			
		},function(res){
			console.log( "CALL API FAIL : /asmm/stop" );
			console.log( res.statusText );
		});
	}

	$scope.goPause = function() {
		console.log( "PAUSE" );
	}
	$scope.goResume = function() {
		console.log( "RESUME" );
	}


})

;

})();
