document.addEventListener("DOMContentLoaded", function() {
  const makeProblemForm = document.getElementById("makeProblemForm");

  makeProblemForm.addEventListener("submit", function(event) {
    event.preventDefault(); // 폼의 기본 제출 동작을 막습니다.

    const contest = JSON.parse(sessionStorage.getItem('contest'));
    
    const contestName = contest.contest_name;
    const problemName = document.getElementById("problemName").value;
    const problemDescription = document.getElementById("problemDescription").value;
    const problemInputDescription = document.getElementById("problemInputDescription").value;
    const problemOutputDescription = document.getElementById("problemOutputDescription").value;
    const problemExampleInput = document.getElementById("problemExampleInput").value;
    const problemExampleOutput = document.getElementById("problemExampleOutput").value;
    const action = event.submitter.value;

    console.log( contestName, problemName, problemDescription, problemInputDescription, problemOutputDescription, problemExampleInput, problemExampleOutput);

    fetch('/.netlify/functions/getMakeProblem', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        contestName: contestName,
        problemName: problemName, 
        problemDescription: problemDescription, 
        problemInputDescription: problemInputDescription, 
        problemOutputDescription: problemOutputDescription,
        problemExampleInput: problemExampleInput, 
        problemExampleOutput: problemExampleOutput })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('문제 출제에 성공했습니다!');
        if (action == "add") {
          window.location.href = '/problem/add';
        } else {
          window.location.href = `/contest`;
        }
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