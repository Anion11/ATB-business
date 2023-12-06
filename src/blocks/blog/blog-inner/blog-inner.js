export default function blogInner() {
  window.addEventListener('scroll', asideNav)

  $(window).on('resize', function () {
    if (window.innerWidth > 1259) {
      asideNav()
    } else {
      $('.blog-aside').removeClass('blog-aside--fixed')
    }
  })
}

function asideNav() {
  if (window.innerWidth > 1259) {
    const article = document.querySelector('.blog-inner__main')
    const articleTop = article.getBoundingClientRect().top + window.pageYOffset
    const articleBot = article.getBoundingClientRect().bottom + window.pageYOffset
    const scrollWindow = window.pageYOffset
    const aside = document.querySelector('.blog-aside')
    const textSections = $('.blog-inner__section')

    if (scrollWindow >= articleTop - 1 && (scrollWindow < articleBot - aside.offsetHeight)) {
      aside.classList.add('blog-aside--fixed')
    } else {
      aside.classList.remove('blog-aside--fixed')
    }
    textSections.each(function () {
      if (($(this).offset().top - 40) < $(window).scrollTop()) {
        const sectionId = $(this).attr('id')
        if ($(`[href="#${sectionId}"]`).length > 0) {
          $('.blog-aside__item').removeClass('blog-aside__item--active')
          $(`[href="#${sectionId}"]`).parents('.blog-aside__item').addClass('blog-aside__item--active')
        }
      }
    })
  }
}
