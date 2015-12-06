function define(dependencies, callback){
	var files = [];
		promises = [];
	for(var i = 0; i< dependencies.length; i++){
		if ( dependencies[i].match(/\.png|\.jpg|\.gif|\.jpeg/) !== null){
			files[i] = document.createElement("img");
			files[i].setAttribute("src", dependencies[i]);
			promises[i] = new Promise (function(resolve, reject) {
				files[i].onload = function(){
					resolve(this);
				};
				files[i].onerror = function(){
					reject('error');
				};
			});
			document.head.appendChild(files[i]);
		} else if (dependencies[i].match(/\.txt/) !== null){
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
		} else if (dependencies[i].match(/\.js/) !== null){
			files[i] = document.createElement("script");
			files[i].src = dependencies[i];		
			promises[i] = new Promise (function(resolve, reject) {
				files[i].onload = function(){
					resolve(this);
				};
				files[i].onerror = function(){
					reject('error');
				};
			});
			document.head.appendChild(files[i]);
		} else {
			alert("Unknown type of file!");
		}
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