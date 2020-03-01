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
		storeMood: function(postData) {
			// make write request to store logs on firebase
			var $this = this

			//Get a key for a new Post.
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
		getServerTime: function() {
			// get current date time
			return moment().format('MMMM-Do-YYYY, h:mm a');
		},
		redirect: function() {
			// redirect after logging user click
			window.location = "./tks.html"
		},
		formData: {
			mood: "", 
			why: "", 
			time: ""
		},
		getMood: function() {
			var $this = this;

			$(".faces a").click(function(e) {
				e.preventDefault();
				var data = $this.formData;

				// get mood data
				$this.formData.mood = $(this).data('mood');

				// assign active mood class
				$(".faces a").removeClass("active-mood");
				$(this).addClass('active-mood');

				// animate scroll to next step
				$("html, body").animate({ scrollTop: $('#bloc-5').offset().top }, 500);
				document.getElementById("undefined_14566").focus();
				
			});
		},
		getWhy: function() {
			var $this = this;

			$(".btn-why__action").click(function(e) {
				e.preventDefault();

				$this.formData.why = $('.why-value').val();
				$this.formData.time = $this.getServerTime();

				$this.storeMood($this.formData);
			});
		},
		init: function() {
			firebase.initializeApp(this.firebaseConfig());
			var database = firebase.database();
			this.getMood();
			this.getWhy();
		}
	}

	app.init();
});
