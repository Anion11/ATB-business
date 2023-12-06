import Swiper from 'swiper/bundle'

export default function tabsSlider() {
  const tabsSliderBlock = document.querySelector('.tabs-slider')
  if (tabsSliderBlock) {
    const navSlider = new Swiper('.tabs-slider__nav-slider', {
      slidesPerView: 'auto',
      spaceBetween: 20,
      watchOverflow: true,
      breakpoints: {
        767: {
          spaceBetween: 50
        }
      }
    })
    navSlider.on('progress', function (swiper, progress) {
      const nav = document.querySelector('.tabs-slider__nav')
      if (progress >= 1) {
        nav.classList.add('tabs-slider__nav--progress')
      } else {
        nav.classList.remove('tabs-slider__nav--progress')
      }
    })

    let desktopAutoHeight = false
    if (tabsSliderBlock.classList.contains('tabs-slider--internet-bank')) {
      desktopAutoHeight = true
    }
    const txtSlider = new Swiper('.tabs-slider__txt .swiper-container', {
      slidesPerView: 1,
      effect: 'fade',
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      autoHeight: true,
      fadeEffect: {
        crossFade: true
      },
      navigation: {
        nextEl: '.tabs-slider__btn--next',
        prevEl: '.tabs-slider__btn--prev'
      },
      breakpoints: {
        767: {
          autoHeight: desktopAutoHeight
        }
      }
    })

    const imgSlider = new Swiper('.tabs-slider__images .swiper-container', {
      slidesPerView: 1,
      effect: 'fade',
      grabCursor: true,
      fadeEffect: {
        crossFade: true
      },
      thumbs: {
        swiper: txtSlider
      }
    })

    const navItem = [...document.querySelectorAll('.tabs-slider__link')]
    for (const item of navItem) {
      item.addEventListener('click', function () {
        for (const link of navItem) {
          link.classList.remove('tabs-slider__link--active')
        }
        this.classList.add('tabs-slider__link--active')
        txtSlider.slideTo($(this).index(), 300)
      })
    }

    txtSlider.on('slideChange', function () {
      for (const link of navItem) {
        link.classList.remove('tabs-slider__link--active')
      }
      navItem[txtSlider.activeIndex].classList.add('tabs-slider__link--active')
      imgSlider.slideTo(txtSlider.activeIndex, 300)
      navSlider.slideTo(txtSlider.activeIndex, 300)
    })

    window.addEventListener('scroll', floatNav, {
      passive: false
    })
  }
}

function floatNav() {
  if (window.innerWidth < 767) {
    const section = document.querySelector('.tabs-slider__txt')
    const top = section.getBoundingClientRect().top + window.pageYOffset
    const bot = section.getBoundingClientRect().bottom + window.pageYOffset
    const scrollWindow = window.pageYOffset
    const nav = document.querySelector('.tabs-slider__nav')
    if (scrollWindow > top && (scrollWindow < bot - nav.offsetHeight)) {
      nav.classList.add('tabs-slider__nav--fixed')
    } else {
      nav.classList.remove('tabs-slider__nav--fixed')
    }
  }
}
