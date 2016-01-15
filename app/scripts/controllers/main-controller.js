app.controller('MainController', MainController);

function MainController($scope, CurrentGame, Mobile, GameService){

    function generateGameCode(){
      var finalCode = [],
          possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      for(var i = 0; i < 6; i++){
        finalCode.push(possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length)));
      }
      //return finalCode.join('');
      return 'A743HD';
    }  
  
    $scope.onMobile = Mobile;
    if(!$scope.onMobile) {
      $scope.gameID = GameService.createGame(generateGameCode());
      GameService.setUsersTo($scope, 'players');
    }
    
    $scope.userState = 'start';

    $scope.connectToGame = function (id){
        if(!id || id.length !== 6) return;
        id = id.toUpperCase();
        $scope.gameID = GameService.connectToGame(id);
        $scope.userState = 'connected';
        //fix so it only changes state and ID if actually connected, handle error case
    }
    
    $scope.setUser = function(name){
        if(!name) return;
        GameService.registerUser(name);
        $scope.userState = 'registered';
        //fix so it only changes state and ID if actually connected, handle error case
    }
    
  
    /*$scope.players = [
        {
            name: "Emma",
            active: true,
            score: 0,
            currentPlayer: true,
            color: "pink"
        },
        {
            name: "Camilla",
            active: true,
            score: 0,
            currentPlayer: true,
            color: "blue"

        },
        {
            name: "Mikaela",
            active: false,
            score: 0,
            currentPlayer: true,
            color: "green"
        }
    ]
*/
}
