if ($('.webcam').length) {
	// add video element to webcam
	let $video = $("<video data-autoplay=true></video>");
	let video = $video.get(0);
	$('.webcam').append($video);
	
	// check to make sure browser is accepted
	if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
		console.log("enumerateDevices() not supported.");
	}
	
	// list out video sources
	navigator.mediaDevices.enumerateDevices()
		.then(function(devices) { 
			let deviceId = ""
			let cameras = devices.filter( (d)=> (d.kind == "videoinput"))
			console.log("Available webcams:");
			cameras.map( (device)=> console.log(device.kind + ":" + device.deviceId) )
			
			let constraints = {
			    audio: false,
			    video: {
				    deviceId: cameras[cameras.length-1].deviceId,
			        width: { min: 1280, ideal: 1920 },
			        height: { min: 720, ideal: 1080 },
			    }
			};			
			navigator.mediaDevices.getUserMedia(constraints)
				.then(function(stream) {
					let videoTracks = stream.getVideoTracks();
					console.log(videoTracks);
					console.log('Using video device: ' + videoTracks[0].label);
					stream.onended = function() { console.log('Stream ended'); };
					window.stream = stream; // make variable available to console
					video.srcObject = stream;
				}, function(err) { 
					console.log(err.name + ": " + err.message);  // always check for errors at the end.
				});
		});	
}
