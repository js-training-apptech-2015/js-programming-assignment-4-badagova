function define(dependencies, callback){
	var files = [],
		promises = [];
	for(var i = 0; i< dependencies.length; i++){
		files[i] = new XMLHttpRequest();
		files[i].open("GET", dependencies[i]);
		promises[i] = new Promise (function(resolve, reject) {
			files[i].onload = function(){
				resolve(this.response);
			};
			files[i].onerror = function(){
				reject('error');
			};
		});
		files[i].send(null);
	}
	Promise.all(promises).then(function(args){
		callback.apply(callback,args);
	}, function() {
		alert("error!");
	});
}


define(['foo.js', 'modules/bar.js'], function(foo, bar) {
    function add(x, y) {
        alert(fooo(x) + baar(y));
    }
    return add;
});
define(['modules/thisistext.txt', 'image.jpg'], function(text, image) {
    alert(text);
    return {};
});