app.controller('MainController', MainController);

function MainController($scope, CurrentGame, GameID, FirebaseURL, $firebaseObject, $firebaseArray, $firebaseAuth){
    $scope.gameID = GameID;
    var ref = new Firebase(FirebaseURL),
        userRef,
        authObj = $firebaseAuth(ref);
 /*       
   authObj.$authAnonymously().then(function(authData) {
      console.log("Logged in as:", authData.uid);
      userRef = new Firebase(FirebaseURL + 'presence/' + authData.uid);
       ref.child(GameID).child('players').child(authData.uid).set({name: 'Emma', score: 0});
        userRef.onDisconnect().remove();
      
    }, {remember: "sessionOnly"})
     .catch(function(error) {
      console.error("Authentication failed:", error);
    });
  */
  
}