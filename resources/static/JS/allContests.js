const loaderElement = document.getElementById('loader');

fetch('/.netlify/functions/getAllContests')
  .then(response => response.json())
  .then(data => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Seoul',
    };
    
    let i = 1;
    let output = '<div class="listBox"><table class="list"><thead><tr>';
    output += '<td class="col" style="width: 10%">번호</td>';
    output += '<td class="col" style="width: 20%">대회 이름</td>';
    output += '<td class="col" style="width: 35%">대회 설명</td>';
    output += '<td class="col" style="width: 15%">관리자</td>';
    output += '<td class="col" style="width: 20%">시작</td>';
    output += '</tr></thead><tbody>'
    data.forEach(item => {
      const koreanTime = new Date(item.created_at);

      const year = koreanTime.getFullYear();
      const month = ('0' + (koreanTime.getMonth() + 1)).slice(-2);
      const day = ('0' + koreanTime.getDate()).slice(-2);
      const hours = ('0' + koreanTime.getHours()).slice(-2);
      const minutes = ('0' + koreanTime.getMinutes()).slice(-2);

      const formattedTime = `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
      
      output += `<tr><td class="col" style="width: 10%">${i}</td>`;
      output += `<td class="col" style="width: 20%"><a href="/contest/${item.id}">${item.contest_name}</a></td>`;
      output += `<td class="col" style="width: 35%">${item.contest_description}</td>`;
      output += `<td class="col" style="width: 15%">${item.user_id}</td>`;
      output += `<td class="col" style="width: 20%;">${formattedTime}</td></tr>`;
      i += 1;
    });
    output += '</tbody></table></div>';
    document.getElementById('allContests').innerHTML = output;

    loaderElement.style.display = 'none';
  })
  .catch(error => console.error('Error fetching all contests:', error));