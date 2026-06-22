$(document).ready(function () {
  // 이달의 테마 클릭 시 month.html로 이동
  $(".theme").click(function () {
    window.location.href = "/month";
  });

  // Top 5 인기 디저트 클릭 시 해당 디저트의 detail.html로 이동 (현재는 공통 파일로 이동)
  $(".top-desserts li a").click(function (e) {
    e.preventDefault();
    window.location.href = "/detail";
  });

  // 오늘의 추천 디저트 클릭 시 해당 디저트의 detail.html로 이동
  $(".recommended").click(function () {
    window.location.href = "/detail";
  });
});