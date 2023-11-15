let keysPressed = '';
let backtickPressed = false;

function showPlaybackRate(rate) {
  let rateDisplay = document.createElement('div');
  rateDisplay.textContent = `Playback Rate: ${rate}x`;
  rateDisplay.style.position = 'fixed';
  rateDisplay.style.bottom = '20px';
  rateDisplay.style.right = '20px';
  rateDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  rateDisplay.style.color = 'white';
  rateDisplay.style.padding = '10px';
  rateDisplay.style.borderRadius = '5px';
  rateDisplay.style.zIndex = '1000';
  document.body.appendChild(rateDisplay);

  setTimeout(function() {
    document.body.removeChild(rateDisplay);
  }, 2000); // Display for 2 seconds
}

document.addEventListener('keydown', function(event) {
  // Check if the backtick key is pressed
  if (event.key === '`') {
    backtickPressed = true;
    keysPressed = '';  // Reset the keysPressed for new input
    event.preventDefault();  // Prevent default behavior
  } else if (backtickPressed && !isNaN(event.key)) {
    // Record keys if backtick is pressed and the key is a number
    if (keysPressed.length === 1) {
      keysPressed += '.'; // Add a decimal point after the first number
    }
    keysPressed += event.key;
    event.preventDefault();  // Prevent other behaviors
  } else if (event.ctrlKey && event.key === 'ArrowRight') {
    // Increase playback rate by 0.5 when CTRL + Right Arrow is pressed
    var videos = document.querySelectorAll('video');
    videos.forEach(function(video) {
      video.playbackRate += 0.5; // Cap at 16
    });
    event.preventDefault();  // Prevent other behaviors
  } else if (event.ctrlKey && event.key === 'ArrowLeft') {
    // Decrease playback rate by 0.5 when CTRL + Left Arrow is pressed
    var videos = document.querySelectorAll('video');
    videos.forEach(function(video) {
      video.playbackRate = Math.max(video.playbackRate - 0.5, 0.1); // Floor at 0.1
    });
    event.preventDefault();  // Prevent other behaviors
  }
  // show playback rate if using arrow keys
  var videos = document.querySelectorAll('video');
  if (videos.length > 0 && (event.ctrlKey && (event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === "`"))) {
    showPlaybackRate(videos[0].playbackRate);
  }
});

document.addEventListener('keyup', function(event) {
  // When backtick is released, set the playback rate if keys were pressed
  if (event.key === '`' && keysPressed) {
    var rate = parseFloat(keysPressed);
    var videos = document.querySelectorAll('video');
    videos.forEach(function(video) {
      video.playbackRate = rate;
    });
    backtickPressed = false; // Reset the backtick key status
  }
});
