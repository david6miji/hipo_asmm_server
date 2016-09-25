'use strict';

var
	fs					= require('fs'),

end_require= true;

module.exports = class sysfs {
	constructor(path) {
		this.path = path;
	}
	
	accessOk() {
		
		let flag = true;
		try {
			fs.accessSync( this.path, fs.F_OK );
		}catch(e){
			flag = false;
		}
		return flag;
	}
	
	readFile() {
		console.log( "CALL readFile function ---------------");
		return "read ok";
	}
	
	writeFile() {
		console.log( "CALL writeFile function ---------------");
		return "write ok";
	}
	
	isDirectory() {
		var stats = fs.lstatSync( this.path );
		return stats.isDirectory();
	}

	isFile() {
		return !this.isDirectory();
	}
	
	readDir() {
		let list = [];
		let stats;
		
		if( this.isDirectory() === false ) return list;
		
		try {
			let _list = fs.readdirSync( this.path );
			_list.forEach( (filename, index, ar) => {
				let _path     = this.path + '/' + filename;
				let _realpath = fs.realpathSync( _path );
				let _stats = fs.lstatSync( _realpath );
				
				list.push( { 
				     filename : filename, 
				     realpath : _realpath,
				     isdir    : _stats.isDirectory() 
				});
				
			});
		}catch(e){
			
		}

		return list;
	}
}

// export default sysfs;
// module.exports = class sysfs {}
