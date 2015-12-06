function ObjectWithMethodOverloading() {
    var obj = {},
		functions = {};
    obj.overload = function (name, func, types) {
        if (types === undefined) {
			functions[func.length.toString()] = func.bind(this);
		} else {
			var methodName = func.length.toString();
			for (var i = 0; i < types.length; i++){
				switch (types[i]){
					case Number:{
						methodName += ", number";
						break;
					}
					case String:{
						methodName += ", string";
						break;
					}
					case Boolean:{
						methodName += ", boolean";
						break;
					}
				}
			}
			functions[methodName] = func.bind(this);
		}
		obj[name] = function () {
			var methodName = arguments.length.toString();
			for (var i = 0; i<arguments.length; i++){
				methodName+=", ";
				methodName+=typeof(arguments[i]);
			}			
			var cropMethodName = parseInt(methodName);
			return (functions[methodName] === undefined) ? 
				functions[cropMethodName].apply(this, arguments) : 
				functions[methodName].apply(this, arguments);
		};
    };
  return obj;
}

var o = new ObjectWithMethodOverloading();
function get() {
    return this._value;
}
function set(x) {
    this._value = x;
}
o.overload('value', get);
o.overload('value', set);

o.value(123);
alert(o.value());

var a = new ObjectWithMethodOverloading();
function multSq(n) {
    return n * n;
}
a.overload('mult', multSq);

function multNumbers(n1, n2) {
    return n1 * n2;
}
a.overload('mult', multNumbers, [Number, Number]);

function multStringAndNumber(s, n) {
    return Array(n).fill(s).join(''); // forgive me, IE
}
a.overload('mult', multStringAndNumber, [String, Number]);
alert(a.mult(3)); // res0 === 9
alert(a.mult(2,3)); // res1 === 6
alert(a.mult('ab',3)); // res === 'ababab'
