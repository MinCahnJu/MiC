fetch('/.netlify/functions/getAllContests')
  .then(response => response.json())
  .then(data => {
    let i = 1;
    let output = '<table class="list"><thead><tr>';
    output += '<td style="width: 10%">번호</td>';
    output += '<td style="width: 20%">대회 이름</td>';
    output += '<td style="width: 40%">대회 설명</td>';
    output += '<td style="width: 10%">관리자</td>';
    output += '<td style="width: 20%">시작</td>';
    output += '</tr></thead><tbody>'
    data.forEach(item => {
      output += `<tr><td>${i}</td>`;
      output += `<td><a href="open_contest.html?id=${item.id}">${item.contest_name}</a></td>`;
      output += `<td>${item.contest_description}</td>`;
      output += `<td>${item.user_id}</td>`;
      output += `<td>${item.created_at.substring(0,4)}년 ${item.created_at.substring(5,7)}월 ${item.created_at.substring(8,10)}일 ${item.created_at.substring(11,16)}</td></tr>`;
      i += 1;
    });
    output += '</tbody></table>';
    document.getElementById('allContests').innerHTML = output;
  })
  .catch(error => console.error('Error fetching all contests:', error));