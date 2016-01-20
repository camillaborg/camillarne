app.controller('GameController', GameController)
var rounds = 0;

function GameController($scope, $interval, Mobile, $state, $timeout, GameService){
    $scope.gameID = 'A743Hd';

    $scope.onMobile = Mobile;

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
            answer: 0,
            color: "blue"
        },
        A3: {
            name: "Mikaela",
            answer: 2,
            color: "green"
        }



    }


         if(rounds < 5){
             $scope.currentQuestion = $scope.questions[1];
         }
        //Timer funktion
        if($state.is('guess-answer')){
        $scope.count=7;
        var counter= $interval(timer, 1000); // kör varje sekund

        function timer() {
            $scope.count=$scope.count-1;
            if ($scope.count <= 0) {
                $interval.cancel(counter);
                $state.go('display-answer');
                return;
            }
        }
    }




        if($state.is('display-answer')){
            var time = $timeout(function () {
                if(rounds <= 1) {
                    $state.go('guess-answer')
                    rounds++;
                    console.log(rounds);
                }
                else{
                    $state.go('result')
                }
               console.log('visning slut!')
               $timeout.cancel(time);
           }, 3000);

        }




    $scope.chooseAnswer = function(answer){
        $scope.chosenAnswer = answer;
        console.log($scope.chosenAnswer);
    }

}
