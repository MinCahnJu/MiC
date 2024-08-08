const loaderElement = document.getElementById('loader');

fetch('/.netlify/functions/getAllProblems')
  .then(response => response.json())
  .then(data => {
    let i = 1;
    let output = '<div class="listBox"><table class="list"><thead><tr>';
    output += '<td class="col" style="width: 10%">번호</td>';
    output += '<td class="col" style="width: 45%">문제 이름</td>';
    output += '<td class="col" style="width: 45%">속한 대회</td>';
    output += '</tr></thead><tbody>'
    data.forEach(item => {
      output += `<tr><td class="col" style="width: 10%">${i}</td>`;
      output += `<td class="col" style="width: 45%"><a href="/problem/${item.id}">${item.problem_name}</a></td>`;
      output += `<td class="col" style="width: 45%"><a href="">${item.contest_name}</a></td></tr>`;
      i += 1;
    });
    output += '</tbody></table></div>';
    document.getElementById('allProblems').innerHTML = output;

    loaderElement.style.display = 'none';
  })
  .catch(error => console.error('Error fetching all contests:', error));