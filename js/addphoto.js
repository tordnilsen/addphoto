  // Initialize the Firebase SDK
  firebase.initializeApp({
     apiKey: "AIzaSyBDUBsfNcoTlwtG9n_6F6tTw_JiP5g5FJg",
    authDomain: "fotodugnad-c731f.firebaseapp.com",
    databaseURL: "https://fotodugnad-c731f.firebaseio.com",
    storageBucket: "fotodugnad-c731f.appspot.com",
    messagingSenderId: "696488879347"

  });	
 function _addphoto(title, description, thumbnail_url, photo_url, lat, lon) {



 

  // Generate a random Firebase location
  var firebaseRef = firebase.database().ref().push();

  // Create a new GeoFire instance at the random Firebase location
  var geoFire = new GeoFire(firebaseRef);

  var postData = {
    title: title,
    description: description,
    thumbnail_url: thumbnail_url,
    photo_url: photo_url,
    lat: lat,
    lon:  lon

  };
  
  // Adding photo to Firebase

 var key = firebase.database().ref().child('photos').push().key;
  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/photos/' + key] = postData;
  return firebase.database().ref().update(updates);

 
 
}

  /*************/
  /*  HELPERS  */
  /*************/
  /* Logs to the page instead of the console */
  function log(message) {
    var childDiv = document.createElement("div");
    var textNode = document.createTextNode(message);
    childDiv.appendChild(textNode);
    document.getElementById("log").appendChild(childDiv);
  }
