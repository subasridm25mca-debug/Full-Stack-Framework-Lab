var app = angular.module("calculatorApp", []);

app.controller("CalculatorController", function ($scope) {

    $scope.display = "";

    $scope.firstNumber = null;
    $scope.operator = null;
    $scope.waitingForSecondNumber = false;

    // Number button
    $scope.number = function (num) {

        if ($scope.waitingForSecondNumber) {
            $scope.display += num;
            $scope.waitingForSecondNumber = false;
        } else {
            $scope.display += num;
        }
    };

    // Decimal button
    $scope.decimal = function () {

        if ($scope.waitingForSecondNumber) {
            $scope.display += "0.";
            $scope.waitingForSecondNumber = false;
        } 
        else {
            var parts = $scope.display.split(" ");

            if (parts[parts.length - 1].indexOf(".") === -1) {
                $scope.display += ".";
            }
        }
    };

    // Operation button
    $scope.operation = function (operator) {

        if ($scope.display === "") {
            return;
        }

        var parts = $scope.display.split(" ");

        $scope.firstNumber = parseFloat(parts[0]);
        $scope.operator = operator;

        // Show expression
        $scope.display = $scope.firstNumber + " " + operator + " ";

        $scope.waitingForSecondNumber = true;
    };

    // Calculate
    $scope.calculate = function () {

        if ($scope.firstNumber === null || $scope.operator === null) {
            return;
        }

        var parts = $scope.display.split(" ");

        var secondNumber = parseFloat(parts[2]);

        var result;

        switch ($scope.operator) {

            case "+":
                result = $scope.firstNumber + secondNumber;
                break;

            case "-":
                result = $scope.firstNumber - secondNumber;
                break;

            case "*":
                result = $scope.firstNumber * secondNumber;
                break;

            case "/":

                if (secondNumber === 0) {
                    $scope.display = "Error";
                    return;
                }

                result = $scope.firstNumber / secondNumber;
                break;
        }

        $scope.display = result;

        $scope.firstNumber = null;
        $scope.operator = null;
        $scope.waitingForSecondNumber = false;
    };

    // Clear
    $scope.clear = function () {

        $scope.display = "";
        $scope.firstNumber = null;
        $scope.operator = null;
        $scope.waitingForSecondNumber = false;
    };

    // Backspace
    $scope.backspace = function () {

        if ($scope.display.length > 0) {
            $scope.display =
                $scope.display.substring(0, $scope.display.length - 1);
        }
    };

});