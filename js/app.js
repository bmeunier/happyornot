$(document).ready(function() {
	var app = {
		firebaseConfig: function() {
			// FIREBASE Auth setup
			return {
				apiKey: "AIzaSyCbXNjohqaeCzH2FOi9v0kIHTEkzBD89Uw",
			    authDomain: "happyornot-5072c.firebaseapp.com",
			    databaseURL: "https://happyornot-5072c.firebaseio.com",
			    projectId: "happyornot-5072c",
			    storageBucket: "happyornot-5072c.appspot.com",
			    messagingSenderId: "854671586621",
			    appId: "1:854671586621:web:d8260128f35da8c0bd8154",
			    measurementId: "G-0NTYN7PQPS"
			}
		},
		storeMood: function(mood, time) {
			// make write request to store logs on firebase
			var $this = this

			var postData = {
			    mood: mood,
			    time: time
			};

			// Get a key for a new Post.
  			var newPostKey = firebase.database().ref().child('moods').push().key;

  			var updates = {};
  			updates['/moods/' + newPostKey] = postData;

			firebase.database().ref().update(updates, function(error) {
				if (error) {
					alert($this.getErrorMsg());
				} else {
					$this.redirect();
				}
			});

		},
		getErrorMsg: function() {
			// alert message translation
			return 'There seems to be a problem with your selection';
		},
		getMood: function(el) {
			// html data attr for moods
			return $(el).data('mood');
		},
		getServerTime: function() {
			// get current date time
			return moment().format('MMMM-Do-YYYY, h:mm a');
		},
		redirect: function() {
			// redirect after logging user click
			window.location = "./tks.html"
		},
		init: function() {
			// START click handler
			var $this = this;

			firebase.initializeApp(this.firebaseConfig());

			var database = firebase.database();

			$('.faces a').click(function(e) {
				e.preventDefault();
				$this.storeMood($this.getMood(this), $this.getServerTime());
			});
		}
	}

	app.init();
});