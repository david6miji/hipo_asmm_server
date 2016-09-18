(function(){
'use strict';
angular.module('hipoApp',
[
   'ui.router',
   'ui.bootstrap',
//   'testApp.services',
])
	
.run(   ['$rootScope', '$state', 
function($rootScope, $state ){

	console.log( 'CALL app.run()' );
	
    $rootScope.$on('$stateChangeStart', 
		function (event, toState, toParams, fromState, fromParams) {
			console.log( 'Event $stateChangeStart' );
			console.log( '  toState = ', toState );
		}
	);
	
    $rootScope.$on('$stateChangeSuccess', 
		function (event, toState, toParams, fromState, fromParams) {
			console.log( 'Event $stateChangeSuccess' );
			
		}
	);	
	
}])

.config([ '$stateProvider','$urlRouterProvider', '$httpProvider',
function( $stateProvider,  $urlRouterProvider,   $httpProvider) {

	console.log( 'CALL app.config()' );
	$stateProvider

	.state('main', 			{ url: '/main', 		templateUrl: '/view/main.html',
													controller: 'mainCtrl'				})
	
	.state('cvt', 			{ url: '/asmm', 		templateUrl: '/view/asmm.html',
													controller: 'asmmCtrl'				})

	.state('sysfs_gpio', 	{ url: '/sysfs_gpio', 	templateUrl: '/view/sysfs_gpio.html',
													controller: 'sysfsGpioCtrl'			})
	
	;
	
	$urlRouterProvider.otherwise('main');
	
}])

;


})();


