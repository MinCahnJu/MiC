fetch('/.netlify/functions/getAllContests')
  .then(response => response.json())
  .then(data => {
    let output = '<div class="list">';
    data.forEach(item => {
      output += `<a class="element" href="open_contest.html?id=${item.id}">${item.contest_name}</a>`;
    });
    output += '</div>';
    document.getElementById('allContests').innerHTML = output;
  })
  .catch(error => console.error('Error fetching all contests:', error));