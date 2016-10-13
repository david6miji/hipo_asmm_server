var
	express 	= require('express'),
	router 		= express.Router(),
	ASMM 		= require(__dirname + '/../asmm'),

end_require= true;

var assm = new ASMM(); 
// var 
// var 
// 
// var sysfs_test = new sysfs( "/sys/class/gpio" ); 
// 
// 	if( sysfs_test.accessOk() ){
// 		console.log( "---- CALL sysfs_test.accessOk() is good" );
// 	} else {
// 		console.log( "---- CALL sysfs_test.accessOk() is no finding" );
// 		
// 	}
// 	
// 	var file_list = sysfs_test.readDir();
// 	console.log( file_list );
// 	
// 	sysfs_test.readFile();
// 	sysfs_test.writeFile();

// const 	FORWARD_GPIO_INDEX 	= 37;
// const 	BACKWARD_GPIO_INDEX = 36;

// var gpio_forward 	= new sfg( FORWARD_GPIO_INDEX 	);
// var gpio_backward 	= new sfg( BACKWARD_GPIO_INDEX 	);

router.get('/channels', function(req, res, next) {

	var state = {};

	
	state.result  = 'ok';
	state.channels = assm.getChannels();
	
    res.json(state);
	
});

router.post('/period_push', function(req, res, next) {

	var onePeriod = req.body;
	
	console.log( onePeriod );
	
	res.send('ok period_push');
});

router.post('/control', function(req, res, next) {

	var oneControl = req.body;
	
	console.log( oneControl );
	
	res.send('ok control');
});

router.get('/state', function(req, res, next) {

	var state = {};

	state.result 			= 'ok';
	
	state.active            = JSON.parse( assm.getActive() );
	state.list              = JSON.parse( assm.getList() );

//	state.period_queue		= [];
//	state.period_queue.push({ seq : 0 , direction : "정지", time : 20, distance : 20 }) ;
//	state.period_queue.push({ seq : 1 , direction : "정지", time : 20, distance : 20 }) ;
//	state.period_queue.push({ seq : 2 , direction : "정지", time : 20, distance : 20 }) ;
//	state.period_queue.push({ seq : 3 , direction : "정지", time : 20, distance : 20 }) ;
//	state.period_queue.push({ seq : 4 , direction : "정지", time : 20, distance : 20 }) ;
//	state.period_queue.push({ seq : 5 , direction : "정지", time : 20, distance : 20 }) ;

	
//	state.forward_count 	= parseInt(gpio_forward.count/2);
//	state.backward_count 	= parseInt(gpio_backward.count/2);

//	console.log( state );

    res.json(state);

});

module.exports = router;

