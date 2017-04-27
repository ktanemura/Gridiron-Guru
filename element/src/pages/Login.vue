
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  		// Fail
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		
  });

 <template>
  <div class="app-dashboard">
    <div class="col-sm-12 col-md-12">
      <h2>Login</h2>
      <p>
        login
      </p>
    </div>
  </div>
</template>