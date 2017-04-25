<script src="https://www.gstatic.com/firebasejs/3.8.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/3.8.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/3.8.0/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/3.8.0/firebase-messaging.js"></script>
<script>
  var firebase = require("firebase/app");
  require("firebase/auth");
  //require("firebase/database");
  
  // Initialize Firebase
  // TODO: Replace with your project's customized code snippet
  var config = {
    apiKey: "AIzaSyCI2wCtuTZkcrJmU2InHNFfmXDhzjisbfk",
    authDomain: "gridiron-gurus.firebaseapp.com",
    //databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    //storageBucket: "gs://gridiron-gurus.appspot.com",
    //messagingSenderId: "<SENDER_ID>",
  };
  firebase.initializeApp(config);
</script>

<template>
  <div class="app-dashboard">
    <div class="col-sm-12 col-md-12">
      <h2>Welcome !!!</h2>
      <p>
        Lorem ipsum Ad non ut aliquip Duis minim sit ex esse eiusmod anim minim 
        esse qui mollit elit do pariatur deserunt eu eiusmod tempor tempor sunt 
        fugiat ad dolore reprehenderit do labore ex.
      </p>
    </div>
  </div>
</template>