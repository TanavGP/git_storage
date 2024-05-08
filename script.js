require('dotenv').config();

function saveString() {
    // Get the user input
    const userInput = document.getElementById('userInput').value;
  
    // Create a new blob with the user input
    const blob = new Blob([userInput], { type: 'text/plain' });
  
    // Create a new file object
    const file = new File([blob], 'user_string.txt');
  
    // Create a new FormData object
    const formData = new FormData();
    formData.append('file', file);

    const accessToken = process.env.ACCESS_TOKEN;
  
    // Send a POST request to GitHub API to create a new commit
    fetch('https://api.github.com/repos/TanavGP/git_storage/contents/user_string.txt', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Add user string',
        content: btoa(userInput), // Encode the user input as base64
        branch: 'main', // Or specify your preferred branch
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to save string');
      }
      alert('String saved successfully!');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while saving the string.');
    });
  }