const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

fetch(`/.netlify/functions/getProblemInfo?id=${id}`)
  .then(response => response.json())
  .then(data => {
    let i = 1;
    let output = `<div class="problemInfo">`;
    console.log(data);
    output += `<div class="problemName">${data.problem_name}</div>`;
    output += `<div class="contentName">문제</div>`;
    output += `<div class="problemDescription">${data.problem_description}</div>`;
    output += `<div class="contentName">입력</div>`;
    output += `<div class="problemInputDescription">${data.problem_input_description}</div>`;
    output += `<div class="contentName">출력</div>`;
    output += `<div class="problemOutputDescription">${data.problem_output_description}</div>`;
    output += `<div class="doubleDescription">`;
    output += `<div class="contentName" style="flex: 1;">예제 입력</div>`;
    output += `<div class="contentName" style="flex: 1;">예제 출력</div></div>`;
    output += `<div class="doubleDescription">`;
    output += `<div class="problemExampleInput">${data.problem_example_input}</div>`;
    output += `<div class="problemExampleOutput">${data.problem_example_output}</div>`;
    output += `</div></div>`;
    document.getElementById('problem').innerHTML = output;
  })
  .catch(error => console.error('Error fetching problem info:', error));
