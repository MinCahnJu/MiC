const loaderElement = document.getElementById('loader');

fetch('/.netlify/functions/getAllProblems')
  .then(response => response.json())
  .then(data => {
    let i = 1;
    let output = '<table class="list"><thead><tr>';
    output += '<td style="width: 10%">번호</td>';
    output += '<td style="width: 45%">문제 이름</td>';
    output += '<td style="width: 45%">속한 대회</td>';
    output += '</tr></thead><tbody>'
    data.forEach(item => {
      output += `<tr><td>${i}</td>`;
      output += `<td><a href="open_problem?id=${item.id}">${item.problem_name}</a></td>`;
      output += `<td><a href="">${item.contest_name}</a></td></tr>`;
      i += 1;
    });
    output += '</tbody></table>';
    document.getElementById('allProblems').innerHTML = output;

    loaderElement.style.display = 'none';
  })
  .catch(error => console.error('Error fetching all contests:', error));