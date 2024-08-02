fetch('/.netlify/functions/getData')
  .then(response => response.json())
  .then(data => {
    let output = '<ul>';
    data.forEach(item => {
      output += `<li>${item.contest_name} - ${item.contest_description}</li>`;
    });
    output += '</ul>';
    document.getElementById('data').innerHTML = output;
  });
