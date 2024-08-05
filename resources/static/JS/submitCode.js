document.addEventListener("DOMContentLoaded", function() {
  const codeForm = document.getElementById("codeForm");

  codeForm.addEventListener("submit", function(event) {
    event.preventDefault(); // 폼의 기본 제출 동작을 막습니다.

    const lang = document.getElementById("lang").value;
    const code = document.getElementById("code").value;

    console.log(lang, code);
  });
});