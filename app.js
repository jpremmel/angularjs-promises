//"A deferred object is simply an object that exposes a promise as well as the associated methods for resolving that promise. It is constructed using the $q.deferred() function and exposes three main methods: resolve(), reject(), and notify(). The associated promise object can be accessed via the promise property."

//"Here we create a new deferred object, then return its promise property. We also execute our asnyc function and after it completes, we resolve the deferred object. The parameter of the resolve() function will be passed to the callback function."
function getData($timeout, $q) {
  return function() {
    var defer = $q.defer();

    //simulated async function
    $timeout(function() {
      if(Math.round(Math.random())) {
        defer.resolve('data received!');
      } else {
        defer.reject('oh no an error! try again.');
      }
    }, 2000);

    return defer.promise;
  };
}

angular.module('app', [])
.factory('getData', getData)
.run(function(getData) {
  var promise = getData()
  .then(function(string) {
    console.log(string);
  }, function(error) {
    console.log(error);
  });
});