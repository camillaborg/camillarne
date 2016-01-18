app.controller('GameController', GameController);

function GameController($scope){
    $scope.gameID = 'A743Hd';

    $scope.questions = [
        {
          partOne: "What's ",
          partTwo: " favorite animal?",
          options: ["Dog", "Monkey", "Cat", "Horse"]
        },
        {
           partOne: "What's",
           partTwo: "favorite food?",
           options: ["Pizza", "Pasta", "Pancakes", "Pony"]
        }

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

    var count=11;
    var counter=setInterval(timer, 1000); //1000 will  run it every 1 second

    function timer()
    {
        count=count-1;
        if (count <= -1)
        {
            clearInterval(counter);
            //counter ended, do something here
            return;
        }

    console.log(document.getElementsByClassName('timer').innerHTML = count);
    }


    // Funktion för att slice:a ut your till currentPlayer
    /*function replaceWithName (question){
        var slice = question.replace("your", "<span>" +   $scope.currentPlayer.name + "'s <span> ");
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
