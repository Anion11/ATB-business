export default function compareExpressAccordion() {
  const breakPoint = window.matchMedia('(max-width: 768px)');
  function accordion() {
    $(this).toggleClass('compare-express-head--active');
    if ($(this).siblings('.compare-express-body').is(':visible')) {
      $(this).siblings('.compare-express-body').slideUp();
    } else {
      $(this)
        .siblings('.compare-express-body')
        .slideDown({
          start: function () {
            $(this).css('display', 'grid');
          },
        });
    }
  }
  function accordionClose(item) {
    $(item).removeClass('compare-express-head--active');
    $(item).siblings('.compare-express-body').slideUp();
  }
  function accordionLaptop(item) {
    $(item).removeClass('compare-express-head--active');
    $(item).siblings('.compare-express-body').slideDown();
  }
  function breakPointCheck() {
    if (breakPoint.matches) {
      $('.compare-express-head').on('click', accordion);
      accordionClose($('.compare-express-head'));
    } else {
      $('.compare-express-head').off('click', accordion);
      accordionLaptop($('.compare-express-head'));
    }
  }
  breakPoint.addEventListener('change', breakPointCheck);
  breakPointCheck();
}
