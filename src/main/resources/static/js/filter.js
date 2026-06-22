$(document).ready(function () {
  // 펼쳐질 수 있는 상세 필터들을 제어
  $(".filterCategory").click(function () {
    const section = $(this).closest(".filterSection");
    const options = section.find(".filterOptions");
    const arrow = $(this).find(".arrow");

    if (options.is(":visible")) {
      options.slideUp(200);
      arrow.text("▼");
    } else {
      options.slideDown(200);
      arrow.text("▲");
    }
  });

  // 필터 선택 제한 (최대 3개)
  let selectedCount = 0;
  $(document).on("click", ".optionBtn", function () {
    $(this).toggleClass("selected");

    selectedCount = $(".optionBtn.selected").length;

    if (selectedCount > 3) {
      $(this).removeClass("selected");
      alert("필터는 최대 3개까지만 선택할 수 있습니다.");
      return;
    }
  });

  // 필터 적용 버튼 클릭 시 search.html로 이동 (임시)
  $(".applyBtn").click(function () {
    const selectedFilters = [];
    $(".optionBtn.selected").each(function () {
      selectedFilters.push($(this).text());
    });

    // 선택된 필터 콘솔에 출력 (실제 구현 시 데이터 전달 필요)
    console.log("선택된 필터:", selectedFilters);

    // 임시로 search.html 이동
    window.location.href = "/search";
  });

  // 초기화 버튼
  $(".resetBtn").click(function () {
    $(".optionBtn").removeClass("selected");
    selectedCount = 0;
  });
});