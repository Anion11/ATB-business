import Swiper from 'swiper/bundle'

export default function blogOther() {
  if ($('.blog-others').length > 0) {
    const otherBlogsSlider = new Swiper('.blog-others .swiper', {
      spaceBetween: 20,
      slidesPerView: 'auto',
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      watchOverflow: true,
      breakpoints: {
        1259: {
          slidesPerView: 3
        }
      }
    })
  }
}
