var app = angular.module("codingApp", []);

app.controller("CodingController", function($scope, $http) {

    $scope.tasks = [];
    $scope.task = {};

    function loadTasks() {
        $http.get("/tasks").then(res => $scope.tasks = res.data);
    }
    loadTasks();

    $scope.addTask = function() {
        if (!$scope.task.language || !$scope.task.problem || !$scope.task.difficulty)
            return alert("Fill all fields");

        $scope.tasks.push($scope.task);
        $scope.task = {};
        saveTasks();
    };

    $scope.deleteTask = function(index) {
        $scope.tasks.splice(index, 1);
        saveTasks();
    };

    function saveTasks() {
        $http.post("/tasks", $scope.tasks);
    }
});