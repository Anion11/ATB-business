import Swiper from 'swiper/bundle'

export default function banner() {
  if ($('.banner__item').length > 1) {
    $('.banner').addClass('banner--slider')

    const svgCircle = $('.banner').find('.banner__nav-progress')

    const topBanSlider = new Swiper('.banner .swiper', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      watchSlidesProgress: true,
      watchOverflow: true,
      autoplay: {
        delay: 7000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.banner__nav-count',
        type: 'fraction'
      },
      navigation: {
        nextEl: '.banner__nav-btn-next',
        prevEl: '.banner__nav-btn-prev'
      },
      on: {
        init: function () {
          bannerProgressAnim()
        },
        slideChange: function () {
          bannerProgressAnim()
        }
      }
    })
  }

  const sapidBoxMainClass = '.banner-sapid__main'
  const sapidBoxMain = $(sapidBoxMainClass)
  $('.banner-sapid__button.js-open-content').on('click', function () {
    console.log('s')
    sapidBoxMain.fadeOut()
    $(this).siblings(sapidBoxMainClass).fadeIn()
  })
  $('.banner-sapid__button.js-popup-open').on('click', function () {
    sapidBoxMain.fadeOut()
  })
  $('.banner-sapid__main-close').on('click', function () {
    $(this).parent(sapidBoxMainClass).fadeOut()
  })
  $(document).click(function (event) {
    if ($(event.target).closest('.banner-sapid__box').length > 0) return
    sapidBoxMain.fadeOut()
    event.stopPropagation()
  })
}

function bannerProgressAnim() {
  const svgCircle = $('.banner').find('.banner__nav-progress')

  svgCircle.css('animation', 'none')
  setTimeout(() => {
    svgCircle.css('animation', 'banner-progress 7s linear 1 forwards')
  }, 10)
}
