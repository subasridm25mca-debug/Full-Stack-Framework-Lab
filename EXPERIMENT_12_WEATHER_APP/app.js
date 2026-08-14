var app = angular.module("weatherApp", []);

app.controller("WeatherController", function ($scope, $http) {

    $scope.city = "";

    $scope.getWeather = function () {

        if (!$scope.city) {
            $scope.error = "Please enter a city name";
            return;
        }

        $scope.error = "";
        $scope.weather = null;

        // Find city coordinates
        $http.get(
            "https://geocoding-api.open-meteo.com/v1/search?name=" +
            $scope.city +
            "&count=1&language=en&format=json"
        ).then(function (response) {

            if (!response.data.results) {
                $scope.error = "City not found";
                return;
            }

            var location = response.data.results[0];

            // Get weather data
            $http.get(
                "https://api.open-meteo.com/v1/forecast?latitude=" +
                location.latitude +
                "&longitude=" +
                location.longitude +
                "&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m"
            ).then(function (response) {

                var data = response.data.current;

                $scope.weather = {
                    name: location.name,
                    main: {
                        temp: data.temperature_2m,
                        humidity: data.relative_humidity_2m
                    },
                    weather: [{
                        description: getWeatherDescription(data.weather_code)
                    }],
                    wind: {
                        speed: data.wind_speed_10m
                    }
                };

            });

        }).catch(function () {
            $scope.error = "Unable to fetch weather data";
        });
    };

    function getWeatherDescription(code) {

        if (code === 0) return "Clear sky";
        if (code <= 3) return "Partly cloudy";
        if (code <= 48) return "Foggy";
        if (code <= 57) return "Drizzle";
        if (code <= 67) return "Rain";
        if (code <= 77) return "Snow";
        if (code <= 82) return "Rain showers";
        if (code <= 86) return "Snow showers";
        if (code >= 95) return "Thunderstorm";

        return "Unknown";
    }

});