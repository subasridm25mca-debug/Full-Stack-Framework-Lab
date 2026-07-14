angular.module("libraryApp", [])

.controller("libraryCtrl", function($scope){

    $scope.books = 0;

    $scope.addBook = function(){
        $scope.books++;
    };

    $scope.removeBook = function(){
        if($scope.books > 0)
            $scope.books--;
    };

    $scope.reset = function(){
        $scope.books = 0;
    };

});