import Swiper from 'swiper/bundle'

export default function usefulGoods() {
  if ($('.useful-goods').length > 0) {
    const sliders = document.querySelectorAll('.useful-goods .swiper')
    for (const slider of sliders) {
      const usefulGoodsSlider = new Swiper(slider, {
        slidesPerView: 'auto',
        spaceBetween: 15,
        resistanceRatio: 0.5,
        navigation: {
          nextEl: '.useful-goods .swiper-btn-next',
          prevEl: '.useful-goods .swiper-btn-prev'
        },
        pagination: {
          el: '.useful-goods .swiper-pagination'
        },
        breakpoints: {
          767: {
            spaceBetween: 20,
            resistanceRatio: 0.2
          }
        }
      })
    }
  }
}
