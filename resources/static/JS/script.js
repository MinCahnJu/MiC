fetch('/.netlify/functions/getData')
  .then(response => response.json())
  .then(data => {
    let output = '<div class="list"><div>';
    data.forEach(item => {
      output += `<div class="element">${item.contest_name}</div>`;
    });
    output += '</div></div>';
    document.getElementById('data').innerHTML = output;
  });
