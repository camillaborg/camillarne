app.controller('GameController', GameController)

function GameController($scope, $interval, Mobile, $state, $timeout, Game){
    $scope.onMobile = Mobile;
    $scope.game = Game;
    console.log(Game.questions);

    // $scope.hasAnswered = ["Emma", "Mikaela"];
    // $scope.numOfPlayers = 3;
    //$scope.currentPlayer = $scope.players.A1;
    //$scope.currentQuestion = $scope.game.questions[0];
    //$scope.currentQuestion.selectedAnswer = 0;

    // $scope.currentQuestion.answers = {
    //     A1: {
    //         name: "Emma",
    //         answer: 0,
    //         color: "pink"
    //     },
    //     A2: {
    //         name: "Camilla",
    //         answer: 0,
    //         color: "blue"
    //     },
    //     A3: {
    //         name: "Mikaela",
    //         answer: 2,
    //         color: "green"
    //     }
    //
    //
    //
    // }

            //  $scope.currentQuestion = $scope.game.questions[0];
            //  $scope.currentQuestion.selectedAnswer = 1;
            //  $scope.currentPlayer = $scope.players.A2;
            //  $scope.currentQuestion.answers = {
            //      A1: {
            //          name: "Emma",
            //          answer: 1,
            //          color: "pink"
            //      },
            //      A2: {
            //          name: "Camilla",
            //          answer: 2,
            //          color: "blue"
            //      },
            //      A3: {
            //          name: "Mikaela",
            //          answer: 3,
            //          color: "green"
            //      }
            //  }

            //Timer funktion
            if($state.is('guess-answer')) {
                $scope.count = 7;
                var counter = $interval(timer, 1000); // kör varje sekund

                function timer() {
                    $scope.count = $scope.count - 1;
                    if ($scope.count <= 0 /*|| Game.numOfPlayers == Game.hasAnswered.length*/) {
                        //$scope.currentQuestion = $scope.questions[1];
                        $interval.cancel(counter);
                        $state.go('display-answer');
                        return;
                    }
                }
            }

        if($state.is('display-answer')) {
            var time = $timeout(function () {
                Game.nextQuestion();
                $state.go('guess-answer')

                console.log('visning slut!')
                $timeout.cancel(time);
            }, 3000);
        }


            $scope.chooseAnswer = function (answer) {
                $scope.chosenAnswer = answer;
                //$scope.hasAnswered.push("Camilla");


            }


        }
