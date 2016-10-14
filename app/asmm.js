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
		this.sys_list 		= "/sys/class/asmm/list";
		this.sys_period  	= "/sys/class/asmm/period";
		this.sys_push    	= "/sys/class/asmm/push";
		this.sys_flush    	= "/sys/class/asmm/flush";
		this.sys_channel	= "/sys/class/asmm/channel";
		this.sys_direction	= "/sys/class/asmm/direction";
		this.sys_distance	= "/sys/class/asmm/distance";
		this.sys_resume   	= "/sys/class/asmm/resume";
		this.sys_stop    	= "/sys/class/asmm/stop";
		
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
//			var asmm_dirs = this.sys_asmm.readDir();
//			console.log( "---- ASSM DIRS " );
//			console.log( asmm_dirs );
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
	
	getList(){

		var list = new sysfs( this.sys_list );
		
		return list.readFile();
	}
	
	beginPeriod( period_time ){
		var period = new sysfs( this.sys_period );
		period.writeInteger( period_time );
	}

	selectChannel( channel_index ){
		var channel = new sysfs( this.sys_channel );
		channel.writeInteger( channel_index );
	}
	
	setDirection	( value ){
		var direction = new sysfs( this.sys_direction );
		direction.writeString( value );
	}
	setDistance	( value	){		
		var distance = new sysfs( this.sys_distance );
		distance.writeInteger( value );
	}
	
	resume(){
		var run = new sysfs( this.sys_resume );
		run.writeString( "run" );
	}		
	
	stop(){
		var run = new sysfs( this.sys_stop );
		run.writeString( "stop" );
	}		

	flush(){
		var flush = new sysfs( this.sys_flush );
		flush.writeString( "flush" );
	}		
	
	pushPeriod(){
		var period = new sysfs( this.sys_push );
		period.writeString( "run" );
		this.resume();
	}

	
}

