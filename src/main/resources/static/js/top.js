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
  });
