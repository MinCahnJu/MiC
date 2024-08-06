document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function(event) {
    event.preventDefault(); // 폼의 기본 제출 동작을 막습니다.

    const signInId = document.getElementById("signInId").value;
    const signInPassword = document.getElementById("signInPassword").value;

    fetch('/.netlify/functions/getUserInfo', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ signInId: signInId, signInPassword: signInPassword })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        sessionStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/index';
      } else {
        document.getElementById("message").innerText = data.message;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      document.getElementById("message").innerText = "An error occurred during login.";
    });
  });
});