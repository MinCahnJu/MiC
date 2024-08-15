document.addEventListener("DOMContentLoaded", function() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  let output = '<div class="user">';
  if (user) {
    output += `<a href="/user">${user.name}</a>`;
    output += `<span class="login-devider"></span>`;
    output += `<a href="/modify">설정</a>`;
    output += `<span class="login-devider"></span>`;
    output += `<a href="#" id="logoutLink">로그아웃</a>`;
    output += '</div>'
    document.getElementById("user").innerHTML = output;
  } else {
    output += `<a href="/login">로그인</a>`;
    output += '</div>'
    document.getElementById("user").innerHTML = output;
  }

  const logoutLink = document.getElementById("logoutLink");
  if (logoutLink) {
    logoutLink.addEventListener("click", function(event) {
      event.preventDefault();
      sessionStorage.removeItem('user');
      window.location.href = '/index';
    });
  }
});