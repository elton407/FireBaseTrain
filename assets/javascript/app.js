console.log("hello");

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
  	var trainTime = childSnapshot.val().time;
  	var trainFrequency = childSnapshot.val().frequency;

  	$("#tBody").prepend("<tr><td>"+ trainName +"</td><td>"+ trainDestination +"</td><td>" + trainTime + "</td><td>" + trainFrequency + "</td></tr>");


  	console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);


  });

   

