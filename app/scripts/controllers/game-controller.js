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
        }

    ]

    $scope.players = [
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

    $scope.currentPlayer = $scope.players[0];

    // Funktion för att slice:a ut your till currentPlayer
    function replaceWithName (question){
        var slice = question.replace("your", $scope.currentPlayer.name + "'s");
        return slice;
    }

    // currentQuestion formateras och körs med slice-funktionen
    $scope.currentQuestion = $scope.questions[0];
    $scope.currentQuestion.formattedQuestion = replaceWithName($scope.currentQuestion.question);

    /* Loggar
    console.log($scope.currentQuestion.formattedQuestion);
    console.log(replaceWithName($scope.questions[0].question));
    */
}



