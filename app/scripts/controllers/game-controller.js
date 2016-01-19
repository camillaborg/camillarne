app.controller('GameController', GameController);

function GameController($scope, Mobile){
    $scope.gameID = 'A743Hd';

    $scope.onMobile = Mobile;
    if(!$scope.onMobile) {
      $scope.gameID = GameService.createGame(generateGameCode());
      GameService.setUsersTo($scope, 'players');
    }

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

    $scope.chooseAnswer = function(answer){
        $scope.chosenAnswer = answer;
        console.log($scope.chosenAnswer);
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
