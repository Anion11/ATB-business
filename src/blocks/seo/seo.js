export default function seo() {
  $('.seo .seo__title').on('click', function () {
    $(this).toggleClass('seo__title--active')
    $(this).siblings('.seo__inner').slideToggle()
  })
  $('.seo .seo-accordion-item').on('click', function () {
    $(this).find('.seo-accordion-item__inner').slideToggle()
  })
}
