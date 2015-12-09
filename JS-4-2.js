function define(dependencies, callback){
	var promises = [];
	dependencies.map(function(currDependency, index, dependencies) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", currDependency);
		promises.push(new Promise (function(resolve, reject) {
			xhr.onload = function(){
				if (currDependency.search(/.js/i) > 0){
					resolve(eval(this.response));	
				} else {
					resolve(this.response);
				};
			xhr.onerror = reject;
		}}));
		xhr.send(null);
	});
	Promise.all(promises).then(function(args){
		callback.apply(null,args);
	}, function(err){// doesn't work right without function(){}
		alert(err);
	});
}

define(['foo.js', 'modules/bar.js'], function(foo, bar) {
    function add(x, y) {
		alert(foo(x) + bar(y));
    }
    return add(1,2);
});

define(['modules/thisistext.txt', 'image.jpg'], function(text, image) {
    alert(text);
    return {};
});