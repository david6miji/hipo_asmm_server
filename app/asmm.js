'use strict';

var
	fs					= require('fs'),
	kmodule 			= require(__dirname + '/kmodule'), 
	sysfs 				= require(__dirname + '/sysfs'),

end_require= true;

module.exports = class asmm {
	
	constructor() {
		
		this.kmodule_name 	= "drv_asmm";
		this.kmodule_path 	= "/root/drv_asmm.ko";
		this.sys_root 		= "/sys/class/asmm";
		this.sys_channels	= "/sys/class/asmm/channels";
		this.sys_active		= "/sys/class/asmm/active";
		
		this.module = new kmodule( this.kmodule_name, this.kmodule_path );
		
		this.module.rmmod();
		if( !this.module.isExist() ){
			this.module.insmod();
		}

		this.sys_asmm 		= new sysfs( this.sys_root );
		this.sys_asmm_ok 	= this.sys_asmm.accessOk();

		if( !this.sys_asmm_ok ){
			console.log( "---- ERROR : no exist asmm sysfs!!! " + this.sys_root );
		} else {
			var asmm_dirs = this.sys_asmm.readDir();
			console.log( "---- ASSM DIRS " );
			console.log( asmm_dirs );
		}
	}
	
	getChannels(){
		
		var channels = new sysfs( this.sys_channels );
		
		return channels.readInteger();
	}
	
	getActive(){
		
		var active = new sysfs( this.sys_active );
		
		return active.readFile();
	}
	

}

// export default sysfs;
// module.exports = class sysfs {}
