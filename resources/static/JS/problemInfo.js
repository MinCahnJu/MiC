const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const loaderElement = document.getElementById('loader');

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
    output += `</div></div>`;
    output += `<form class="codeForm" id="codeForm">`;
    output += `<div class="doubleDescription">`;
    output += `<div class="contentName" style="flex: 1; font-size: 20px; font-weight: 500;">소스 코드</div>`;
    output += `<div class="contentName" style="flex: 1; text-align: end;">`;
    output += `<select class="lang" id="lang">`;
    output += `<option value="Python">Python</option>`;
    output += `<option value="C">C</option>`;
    output += `<option value="Java">Java</option>`;
    output += `</select>`;
    output += `</div>`;
    output += `</div>`;
    output += `<textarea class="codeText" id="code" rows="15" oninput="autoResize(this)" onkeydown="insertTab(event)" spellcheck="false"></textarea>`;
    output += `<button class="loginButton" style="width: 100px;" type="submit">제출</button>`;
    output += `</form>`;
    document.getElementById('problem').innerHTML = output;

    loaderElement.style.display = 'none';
  })
  .catch(error => console.error('Error fetching problem info:', error));
