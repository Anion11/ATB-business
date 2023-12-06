export default function accordion() {
  $('.accordion-item__head').on('click', function () {
    $(this).toggleClass('accordion-item__head--active')
    $(this).siblings('.accordion-item__main').slideToggle()
  })
}
