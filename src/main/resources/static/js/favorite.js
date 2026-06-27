$(document).ready(function () {
  // 1. 로컬 스토리지에 즐겨찾기 목록이 없으면 기본 더미 데이터 세팅
  let favListStr = localStorage.getItem("favoritesList");
  if (!favListStr) {
      const initialFavs = [
          {name: "글레이즈드 도넛", img: "imgs/글레이즈드도넛.png"},
          {name: "초코코팅 도넛", img: "imgs/초코도넛.png"},
          {name: "카스테라 도넛", img: "imgs/카스테라도넛.png"},
          {name: "레몬필링 도넛", img: "imgs/레몬필링도넛.png"}
      ];
      localStorage.setItem("favoritesList", JSON.stringify(initialFavs));
      favListStr = JSON.stringify(initialFavs);
  }
  
  // 2. 화면 렌더링 함수
  function renderFavorites() {
      const favoritesList = JSON.parse(localStorage.getItem("favoritesList") || "[]");
      const $grid = $(".cardGrid");
      $grid.empty();
      
      if (favoritesList.length === 0) {
          $grid.append("<p style='text-align:center; grid-column: 1 / -1; margin-top:50px;'>먹고싶어요 목록이 비어있습니다.</p>");
          return;
      }
      
      favoritesList.forEach(data => {
          const cardHtml = `
            <div class="card">
              <div class="cardImage">
                <span class="checkIcon material-icons">check_circle</span>
                <img src="${data.img}" alt="${data.name}">
              </div>
              <h3>${data.name}</h3>
            </div>
          `;
          $grid.append(cardHtml);
      });
  }
  
  renderFavorites(); // 진입 시 렌더링

  // 3. 카드 클릭 시 상세 페이지로 이동 (단, 체크 아이콘 클릭 시에는 이동 방지)
  $(document).on("click", ".card", function (e) {
    if ($(e.target).hasClass("checkIcon")) {
      return;
    }
    let name = $(this).find("h3").text().trim();
    let img = $(this).find("img").attr("src");
    window.location.href = `/detail?name=${encodeURIComponent(name)}&img=${encodeURIComponent(img)}`;
  });

  // 4. 체크 아이콘 클릭 시 선택/해제 토글
  $(document).on("click", ".checkIcon", function (e) {
    e.stopPropagation(); // 카드 상세페이지 이동 이벤트로 전파 방지
    $(this).toggleClass("active");
    $(this).closest(".card").toggleClass("selected");
  });

  // 5. 삭제 버튼 클릭 시 선택된 항목 제거
  $(".wishlistDelete").click(function () {
    const selectedCards = $(".card.selected");
    
    if (selectedCards.length === 0) {
      alert("삭제할 항목을 선택하세요.");
      return;
    }

    if (confirm("선택한 " + selectedCards.length + "개의 항목을 삭제하시겠습니까?")) {
      let favoritesList = JSON.parse(localStorage.getItem("favoritesList") || "[]");
      
      selectedCards.each(function () {
        const nameToRemove = $(this).find("h3").text().trim();
        // 로컬 스토리지 배열에서 해당 이름 제거
        favoritesList = favoritesList.filter(item => item.name !== nameToRemove);
        $(this).remove(); // 화면에서 즉시 삭제
      });
      
      // 로컬 스토리지에 변경된 배열 저장 (이걸 통해 상세페이지의 별도 지워짐)
      localStorage.setItem("favoritesList", JSON.stringify(favoritesList));
      
      if (favoritesList.length === 0) {
          renderFavorites(); // "비어있습니다" 메시지 출력용
      }
    }
  });
});