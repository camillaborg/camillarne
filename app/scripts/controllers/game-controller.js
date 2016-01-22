app.controller('GameController', GameController)

function GameController($scope, $interval, Mobile, $state, $timeout, Game, CurrentUser){
    $scope.onMobile = Mobile;
    $scope.game = Game;
    $scope.user = CurrentUser;
  
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
                $state.go('set-answer')

                $timeout.cancel(time);
            }, 10000);
        }


        $scope.chooseAnswer = function (answer) {
            $scope.chosenAnswer = answer;
            if(Mobile) CurrentUser.chooseAnswer(answer);
        }

        $scope.setAnswer = function (answer){
            Game.setCurrentQuestionAnswer(answer);          
        }
}
