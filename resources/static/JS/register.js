document.addEventListener("DOMContentLoaded", function() {
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", function(event) {
    event.preventDefault(); // 폼의 기본 제출 동작을 막습니다.

    const signUpName = document.getElementById("signUpName").value;
    const signUpId = document.getElementById("signUpId").value;
    const signUpPassword = document.getElementById("signUpPassword").value;
    const signUpCheckPassword = document.getElementById("signUpCheckPassword").value;
    const signUpEmail = document.getElementById("signUpEmail").value;
    const signUpPhone = document.getElementById("signUpPhone").value;

    console.log(signUpName, signUpId, signUpPassword, signUpCheckPassword, signUpEmail, signUpPhone);

    fetch('/.netlify/functions/registerUser', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        signUpName: signUpName, 
        signUpId: signUpId, 
        signUpPassword: signUpPassword, 
        signUpCheckPassword: signUpCheckPassword,
        signUpEmail: signUpEmail, 
        signUpPhone: signUpPhone })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('회원가입에 성공했습니다!');
        window.location.href = '/login';
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