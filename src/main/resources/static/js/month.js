$(document).ready(function () {
  $(document).on("click", ".dessertCard", function () {
    let name = $(this).find("h3").text().trim();
    let img = $(this).find("img").attr("src");
    window.location.href = `/detail?name=${encodeURIComponent(name)}&img=${encodeURIComponent(img)}`;
  });
});