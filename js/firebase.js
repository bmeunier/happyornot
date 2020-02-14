$(document).ready(function() {
	var firebase = {
		config: function() {
			// FIREBASE Auth setup
		},
		request: function() {
			// make ajax request to store logs

		},
		getServerTime: function() {
			// get current server time
			return $.ajax({async: false}).getResponseHeader( 'Date' );
		},
		redirect: function() {
			// redirect after logging user click
			console.log('hello');
		},
		init: function() {
			// START click handler
			var $this = this
			
			$('.faces a').click(function(e) {
				e.preventDefault();
				console.log($this.getServerTime());
			});
		}
	}

	firebase.init();
});