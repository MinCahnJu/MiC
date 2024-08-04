const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

if (id) {
  console.log(id)
  fetch(`/.netlify/functions/getContestInfo?id=${id}`)
    .then(response => response.json())
    .then(data => {
      let output = '<div class="list">';
      data.forEach(item => {
        output += `<div class="element">${item.problem_name}</div>`;
      });
      output += '</div>';
      document.getElementById('contest').innerHTML = output;
    })
    .catch(error => console.error('Error fetching contest info:', error));
}