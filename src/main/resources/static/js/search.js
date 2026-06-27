$(document).ready(function () {
  // 1. URL 검색어 연동
  var urlParams = new URLSearchParams(window.location.search);
  var query = urlParams.get('query') || '';
  var filters = urlParams.get('filters') || '';
  var excludes = urlParams.get('excludes') || '';
  
  if (query) {
    $("#pageTitle").text("'" + query + "' 검색 결과");
    // 검색어에 해당하는 라디오/체크박스 활성화 시뮬레이션
    $("input[type=checkbox], input[type=radio]").each(function() {
      if(query.includes($(this).val())) {
        $(this).prop('checked', true);
      }
    });
  } else if (filters || excludes) {
    let titleStr = "";
    if (filters && excludes) {
      titleStr = "'" + filters + "' 검색 결과 ('" + excludes + "' 제외)";
    } else if (filters) {
      titleStr = "'" + filters + "' 검색 결과";
    } else if (excludes) {
      titleStr = "'" + excludes + "' 제외 검색 결과";
    }
    $("#pageTitle").text(titleStr);
  } else {
    $("#pageTitle").text("전체 디저트");
  }

  // 2. 카드 클릭 시 상세페이지 이동 (데이터 전달)
  $(document).on("click", ".card", function () {
    let name = $(this).find("h3").text().trim();
    let img = $(this).find("img").attr("src");
    window.location.href = `/detail?name=${encodeURIComponent(name)}&img=${encodeURIComponent(img)}`;
  });
});