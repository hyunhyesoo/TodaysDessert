$(document).ready(function () {
  // 1. URL 검색어 파라미터를 읽어서 해당하는 체크박스/라디오버튼 활성화 시뮬레이션
  var urlParams = new URLSearchParams(window.location.search);
  var query = urlParams.get('query') || '';
  
  // (타이틀 렌더링 로직은 타임리프로 이관되어 삭제되었습니다.)
  if (query) {
    $("input[type=checkbox], input[type=radio]").each(function() {
      if(query.includes($(this).val())) {
        $(this).prop('checked', true);
      }
    });
  }

  // 2. 카드 클릭 시 상세페이지 이동 (데이터 전달)
  $(document).on("click", ".card", function () {
    let name = $(this).data("name");
    let img = $(this).data("img");
    window.location.href = `/detail?name=${encodeURIComponent(name)}&img=${encodeURIComponent(img)}`;
  });
});