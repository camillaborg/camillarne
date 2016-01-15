app.controller('MainController', MainController);

function MainController($scope, CurrentGame, CurrentUser, Mobile, GameService){
    function generateGameCode(){
      var finalCode = [],
          possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      for(var i = 0; i < 6; i++){
        finalCode.push(possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length)));
      }
      return finalCode.join('');
      //return 'A743HD';
    }  
  
    $scope.onMobile = Mobile;
    if(!$scope.onMobile) {
      $scope.gameID = GameService.createGame(generateGameCode());
      GameService.setUsersTo($scope, 'players');
    }
    
    $scope.userState = 'start';

  
    $scope.connectToGame = function (id){
        if(!id) {$scope.validationError = "You need to enter an ID."; return;}
        if(id.length !== 6) {$scope.validationError = "The ID must be 6 characters long."; return;}
        $scope.validationError = "";
        id = id.toUpperCase();
        $scope.gameID = GameService.connectToGame(id);
        $scope.userState = 'connected';
        //fix so it only changes state and ID if actually connected, handle error case
    }
    
    $scope.setUser = function(name){
        if(!name) {$scope.validationError = "You need to enter a name."; return;}
        $scope.validationError = "";
        GameService.registerUser(name);
        $scope.userState = 'registered';
        //fix so it only changes state and ID if actually connected, handle error case
    }

}
