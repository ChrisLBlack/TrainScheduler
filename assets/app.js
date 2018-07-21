$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyByojJ1gn5MKkv7TCfrvsyALGuCQT2GHb4",
        authDomain: "trainscheduler-3bb15.firebaseapp.com",
        databaseURL: "https://trainscheduler-3bb15.firebaseio.com",
        projectId: "trainscheduler-3bb15",
        storageBucket: "",
        messagingSenderId: "351425985615"
    };
    firebase.initializeApp(config);

    //global variables
    var trainName = "";
    var destName = "";
    var trainTime = 0;
    var freqTime = 0;

//this takes user input and adds train to data base
    $("#add-train-btn").on("click", function (event) {

        event.preventDefault();
        //grabs data from input fields and trims them
        trainName = $('#train-name-input').val().trim();
        destName = $('#dest-input').val().trim();
        trainTime = $('#train-time-input').val().trim();
        freqTime = $('#freq-input').val().trim();

        //pushes to database
        firebase.database().ref().push({
            name: trainName,
            dest: destName,
            time: trainTime,
            freq: freqTime
        })
        //empties input fields
        $("#train-name-input").val("");
        $('#dest-input').val("");
        $('#train-time-input').val("");
        $('#freq-input').val("");
    });

    //this adds the info to the page from the database
    firebase.database().ref().limitToLast(10).on("child_added", function (snapshot) {
        //variables to reference to grap the data from database
      var newtrainTime = snapshot.val().time;
      var newfreqTime = snapshot.val().freq;
        //formattingthe time and comparting train time to what time is now
        var format = "HH:mm";
        var trainTimeMom = moment(newtrainTime, format);
        //difference in train time
        var diffInTime = moment().diff(moment(trainTimeMom), 'minutes');
        var timeLeft = diffInTime % newfreqTime;
        var minTilTrain = newfreqTime - timeLeft;
        var trainWhen = moment().add(minTilTrain, 'minutes').format("HH:mm");
    
        //appending train time to the page
        $('tbody').append($(`<tr><td>${snapshot.val().name}</td><td>${snapshot.val().dest}</td>
        <td>${snapshot.val().freq}</td><td>${trainWhen}</td><td>${minTilTrain}</tr>`));


    })



});