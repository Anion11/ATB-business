import Swiper from 'swiper/bundle'

export default function partners() {
  if ($('.partners').length > 0) {
    const partnersSlider = new Swiper('.partners .swiper', {
      slidesPerView: 2,
      spaceBetween: 25,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      watchOverflow: true,
      navigation: {
        nextEl: '.partners .swiper-button-next',
        prevEl: '.partners .swiper-button-prev'
      },
      breakpoints: {
        1259: {
          slidesPerView: 5,
          spaceBetween: 75
        },
        767: {
          slidesPerView: 3,
          spaceBetween: 75
        },
        374: {
          slidesPerView: 3,
          spaceBetween: 25
        }
      }
    })
  }
}
