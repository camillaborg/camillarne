app.controller('MainController', MainController);

function MainController($scope, CurrentGame, GameID, Mobile, FirebaseURL, $firebaseObject, $firebaseArray, $firebaseAuth){
    $scope.gameID = GameID;
    var ref = new Firebase(FirebaseURL),
        userRef,
        authObj = $firebaseAuth(ref),
        onMobile = Mobile;

   authObj.$authAnonymously().then(function(authData) {
      console.log("Logged in as:", authData.uid);
      userRef = ref.child(GameID).child('players').child(authData.uid);
       ref.child(GameID).child('players').child(authData.uid).set({name: 'Emma', score: 0, ready: false, color: "pink"});
        userRef.onDisconnect().remove();

    }, {remember: "sessionOnly"})
     .catch(function(error) {
      console.error("Authentication failed:", error);
    });


    $scope.players = [
        {
            name: "Emma",
            ready: true,
            score: 0,
            currentPlayer: true,
            color: "pink"
        },
        {
            name: "Camilla",
            ready: true,
            score: 0,
            currentPlayer: false,
            color: "blue"

        },
        {
            name: "Mikaela",
            ready: false,
            score: 0,
            currentPlayer: false,
            color: "green"
        }
    ]

}
