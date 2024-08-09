const userObject = sessionStorage.getItem('user');
const user = JSON.parse(userObject);

if (user.authority >= 3) {
  let output = '<a href="/user/problem"><button class="listButton">나의 문제</button></a>';
  document.getElementById("mine").innerHTML = output;
}

if (user.authority == 5) {
  let output = '<a href="/user/management"><button class="listButton">회원 관리</button></a>';
  document.getElementById("auth").innerHTML = output;
}

const current = user.user_id;

const loaderElement = document.getElementById('loader');

fetch('/.netlify/functions/getMyContest', {
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
      output += '<td class="col" style="width: 20%">대회 이름</td>';
      output += '<td class="col" style="width: 35%">대회 설명</td>';
      output += '<td class="col" style="width: 15%">관리자</td>';
      output += '<td class="col" style="width: 20%">시작</td>';
      output += '</tr></thead><tbody>'
      data.myContests.forEach(item => {
        output += `<tr><td class="col" style="width: 10%">${i}</td>`;
        output += `<td class="col" style="width: 20%"><a href="/contest/${item.id}">${item.contest_name}</a></td>`;
        output += `<td class="col" style="width: 35%">${item.contest_description}</td>`;
        output += `<td class="col" style="width: 15%">${item.user_id}</td>`;
        output += `<td class="col" style="width: 20%">${item.created_at.substring(0,4)}년 ${item.created_at.substring(5,7)}월 ${item.created_at.substring(8,10)}일 ${item.created_at.substring(11,16)}</td></tr>`;
        i += 1;
      });
      output += '</tbody></table></div>';
      document.getElementById('myContests').innerHTML = output;

      loaderElement.style.display = 'none';
    } else {
      document.getElementById("message").innerText = data.message;

      loaderElement.style.display = 'none';
    }
  })
  .catch(error => console.error('Error fetching all contests:', error));