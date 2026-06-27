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
    const includes = [];
    const excludes = [];

    $(".optionBtn.selected").each(function () {
      const categoryText = $(this).closest(".filterSection").find(".filterCategory span:first").text().trim();
      const optionText = $(this).text().trim();

      // 알레르기 여부이며 '해당 없음'이 아닌 경우 제외 항목으로 분류
      if (categoryText === "알레르기 여부" && optionText !== "해당 없음") {
        excludes.push(optionText);
      } else if (optionText !== "해당 없음") {
        includes.push(optionText);
      }
    });

    let url = "/search?";
    if (includes.length > 0) url += "filters=" + encodeURIComponent(includes.join(", ")) + "&";
    if (excludes.length > 0) url += "excludes=" + encodeURIComponent(excludes.join(", ")) + "&";

    if (includes.length > 0 || excludes.length > 0) {
      window.location.href = url.replace(/&$/, "");
    } else {
      window.location.href = "/search";
    }
  });

  // 초기화 버튼
  $(".resetBtn").click(function () {
    $(".optionBtn").removeClass("selected");
    selectedCount = 0;
  });
});