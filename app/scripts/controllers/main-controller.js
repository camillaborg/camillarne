angular.module('app', [])
    .controller('MainController', MainController);

function MainController($scope){
    $scope.gameID = 'A743Hd';

    $scope.players = [
        {
            name: "Emma",
            active: false,
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

}
