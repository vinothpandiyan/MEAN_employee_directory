var eApp = angular.module('empApp', []);

eApp.controller('employeeController', ['$scope', '$http', function($scope, $http){
    
    var updateEmployeeList = function(){
        $http.get('/employeelist').success(function(response){
            $scope.employees = response;
            $scope.employee = '';
        });
    };
    updateEmployeeList();

    // Add new employee
    $scope.addEmployee = function() {
      $http.post('/addemployee', $scope.employee).success(function(response) {
          if(response){
            $scope.messageClass = 'success';
            $scope.messageData = "Successfully added new employee";
          } else {
            $scope.messageClass = 'danger'
            $scope.messageData = "Error adding new employee. Try again";
          }
        updateEmployeeList();
      });
    };

    // Remove Specific Employee
    $scope.removeEmployee = function(id) {
      $http.delete('/removeemployee/' + id).success(function(response) {
          $scope.messageClass = 'success';
          $scope.messageData = "Successfully removed";
          updateEmployeeList();
      });
    };

    // calculate age
    $scope.calculateAge = function calculateAge(birthday) { // birthday is a date
        birthday = new Date(birthday);
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    // Edit Employee
    $scope.editEmployee = function(id) {
        console.log(id);
        $http.get('/employee/' + id).success(function(response) {
            $scope.employee = response;
        });
   };
    
    // Udpate Employee
    $scope.updateEmployee = function() {
     console.log($scope.employee._id);
     $http.post('/updateemployee/' + $scope.employee._id, $scope.employee).success(function(response) {
       updateEmployeeList();
     });
    };

}]);