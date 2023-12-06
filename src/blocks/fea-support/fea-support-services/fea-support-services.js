import Swiper from 'swiper/bundle'

export default function feaSupportServices() {
  const feaSupportSlider = new Swiper('.fea-support-services__container', {
    slidesPerView: 'auto',
    spaceBetween: 15,
    watchSlidesProgress: true,
    pagination: {
      el: '.fea-support-services .ui-swiper-pagination',
      type: 'bullets'
    },
    navigation: {
      nextEl: '.fea-support-services .ui-swiper-button--next',
      prevEl: '.fea-support-services .ui-swiper-button--prev'
    },
    breakpoints: {
      767: {
        spaceBetween: 25
      }
    }
  })
}
