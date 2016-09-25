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
		var out =  exec( "lsmod" ).toString();
		return out;
	}
	
	insmod(){
		var out =  exec( "insmod " + this.path ).toString();
		return out;
	}
	
	rmmod(){
		var out =  exec( "rmmod " + this.name ).toString();
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

// export default sysfs;
// module.exports = class sysfs {}
