document.addEventListener("DOMContentLoaded", function() {
  const changePasswordForm = document.getElementById("changePasswordForm");

  changePasswordForm.addEventListener("submit", function(event) {
    event.preventDefault(); // 폼의 기본 제출 동작을 막습니다.
    const userObject = sessionStorage.getItem('user');
    const user = JSON.parse(userObject);
    
    const current = user.user_pw;
    const password = document.getElementById("password").value;
    const newPassword = document.getElementById("newPassword").value;
    const checkNewPassword = document.getElementById("checkNewPassword").value;

    fetch('/.netlify/functions/changeUserPassword', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ current: current, password: password, newPassword: newPassword, checkNewPassword: checkNewPassword })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        user.user_pw = newPassword;
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