const userObject = sessionStorage.getItem('user');
const user = JSON.parse(userObject);

if (user.authority >= 3) {
  let output = '<a href="/user/contest"><button class="listButton" style="border-top: 1px solid gray;">나의 대회</button></a>';
  document.getElementById("mine").innerHTML = output;
}

if (user.authority == 5) {
  let output = '<a href="/user/management"><button class="listButton">회원 관리</button></a>';
  document.getElementById("auth").innerHTML = output;
}

const current = user.user_id;

const loaderElement = document.getElementById('loader');

fetch('/.netlify/functions/getMyProblem', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({ current: current })
})
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      let i = 1;
      let output = '<div class="listBox"><table class="list"><thead><tr>';
      output += '<td class="col" style="width: 10%">번호</td>';
      output += '<td class="col" style="width: 45%">문제 이름</td>';
      output += '<td class="col" style="width: 45%">속한 대회</td>';
      output += '</tr></thead><tbody>'
      data.myProblems.forEach(item => {
        output += `<tr><td class="col" style="width: 10%">${i}</td>`;
        output += `<td class="col" style="width: 45%"><a href="/problem/${item.id}">${item.problem_name}</a></td>`;
        output += `<td class="col" style="width: 45%"><a href="">${item.contest_name}</a></td></tr>`;
        i += 1;
      });
      output += '</tbody></table></div>';
      document.getElementById('myProblems').innerHTML = output;

      loaderElement.style.display = 'none';
    } else {
      document.getElementById("message").innerText = data.message;

      loaderElement.style.display = 'none';
    }
  })
  .catch(error => console.error('Error fetching all contests:', error));