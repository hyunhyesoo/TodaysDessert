$(document).ready(function () {
  // 1. 카드 클릭 시 상세 페이지로 이동 (단, 체크 아이콘 클릭 시에는 이동 방지)
  $(document).on("click", ".card", function (e) {
    if ($(e.target).hasClass("checkIcon")) {
      return;
    }
    let name = $(this).find("h3").text().trim();
    let img = $(this).find("img").attr("src");
    window.location.href = `/detail?name=${encodeURIComponent(name)}&img=${encodeURIComponent(img)}`;
  });

  // 2. 체크 아이콘 클릭 시 선택/해제 토글
  $(document).on("click", ".checkIcon", function (e) {
    e.stopPropagation(); // 카드 상세페이지 이동 이벤트로 전파 방지
    $(this).toggleClass("active");
    $(this).closest(".card").toggleClass("selected");
  });

  // 3. 삭제 버튼 클릭 시 선택된 항목 제거
  $(".wishlistDelete").click(function () {
    const selectedCards = $(".card.selected");
    
    if (selectedCards.length === 0) {
      alert("삭제할 항목을 선택하세요.");
      return;
    }

    if (confirm("선택한 " + selectedCards.length + "개의 항목을 삭제하시겠습니까?")) {
      selectedCards.each(function () {
        $(this).remove();
      });
    }
  });

  // 4. 세션스토리지에 임시로 저장된 즐겨찾기 항목 가져와서 카드로 추가
  const temp = sessionStorage.getItem("tempFavorite");
  if (temp) {
    const data = JSON.parse(temp);
    
    // 중복 추가 방지 검사
    let isDuplicate = false;
    $(".cardGrid .card h3").each(function () {
      if ($(this).text().trim() === data.name.trim()) {
        isDuplicate = true;
      }
    });

    if (!isDuplicate) {
      const cardHtml = `
        <div class="card">
          <div class="cardImage">
            <span class="checkIcon material-icons">check_circle</span>
            <img src="${data.img}" alt="${data.name}">
          </div>
          <h3>${data.name}</h3>
        </div>
      `;
      $(".cardGrid").append(cardHtml);
    }
    sessionStorage.removeItem("tempFavorite");
  }
});