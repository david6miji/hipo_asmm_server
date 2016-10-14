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
		return fs.readFileSync( this.path, "utf8" );
	}
	
	readInteger() {
		var ret = this.readFile()
		console.log( "ret = ", ret );
		return  Number(ret);
	}

	writeFile(data) {
		fs.writeFileSync( this.path, data, "utf8" );
		return "write ok";
	}
	
	writeInteger( value ) {
		var str = "";
		str = str + value;
		return this.writeFile(str);
	}

	writeString( value ) {
		var str = "";
		str = str + value;
		return this.writeFile(str);
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
