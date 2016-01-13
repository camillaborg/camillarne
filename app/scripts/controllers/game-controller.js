app.controller('GameController', GameController);

function GameController($scope){
    $scope.gameID = 'A743Hd';

    $scope.questions = [
        {
          question: "What's your favorite animal?",
          options: ["Dog", "Monkey", "Cat", "Horse"]
        },
        {
           question: "What's your favorite food?",
           options: ["Pizza", "Pasta", "Pancakes", "Pony"]
        },

    ]
}



