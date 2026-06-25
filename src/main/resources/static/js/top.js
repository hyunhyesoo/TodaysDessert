  $(document).ready(function () {
    $(".goIntro").click(function (e) {
      e.preventDefault();
      window.location.href = "/intro";
    });

    $(".goCategory").click(function (e) {
      e.preventDefault();
      window.location.href = "/category";
    });

    $(".searchBtn").click(function (e) {
      e.preventDefault();
      window.location.href = "/filter";
    });

    $(".userBtn").click(function (e) {
      e.preventDefault();
      window.location.href = "/favorite";
    });

    $(".searchInput").keypress(function (e) {
      if (e.which == 13) { // Enter key
        e.preventDefault();
        var query = $(this).val();
        if (query) {
          // Redirect to search results page with query parameter
          window.location.href = "/search?query=" + encodeURIComponent(query);
        }
      }
    });

    // --- 좌우 사이드바 공통 연동 로직 ---

    // 1. 최근 본 상품 렌더링 함수
    function renderRecentViews() {
      let recentViews = JSON.parse(localStorage.getItem('recentViews') || '[]');
      let listContainer = $("#recentViewsList");
      
      if (listContainer.length > 0) {
        listContainer.empty();
        if (recentViews.length > 0) {
          recentViews.forEach(function(item) {
            let html = `
              <a href="${item.url || '/detail'}" class="recent-item">
                <img src="${item.img}" alt="${item.name}">
                <span>${item.name}</span>
              </a>
            `;
            listContainer.append(html);
          });
        } else {
          listContainer.append('<p class="empty-msg">최근 본 디저트가 없습니다.</p>');
        }
      }
    }
    
    // 페이지 로드 시 즉시 렌더링
    renderRecentViews();
  
    // 뒤로가기(BFCache) 시에도 최근 본 디저트 업데이트를 위해 pageshow 이벤트 사용
    $(window).on('pageshow', function(event) {
      if (event.originalEvent && event.originalEvent.persisted) {
        renderRecentViews();
      }
    });

    // 2. 좌측 카테고리 필터 (라디오 버튼) 클릭 시 검색 기능 연동
    $(document).on("change", "input[type=radio][name=category]", function() {
      let checkedCategory = $(this).val();
      if (checkedCategory) {
        window.location.href = "/search?query=" + encodeURIComponent(checkedCategory);
      }
    });

    // 3. URL 검색 파라미터를 읽어 좌측 사이드바 라디오 버튼 선택 활성화
    let urlParams = new URLSearchParams(window.location.search);
    let currentQuery = urlParams.get('query') || '';
    if (currentQuery) {
      $("input[type=radio][name=category]").each(function() {
        if (currentQuery.includes($(this).val())) {
          $(this).prop('checked', true);
        }
      });
    }

    // 4. 좌측 사이드바 인기 디저트 TOP5 클릭 시 상세 페이지 이동 연동
    $(document).on("click", ".top-desserts-sidebar li a", function(e) {
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
  });
