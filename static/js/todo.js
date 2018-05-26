var app = angular.module('toDo', []);
app.controller('toDoController', function($scope, $http) {
    // $scope.todoList = [{todoText: 'Finish this app', done: false}];
    $http.get('/todo/api/').then(function(response) {
        $scope.todoList = [];
        for (var i = 0; i < response.data.length; i++) {

            var todo = {};
            todo.todoText = response.data[i].text

            todo.done = response.data[i].done
            todo.id = response.data[i].id
            
            $scope.todoList.push(todo);
        }
    });

    $scope.saveData = function() {
        if ($scope.todoInput) {
            var data = {text: $scope.todoInput, done: false}

            $http.put('/todo/api/', data).then(function(response) {
                var idFromDb = response.data.id;
                
                $scope.todoAdd(idFromDb)
            })
        }
    }

    $scope.todoAdd = function(idFromDb) {
        console.log(idFromDb);
        
        if ($scope.todoInput) {
            $scope.todoList.push({todoText: $scope.todoInput, done: false, id: idFromDb});
            $scope.todoInput = '';
        }
        else {
            console.warn("There is no text in input");
        }
    };

    $scope.remove = function() {
        var oldList = $scope.todoList;
        $scope.todoList = [];

        angular.forEach(oldList, function(todo) {
            if (todo.done) {
                $http.delete('/todo/api/' + todo.id + '/');
            } else {
                $scope.todoList.push(todo);
            }
        })
    }
})
