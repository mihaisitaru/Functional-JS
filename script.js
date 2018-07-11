(function () {
  function bar1(x, y, z) {
    foo(x);
    return [y,z];

    function foo(x) {
      y = y * x;
      z = z * x;
    }
  }

  document.write(bar1(5, 2, 3) + "<br>");
  document.write(bar1(5, 10, 15)  + "<br>");
})();

(function () {
  function bar2(x, y) {
    var z;
    foo(x);
    return [y, z];

    function foo(x) {
      y++;
      z = x * y;
    }
  }

  document.write(bar2(20, 5) + "<br>");
  document.write(bar2(20, 5) + "<br>");
  document.write(bar2(25, 6)  + "<br>");
})();

(function() {
  function sum(x, y) {
    return x + y;
  }

  function mult(x, y) {
    return x * y;
  }

  function compose2(fn1, fn2) {
    return function comp() {
      var args = [].slice.call(arguments);
      return fn2(
        fn1(args.shift(), args.shift()),
        args.shift()
      );
    }
  }
  var multAndSum = compose2(mult, sum);

  document.write(multAndSum(3,4,5) + "<br>");

})();

(function () {
  function foo(x,y) {
    return function() {
      return x + y;
    }
  }

  var x = foo(3, 4);

  document.write(x() + "<br>");
  document.write(x() + "<br>");

})();

(function () {
  function mult(...args) {
    if(args.length <= 2 ) {
      return args[0] * args[1];
    }
    return args[0] * mult(...args.slice(1)) ;
  }

  document.write(mult(3,4,5) + "<br>");
  document.write(mult(3,4,5,6) + "<br>");
  document.write(mult(3,4,5,6,7) + "<br>");
  document.write(mult(3,4,5,6,7,8) + "<br>");
  document.write(mult(3,4,5,6,7,8,9) + "<br>");
  document.write(mult(3,4,5,6,7,8,9,10) + "<br>");
  document.write(mult(3,4,5,6,7,8,9,10,11) + "<br>");

})();

(function () {
  document.write(transform([1,2,3,4,5], doubleIt) + "<br>");

  function doubleIt(val) {
    return val * 2;
  }

  function transform(arr, fn) {
    var list = [];
    for (var i = 0; i<arr.length;i++){
      list[i] = fn(arr[i]);
    }
    return list;
  }
})();

(function () {
  document.write([1,2,3,4,5].map(doubleIt) + "<br>");

  function doubleIt(val) {
    return val * 2;
  }

})();
// side exercise
(function () {

  document.write(my_function(5) + "<br>");
  document.write(my_function(5) + "<br>");
  document.write(my_function(5) + "<br>");

  function my_function(n) {
    var x = [];
    if (n <= 1) return 1;
    x.push(n, my_function(n-1));
    return x.slice(',').reverse().join(' ').toString();
  }

})();

(function () {
  function isOdd(val) {
    return val % 2 == 1;
  }

  function isEven(val) {
    return !isOdd(val);
  }

  document.write([1,2,3,4,5,6,7,8,9].filter(isOdd) + "<br>");
  document.write([1,2,3,4,5,6,7,8,9].filter(isEven) + "<br>");
})();

(function () {
  function mult(x,y) {return x * y;}
  function isOdd(val) {return val % 2 == 1;}
  function isEven(val) {return val % 2 == 0;}

  document.write([1,2,3,4,5,6,7,8,9].filter(isOdd).reduce(mult) + "<br>");
  document.write([1,2,3,4,5,6,7,8,9].filter(isEven).reduce(mult) + "<br>");
  document.write([1,2,3,4,5,6,7,8,9].reduce(mult) + "<br>");
})();

(function () {
  function logvalue(val) {console.log(val); }

  [1,2,3,4,5].forEach(logvalue);
})();

(function () {

  document.write(add2(one(1), one(2)) + "<br>");
  document.write(addn(one(10), one(20), one(30), one(40)) + "<br>");
  document.write(addn(...[10,20,30,40].map(one)) + "<br>");

  var array = [10,20,30,40,1,3,5,7]
      .filter(isEven)
      .map(one);

  function one (x) {
    return function() {
      return x;
    }
  }

  function add(x, y) {
    return x + y;
  }

  function add2(fn1, fn2) {
      return add(fn1(), fn2());
  }

  function addn(...arr) {
      return arr
        .reduce(function(prev,current){
          return function() {
            return add2(prev, current);
          };
        },one(0))();
  }

  function isEven(x) {
    return x % 2 == 0;
  }

document.write(addn(...array) + "<br>");

})();
