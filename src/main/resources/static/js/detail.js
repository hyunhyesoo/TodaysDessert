$(document).ready(function () {
    // 데이터 렌더링은 타임리프 서버 사이드 로직으로 완전히 이관되어 기존 JS 코드를 삭제했습니다.


    // 1. 좋아요 기능
    $('.likeBtn').click(function () {
      let countSpan = $(this).find('.likeCount');
      let currentCount = parseInt(countSpan.text());
      countSpan.text(currentCount + 1);
    });

    // 2. 즐겨찾기 기능 (별 아이콘 토글, 전역 배열 연동)
    // 초기 로컬 스토리지 데이터가 없으면 기본값 세팅
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
    
    let favoritesList = JSON.parse(favListStr);
    const currentProductName = $(".productName").text().trim();
    
    // 현재 상품이 즐겨찾기 배열에 있는지 확인
    const isFavorite = favoritesList.some(item => item.name === currentProductName);
    
    // 초기 별 아이콘 설정
    if (isFavorite) {
      $("#favoriteBtn").text("star");
    } else {
      $("#favoriteBtn").text("star_border");
    }

    $("#favoriteBtn").click(function () {
      favoritesList = JSON.parse(localStorage.getItem("favoritesList") || "[]");
      const currentlyFavorite = favoritesList.some(item => item.name === currentProductName);
      
      if (currentlyFavorite) {
        // 즐겨찾기 해제 (배열에서 제거)
        favoritesList = favoritesList.filter(item => item.name !== currentProductName);
        localStorage.setItem("favoritesList", JSON.stringify(favoritesList));
        $(this).text("star_border");
        alert("먹고 싶어요 목록에서 해제되었습니다.");
      } else {
        // 즐겨찾기 등록 (배열에 추가)
        favoritesList.push({
          name: currentProductName,
          img: $(".productImage").attr("src")
        });
        localStorage.setItem("favoritesList", JSON.stringify(favoritesList));
        $(this).text("star");
        alert("먹고 싶어요 목록에 추가되었습니다! 상단 메뉴바의 마이페이지(사용자 아이콘)에서 확인하실 수 있습니다.");
      }
    });

    // 3. 댓글 작성 및 저장 (Spring Boot 인메모리 API 활용)

    // 댓글을 화면에 그리는 공통 렌더링 함수
    function renderComments(comments) {
      // 댓글 개수 표시 업데이트
      $(".commentCount").text(`(${comments.length})`);
      
      // 목록 초기화
      const listContainer = $("#commentList");
      listContainer.empty();
      
      if (comments.length === 0) {
        listContainer.append('<p class="noComments" style="text-align: center; color: #aaa; margin: 20px 0;">첫 번째 댓글을 남겨보세요!</p>');
        return;
      }
      
      comments.forEach(function (comment, index) {
        const dateStr = new Date(comment.date).toLocaleString('ko-KR', {
          year: 'numeric', month: '2-digit', day: '2-digit',
          hour: '2-digit', minute: '2-digit'
        });
        
        const commentHtml = `
          <div class="commentItem">
            <div class="commentHeader">
              <span class="commentUser">${comment.user}</span>
              <div class="commentHeaderRight">
                <span class="commentDate">${dateStr}</span>
                <button class="commentDeleteBtn" data-index="${index}">삭제</button>
              </div>
            </div>
            <div class="commentText">${comment.text}</div>
          </div>
        `;
        listContainer.append(commentHtml);
      });
    }

    // 댓글 목록 서버로부터 불러오기
    function loadComments() {
      $.ajax({
        url: "/api/comments",
        type: "GET",
        success: function (data) {
          renderComments(data);
        },
        error: function () {
          console.error("댓글을 불러오는데 실패했습니다.");
        }
      });
    }

    // 댓글 등록 버튼 클릭
    $("#submitComment").click(function () {
      const user = $("#commentUser").val().trim();
      const password = $("#commentPassword").val().trim();
      const text = $("#commentInput").val().trim();
      
      if (!user) {
        alert("닉네임을 입력해주세요.");
        return;
      }
      if (!password || password.length !== 4) {
        alert("비밀번호 4자리를 입력해주세요.");
        return;
      }
      if (!text) {
        alert("댓글 내용을 입력해주세요.");
        return;
      }
      
      $.ajax({
        url: "/api/comments",
        type: "POST",
        data: { text: text, user: user, password: password },
        success: function (data) {
          $("#commentUser").val(""); // 입력창 비우기
          $("#commentPassword").val("");
          $("#commentInput").val("");
          renderComments(data); // 화면 갱신
        },
        error: function () {
          alert("댓글 등록에 실패했습니다.");
        }
      });
    });

    // 댓글 삭제 클릭 (이벤트 위임)
    $(document).on("click", ".commentDeleteBtn", function () {
      let password = prompt("비밀번호 4자리를 입력해주세요.");
      if (password === null) return; // 취소 버튼 클릭 시 종료
      if (!password.trim()) {
        alert("비밀번호를 입력해주세요.");
        return;
      }
      
      const index = $(this).data("index");
      $.ajax({
        url: "/api/comments/" + index,
        type: "DELETE",
        data: { password: password },
        success: function (data) {
          renderComments(data); // 화면 갱신
        },
        error: function (xhr) {
          alert(xhr.responseText || "댓글 삭제에 실패했습니다. 비밀번호를 확인해주세요.");
        }
      });
    });

    // 말풍선 아이콘 클릭 시 댓글 영역 보이기/숨기기 토글
    $(".commentBtn").click(function () {
      const $section = $(".commentSection");
      $section.toggleClass("hidden");
      // 댓글창이 열릴 때 부드럽게 스크롤
      if (!$section.hasClass("hidden")) {
        $('html, body').animate({
          scrollTop: $section.offset().top - 20
        }, 300);
      }
    });

    // 초기 댓글 로딩
    loadComments();

    // 4. 최근 본 상품 로컬스토리지 저장
    function saveRecentView() {
      const productName = $(".productName").text();
      const productImg = $(".productImage").attr("src");
      const url = window.location.href; // 쿼리 파라미터가 포함된 전체 URL 저장

      let recentViews = JSON.parse(localStorage.getItem('recentViews') || '[]');
      
      // 중복 제거
      recentViews = recentViews.filter(item => item.name !== productName);
      
      // 맨 앞에 추가
      recentViews.unshift({
        name: productName,
        img: productImg,
        url: url
      });
      
      // 최대 3개까지만 저장
      if (recentViews.length > 3) {
        recentViews.pop();
      }
      
      localStorage.setItem('recentViews', JSON.stringify(recentViews));
    }
    saveRecentView();
});