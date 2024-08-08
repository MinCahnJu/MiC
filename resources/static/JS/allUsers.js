const user = JSON.parse(sessionStorage.getItem('user'));

let authority = 0;

if (user) {
  authority = user.authority;
}

const loaderElement = document.getElementById('loader');

fetch('/.netlify/functions/getAllUsers', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({ authority: `${authority}` })
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    let i = 1;
    let output = '<div class="listBox"><table class="list"><thead><tr>';
    output += '<td class="col" style="width: 5%">번호</td>';
    output += '<td class="col" style="width: 10%">이름</td>';
    output += '<td class="col" style="width: 15%">아이디</td>';
    output += '<td class="col" style="width: 20%">비밀번호</td>';
    output += '<td class="col" style="width: 25%">이메일</td>';
    output += '<td class="col" style="width: 20%">전화번호</td>';
    output += '<td class="col" style="width: 5%">권한</td>';
    output += '</tr></thead><tbody>'
    data.users.forEach(item => {
      output += `<tr>`;
      output += `<td class="col" style="width: 5%">${i}</td>`;
      output += `<td class="col" style="width: 10%">${item.name}</td>`;
      output += `<td class="col" style="width: 15%">${item.user_id}</td>`;
      output += `<td class="col" style="width: 20%">${item.user_pw}</td>`;
      output += `<td class="col" style="width: 25%">${item.email}</td>`;
      output += `<td class="col" style="width: 20%">${item.phone}</td>`;
      output += `<td class="col" style="width: 5%">${item.authority}</td>`;
      output += `</tr>`;
      i += 1;
    });
    output += '</tbody></table></div>';
    document.getElementById('allUsers').innerHTML = output;

    loaderElement.style.display = 'none';
  } else {
    document.getElementById("message").innerText = data.message;

    loaderElement.style.display = 'none';
  }
  
})
.catch(error => console.error('Error fetching all contests:', error));