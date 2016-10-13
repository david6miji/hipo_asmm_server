(function(){
'use strict';

angular.module('hipoApp')

.controller('asmmCtrl',
function( $scope, $http, $interval ) {
	console.log( 'CALL asmmCtrl' );
	
	$scope.channels         	= 1;

	$scope.control          	= {};
	$scope.control.period_time  = 10;
	$scope.control.channels     = [];
	$scope.control.channels[0]  = {};
	$scope.control.channels[0].channel   = 0;
	$scope.control.channels[0].direction = "forward";
	$scope.control.channels[0].distance  = 10;
	
	$scope.active           = {};
	$scope.active.period	= 0;
	$scope.active.present	= 0;
	$scope.active.progress 	= "???";

// 	$scope.period_queue			= [
// //		{ seq : 0 , direction : "정지", time : 20, distance : 20 },
// //		{ seq : 1 , direction : "정지", time : 20, distance : 20 },
// //		{ seq : 2 , direction : "정지", time : 20, distance : 20 },
// //		{ seq : 3 , direction : "정지", time : 20, distance : 20 },
// //		{ seq : 4 , direction : "정지", time : 20, distance : 20 },
// 	];
	
	$scope.$on('$locationChangeStart', function (event, next, current) {
		console.log( "PAGE IN" );
	});
	
	var state_timer;
	
	state_timer = $interval( function () {
		
//		return ;
		
		$http.get( "/asmm/state" )
		.then(function( res ) {
//			console.log( "CALL API SUCESS : /asmm/state" );
//			console.log( res.data );
			
			var state = res.data;
			$scope.state = state;

			switch( state.active.progress ){
			case "run"		: $scope.state.active.progress  	= "동작"; break;
			case "pause"	: $scope.state.active.progress  	= "중지"; break;
			case "stop" 	: $scope.state.active.progress  	= "비상정지"; break;
			default			: $scope.state.active.progress 		= "에러"; break;
			}
			
			for (var i = 0; i < state.active.channels.length; i++) { 
				switch( state.active.channels[i].direction ){
				case "forward"  : $scope.state.active.channels[i].direction  	= "정방향"; break;
				case "backward" : $scope.state.active.channels[i].direction  	= "역방향"; break;
				case "stop" 	: $scope.state.active.channels[i].direction  		= "정지"; break;
				default 		: $scope.state.active.channels[i].direction  		= "에러"; break;
				}
			}
			
			state.list.forEach( function (period,period_index) {
				period.channels.forEach( function (channel,channel_index) {
					var str = "에러";

					switch( channel.direction ){
					case "forward"  : str = "정방향"; break;
					case "backward" : str = "역방향"; break;
					case "stop" 	: str = "정지"; break;
					default 		: str = "에러"; break;
					}
					$scope.state.list[period_index].channels[channel_index].direction = str;
				});
				
			});


		},function(res){
			console.log( "CALL API FAIL : /asmm/state" );
			console.log( res.statusText );
		});
		
	}, 100 );
	
	$http.get( "/asmm/channels" )
	.then(function( res ) {
//			console.log( "CALL API SUCESS : /asmm/channels" );
			
			var state = res.data;
				
			$scope.channels = state.channels;
//			console.log( state.channels );
			
			$scope.control.channels     = [];
			for (var i = 0; i < $scope.channels; i++) { 
				var item = { channel : i, direction : "정방향", distance : 0 };
				$scope.control.channels.push( item );
			}
			
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
	
	var pushPeriod = function( onePeriod ) {

		$http.post( "/asmm/period_push", onePeriod )
		.then(function( res ) {
			console.log( "CALL API SUCESS : /asmm/period_push " );
			console.log( res.data );
			
		},function(res){
			console.log( "CALL API FAIL : /asmm/period_push" );
			console.log( res.statusText );
		});
		
	}
	
	$scope.goForward = function(index) {
		$scope.control.channels[index].direction = "정방향";
	}
	
	$scope.goBackward = function(index) {
		$scope.control.channels[index].direction = "역방향";
	}

	$scope.goPush = function(index) {
//		
		console.log( "CALL PUSH" );
		var period = $scope.control;
		
		period.channels.forEach( function (channel,channel_index) {
			var str = "forward";

			switch( channel.direction ){
			case "정방향"  : str = "forward"; break;
			case "역방향" : str = "backward"; break;
			}
			channel.direction = str;
		});
		
		pushPeriod( period );
		
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
