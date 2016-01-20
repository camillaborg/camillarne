app.controller('GameController', GameController)

function GameController($scope, $interval, Mobile, $state, $timeout){
    $scope.gameID = 'A743Hd';

    $scope.onMobile = Mobile;

    $scope.questions = [
        {
          question: " favorite animal?",
          options: ["Dog", "Monkey", "Cat", "Horse"]
        },
        {
            question: "favorite food?",
            options: ["Pizza", "Pasta", "Pancakes", "Pie"]
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

    $scope.hasAnswered = ["Emma", "Mikaela"];
    $scope.numOfPlayers = 3;
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

            //Timer funktion
            if($state.is('guess-answer')){
                $scope.count=7;
                var counter= $interval(timer, 1000); // kör varje sekund

                function timer() {
                    $scope.count=$scope.count-1;
                    if ($scope.count <= 0 || $scope.numOfPlayers == $scope.hasAnswered.length) {
                        $scope.currentQuestion = $scope.questions[1];
                        $interval.cancel(counter);
                        $state.go('display-answer');
                        return;
                    }
                }
            }



            if($state.is('display-answer')){
                var time = $timeout(function () {
                    $state.go('guess-answer');
                    console.log('visning slut!');
                    $timeout.cancel(time);

                }, 3000);

            }


            $scope.chooseAnswer = function(answer){
                $scope.chosenAnswer = answer;
                console.log($scope.chosenAnswer);
                $scope.hasAnswered.push("Camilla");


            }














}
