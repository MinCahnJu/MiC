const path = window.location.pathname;
const parts = path.split('/');
const id = parts[parts.length - 1];

const loaderElement = document.getElementById('loader');

fetch(`/.netlify/functions/getContestInfo?id=${id}`)
  .then(response => response.json())
  .then(data => {
    let i = 1;
    let output = `<div class="contestInfo">`
    output += `<div class="contestName">${data.contest[0].contest_name}</div>`
    output += `<div class="contestDescription">${data.contest[0].contest_description}</div>`
    output += `<div class="contestAdmin">관리자: ${data.contest[0].user_id}</div></div>`
    output += `<div id="editContest"></div>`

    output += '<div class="listBox"><div class="list">';
    output += '<div>문제 목록</div>'
    data.problems.forEach(item => {
      output += `<a href="/problem/${item.id}"><div class="col">`;
      output += `<div class="colDes">${item.problem_name}</div></div></a>`;
    });
    output += '</div></div>';
    // output += '<div class="listBox"><table class="list"><thead><tr>';
    // output += '<td class="col" style="width: 15%">번호</td>';
    // output += '<td class="col" style="width: 85%">문제 이름</td>';
    // output += '</tr></thead><tbody>';
    // data.problems.forEach(item => {
    //   output += `<tr><td class="col" style="width: 15%">${i}</td>`
    //   output += `<td class="col" style="width: 85%"><a href="/problem/${item.id}">${item.problem_name}</a></td></tr>`;
    //   i += 1;
    // });
    // output += '</tbody></table></div>';
    output += '<div id="makeProblem"></div>';

    sessionStorage.setItem('contest', JSON.stringify(data.contest[0]));
    document.getElementById('contest').innerHTML = output;

    const script = document.createElement('script');
    script.textContent = `
      const contestObject = sessionStorage.getItem('contest');
      const contest = JSON.parse(contestObject);
      if (contest && contest.contest_name) {
        document.title = contest.contest_name;
      }

      const user = JSON.parse(sessionStorage.getItem('user'));
      if (user) {
        if (user.authority == 5 || user.user_id == contest.user_id) {
          let output = '<div class="listTitle" style="margin-top: 30px; justify-content: end;">';
          output += '<a href="/problem/add"><span class="listContent">문제 추가</span></a>';
          output += '</div>';
          document.getElementById("makeProblem").innerHTML = output;
          let sub = '<div class="listTitle" style="margin-top: 30px; justify-content: center;">';
          sub += '<a href=""><span class="listContent">대회 편집</span></a>';
          sub += '<a href="#" id="deleteContest"><span class="listContent">대회 삭제</span></a>';
          sub += '</div>';
          document.getElementById("editContest").innerHTML = sub;
        }
      }

      const deleteContest = document.getElementById("deleteContest");
      if (deleteContest) {
        deleteContest.addEventListener("click", function(event) {
          event.preventDefault();

          fetch('/.netlify/functions/deleteContest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contestName: contest.contest_name })
          })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              alert('대회를 삭제했습니다!');
              sessionStorage.removeItem('contest');
              window.location.href = '/contest';
            } else {
              document.getElementById("message").innerText = data.message;
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            document.getElementById("message").innerText = "An error occurred during login.";
          });
        });
      }
    `;
    document.body.appendChild(script);

    loaderElement.style.display = 'none';
  })
  .catch(error => console.error('Error fetching contest info:', error));
