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
  });
