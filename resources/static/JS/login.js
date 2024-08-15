document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function(event) {
    event.preventDefault(); // 폼의 기본 제출 동작을 막습니다.

    const signInId = document.getElementById("signInId").value;
    const signInPassword = document.getElementById("signInPassword").value;

    console.log(signInId, signInPassword)

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
        document.getElementById("loginMessage").innerText = data.message;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      document.getElementById("loginMessage").innerText = "An error occurred during login.";
    });
  });

  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", function(event) {
    event.preventDefault(); // 폼의 기본 제출 동작을 막습니다.

    const signUpName = document.getElementById("signUpName").value;
    const signUpId = document.getElementById("signUpId").value;
    const signUpPassword = document.getElementById("signUpPassword").value;
    const signUpCheckPassword = document.getElementById("signUpCheckPassword").value;
    const signUpEmail = document.getElementById("signUpEmail").value;
    const signUpPhone = document.getElementById("signUpPhone").value;

    console.log(signUpName, signUpId, signUpPassword)

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
        document.getElementById("registerMessage").innerText = data.message;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      document.getElementById("message").innerText = "An error occurred during login.";
    });
  });
});

const buttons = document.querySelectorAll('.changeBtn');

buttons.forEach(button => {
  button.addEventListener('click', function() {
    const changeBoxElement = document.querySelector('.changeBox');
    const signInElement = document.querySelector('.signIn');
    const signUpElement = document.querySelector('.signUp');

    if (changeBoxElement.classList.contains('move-left')) {
      signInElement.style.transform = 'translateX(0%)';
      signUpElement.style.transform = 'translateX(0%)';

      const interval = setInterval(() => {
        const transformValue = getComputedStyle(signInElement).transform;
        const matrixValues = transformValue.match(/matrix.*\((.+)\)/)[1].split(', ');
        const translateX = parseFloat(matrixValues[4]);

        const parentWidth = signInElement.parentElement.offsetWidth;
        const percentageMoved = (translateX / parentWidth) * 100;

        if (percentageMoved <= 25) {
          signInElement.style.zIndex = 2;
        } else {
          signInElement.style.zIndex = 1;
        }

        // Clear interval if animation is complete
        if (percentageMoved <= 20) {
          clearInterval(interval);
        }
      }, 50 );

      const interval2 = setInterval(() => {
        const transformValue = getComputedStyle(signUpElement).transform;
        const matrixValues = transformValue.match(/matrix.*\((.+)\)/)[1].split(', ');
        const translateX = parseFloat(matrixValues[4]);

        const parentWidth = signUpElement.parentElement.offsetWidth;
        const percentageMoved = (translateX / parentWidth) * 100;

        if (percentageMoved <= 25) {
          signUpElement.style.zIndex = 1;
        } else {
          signUpElement.style.zIndex = 2;
        }

        // Clear interval if animation is complete
        if (percentageMoved <= 20) {
          clearInterval(interval2);
        }
      }, 50 );

      changeBoxElement.classList.remove('move-left');
      document.querySelector('.signInDes').classList.remove('move-right');
      document.querySelector('.signUpDes').classList.add('move-left');
    } else {
      signInElement.style.transform = 'translateX(100%)';
      signUpElement.style.transform = 'translateX(100%)';

      const interval = setInterval(() => {
        const transformValue = getComputedStyle(signInElement).transform;
        const matrixValues = transformValue.match(/matrix.*\((.+)\)/)[1].split(', ');
        const translateX = parseFloat(matrixValues[4]);

        const parentWidth = signInElement.parentElement.offsetWidth;
        const percentageMoved = (translateX / parentWidth) * 100;

        if (percentageMoved >= 25) {
          signInElement.style.zIndex = 1;
        } else {
          signInElement.style.zIndex = 2;
        }

        // Clear interval if animation is complete
        if (percentageMoved >= 30) {
          clearInterval(interval);
        }
      }, 50 );

      const interval2 = setInterval(() => {
        const transformValue = getComputedStyle(signUpElement).transform;
        const matrixValues = transformValue.match(/matrix.*\((.+)\)/)[1].split(', ');
        const translateX = parseFloat(matrixValues[4]);

        const parentWidth = signUpElement.parentElement.offsetWidth;
        const percentageMoved = (translateX / parentWidth) * 100;

        if (percentageMoved >= 25) {
          signUpElement.style.zIndex = 2;
        } else {
          signUpElement.style.zIndex = 1;
        }

        // Clear interval if animation is complete
        if (percentageMoved >= 30) {
          clearInterval(interval2);
        }
      }, 50 );

      changeBoxElement.classList.add('move-left');
      document.querySelector('.signInDes').classList.add('move-right');
      document.querySelector('.signUpDes').classList.remove('move-left');
    }
  });
});