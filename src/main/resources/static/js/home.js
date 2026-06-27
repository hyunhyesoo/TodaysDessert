$(document).ready(function () {
  // 이달의 테마 클릭 시 month.html로 이동
  $(".theme").click(function () {
    window.location.href = "/month";
  });

  // Top 5 링크는 타임리프(th:href) 서버 사이드 라우팅으로 이관되어 JS 로직을 삭제했습니다.

  // 오늘의 추천 디저트 클릭 시 해당 디저트의 detail.html로 이동 (동적 파라미터 전달)
  $(".recommended").click(function () {
    window.location.href = "/detail?name=" + encodeURIComponent("초코칩 쿠키") + "&img=" + encodeURIComponent("imgs/추천디저트.png");
  });
});