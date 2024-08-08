function editAuthority(name, value) {
  fetch('/.netlify/functions/setUserAuthority', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name, value: value })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
    } else {
      document.getElementById("message").innerText = data.message;
    }
    
  })
  .catch(error => console.error('Error fetching all contests:', error));
}