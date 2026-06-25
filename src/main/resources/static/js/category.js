$(document).ready(function () {
  $(".categoryCard").click(function () {
    let categoryName = $(this).find("h3").text().trim();
    window.location.href = "/search?query=" + encodeURIComponent(categoryName);
  });
});