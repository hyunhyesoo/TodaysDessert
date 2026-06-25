$(document).ready(function () {
  // 1. URL 검색어 연동
  var urlParams = new URLSearchParams(window.location.search);
  var query = urlParams.get('query') || '';
  
  if (query) {
    $("#pageTitle").text("'" + query + "' 검색 결과");
    // 검색어에 해당하는 라디오/체크박스 활성화 시뮬레이션
    $("input[type=checkbox], input[type=radio]").each(function() {
      if(query.includes($(this).val())) {
        $(this).prop('checked', true);
      }
    });
  } else {
    $("#pageTitle").text("전체 디저트");
  }

  // 2. 카드 클릭 시 상세페이지 이동 (데이터 전달)
  $(document).on("click", ".card", function () {
    let name = $(this).find("h3").text().trim();
    let img = $(this).find("img").attr("src");
    window.location.href = `/detail?name=${encodeURIComponent(name)}&img=${encodeURIComponent(img)}`;
  });

  // 3. 최근 본 상품 렌더링
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
  
  // 페이지 로드 시 즉시 렌더링
  renderRecentViews();

  // 뒤로가기(BFCache) 시에도 최근 본 디저트 업데이트를 위해 pageshow 이벤트 사용
  $(window).on('pageshow', function(event) {
    if (event.originalEvent && event.originalEvent.persisted) {
      renderRecentViews();
    }
  });

  // 4. 좌측 필터 (라디오 및 체크박스) 클릭 시 검색 기능 연동
  $("input[type=checkbox], input[type=radio]").change(function() {
    let checkedCategory = $("input[type=radio][name=category]:checked").val();
    let checkedTags = [];
    $("input[type=checkbox][name=tag]:checked").each(function() {
      checkedTags.push($(this).val());
    });
    
    let baseQuery = "";
    if (checkedCategory) {
      // 라디오(카테고리)가 선택되면, 기존 검색어를 무시하고 해당 카테고리를 베이스로 삼음
      baseQuery = checkedCategory;
    } else {
      // 카테고리 선택 없이 상단 검색창에서 온 경우, 기존 태그만 지우고 기본 검색어 유지
      baseQuery = query;
      $("input[type=checkbox][name=tag]").each(function() {
        baseQuery = baseQuery.replace($(this).val(), "").trim();
      });
    }
    
    let newQuery = baseQuery;
    if (checkedTags.length > 0) {
      newQuery = (baseQuery + " " + checkedTags.join(" ")).trim();
    }
    
    if (newQuery) {
      window.location.href = "/search?query=" + encodeURIComponent(newQuery);
    } else {
      window.location.href = "/search";
    }
  });
});