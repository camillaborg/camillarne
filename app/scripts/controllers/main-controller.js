app.controller('MainController', MainController);

function MainController($scope, Error, CurrentUser, Game, Mobile){
    $scope.user = CurrentUser;
    $scope.game = Game;
    $scope.validationError = Error;
    $scope.userState = 'start';
    $scope.onMobile = Mobile;

    if(!$scope.onMobile) {
      Game.createNew();
    }
      
    $scope.connectToGame = function (id){
        if(!id) {Error.message = "You need to enter an ID."; return;}
        if(id.length !== 6) {Error.message = "The ID should be 6 characters long."; return;}
      
        id = id.toUpperCase();
        Game.connectTo(id);
    }
        
    $scope.setUser = function(name){
        if(!name) {Error.message = "You need to enter a name."; return;}
        Error.message = "";
        
        CurrentUser.auth().then(function(authData) {
            var user = CurrentUser.setDetails(name);        
            
            console.log("Logged in as:", authData.uid);
            CurrentUser.ref = Game.ref.child('players').child(authData.uid);
            CurrentUser.ref.set(user);
            CurrentUser.ref.onDisconnect().remove();
          
            CurrentUser.state = 'registered';
        }, {remember: "sessionOnly"})
         .catch(function(error) {
          console.error("Authentication failed:", error);
        });
    }
    
  
    $scope.toggleReady = function(){
      $scope.user.ready = !$scope.user.ready;
      CurrentUser.toggleReady($scope.user.ready);
    }

}
