var app = angular.module('app', ['firebase'])
          .value('CurrentGame', generateGame())
          .constant('GameID', generateGameCode())
          .constant('FirebaseURL', 'https://friend-or-fraud.firebaseio.com/');

function generateGame(){
  return {
      players: [],
      questions: []
    }
}

function generateGameCode(){
  var code = [],
      possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  for(var i = 0; i < 6; i++){
    code.push(possible.charAt(Math.floor(Math.random() * possible.length)));
  }
  
  //return code.join('');
  return 'A743Hd';
}