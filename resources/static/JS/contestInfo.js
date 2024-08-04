const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

fetch(`/.netlify/functions/getContestInfo?id=${id}`)
  .then(response => response.json())
  .then(data => {
      let output = `<div class="contestInfo">`
      output += `<div class="contestName">${data.contest[0].contest_name}</div>`
      output += `<div class="contestDescription">${data.contest[0].contest_description}</div>`
      output += `<div class="contestAdmin">관리자: ${data.contest[0].user_id}</div></div>`
      output += '<div class="list">';
      data.problems.forEach(item => {
      output += `<a class="element" href="open_problem.html?id=${item.id}">${item.problem_name}</a>`;
      });
      output += '</div>';
      document.getElementById('contest').innerHTML = output;
  })
  .catch(error => console.error('Error fetching contest info:', error));
