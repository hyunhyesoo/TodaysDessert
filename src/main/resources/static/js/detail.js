$(document).ready(function () {
    // 0. URL 파라미터로 동적 데이터 렌더링 (더미 DB 역할)
    var urlParams = new URLSearchParams(window.location.search);
    var urlName = urlParams.get('name');
    var urlImg = urlParams.get('img');
    
    if (urlName && urlImg) {
      $(".productName").text(urlName);
      $(".productImage").attr("src", urlImg);
      // 부가 설명은 임의로 작성
      $(".productDetail").text(urlName + "의 달콤하고 부드러운 맛을 즐겨보세요!");
    }

    // 1. 좋아요 기능
    $('.likeBtn').click(function () {
      let countSpan = $(this).find('.likeCount');
      let currentCount = parseInt(countSpan.text());
      countSpan.text(currentCount + 1);
    });

    // 2. 즐겨찾기 기능 (별 아이콘 토글, 페이지 이동하지 않음)
    const favoriteStateKey = "is_favorite_" + ($(".productName").text() || "default");
    const isFavorite = sessionStorage.getItem(favoriteStateKey) === "true";
    
    // 초기 별 아이콘 설정
    if (isFavorite) {
      $("#favoriteBtn").text("star");
    } else {
      $("#favoriteBtn").text("star_border");
    }

    $("#favoriteBtn").click(function () {
      const currentlyFavorite = sessionStorage.getItem(favoriteStateKey) === "true";
      if (currentlyFavorite) {
        // 즐겨찾기 해제
        sessionStorage.setItem(favoriteStateKey, "false");
        sessionStorage.removeItem("tempFavorite");
        $(this).text("star_border");
        alert("먹고 싶어요 목록에서 해제되었습니다.");
      } else {
        // 즐겨찾기 등록
        sessionStorage.setItem(favoriteStateKey, "true");
        const tempData = {
          name: $(".productName").text(),
          img: $(".productImage").attr("src")
        };
        sessionStorage.setItem("tempFavorite", JSON.stringify(tempData));
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
      const text = $("#commentInput").val().trim();
      if (!text) {
        alert("댓글 내용을 입력해주세요.");
        return;
      }
      
      $.ajax({
        url: "/api/comments",
        type: "POST",
        data: { text: text },
        success: function (data) {
          $("#commentInput").val(""); // 입력창 비우기
          renderComments(data); // 화면 갱신
        },
        error: function () {
          alert("댓글 등록에 실패했습니다.");
        }
      });
    });

    // 댓글 삭제 클릭 (이벤트 위임)
    $(document).on("click", ".commentDeleteBtn", function () {
      if (!confirm("댓글을 삭제하시겠습니까?")) return;
      
      const index = $(this).data("index");
      $.ajax({
        url: "/api/comments/" + index,
        type: "DELETE",
        success: function (data) {
          renderComments(data); // 화면 갱신
        },
        error: function () {
          alert("댓글 삭제에 실패했습니다.");
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