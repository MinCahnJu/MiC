document.addEventListener("DOMContentLoaded", function() {
  const openContestForm = document.getElementById("openContestForm");

  openContestForm.addEventListener("submit", function(event) {
    event.preventDefault(); // 폼의 기본 제출 동작을 막습니다.

    const user = JSON.parse(sessionStorage.getItem('user'));

    const current = user.user_id;
    const userId = document.getElementById("userId").value;
    const contestName = document.getElementById("contestName").value;
    const contestPassword = document.getElementById("contestPassword").value;
    const contestCheckPassword = document.getElementById("contestCheckPassword").value;
    const contestDescription = document.getElementById("contestDescription").value;

    console.log(current, userId, contestName, contestPassword, contestCheckPassword, contestDescription);

    fetch('/.netlify/functions/getMakeContest', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        current: current,
        userId: userId, 
        contestName: contestName, 
        contestPassword: contestPassword, 
        contestCheckPassword: contestCheckPassword,
        contestDescription: contestDescription })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('대회 개최에 성공했습니다!');
        sessionStorage.setItem('contest', JSON.stringify(data.contest));
        window.location.href = '/problem/add';
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