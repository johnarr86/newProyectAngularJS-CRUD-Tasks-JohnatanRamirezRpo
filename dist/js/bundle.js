angular.module('app', [
  "ngRoute",
  "ngResource",
  "ngAnimate",
  "ngSanitize",
  "ngMessages",
  "ngMaterial",
  "LocalStorageModule"
]);
(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();

(function() {
  'use strict';
  angular
    .module('app')
    .constant('version', '1.0')
})();
(function() {
  'use strict';

  angular
    .module('app')
    .run(run);

  /** @ngInject */
  function run($log) {
    //$log.debug('runBlock end');
  }

})();

(function () {
  'use strict';

  angular
    .module('app')
    .constant('DataAppTasks', {
      appTasksData: 'appTasksData'
    })
})();

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
(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'appTasksController',
                templateUrl: 'src/appTasks/appTasks.html',
                controllerAs: 'appTasks'
            })

    }

})();

(function () {
    'use strict';

    angular
        .module('app')
        .factory('appTasksServices', appTasksServices);

    /** @ngInject */
    appTasksServices.$inject = ['$http', '$q'];
    function appTasksServices($http, $q, DataAppTasks) {
        var appTasksService = {};
        return appTasksService;
    }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .constant('DataHome', {
      homeData: 'homeData'
    })
})();

(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    /** @ngInject */
    homeController.$inject = ['$scope', '$http', 'localStorageService','$location'];
    function homeController($scope, $http, localStorageService, $location) {
		
    }
})();

(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                controller: 'homeController',
                templateUrl: 'src/home/home.html',
                controllerAs: 'home'
            })

    }

})();

(function () {
    'use strict';

    angular
        .module('app')
        .factory('homeServices', homeServices);

    /** @ngInject */
    homeServices.$inject = ['$http', '$q'];
    function homeServices($http, $q, Datahome) {
        var homeService = {};
        return homeService;
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbmZpZy5qcyIsImNvbnN0YW50cy5qcyIsInJ1bi5qcyIsImFwcFRhc2tzL2FwcFRhc2tzQ29uc3RhbnRzLmpzIiwiYXBwVGFza3MvYXBwVGFza3NDb250cm9sbGVyLmpzIiwiYXBwVGFza3MvYXBwVGFza3NSb3V0ZS5qcyIsImFwcFRhc2tzL2FwcFRhc2tzU2VydmljaW9zLmpzIiwiaG9tZS9ob21lQ29uc3RhbnRzLmpzIiwiaG9tZS9ob21lQ29udHJvbGxlci5qcyIsImhvbWUvaG9tZVJvdXRlLmpzIiwiaG9tZS9ob21lU2VydmljZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG4gIFwibmdSb3V0ZVwiLFxuICBcIm5nUmVzb3VyY2VcIixcbiAgXCJuZ0FuaW1hdGVcIixcbiAgXCJuZ1Nhbml0aXplXCIsXG4gIFwibmdNZXNzYWdlc1wiLFxuICBcIm5nTWF0ZXJpYWxcIixcbiAgXCJMb2NhbFN0b3JhZ2VNb2R1bGVcIlxuXSk7IiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbmZpZyhjb25maWcpO1xuXG4gIC8qKiBAbmdJbmplY3QgKi9cbiAgZnVuY3Rpb24gY29uZmlnKCRsb2dQcm92aWRlciwgJGh0dHBQcm92aWRlcikge1xuICAgIC8vIEVuYWJsZSBsb2dcbiAgICAkbG9nUHJvdmlkZXIuZGVidWdFbmFibGVkKHRydWUpO1xuICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnN0YW50KCd2ZXJzaW9uJywgJzEuMCcpXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdhcHAnKVxuICAgIC5ydW4ocnVuKTtcblxuICAvKiogQG5nSW5qZWN0ICovXG4gIGZ1bmN0aW9uIHJ1bigkbG9nKSB7XG4gICAgLy8kbG9nLmRlYnVnKCdydW5CbG9jayBlbmQnKTtcbiAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAuY29uc3RhbnQoJ0RhdGFBcHBUYXNrcycsIHtcclxuICAgICAgYXBwVGFza3NEYXRhOiAnYXBwVGFza3NEYXRhJ1xyXG4gICAgfSlcclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAuY29udHJvbGxlcignYXBwVGFza3NDb250cm9sbGVyJywgYXBwVGFza3NDb250cm9sbGVyKVxyXG5cclxuICAgICAgICAuZGlyZWN0aXZlKCd2YWxpZEZpZWxkc1JlZ2lzdGVyVGFzaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybntcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOicuL3NyYy9kaXJlY3RpdmVzL3ZhbGlkRm9ybVJlZ2lzdGVyVGFzay5odG1sJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgICAgICAuZGlyZWN0aXZlKCd2YWxpZEZpZWxkc0VkaXRUYXNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJue1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6Jy4vc3JjL2RpcmVjdGl2ZXMvdmFsaWRGb3JtRWRpdFRhc2suaHRtbCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3ZhbGlkRmllbGRzRGVsZXRlVGFzaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybntcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi9zcmMvZGlyZWN0aXZlcy92YWxpZEZvcm1EZWxldGVUYXNrLmh0bWwnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgLyoqIEBuZ0luamVjdCAqL1xyXG4gICAgYXBwVGFza3NDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckaHR0cCcsICdsb2NhbFN0b3JhZ2VTZXJ2aWNlJywnJGxvY2F0aW9uJywgJyR0aW1lb3V0JywgJyRmaWx0ZXInXTtcclxuICAgIGZ1bmN0aW9uIGFwcFRhc2tzQ29udHJvbGxlcigkc2NvcGUsICRodHRwLCBsb2NhbFN0b3JhZ2VTZXJ2aWNlLCAkbG9jYXRpb24sICR0aW1lb3V0LCAkZmlsdGVyKSB7ICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgJHNjb3BlLnRhc2tzTGlzdCA9IFtdO1xyXG4gICAgICAgICRzY29wZS5jbGlja2VkVGFzayA9IHt9O1xyXG4gICAgICAgICRzY29wZS5tZXNzYWdlID0gXCJcIjtcclxuXHJcbiAgICAgICAgJHNjb3BlLmVtcHR5RmllbGRzUmVnaXN0ZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkc2NvcGUudGV4dE5ld1Rhc2sgPSBcIlwiO1xyXG4gICAgICAgICAgICAkc2NvcGUudGV4dFJlc3BvbnNUYXNrID0gXCJcIjtcclxuICAgICAgICAgICAgJHNjb3BlLnRleHRFbWFpbCA9IFwiXCI7IFxyXG4gICAgICAgICAgICAkc2NvcGUubnVtYmVyUGhvbmUgPSBcIlwiO1xyXG4gICAgICAgICAgICAkc2NvcGUudGV4dERhdGUgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLnNhdmVUYXNrID0gZnVuY3Rpb24oKXsgICBcclxuICAgICAgICAgICAgJHNjb3BlLnRhc2tzTGlzdC5wdXNoKCRzY29wZS5uZXdUYXNrID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrTmFtZTogJHNjb3BlLnRleHROZXdUYXNrLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza1Jlc3BvbnNhYmxlOiAkc2NvcGUudGV4dFJlc3BvbnNUYXNrLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza0VtYWlsOiAkc2NvcGUudGV4dEVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrUGhvbmU6ICRzY29wZS5udW1iZXJQaG9uZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza0RhdGU6ICAkc2NvcGUudGV4dERhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlY2hvOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkc2NvcGUuZW1wdHlGaWVsZHNSZWdpc3RlcigpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI215TW9kYWwtUmVnaXN0ZXIgLmNsb3NlXCIpLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KFwiVGFza3NcIiwgJHNjb3BlLnRhc2tzTGlzdCk7ICAgICAgIFxyXG4gICAgICAgICAgICAkc2NvcGUubWVzc2FnZSA9IFwiTmV3IFRhc2sgQWRkZWQgU3VjY2Vzc2Z1bGx5IVwiO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZWxlY3RUYXNrID0gZnVuY3Rpb24odGFzaywgaW5kZXgpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0YXNrKTtcclxuICAgICAgICAgICAgJHNjb3BlLnZhbEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGlja2VkVGFzayA9IGFuZ3VsYXIuY29weSh0YXNrKTsgXHJcbiAgICAgICAgfTsgIFxyXG5cclxuICAgICAgICAkc2NvcGUudGFza0hlY2hvID0gZnVuY3Rpb24oaW5kZXgpe1xyXG4gICAgICAgICAgICAkc2NvcGUuY2hhbmdlVGFzayA9IGxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KFwiVGFza3NcIik7XHJcbiAgICAgICAgICAgICRzY29wZS5jaGFuZ2VUYXNrW2luZGV4XS5oZWNobyA9ICEkc2NvcGUuY2hhbmdlVGFza1tpbmRleF0uaGVjaG87XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KFwiVGFza3NcIiwgJHNjb3BlLmNoYW5nZVRhc2spO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICRzY29wZS51cGRhdGVUYXNrID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJHNjb3BlLnRhc2tzTGlzdFskc2NvcGUudmFsSW5kZXhdLnRhc2tOYW1lID0gJHNjb3BlLmNsaWNrZWRUYXNrLnRhc2tOYW1lO1xyXG4gICAgICAgICAgICAkc2NvcGUudGFza3NMaXN0WyRzY29wZS52YWxJbmRleF0udGFza1Jlc3BvbnNhYmxlID0gJHNjb3BlLmNsaWNrZWRUYXNrLnRhc2tSZXNwb25zYWJsZTtcclxuICAgICAgICAgICAgJHNjb3BlLnRhc2tzTGlzdFskc2NvcGUudmFsSW5kZXhdLnRhc2tFbWFpbCA9ICRzY29wZS5jbGlja2VkVGFzay50YXNrRW1haWw7XHJcbiAgICAgICAgICAgICRzY29wZS50YXNrc0xpc3RbJHNjb3BlLnZhbEluZGV4XS50YXNrUGhvbmUgPSAkc2NvcGUuY2xpY2tlZFRhc2sudGFza1Bob25lO1xyXG4gICAgICAgICAgICAkc2NvcGUudGFza3NMaXN0WyRzY29wZS52YWxJbmRleF0udGFza0RhdGUgPSAkc2NvcGUuY2xpY2tlZFRhc2sudGFza0RhdGU7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KFwiVGFza3NcIiwgJHNjb3BlLnRhc2tzTGlzdCk7XHJcbiAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gXCJUYXNrIFVwZGF0ZWQgU3VjY2Vzc2Z1bGx5IVwiO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAgICAgJHNjb3BlLmRlbGV0ZVRhc2sgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkc2NvcGUudGFza3NMaXN0LnNwbGljZSgkc2NvcGUudGFza3NMaXN0LmluZGV4T2YoJHNjb3BlLmNsaWNrZWRUYXNrKSwgMSk7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KFwiVGFza3NcIiwgJHNjb3BlLnRhc2tzTGlzdCk7XHJcbiAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gXCJUYXNrIERlbGV0ZWQgU3VjY2Vzc2Z1bGx5IVwiO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAoZnVuY3Rpb24gY2xlYXJNZXNzYWdlKCkge1xyXG4gICAgICAgICAgICAkdGltZW91dChjbGVhck1lc3NhZ2UsIDgwMDApO1xyXG4gICAgICAgICAgICAkc2NvcGUubWVzc2FnZSA9IFwiXCI7XHJcbiAgICAgICAgfSgpKTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnJlbWFpbmluZ1Rhc2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgY3VlbnRhID0gMDtcclxuICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLnRhc2tzTGlzdCwgZnVuY3Rpb24odGFzaykge1xyXG4gICAgICAgICAgICBjdWVudGEgKz0gdGFzay5oZWNobyA/IDAgOiAxO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBjdWVudGE7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmRlbGV0ZVRhc2tzRG9uZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICRzY29wZS50YXNrc0RvbmUgPSAgbG9jYWxTdG9yYWdlU2VydmljZS5nZXQoXCJUYXNrc1wiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnRhc2tzRG9uZSk7XHJcbiAgICAgICAgICAgICRzY29wZS50YXNrc0xpc3QgPSBbXTtcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS50YXNrc0RvbmUsIGZ1bmN0aW9uKHRhc2spIHtcclxuICAgICAgICAgICAgICAgIGlmKCF0YXNrLmhlY2hvKXtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudGFza3NMaXN0LnB1c2godGFzayk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldChcIlRhc2tzXCIsICRzY29wZS50YXNrc0xpc3QpO1xyXG4gICAgICAgIH07IFxyXG5cclxuXHJcbiAgICAgICAgaWYobG9jYWxTdG9yYWdlU2VydmljZS5nZXQoXCJUYXNrc1wiKSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KFwiVGFza3NcIikpO1xyXG4gICAgICAgICAgICAkc2NvcGUudGFza3NMaXN0ID0gbG9jYWxTdG9yYWdlU2VydmljZS5nZXQoXCJUYXNrc1wiKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvL0NvZGlnbyBDb252ZXJzacOzbiBkZSBmZWNoYTogXHJcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgndGV4dERhdGUnLCBmdW5jdGlvbiAobmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNsaWNrZWRUYXNrLnRhc2tEYXRlID0gJGZpbHRlcignZGF0ZScpKG5ld1ZhbHVlLCAneXl5eS9NTS9kZCcpOyBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnY2xpY2tlZFRhc2sudGFza0RhdGUnLCBmdW5jdGlvbiAobmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnRleHREYXRlID0gJGZpbHRlcignZGF0ZScpKG5ld1ZhbHVlLCAneXl5eS9NTS9kZCcpOyBcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmNvbmZpZyhjb25maWcpO1xyXG5cclxuICAgIC8qKiBAbmdJbmplY3QgKi9cclxuICAgIGNvbmZpZy4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlcicsICckbG9jYXRpb25Qcm92aWRlciddO1xyXG4gICAgZnVuY3Rpb24gY29uZmlnKCRyb3V0ZVByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC53aGVuKCcvJywge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2FwcFRhc2tzQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3NyYy9hcHBUYXNrcy9hcHBUYXNrcy5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2FwcFRhc2tzJ1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmZhY3RvcnkoJ2FwcFRhc2tzU2VydmljZXMnLCBhcHBUYXNrc1NlcnZpY2VzKTtcclxuXHJcbiAgICAvKiogQG5nSW5qZWN0ICovXHJcbiAgICBhcHBUYXNrc1NlcnZpY2VzLiRpbmplY3QgPSBbJyRodHRwJywgJyRxJ107XHJcbiAgICBmdW5jdGlvbiBhcHBUYXNrc1NlcnZpY2VzKCRodHRwLCAkcSwgRGF0YUFwcFRhc2tzKSB7XHJcbiAgICAgICAgdmFyIGFwcFRhc2tzU2VydmljZSA9IHt9O1xyXG4gICAgICAgIHJldHVybiBhcHBUYXNrc1NlcnZpY2U7XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdhcHAnKVxuICAgIC5jb25zdGFudCgnRGF0YUhvbWUnLCB7XG4gICAgICBob21lRGF0YTogJ2hvbWVEYXRhJ1xuICAgIH0pXG59KSgpO1xuIiwiKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdob21lQ29udHJvbGxlcicsIGhvbWVDb250cm9sbGVyKTtcblxuICAgIC8qKiBAbmdJbmplY3QgKi9cbiAgICBob21lQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGh0dHAnLCAnbG9jYWxTdG9yYWdlU2VydmljZScsJyRsb2NhdGlvbiddO1xuICAgIGZ1bmN0aW9uIGhvbWVDb250cm9sbGVyKCRzY29wZSwgJGh0dHAsIGxvY2FsU3RvcmFnZVNlcnZpY2UsICRsb2NhdGlvbikge1xuXHRcdFxuICAgIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnYXBwJylcbiAgICAgICAgLmNvbmZpZyhjb25maWcpO1xuXG4gICAgLyoqIEBuZ0luamVjdCAqL1xuICAgIGNvbmZpZy4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlcicsICckbG9jYXRpb25Qcm92aWRlciddO1xuICAgIGZ1bmN0aW9uIGNvbmZpZygkcm91dGVQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgICAgICAgIC53aGVuKCcvaG9tZScsIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnaG9tZUNvbnRyb2xsZXInLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc3JjL2hvbWUvaG9tZS5odG1sJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICdob21lJ1xuICAgICAgICAgICAgfSlcblxuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdhcHAnKVxuICAgICAgICAuZmFjdG9yeSgnaG9tZVNlcnZpY2VzJywgaG9tZVNlcnZpY2VzKTtcblxuICAgIC8qKiBAbmdJbmplY3QgKi9cbiAgICBob21lU2VydmljZXMuJGluamVjdCA9IFsnJGh0dHAnLCAnJHEnXTtcbiAgICBmdW5jdGlvbiBob21lU2VydmljZXMoJGh0dHAsICRxLCBEYXRhaG9tZSkge1xuICAgICAgICB2YXIgaG9tZVNlcnZpY2UgPSB7fTtcbiAgICAgICAgcmV0dXJuIGhvbWVTZXJ2aWNlO1xuICAgIH1cbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
