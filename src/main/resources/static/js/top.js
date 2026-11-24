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

    // 0. 기존 로컬 스토리지에 저장된 한글 이미지 경로를 영문 파일명으로 자동 마이그레이션
    const imgKeyMap = {
      "imgs/이달의테마.png": "imgs/theme_banner.png",
      "imgs/추천디저트.png": "imgs/recommended_dessert.png",
      "imgs/소개글.png": "imgs/intro_bg.png",
      "imgs/케이크.png": "imgs/category_cake.png",
      "imgs/베이글.png": "imgs/category_bagel.png",
      "imgs/베이커리.png": "imgs/category_bakery.png",
      "imgs/빙수.png": "imgs/category_bingsu.png",
      "imgs/아이스크림.png": "imgs/category_icecream.png",
      "imgs/음료.png": "imgs/category_drink.png",
      "imgs/복숭아그릭모모.png": "imgs/peach_greek_momo.png",
      "imgs/복숭아에이드.png": "imgs/peach_ade.png",
      "imgs/복숭아케이크.png": "imgs/peach_cake.png",
      "imgs/시나몬롤.png": "imgs/cinnamon_roll.png",
      "imgs/글레이즈드도넛.png": "imgs/glazed_donut.png",
      "imgs/딸기필링도넛.png": "imgs/strawberry_donut.png",
      "imgs/레몬필링도넛.png": "imgs/lemon_donut.png",
      "imgs/말차크림도넛.png": "imgs/matcha_donut.png",
      "imgs/스프링클도넛.png": "imgs/sprinkle_donut.png",
      "imgs/오레오크림도넛.png": "imgs/oreo_donut.png",
      "imgs/우유크림도넛.png": "imgs/milk_donut.png",
      "imgs/카스테라도넛.png": "imgs/castella_donut.png",
      "imgs/초코도넛.png": "imgs/choco_donut.png"
    };
    ["recentViews", "favoritesList"].forEach(storageKey => {
      let raw = localStorage.getItem(storageKey);
      if (raw) {
        let updated = raw;
        Object.keys(imgKeyMap).forEach(kor => {
          updated = updated.split(kor).join(imgKeyMap[kor]);
        });
        if (updated !== raw) {
          localStorage.setItem(storageKey, updated);
        }
      }
    });

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
      let img = "imgs/category_cake.png";
      if (name.includes("에이드")) img = "imgs/category_drink.png";
      else if (name.includes("빵") || name.includes("와플")) img = "imgs/category_bakery.png";
      else if (name.includes("타르트") || name.includes("케이크")) img = "imgs/category_cake.png";
      
      window.location.href = `/detail?name=${encodeURIComponent(name)}&img=${encodeURIComponent(img)}`;
    });
  });
