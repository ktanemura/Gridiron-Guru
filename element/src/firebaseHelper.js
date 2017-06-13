import firebase from 'firebase'

export function fireInit(func) {
	// !!!! Replace with your own Firebase settings !!!!!
	var config = {
    	apiKey: "AIzaSyCI2wCtuTZkcrJmU2InHNFfmXDhzjisbfk",
    	authDomain: "gridiron-gurus.firebaseapp.com",
    	databaseURL: "https://gridiron-gurus.firebaseio.com",
    	projectId: "gridiron-gurus",
    	storageBucket: "gridiron-gurus.appspot.com",
    	messagingSenderId: "811469506152"
    }
    
	firebase.initializeApp(config)

	firebase.auth().onAuthStateChanged(function (user) {
	  if (user) {
	    func(true, user)
	  } else {
	    func(false)
	  }
	}, function(error) {
	  console.log(error)
	})
}