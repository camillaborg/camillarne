app.service('CurrentUser', CurrentUser);

function CurrentUser(FirebaseRef, $firebaseAuth){
    var colors = ['pink', 'green', 'blue', 'red', 'orange'],
        color = colors[Math.floor(Math.random() * colors.length)];
    //this.ready = false;

    this.setDetails = function(name){
        var user = {};
        this.name = user.name = name;
        this.score = user.score = 0;
        this.ready = user.ready = false;
        this.color = user.color = color;
        return user;
    }

    this.setAnswer = function(answer){
        this.ref.update({hasAnswered: answer});
    }

    this.toggleReady = function(status){
        this.ready = status;
        this.ref.update({ready: status});
    }

    this.state = 'start';

    this.ref = null;
    this.auth = $firebaseAuth(FirebaseRef).$authAnonymously;
}
