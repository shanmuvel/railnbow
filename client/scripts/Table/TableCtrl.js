(function() {
  'use strict';
  angular.module('app.tables', []).controller('tableCtrl', [
    '$scope', '$filter', function($scope, $filter) {
      var init;
      $scope.stores = [
        {
          name: 'Shanmuganathan',
          email: 'shan@gmail.com',
          id: 1
        }, {
          name: 'Karthi',
          email: 'karthi@gmail.com',
          id: 2
        }, {
          name: 'Senthil',
          email: 'senthil@gmail.com',
          id: 3
        }, {
          name: 'Sujan',
          email: 'sujan@gmail.com',
          id: 4
        }, {
          name: 'Shiva',
          email: 'shiva@gmail.com',
          id: 5
        }, {
          name: 'Ryan',
          email: 'ryan@gmail.com',
          id: 6
        }, {
          name: 'Martin',
          email: 'martin@gmail.com',
          id: 7
        }, {
          name: 'Joe',
          email: 'joe@gmail.com',
          id: 8
        }, {
          name: 'Ajay',
          email: 'ajay@gmail.com',
          id: 9
        }, {
          name: 'Elisha',
          email: 'elisha@gmail.com',
          id: 10
        }, {
          name: 'Peter',
          email: 'peter@gmail.com',
          id: 11
        }, {
          name: 'Hema',
          email: 'hema@gmail.com',
          id: 12
        }, {
          name: 'Richard',
          email: 'richard@gmail.com',
          id: 13
        }, {
          name: 'Krish',
          email: 'krish@gmail.com',
          id: 14
        }, {
          name: 'Vibin',
          email: 'vibin@gmail.com',
          id: 15
        }, {
          name: 'Daniel',
          email: 'deniel@gmail.com',
          id: 16
        }, {
          name: 'Raj',
          email: 'raj@gmail.com',
          id: 17
        }, {
          name: 'Imran',
          email: 'imran@gmail.com',
          id: 18
        }, {
          name: 'Santhya',
          email: 'santhya@gmail.com',
          id: 19
        }, {
          name: 'Justin',
          email: 'justin@gmail.com',
          id: 20
        }, {
          name: 'Vijay',
          email: 'vijay@gmail.com',
          id: 21
        }, {
          name: 'Vidhya',
          email: 'vidhya@gmail.com',
          id: 22
        }, {
          name: 'Karan',
          email: 'karan@gmail.com',
          id: 23
        }, {
          name: 'Michel',
          email: 'michel@gmail.com',
          id: 24
        }, {
          name: 'leena',
          email: 'leena@gmail.com',
          id: 25
        }
      ];
      $scope.searchKeywords = '';
      $scope.filteredStores = [];
      $scope.row = '';
      $scope.select = function(page) {
        var end, start;
        start = (page - 1) * $scope.numPerPage;
        end = start + $scope.numPerPage;
        return $scope.currentPageStores = $scope.filteredStores.slice(start, end);
      };
      $scope.onFilterChange = function() {
        $scope.select(1);
        $scope.currentPage = 1;
        return $scope.row = '';
      };
      $scope.onNumPerPageChange = function() {
        $scope.select(1);
        return $scope.currentPage = 1;
      };
      $scope.onOrderChange = function() {
        $scope.select(1);
        return $scope.currentPage = 1;
      };
      $scope.search = function() {
        $scope.filteredStores = $filter('filter')($scope.stores, $scope.searchKeywords);
        return $scope.onFilterChange();
      };
      $scope.order = function(rowName) {
        if ($scope.row === rowName) {
          return;
        }
        $scope.row = rowName;
        $scope.filteredStores = $filter('orderBy')($scope.stores, rowName);
        return $scope.onOrderChange();
      };
      $scope.numPerPageOpt = [3, 5, 10, 20];
      $scope.numPerPage = $scope.numPerPageOpt[2];
      $scope.currentPage = 1;
      $scope.currentPageStores = [];
      init = function() {
        $scope.search();
        return $scope.select($scope.currentPage);
      };
      return init();
    }
  ]);

}).call(this);

//# sourceMappingURL=TableCtrl.js.map
