//"A deferred object is simply an object that exposes a promise as well as the associated methods for resolving that promise. It is constructed using the $q.deferred() function and exposes three main methods: resolve(), reject(), and notify(). The associated promise object can be accessed via the promise property."

function getData($timeout, $q) {
  return function() {

    //OPTION 1: MANUALLY CREATE DEFERRED OBJECT
    // var defer = $q.defer();

    //simulated async function
    // $timeout(function() {
    //   if(Math.round(Math.random())) {
    //     defer.resolve('data received!');
    //   } else {
    //     defer.reject('oh no an error! try again.');
    //   }
    // }, 2000);

    //return defer.promise;

    //OPTION 2: USE $q FUNCTION TO DO THE SAME THING
    return $q(function(resolve, reject) {
      $timeout(function() {
        if (Math.round(Math.random())) {
          resolve('data received!');
        } else {
          reject('oh no an error! try again.');
        }
      }, 2000);
    });

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
  })
  .finally(function() { //either 'resolve' or 'reject' is called; regardless of which one, 'finally' is called afterward
    console.log('Finished at: ', new Date());
  });
});