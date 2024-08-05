const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

fetch(`/.netlify/functions/getContestInfo?id=${id}`)
  .then(response => response.json())
  .then(data => {
    let i = 1;
    let output = `<div class="contestInfo">`
    output += `<div class="contestName">${data.contest[0].contest_name}</div>`
    output += `<div class="contestDescription">${data.contest[0].contest_description}</div>`
    output += `<div class="contestAdmin">관리자: ${data.contest[0].user_id}</div></div>`
    output += '<table class="list" style="width: 700px"><thead><tr>';
    output += '<td style="width: 15%">번호</td>';
    output += '<td style="width: 85%">문제 이름</td>';
    output += '</tr></thead><tbody>';
    data.problems.forEach(item => {
      output += `<tr><td>${i}</td>`
      output += `<td><a href="open_problem.html?id=${item.id}">${item.problem_name}</a></td></tr>`;
      i += 1;
    });
    output += '</tbody></table>';
    document.getElementById('contest').innerHTML = output;
  })
  .catch(error => console.error('Error fetching contest info:', error));
