'use strict';

var
	fs					= require('fs'),
	kmodule 			= require(__dirname + '/kmodule'), 

end_require= true;

module.exports = class asmm {
	
	constructor() {
		this.name = "drv_ac_servo";
		this.path = "/root/drv_ac_servo.ko";
		
		this.module = new kmodule( this.name, this.path );
		
		this.module.rmmod();
		if( !this.module.isExist() ){
			this.module.insmod();
		} 
	}
}

// export default sysfs;
// module.exports = class sysfs {}
