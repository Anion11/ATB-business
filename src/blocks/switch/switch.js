export default function switchScripts() {
  const item = $('.switch-nav__text')
  const itemActiveClass = 'switch-nav__text--active'
  const contentActiveClass = 'switch-content--active'
  $(item).on('click', function () {
    if (!$(this).hasClass(itemActiveClass)) {
      const itemGroup = $(this).parents('.switch').attr('data-switch-group')
      const activeIndex = $(this).index()
      $(this).siblings('.switch-nav__btn').toggleClass('switch-nav__btn--active')
      $(this).parents('.switch-nav').children(item).toggleClass(itemActiveClass)
      $(`.switch-group[data-switch-group=${itemGroup}]`).each(function () {
        $(this).find('.switch-content').fadeOut(0).removeClass(contentActiveClass).eq(activeIndex).fadeIn(100).addClass(contentActiveClass)
      })
    }
  })
  $('.switch-nav__btn').on('click', function () {
    const itemGroup = $(this).parents('.switch').attr('data-switch-group')
    $(this).toggleClass('switch-nav__btn--active')
    $(this).siblings(item).toggleClass(itemActiveClass)
    const activeIndex = $(this).siblings('.switch-nav__text--active').index()
    $(`.switch-group[data-switch-group=${itemGroup}]`).each(function () {
      $(this).find('.switch-content').fadeOut(0).removeClass(contentActiveClass).eq(activeIndex).fadeIn(100).addClass(contentActiveClass)
    })
  })
}
