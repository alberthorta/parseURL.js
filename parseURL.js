String.prototype.parseURL = function() {
	var uri_components = (/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/g).exec(this);
    var domain = undefined, port = undefined, user = undefined, password = undefined;
	if(uri_components[4] != undefined) {
	    var domain_components = ("@"+uri_components[4]).split("@");
		[domain, port] = domain_components.pop().split(":",2);
		[user, password] = domain_components.pop().split(":",2);
	}
	var params_array = uri_components[7]===undefined?[]:decodeURIComponent(uri_components[7]).replace(/\+/g, ' ').split("&");
	var params = {};
	for(var i in params_array) {
		var param = params_array[i].split("=",2);
		params[param.shift()] = param.pop();
	}
    return { 
		protocol : uri_components[2],
		user     : user!=""?user:undefined,
		password : password,
		domain   : domain!=""?domain:undefined,
		port     : (port!=undefined?parseInt(port):(uri_components[2]==='http'?80:(uri_components[2]==='https'?443:undefined))),
		path     : uri_components[2]==='file'?uri_components[5].slice(1):uri_components[5],
		params   : params,
		hash     : uri_components[9]
	};
};