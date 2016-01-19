app.factory('GameService', gameService); 

function gameService(CurrentGame, CurrentUser, FirebaseURL, $firebaseObject, $firebaseArray, $firebaseAuth, $rootScope, $state){
    var ref = new Firebase(FirebaseURL + '/Games'),
        userRef,
        gameRef,
        authObj = $firebaseAuth(ref),
        colors = ['pink', 'green', 'blue', 'red'];
  
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
                
        gameRef.child('players').on('value', function(snapshot){
          var update = {size: 0, inProgress: false}, key, ready = [];
          for (key in snapshot.val()) {
              if (snapshot.val().hasOwnProperty(key)) update.size++;
              ready.push(snapshot.val()[key].ready);
          }
          if(ready.indexOf(false) === -1 && ready.length) update.inProgress = true;
          gameRef.update(update);
          if(update.inProgress) $state.go('set-answer');
        });
        
        return id;
      },
      connectToGame: function(id){
        return ref.child(id).once('value', function(snapshot) {
          var exists = (snapshot.val() !== null);
          if (!exists) { $rootScope.$broadcast('invalid_game_id'); return; }
          
          CurrentGame.id = id;
          gameRef = ref.child(CurrentGame.id);
          $rootScope.$broadcast('connected_to_game');
          
          gameRef.on('value', function(snapshot){
              CurrentGame = snapshot.val();
              if(snapshot.val().inProgress) $state.go('set-answer');
          });
        });
      },
      /* USER FUNCTIONALITY */
      registerUser: function(name){
         authObj.$authAnonymously().then(function(authData) {
            var user = {name: name, score: 0, ready: false, color: colors[Math.floor(Math.random() * colors.length)]};
            console.log("Logged in as:", authData.uid);
            userRef = gameRef.child('players').child(authData.uid);
            gameRef.child('players').child(authData.uid).set(user);
            CurrentUser = user;
            userRef.onDisconnect().remove();
            $rootScope.$broadcast('user_registered');
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
      },
      toggleCurrentUserReady(status){
        userRef.update({ready: status});
      }
    };
    
    return service;
}
