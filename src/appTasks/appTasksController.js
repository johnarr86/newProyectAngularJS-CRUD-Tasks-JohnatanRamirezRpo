(function () {
    'use strict';

    angular
        .module('app')
        .controller('appTasksController', appTasksController)

        .directive('validFieldsRegisterTask', function(){
            return{
                templateUrl:'./src/directives/validFormRegisterTask.html'
            }
        })
        
        .directive('validFieldsEditTask', function(){
            return{
                templateUrl:'./src/directives/validFormEditTask.html'
            }
        })

        .directive('validFieldsDeleteTask', function(){
            return{
                templateUrl: './src/directives/validFormDeleteTask.html'
            }
        });


    /** @ngInject */
    appTasksController.$inject = ['$scope', '$http', 'localStorageService','$location', '$timeout', '$filter'];
    function appTasksController($scope, $http, localStorageService, $location, $timeout, $filter) {       


        $scope.tasksList = [];
        $scope.clickedTask = {};
        $scope.message = "";

        $scope.emptyFieldsRegister = function(){
            $scope.textNewTask = "";
            $scope.textResponsTask = "";
            $scope.textEmail = ""; 
            $scope.numberPhone = "";
            $scope.textDate = "";
        }

        $scope.saveTask = function(){   
            $scope.tasksList.push($scope.newTask = {
                                                taskName: $scope.textNewTask, 
                                                taskResponsable: $scope.textResponsTask, 
                                                taskEmail: $scope.textEmail,
                                                taskPhone: $scope.numberPhone,
                                                taskDate:  $scope.textDate,
                                                hecho: false
                                            });
            $scope.emptyFieldsRegister();
            document.querySelector("#myModal-Register .close").click();
            localStorageService.set("Tasks", $scope.tasksList);       
            $scope.message = "New Task Added Successfully!";
        };

        $scope.selectTask = function(task, index){
            console.log(task);
            $scope.valIndex = index;
            $scope.clickedTask = angular.copy(task); 
        };  

        $scope.taskHecho = function(index){
            $scope.changeTask = localStorageService.get("Tasks");
            $scope.changeTask[index].hecho = !$scope.changeTask[index].hecho;
            localStorageService.set("Tasks", $scope.changeTask);
        }


        $scope.updateTask = function(){
            $scope.tasksList[$scope.valIndex].taskName = $scope.clickedTask.taskName;
            $scope.tasksList[$scope.valIndex].taskResponsable = $scope.clickedTask.taskResponsable;
            $scope.tasksList[$scope.valIndex].taskEmail = $scope.clickedTask.taskEmail;
            $scope.tasksList[$scope.valIndex].taskPhone = $scope.clickedTask.taskPhone;
            $scope.tasksList[$scope.valIndex].taskDate = $scope.clickedTask.taskDate;
            localStorageService.set("Tasks", $scope.tasksList);
            $scope.message = "Task Updated Successfully!";
        };



        $scope.deleteTask = function(){
            $scope.tasksList.splice($scope.tasksList.indexOf($scope.clickedTask), 1);
            localStorageService.set("Tasks", $scope.tasksList);
            $scope.message = "Task Deleted Successfully!";
        };


        (function clearMessage() {
            $timeout(clearMessage, 8000);
            $scope.message = "";
        }());

        $scope.remainingTask = function() {
        var cuenta = 0;
        angular.forEach($scope.tasksList, function(task) {
            cuenta += task.hecho ? 0 : 1;
        });
        return cuenta;
        };

        $scope.deleteTasksDone = function(){
            $scope.tasksDone =  localStorageService.get("Tasks");
            console.log($scope.tasksDone);
            $scope.tasksList = [];
            angular.forEach($scope.tasksDone, function(task) {
                if(!task.hecho){
                    $scope.tasksList.push(task);
                }
            });
            localStorageService.set("Tasks", $scope.tasksList);
        }; 


        if(localStorageService.get("Tasks")){
            console.log(localStorageService.get("Tasks"));
            $scope.tasksList = localStorageService.get("Tasks");
        }


        //Codigo Conversión de fecha: 
        $scope.$watch('textDate', function (newValue) {
            $scope.clickedTask.taskDate = $filter('date')(newValue, 'yyyy/MM/dd'); 
        });

        $scope.$watch('clickedTask.taskDate', function (newValue) {
            $scope.textDate = $filter('date')(newValue, 'yyyy/MM/dd'); 
        });


    }
})();