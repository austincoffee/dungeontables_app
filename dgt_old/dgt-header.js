const cfgNavBar = () => {
    const currentPage = $(`.current-page`).html();
    $(`nav ul li a`).each(function() {
      if ($(this).html() === currentPage) $(this).addClass(`active`)
        .click(function(e) {
          e.preventDefault();
        })
    });
    if (currentPage === `Random Generator`) {
      $(`h1 a`)
      .css(`cursor`, `default`)
      .click(function(e) {
          e.preventDefault();
        })
    }
}
$(document).ready(function() {
    cfgNavBar();
});