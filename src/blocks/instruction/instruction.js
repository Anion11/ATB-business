import Swiper from 'swiper/bundle'

export default function instruction() {
  const instructionItems = [...document.querySelectorAll('.instruction')]
  if (instructionItems) {
    for (const item of instructionItems) {
      const slider = new Swiper(item.querySelector('.swiper'), {
        slidesPerView: 1,
        autoplay: {
          delay: 7000,
          disableOnInteraction: false
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        navigation: {
          nextEl: item.querySelector('.ui-swiper-button--next'),
          prevEl: item.querySelector('.ui-swiper-button--prev')
        },
        pagination: {
          el: item.querySelector('.ui-swiper-pagination'),
          clickable: true
        }
      })
      if ($(window).width() > 767) {
        $(item).find('.instruction__steps-item').on('click', function () {
          $(this).siblings('.instruction__steps-item').removeClass('active')
          $(this).addClass('active')
          slider.slideTo($(this).index(), 300)
        })
      }
      slider.on('slideChange', function () {
        const stepItem = $(item).find('.instruction__steps-item')
        $(stepItem).removeClass('active')
        $(stepItem).eq(slider.activeIndex).addClass('active')
        if ($(window).width() < 767) {
          $(stepItem).fadeOut(0).eq(slider.activeIndex).fadeIn()
        }
      })
    }
  }
}
