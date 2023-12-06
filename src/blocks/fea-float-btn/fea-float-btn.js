/* eslint-disable unicorn/prevent-abbreviations */
export default function feaFloatBtn() {
  if (document.querySelector('.section--float-btn')) {
    window.addEventListener('scroll', floatButton)
  }
}

function floatButton() {
  const section = document.querySelector('.section--float-btn')
  const top = section.getBoundingClientRect().top + window.pageYOffset
  const bot = section.getBoundingClientRect().bottom + window.pageYOffset
  const scrollWindow = window.pageYOffset
  const button = document.querySelector('.fea-float-btn')
  let endFloatHeight
  window.innerWidth > 767 ? endFloatHeight = button.offsetHeight : endFloatHeight = window.innerHeight
  if (scrollWindow > top && (scrollWindow < bot - endFloatHeight)) {
    button.classList.add('fea-float-btn--fixed')
  } else {
    button.classList.remove('fea-float-btn--fixed')
  }
}
