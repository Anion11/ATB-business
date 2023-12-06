import Swiper from 'swiper/bundle'

export default function mobileAbout() {
  const mobileAboutBlock = document.querySelector('.mobile-about')
  if (mobileAboutBlock) {
    const aboutTxtSlider = new Swiper('.mobile-about__txt .swiper-container', {
      slidesPerView: 1,
      effect: 'fade',
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      autoHeight: true,
      fadeEffect: {
        crossFade: true
      },
      autoplay: {
        delay: 10000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: '.mobile-about__btn--next',
        prevEl: '.mobile-about__btn--prev'
      },
      scrollbar: {
        el: '.mobile-about__scrollbar',
        hide: false,
        draggable: true
      },
      breakpoints: {
        767: {
          autoHeight: false
        }
      }
    })

    const aboutImgSlider = new Swiper('.mobile-about__images .swiper-container', {
      slidesPerView: 1,
      effect: 'fade',
      grabCursor: true,
      fadeEffect: {
        crossFade: true
      },
      thumbs: {
        swiper: aboutTxtSlider
      }
    })

    const navItem = [...document.querySelectorAll('.mobile-about__link')]
    for (const item of navItem) {
      item.addEventListener('click', function () {
        for (const link of navItem) {
          link.classList.remove('mobile-about__link--active')
        }
        this.classList.add('mobile-about__link--active')
        aboutTxtSlider.slideTo($(this).index(), 300)
      })
    }

    aboutTxtSlider.on('slideChange', function () {
      for (const link of navItem) {
        link.classList.remove('mobile-about__link--active')
      }
      navItem[aboutTxtSlider.activeIndex].classList.add('mobile-about__link--active')
      aboutImgSlider.slideTo(aboutTxtSlider.activeIndex, 300)
    })
  }
}
