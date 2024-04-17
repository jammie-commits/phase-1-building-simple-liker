const likeButtons = document.querySelectorAll('.like');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');

// Ensure modal is initially hidden in the HTML with the `hidden` class

function mimicServerCall(postId) {
  // Simulate server call with random success/failure
  const success = Math.random() > 0.5; // Randomly simulate success
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve('Success!'); // Simulate successful response
      } else {
        reject(new Error('Server error')); // Simulate server error
      }
    }, 1000); // Simulate delay (adjust as needed)
  });
}

likeButtons.forEach((likeButton) => {
  likeButton.addEventListener('click', (event) => {
    const postId = likeButton.closest('.media-post').id;

    // Only process if not already activated (full heart)
    if (!likeButton.classList.contains('activated-heart')) {
      mimicServerCall(postId)
        .then((message) => {
          // Success
          likeButton.classList.add('activated-heart'); // Make heart full and red
        })
        .catch((error) => {
          // Error
          modalMessage.textContent = error.message;
          modal.classList.remove('hidden');
          setTimeout(() => modal.classList.add('hidden'), 3000);
        });
    } else {
      // Remove activated state if already full heart (user clicks again)
      likeButton.classList.remove('activated-heart');
    }
  });
});

// Wait for the DOM to be loaded before checking the modal's presence (for testing)
setTimeout(() => {
  expect(document.body.contains(modal) && modal.classList.contains('hidden')).toBe(true);
}, 0); // Schedule the check after slight delay





//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
