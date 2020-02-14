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