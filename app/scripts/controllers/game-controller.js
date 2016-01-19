app.controller('GameController', GameController);

function GameController($scope, $interval, $state){
    $scope.gameID = 'A743Hd';

    $scope.questions = [
        {
          question: " favorite animal?",
          options: ["Dog", "Monkey", "Cat", "Horse"]
        },
        {
            question: "favorite food?",
            options: ["Pizza", "Pasta", "Pancakes", "Pony"]
        }

    ]

    $scope.players = {
        A1: {
            name: "Emma",
            ready: true,
            score: 0,
            currentPlayer: true,
            color: "pink",
            hasAnswered: false
        },
        A2: {
            name: "Camilla",
            ready: true,
            score: 0,
            currentPlayer: false,
            color: "blue",
            hasAnswered: true

        },
        A3: {
            name: "Mikaela",
            ready: false,
            score: 0,
            currentPlayer: false,
            color: "green",
            hasAnswered: true

        }
        }


    $scope.currentPlayer = $scope.players.A1;
    $scope.currentQuestion = $scope.questions[0];
    $scope.currentQuestion.selectedAnswer = 0;
    $scope.currentQuestion.answers = {
        A1: {
            name: "Emma",
            answer: 0,
            color: "pink"
        },
        A2: {
            name: "Camilla",
            answer: 1,
            color: "blue"
        },
        A3: {
            name: "Mikaela",
            answer: 2,
            color: "green"
        }



    }

    $scope.count=7;
    var counter= $interval(timer, 1000); // kör varje sekund

    function timer()
    {
        $scope.count=$scope.count-1;
        if ($scope.count <= 0)
        {
            //counter ended, do something here
            $interval.cancel(counter);
            $state.go('display-answer');
            return;
        }
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
