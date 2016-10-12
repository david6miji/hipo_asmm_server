(function(){
'use strict';

angular.module('hipoApp')

.controller('asmmCtrl',
function( $scope, $http, $interval ) {
	console.log( 'CALL asmmCtrl' );
	
	$scope.channels         = 0;

	$scope.period_time  	= 10;
	$scope.distance      	= 10;
	
	$scope.active           = {};
	$scope.active.period	= 0;
	$scope.active.present	= 0;
	$scope.active.progress 	= "???";

	$scope.period_queue			= [
//		{ seq : 0 , direction : "정지", time : 20, distance : 20 },
//		{ seq : 1 , direction : "정지", time : 20, distance : 20 },
//		{ seq : 2 , direction : "정지", time : 20, distance : 20 },
//		{ seq : 3 , direction : "정지", time : 20, distance : 20 },
//		{ seq : 4 , direction : "정지", time : 20, distance : 20 },
	];
	
	$scope.$on('$locationChangeStart', function (event, next, current) {
		console.log( "PAGE IN" );
	});
	
	var state_timer;
	
	state_timer = $interval( function () {
		
//		return ;
		
		$http.get( "/asmm/state" )
		.then(function( res ) {
			console.log( "CALL API SUCESS : /asmm/state" );
//			console.log( res.data );
			
			var state = res.data;
			$scope.state = state;

			switch( state.active.progress ){
			case "run"      : $scope.state.active.progress  	= "동작"; break;
			case "pause"    : $scope.state.active.progress  	= "중지"; break;
			case "stop" 	: $scope.state.active.progress  	= "비상정지"; break;
			default : $scope.current_direction  			= "에러"; break;
			}
			
//			switch( state.current.direction ){
//			case "forward"  : $scope.current_direction  	= "정방향"; break;
//			case "backward" : $scope.current_direction  	= "역방향"; break;
//			case "stop" 	: $scope.current_direction  	= "정지"; break;
//			default : $scope.current_direction  			= "에러"; break;
//			}
//			
//			$scope.current_time 		= state.current.time;
//			$scope.current_distance 	= state.current.distance;
//			$scope.current_present		= state.current.present;
//			$scope.period_queue			= state.period_queue;
			
		},function(res){
			console.log( "CALL API FAIL : /asmm/state" );
			console.log( res.statusText );
		});
		
	}, 100 );
	
	$http.get( "/asmm/channels" )
	.then(function( res ) {
			console.log( "CALL API SUCESS : /asmm/channels" );
			
			var state = res.data;
				
			$scope.channels = state.channels;
			console.log( state.channels );
			
		},function(res){
			console.log( "CALL API FAIL : /asmm/channels" );
			console.log( res.statusText );
		});
	
	
	$scope.$on("$destroy", function(){
		console.log( "PAGE OUT" );
		if (angular.isDefined(state_timer)) {
            $interval.cancel(state_timer);
            state_timer = undefined;
        }
    });
	
	var pushPeriod = function( direction ) {
		var onePeriod = {
			period_time : $scope.period_time,
			distance    : $scope.distance,
			direction	: direction,
		};

		$http.post( "/asmm/period_push", onePeriod )
		.then(function( res ) {
			console.log( "CALL API SUCESS : /asmm/period_push " );
			console.log( res.data );
			
		},function(res){
			console.log( "CALL API FAIL : /asmm/period_push" );
			console.log( res.statusText );
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
	
	var control = function( action ) {
		var oneControl = {
			action   	: action,
		};

		$http.post( "/asmm/control", oneControl )
		.then(function( res ) {
			console.log( "CALL API SUCESS : /asmm/control " );
			console.log( res.data );
			
		},function(res){
			console.log( "CALL API FAIL : /asmm/control" );
			console.log( res.statusText );
		});
		
	}
	
	$scope.goStop = function() {
		console.log( "STOP" );
		control( "stop" );
	}

	$scope.goPause = function() {
		console.log( "PAUSE" );
		control( "pause" );
	}
	$scope.goResume = function() {
		console.log( "RESUME" );
		control( "resume" );
	}

})

;

})();
