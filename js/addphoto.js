  // Initialize the Firebase SDK
  firebase.initializeApp({
     apiKey: "AIzaSyBDUBsfNcoTlwtG9n_6F6tTw_JiP5g5FJg",
    authDomain: "fotodugnad-c731f.firebaseapp.com",
    databaseURL: "https://fotodugnad-c731f.firebaseio.com",
    storageBucket: "fotodugnad-c731f.appspot.com",
    messagingSenderId: "696488879347"

  });
 function _addphoto(title, description, thumbnail_url, photo_url, lat, lon) {


  var postData = {
    title: title,
    description: description,
    thumbnail_url: thumbnail_url,
    photo_url: photo_url


  };




  // Adding photo to Firebase

  var key = firebase.database().ref().child('photos').push().key;
   // Write the new post's data simultaneously in the photo list and the geofire' list.

   var updates = {};
   updates['/photos/' + key] = postData;
   firebase.database().ref().update(updates);

  var firebaseRef = firebase.database().ref('photos').child('_geofire');

   var geoFire = new GeoFire(firebaseRef);

var lat=Number(lat);
var lon=Number(lon)
   geoFire.set(key, [lat, lon]);
log('Added');


}

function _getphoto(lat,lon) {
  // Generate a random Firebase location
  var firebaseRef = firebase.database().ref('photos').child('_geofire');

var lat=Number(lat);
var lon=Number(lon);


  var geoFire = new GeoFire(firebaseRef);
  // Create a GeoQuery
  var geoQuery = geoFire.query({
    center: [lat,lon],
    radius: 10
  });

  // Attach event callbacks to the query
  var onKeyEnteredRegistration = geoQuery.on("key_entered", function(key, location) {
    log(key + " entered the query. You are at " + location);


});

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
