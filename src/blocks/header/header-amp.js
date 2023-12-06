const burgerIcon = document.querySelector('.header__burger-icon')
const burgerIconActiveClass = 'header__burger-icon--active'
const burger = document.querySelector('.header__burger')
const burgerVisibleClass = 'header__burger--visible'
const headerShadow = document.querySelector('.header__shadow')
const shadowActiveClass = 'header__shadow--active'

burgerIcon.addEventListener('click', function () {
  this.classList.toggle(burgerIconActiveClass)
  burger.classList.toggle(burgerVisibleClass)
  headerShadow.classList.toggle(shadowActiveClass)
  document.querySelector('.wrapper').classList.toggle('no-scroll')
})

headerShadow.addEventListener('click', function () {
  burgerIcon.classList.remove(burgerIconActiveClass)
  burger.classList.remove(burgerVisibleClass)
  headerShadow.classList.remove(shadowActiveClass)
  this.classList.remove(shadowActiveClass)
  document.querySelector('.wrapper').classList.remove('no-scroll')
})

const sections = document.querySelector('.header__top-select')
const sectionsContent = document.querySelector('.header__top-menu')
sections.addEventListener('click', function () {
  this.classList.toggle('header__top-select--active')
  sectionsContent.classList.toggle('header__top-menu--visible')
})

const dropMenuItems = [...document.querySelectorAll('.header__m-burger-arrow')]
for (const item of dropMenuItems) {
  item.addEventListener('click', function (event) {
    const dropItem = this.parentNode.querySelector('.header__m-burger-drop')
    this.classList.toggle('header__m-burger-arrow--active')
    dropItem.classList.toggle('header__m-burger-drop--active')
  })
}
