$(document).ready(function () {
  $(".categoryCard").click(function () {
    let categoryName = $(this).find("h3").text().trim();
    window.location.href = "/search?query=" + encodeURIComponent(categoryName);
  });

  // 최근 본 상품 렌더링
  function renderRecentViews() {
    let recentViews = JSON.parse(localStorage.getItem('recentViews') || '[]');
    let listContainer = $("#recentViewsList");
    
    if (recentViews.length > 0) {
      listContainer.empty();
      recentViews.forEach(function(item) {
        let html = `
          <a href="${item.url || '/detail'}" class="recent-item">
            <img src="${item.img}" alt="${item.name}">
            <span>${item.name}</span>
          </a>
        `;
        listContainer.append(html);
      });
    }
  }
  
  // 페이지 로드 시 즉시 렌더링
  renderRecentViews();

  // 뒤로가기(BFCache) 시에도 최근 본 디저트 업데이트
  $(window).on('pageshow', function(event) {
    if (event.originalEvent && event.originalEvent.persisted) {
      renderRecentViews();
    }
  });

  // 필터 (라디오, 체크박스) 클릭 시 검색 화면으로 넘어가면서 필터 적용
  $("input[type=checkbox], input[type=radio]").change(function() {
    let checkedCategory = $("input[type=radio][name=category]:checked").val();
    let checkedTags = [];
    $("input[type=checkbox][name=tag]:checked").each(function() {
      checkedTags.push($(this).val());
    });

    let newQuery = checkedCategory || "";
    if (checkedTags.length > 0) {
      newQuery = (newQuery + " " + checkedTags.join(" ")).trim();
    }

    if (newQuery) {
      window.location.href = "/search?query=" + encodeURIComponent(newQuery);
    }
  });
});