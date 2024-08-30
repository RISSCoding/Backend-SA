let video = document.getElementById('videoElement');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let statusDiv = document.getElementById('status');

// Load Face-API models
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models')
]).then(startVideo);

function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then(function(stream) {
            video.srcObject = stream;
        })
        .catch(function(err) {
            console.log("An error occurred: " + err);
        });
}

video.addEventListener('play', () => {
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptors();

        if (detections.length > 0) {
            // Assuming we have a reference face descriptor stored
            const match = await compareFaces(detections[0].descriptor);
            if (match) {
                getLocation();
            }
        }

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
    }, 100);
});

async function compareFaces(detectedFace) {
    // This should be replaced with actual face comparison logic
    // For now, we'll just return true to simulate a match
    return true;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(submitPresence, showError);
    } else {
        statusDiv.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function submitPresence(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    // Send presence data to server
    fetch('/api/presence', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_JWT_TOKEN_HERE'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    })
    .then(response => response.json())
    .then(data => {
        statusDiv.innerHTML = "Presensi berhasil disubmit!";
    })
    .catch((error) => {
        console.error('Error:', error);
        statusDiv.innerHTML = "Terjadi kesalahan saat submit presensi.";
    });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            statusDiv.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            statusDiv.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            statusDiv.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            statusDiv.innerHTML = "An unknown error occurred."
            break;
    }
}