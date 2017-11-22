(function(angular) {
  'use strict';
angular.module('form', ['ngRoute'])
  .controller('formController', ['$scope', function($scope) {
        $scope.wantsCalFresh = false;
        $scope.wantsMediCal = false;
        $scope.wantsCalWORKS = false;

        $scope.isCitizen;
        $scope.income;
        $scope.assets;
        $scope.numberInHousehold;

        $scope.isDisabled = false
        $scope.age
        $scope.isRefugee = false
        $scope.nursingHome = false
        $scope.hasCancer = false
 

        $scope.isStudent;
        $scope.hasSSI;
        $scope.numberOnSSI;

        $scope.has60 = false;
        $scope.hasDisabled = false;

        $scope.isPregnant;
        $scope.hasChildUnder19;
        $scope.hasChildUnder21;


        $scope.hasUnavailableParentCalWORKS;
        $scope.hasLowIncomeParentCalWORKS;

        $scope.hasUnavailableParentMediCal;
        $scope.hasLowIncomeParentMediCal;

        $scope.isCalFreshEligible = function () { 

            return $scope.income <= 1915 + 670 * ($scope.numberInHousehold - 1) 
            && !($scope.isStudent && $scope.numberInHousehold == 1) 
            && !($scope.numberInHousehold == $scope.numberOnSSI) 
            && !($scope.numberInHousehold == 1 && $scope.hasSSI)
            && $scope.isCitizen; 
        };

        $scope.isMediCalEligible = function () { 

            return $scope.income < $scope.MediCalIncome()
                || $scope.age < 21
                || $scope.age > 64
                || $scope.hasUnavailableParentMediCal
                || $scope.hasLowIncomeParentMediCal
                || $scope.otherMediCalRequirements()
                
        };

        $scope.isCalWORKSEligible = function () {
            return $scope.meetsChildReqsCalWORKS()
            && $scope.isCitizen
            && $scope.income <= (420 + 320 * $scope.numberInHousehold - 8 * ($scope.numberInHousehold) ^ 2)
            && ($scope.assets <= 2250 || (($scope.has60 || $scope.hasDisabled) && ($scope.assets <= 3250 )));
        };


//  Utils

        $scope.checkSSINumber = function () {
            return $scope.numberInHousehold > 1 && $scope.hasSSI;
        }

            
        $scope.MediCalIncome = function () {
            return 16395 + ($scope.numberInHousehold - 1) * 5741;
        }

        $scope.otherMediCalRequirements = function () {
            return $scope.isRefugee || $scope.nursingHome || $scope.hasCancer || $scope.isDisabled || $scope.isPregnant;
        }



        $scope.meetsChildReqsMediCal = function () {
            return $scope.hasLowIncomeParentMediCal || $scope.hasUnavailableParentMediCal
        }
        $scope.meetsChildReqsCalWORKS = function () {
            return $scope.hasLowIncomeParentCalWORKS || $scope.hasUnavailableParentCalWORKS || $scope.isPregnant;
        }

  }]);
})(window.angular);

