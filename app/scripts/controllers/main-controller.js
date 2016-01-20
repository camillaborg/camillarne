app.controller('MainController', MainController);

function MainController($scope, $rootScope, CurrentGame, CurrentUser, Mobile, GameService){
    function generateGameCode(){
      var finalCode = [],
          possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      for(var i = 0; i < 6; i++){
        finalCode.push(possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length)));
      }
      return finalCode.join('');
    }  
  
    $scope.onMobile = Mobile;
    if(!$scope.onMobile) {
      $scope.gameID = GameService.createGame(generateGameCode());
      GameService.setUsersTo($scope, 'players');
    }
      
    $scope.userState = 'start';
    $scope.user = CurrentUser;
  
    $scope.connectToGame = function (id){
        if(!id) {$scope.validationError = "You need to enter an ID."; return;}
        if(id.length !== 6) {$scope.validationError = "The ID must be 6 characters long."; return;}
        $scope.validationError = "";
        id = id.toUpperCase();
        GameService.connectToGame(id);
    }
    
    $rootScope.$on('connected_to_game', function(){
        $scope.validationError = "";
        $scope.gameID = CurrentGame.id;
        $scope.userState = 'connected';
        $scope.$apply();
    });
  
    $rootScope.$on('invalid_game_id', function(){
        $scope.validationError = "Could not find the game, make sure the ID is correct.";
        $scope.$apply();
    });
    
    $scope.setUser = function(name){
        if(!name) {$scope.validationError = "You need to enter a name."; return;}
        $scope.validationError = "";
        GameService.registerUser(name);
    }
    
    $rootScope.$on('user_registered', function(){
        $scope.user = CurrentUser;    
        $scope.userState = 'registered';
        $scope.$apply();
    });
    
    $scope.toggleReady = function(){
      $scope.user.ready = !$scope.user.ready;
      GameService.toggleCurrentUserReady($scope.user.ready);
    }

}
