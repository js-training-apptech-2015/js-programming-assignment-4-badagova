function define(){
	var file,
		name,
		dependencies,
		callback,
		n,
		promises;
	if (typeof(arguments[0]) == "string"){
		name = arguments[0];
		dependencies = arguments[1];
		callback = arguments[2];
	} else {
		dependencies = arguments[0];
		callback = arguments[1];
	}
	if (dependencies.length >0) {
		promises = dependencies.map(function(currDependency, index, dependencies) {
			if (currDependency.search(/.js/i) > 0){
				file = document.createElement("script");
				file.src = currDependency;		
				document.head.appendChild(file);
			} else {
				file = new XMLHttpRequest();
				file.open("GET", currDependency);
				file.send(null);
			}
			return new Promise (function(resolve, reject) {
				file.onload = function(){
					resolve(this.response||eval(this));
			};
				file.onerror = reject;
			});
		});
		Promise.all(promises).then(function(args){
			if (name){
				window[name] = callback.apply(null,args);
			} else {
				callback.apply(null,args);
			}
		}, function(err){// doesn't work right without function(){}
			alert(err);
		});
	} else {
		window[name] = callback.apply(null,[]);
	}
}

define("add", ['foo.js', 'modules/bar.js'], function(def1, def2) {
    function add(x, y) {
		alert(foo(x) + bar(y));
    }
    return add(1,2);
});

define(['modules/thisistext.txt', 'image.jpg'], function(text, img) {
    alert(text);
    return {};
});