app.service('Game', Game);

function Game(CurrentUser, FirebaseRef, $firebaseAuth, Error, $state){
  var self = this;
  
  this.ref = null;
  this.inProgress = false;
  this.numOfPlayers = 0;
  this.id = '...';
  
  this.createNew = function(){
    var id = generateGameCode();
    
    FirebaseRef.child('Games').child(id).once('value', function(snapshot) {
        if (snapshot.val() === null) addToFirebase(id);
        else self.createGame();
    });
    
    function addToFirebase(id){
        self.id = id;
        self.ref = FirebaseRef.child('Games').child(id);
        self.ref.set({numOfPlayers: self.numOfPlayers, inProgress: self.inProgress});

        $firebaseAuth(FirebaseRef).$authAnonymously().then(function(authData) {
              console.log("Logged in as:", authData.uid);
              self.ref.onDisconnect().remove();  
            }, {remember: "sessionOnly"})
             .catch(function(error) {
              console.error("Authentication failed:", error);
        });

        self.ref.on('value', function(snapshot){
              var update = checkPlayers(snapshot.val().players);
              self.numOfPlayers = update.numOfPlayers;
              self.inProgress = update.inProgress;

              self.ref.update(update);
              if(update.inProgress) {setupGame(); self.ref.off('value');}
        });
      }
                              
  };

  this.connectTo = function(id){
    FirebaseRef.child('Games').child(id).once('value', function(snapshot) {
          var exists = (snapshot.val() !== null);
          if (!exists) {Error.message = "Game could not be found. Check your ID."; return; } //errormessage doesn't get updated until second press at the moment
      
          Error.message = '';
          self.ref = FirebaseRef.child('Games').child(id);
          self.id = id;
          self.inProgress = snapshot.val().inProgress;
          self.numOfPlayers = snapshot.val().numOfPlayers;
          CurrentUser.state = 'connected';
                
          self.ref.on('value', function(snapshot){
              setGameParameters(snapshot.val());
              if(self.inProgress) startGame();
          });
    });
  }
  
  function setupGame(){
    FirebaseRef.child('Questions').once('value', function(snapshot) {
        var questions = shuffleQuestions(snapshot.val());
        self.questions = questions;
        self.ref.update({questions: questions});
        startGame();
    });
  }
  
  function startGame(){
    console.log('start');
    //$state.go('set-answer');
  }
  
  function setGameParameters(snapshotVal){
    self.inProgress = snapshotVal.inProgress;
    self.players = snapshotVal.players;
    self.numOfPlayers = snapshotVal.numOfPlayers;
  }
  
  function checkPlayers(players){
      var size = 0, ready = [], play = false;
    
      for (key in players) {
         if (players.hasOwnProperty(key)) size++;
         ready.push(players[key].ready);
      }
      if(ready.indexOf(false) === -1 && ready.length) play = true;
      return {numOfPlayers: size, inProgress: play};
  }
  
  function generateGameCode(){
  var finalCode = [],
      possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for(var i = 0; i < 6; i++){
    finalCode.push(possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length)));
  }
  return finalCode.join('');
}
  
  function shuffleQuestions(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    o.splice(self.numOfPlayers * 2);
    return o;
  }

}