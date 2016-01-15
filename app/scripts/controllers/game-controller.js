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

    $scope.currentPlayer = $scope.players[0];
    $scope.currentPlayer.answer = $scope.questions[0].options[0];






}
