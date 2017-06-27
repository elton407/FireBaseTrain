console.log("hello");

 setInterval(function(){
    $('#cTime').html(moment().format('hh:mm:ss A'))
  }, 1000);

	var currentTime = moment();
	console.log("CURRENT TIME:" + moment(currentTime).format("HH:mm"));

var config = {
    apiKey: "AIzaSyAc43A1k92pI7X6hZufsi6cRiVLxBGJMwA",
    authDomain: "train-scheduler-739b5.firebaseapp.com",
    databaseURL: "https://train-scheduler-739b5.firebaseio.com",
    projectId: "train-scheduler-739b5",
    storageBucket: "",
    messagingSenderId: "262835324537"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

 var provider = new firebase.auth.GoogleAuthProvider();


function signIn () {

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  console.log(user.displayName);
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

}

  $("#submitBtn").on("click", function(event){
  	event.preventDefault();

  	 var trainName = $("#trainInput").val().trim();
  	 var trainDestination = $("#destinationInput").val().trim();
  	 var trainTime = $("#trainTimeInput").val().trim();
  	 var trainFrequency = $("#frequencyInput").val().trim();

  	console.log(trainTime);
  	console.log(trainDestination);

  	var trainInfo = {
  		name: trainName,
  		destination: trainDestination,
  		time: trainTime,
  		frequency: trainFrequency
  	};

  console.log(trainInfo.name);
  console.log(trainInfo.destination);
  console.log(trainInfo.time);
  console.log(trainInfo.frequency);

  	database.ref().push(trainInfo);

  $("#trainInput").val("");
  $("#destinationInput").val("");
  $("#trainTimeInput").val("");
  $("#frequencyInput").val("");


  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  	


  	var trainName = childSnapshot.val().name;
  	var trainDestination = childSnapshot.val().destination;
  	var trainTime = childSnapshot.val().time ;
  	var trainFrequency = childSnapshot.val().frequency;

  	

	var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
	console.log(firstTimeConverted);

	// Current time
	var currentTime = moment();
	console.log("CURRENT TIME:" + moment(currentTime).format("HH:mm A"));

	// Difference between times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	// Time apart (remainder)
	var tRemainder = diffTime % trainFrequency;
	console.log(tRemainder);

	// Mins until train
	var tMinutesTillTrain = trainFrequency - tRemainder;
	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	// Next train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));

  	$("#tBody").prepend("<tr><td>"+ trainName +"</td><td>"+ trainDestination +"</td><td>" + trainFrequency + "</td><td>" + nextTrain +"</td><td>"+tMinutesTillTrain+"</td></tr>");


  	console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);


  });

  
 function initialize() {
  var pyrmont = new google.maps.LatLng(-33.8665, 151.1956);

  var map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15,
    scrollwheel: false
  });

  // Specify location, radius and place types for your Places API search.
  var request = {
    location: pyrmont,
    radius: '500',
    types: ['store']
  };

  // Create the PlaceService and send the request.
  // Handle the callback with an anonymous function.
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        // If the request succeeds, draw the place location on
        // the map as a marker, and register an event to handle a
        // click on the marker.
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
      }
    }
  });
}

// Run the initialize function when the window has finished loading.
google.maps.event.addDomListener(window, 'load', initialize);