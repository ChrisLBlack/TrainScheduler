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

    var trainName = "";
    var destName = "";
    var trainTime = 0;
    var freqTime = 0;

    var now = moment().format("HH:mm");
    console.log(now)


    $("#add-train-btn").on("click", function (event) {

        event.preventDefault();

        trainName = $('#train-name-input').val().trim();
        destName = $('#dest-input').val().trim();
        trainTime = $('#train-time-input').val().trim();
        freqTime = $('#freq-input').val().trim();


        firebase.database().ref().push({
            name: trainName,
            dest: destName,
            time: trainTime,
            freq: freqTime
        })

        $("#train-name-input").val("");
        $('#dest-input').val("");
        $('#train-time-input').val("");
        $('#freq-input').val("");
;
        var format = "HH:mm";
        var trainTimeMom = moment(trainTime, format);
        var now = moment().format("HH:mm");
        console.log(moment(trainTimeMom).format("HH:mm"));
        console.log(now);
        console.log(moment(trainTimeMom).diff(moment(), "minutes"));
        


    });

    firebase.database().ref().limitToLast(10).on("child_added", function (snapshot) {

        $('tbody').append($(`<tr><td>${snapshot.val().name}</td><td>${snapshot.val().dest}</td>
        <td>${snapshot.val().freq}</td><td>${snapshot.val().time}</td></tr>`));


    })



});