$(document).ready(function () {
  // 이달의 테마 클릭 시 month.html로 이동
  $(".theme").click(function () {
    window.location.href = "/month";
  });

  // Top 5 인기 디저트 클릭 시 해당 디저트의 detail.html로 이동 (동적 파라미터 전달)
  $(".top-desserts li a").click(function (e) {
    e.preventDefault();
    let fullName = $(this).text().trim(); // "1위 딸기생크림케이크"
    let name = fullName.replace(/^\d+위\s*/, ""); // "딸기생크림케이크"
    
    // 카테고리별 매핑 이미지
    let img = "imgs/케이크.png";
    if (name.includes("에이드")) img = "imgs/음료.png";
    else if (name.includes("빵") || name.includes("와플")) img = "imgs/베이커리.png";
    else if (name.includes("타르트") || name.includes("케이크")) img = "imgs/케이크.png";
    
    window.location.href = `/detail?name=${encodeURIComponent(name)}&img=${encodeURIComponent(img)}`;
  });

  // 오늘의 추천 디저트 클릭 시 해당 디저트의 detail.html로 이동 (동적 파라미터 전달)
  $(".recommended").click(function () {
    window.location.href = "/detail?name=" + encodeURIComponent("초코칩 쿠키") + "&img=" + encodeURIComponent("imgs/추천디저트.png");
  });
});