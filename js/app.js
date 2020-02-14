$(document).ready(function() {
	var app = {
		firebaseConfig: function() {
			// FIREBASE Auth setup
			return {
				apiKey: "AIzaSyDjJohPa3veIKVg_fd1ZaA3S_DgpLw_8GA",
			    authDomain: "chat-20391.firebaseapp.com",
			    databaseURL: "https://chat-20391.firebaseio.com",
			    projectId: "chat-20391",
			    storageBucket: "chat-20391.appspot.com",
			    messagingSenderId: "530473455740",
			    appId: "1:530473455740:web:edcd03341042a4e05d79f9"
			}
		},
		request: function() {
			// make ajax request to store logs
			var $this = this

			var postData = {
			    mood: this.getMood(),
			    time: this.getServerTime()
			};

			// Get a key for a new Post.
  			var newPostKey = firebase.database().ref().child('moods').push().key;

  			var updates = {};
  			updates['/moods/' + newPostKey] = postData;

			firebase.database().ref().update(updates, function(error) {
				if (error) {
					alert($this.setErrorMsg());
				} else {
					$this.redirect();
				}
			});

		},
		setErrorMsg: function() {
			return 'There seems to be a problem with your selection';
		},
		getMood: function() {
			return 'smile';
		},
		getServerTime: function() {
			// get current server time
			return $.ajax({async: false}).getResponseHeader( 'Date' );
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
				$this.request();
			});
		}
	}

	app.init();
});