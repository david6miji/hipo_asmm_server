'use strict';

var
	fs			= require('fs'),
	exec 		= require('child_process').execSync,

end_require= true;

module.exports = class kmodule {
	constructor(name, path) {
		
		this.name = name;
		this.path = path;
		
		console.log( "---- " + this.name + " : module path = " + this.path );
	}
	
	lsmod(){
		let out = "";

		try {
			out =  exec( "lsmod" ).toString();
		}catch(e){
			out =  e.message;
		}
		
		return out;
	}
	
	insmod(){
		let out = "";
		try {
			out =  exec( "insmod " + this.path ).toString();
		}catch(e){
			out =  e.message;
		}
		return out;
	}
	
	rmmod(){
		let out = "";
		try {
			out =  exec( "rmmod " + this.name ).toString();
		}catch(e){
			out =  e.message;
		}
		return out;
	}
	
	isExist(){
		
		var lines = this.lsmod().split( "\n" );
		var find = false;
		
		lines.forEach( (line, index, ar) => { 
			if( index === 0 ) return;
			var parts = line.split( /[ ]+/ );
			if( parts.length < 3 ) return;
			if( parts[0] === this.name ) find = true;
		});
		
		return find;
	}
}
