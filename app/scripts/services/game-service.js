app.factory('GameService', gameService); 

function gameService(CurrentGame, CurrentUser, FirebaseURL, $firebaseObject, $firebaseArray, $firebaseAuth){
    var ref = new Firebase(FirebaseURL),
        userRef,
        gameRef,
        authObj = $firebaseAuth(ref);
  
    var service = {
      /* GAME ROOM FUNCTIONALITY */
      createGame: function(id){
        CurrentGame.id = id;
        gameRef = ref.child(CurrentGame.id);
        gameRef.set(CurrentGame);
        
        authObj.$authAnonymously().then(function(authData) {
          console.log("Logged in as:", authData.uid);
          gameRef.onDisconnect().remove();

        }, {remember: "sessionOnly"})
         .catch(function(error) {
          console.error("Authentication failed:", error);
        });
        return id;
      },
      connectToGame: function(id){
        CurrentGame.id = id;
        gameRef = ref.child(CurrentGame.id);
        return id;
      },
      /* USER FUNCTIONALITY */
      registerUser: function(name){
         authObj.$authAnonymously().then(function(authData) {
            var user = {name: name, score: 0, ready: false, color: "pink"};
            console.log("Logged in as:", authData.uid);
            userRef = gameRef.child('players').child(authData.uid);
            gameRef.child('players').child(authData.uid).set(user);
            CurrentUser = user;
            userRef.onDisconnect().remove();
        }, {remember: "sessionOnly"})
         .catch(function(error) {
          console.error("Authentication failed:", error);
        });
      },
      setUsersTo: function(scope, varName){
        $firebaseObject(ref.child(CurrentGame.id).child('players')).$bindTo(scope, varName);
      },
      getUser: function(id){
        return $firebaseObject(gameRef.child('players').child(id));
      }
    };
    
    return service;
}
