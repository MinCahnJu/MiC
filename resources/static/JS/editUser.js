document.addEventListener("DOMContentLoaded", function() {
  const editUserForm = document.getElementById("editUserForm");

  editUserForm.addEventListener("submit", function(event) {
    event.preventDefault(); // 폼의 기본 제출 동작을 막습니다.
    const userObject = sessionStorage.getItem('user');
    const user = JSON.parse(userObject);
    
    const current = user.user_pw;
    const userId = document.getElementById("userId").innerText;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    fetch('/.netlify/functions/setUser', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: userId, current: current, password: password, email: email, phone: phone })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        user.email = email;
        user.phone = phone;
        sessionStorage.setItem('user', JSON.stringify(user));
        document.getElementById("message").innerText = data.message;
        const message = document.getElementById('message');
        if (message.classList.contains('redMessage')) {
          message.classList.remove('redMessage');
        }
        message.classList.add('message');
      } else {
        document.getElementById("message").innerText = data.message;
        const message = document.getElementById('message')
        if (message.classList.contains('message')) {
          message.classList.remove('message');
        }
        message.classList.add('redMessage');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      document.getElementById("message").innerText = "An error occurred during login.";
    });
  });
});