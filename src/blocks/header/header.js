import tippy from 'tippy.js'

export default function headerScripts() {
  const contactUs = document.querySelector('.header .header__call')
  const contactContent = document.querySelector('.header .header__call-content')
  const contactUsBlock = tippy(contactUs, {
    trigger: 'click',
    content: contactContent.innerHTML,
    allowHTML: true,
    interactive: true,
    offset: [0, 20],
    placement: 'bottom',
    theme: 'null'
  })

  const callBlockClose = $('.header__call-close')
  $(document).on('click', '.header__call-close', function () {
    contactUsBlock.hide()
  })

  const lang = document.querySelector('.header__lang')
  const langContent = document.querySelector('.header__lang-content')
  const langBlock = tippy(lang, {
    trigger: 'click',
    content: langContent.innerHTML,
    allowHTML: true,
    interactive: true,
    offset: [0, 0],
    placement: 'bottom',
    theme: 'null'
  })

  const sections = $('.header__top-select')
  const sectionsContent = $('.header__top-menu')
  sections.on('click', function () {
    $(this).toggleClass('header__top-select--active')
    sectionsContent.toggleClass('header__top-menu--visible')
  })

  $(document).on('click', function (event) {
    if ($(event.target).closest(sections).length === 0 && $(event.target).closest(sectionsContent).length === 0) {
      sections.removeClass('header__top-select--active')
      sectionsContent.removeClass('header__top-menu--visible')
    }
    event.stopPropagation()
  })

  headerBlocksPosition()
  window.addEventListener('resize', headerBlocksPosition)

  $.fn.dropMenuHeight = function () {
    const $blocks = $(this)
    let maxH = $blocks.eq(0).height()
    $blocks.each(function () {
      maxH = ($(this).height() > maxH) ? $(this).height() : maxH
    })
    $blocks.height(maxH)
  }

  const dropMenu = $('.header .header__bot-drop')
  dropMenu.dropMenuHeight()
  $(window).on('resize', function () {
    dropMenu.css({
      height: 'auto'
    })
    dropMenu.dropMenuHeight()
  })

  const headerShadow = $('.header__shadow')
  const shadowActiveClass = 'header__shadow--active'

  window.addEventListener('load', function () {
    const headerDropButton = $('.header__bot-item:not(.header__bot-item--link)')
    headerDropButton.on('mouseenter', function () {
      headerShadow.addClass(shadowActiveClass)
    })
    headerDropButton.on('mouseleave', function () {
      headerShadow.removeClass(shadowActiveClass)
    })
  })

  const burgerIcon = $('.header__burger-icon')
  const burgerIconActiveClass = 'header__burger-icon--active'
  const burger = $('.header__burger')
  const burgerVisibleClass = 'header__burger--visible'
  const logo = $('.header__logo')
  const logoSmallClass = 'header__logo--small'
  burgerIcon.on('click', function () {
    $(this).toggleClass(burgerIconActiveClass)
    burger.toggleClass(burgerVisibleClass)
    headerShadow.toggleClass(shadowActiveClass)
    if (window.innerWidth > 1180) {
      logo.toggleClass(logoSmallClass)
    }
    $('html').toggleClass('no-scroll')
  })

  const geoOpen = $('.js-open-geo')
  const geoBLock = $('.header__geo')
  geoOpen.on('click', function () {
    geoBLock.slideDown(0)
    $('html').addClass('no-scroll')
  })

  const geoClose = $('.header__geo-close')
  geoClose.on('click', function () {
    geoBLock.slideUp(300)
    if (!burger.hasClass(burgerVisibleClass)) {
      $('html').removeClass('no-scroll')
    }
  })

  const geoInput = $('.js-geo-result')
  const geoResults = $('.header__geo-results')
  geoInput.on('focus', function () {
    geoResults.addClass('header__geo-results--visible')
  })
  geoInput.on('blur', function () {
    geoResults.removeClass('header__geo-results--visible')
  })

  const geoPoint = $('.js-header__geo-item')
  const geoAllList = $('.header__geo-bot--all')
  const geoSelect = $('.header__geo-bot--select')
  const geoBack = $('.header__geo-back')
  const geoBottomHiddenClass = 'header__geo-bot--hidden'
  geoPoint.on('click', function () {
    geoAllList.addClass(geoBottomHiddenClass)
    geoSelect.removeClass(geoBottomHiddenClass)
  })
  geoBack.on('click', function () {
    geoAllList.removeClass(geoBottomHiddenClass)
    geoSelect.addClass(geoBottomHiddenClass)
  })

  const searchBlock = $('.header__search')
  const searchOpen = $('.header__search-open')
  const searchActiveClass = 'header__search--active'
  searchOpen.on('click', function () {
    searchBlock.addClass(searchActiveClass)
    headerShadow.addClass(shadowActiveClass)
    burger.removeClass(burgerVisibleClass)
    burgerIcon.removeClass(burgerIconActiveClass)
    if (window.innerWidth > 1180) { logo.removeClass(logoSmallClass) }
    $('html').addClass('no-scroll')
  })

  const searchClose = $('.header__search-close')
  searchClose.on('click', function () {
    searchBlock.removeClass(searchActiveClass)
    headerShadow.removeClass(shadowActiveClass)
    $('html').removeClass('no-scroll')
  })

  const searchInput = $('.js-search-result')
  const searchResults = $('.header__search-results')
  searchInput.on('focus', function () {
    searchResults.addClass('header__search-results--visible')
  })
  searchInput.on('blur', function () {
    searchResults.removeClass('header__search-results--visible')
  })

  const dropMenuItem = $('.header__m-burger-arrow')
  dropMenuItem.on('click', function () {
    $(this).toggleClass('header__m-burger-arrow--active')
    $(this).next().slideToggle()
  })

  headerShadow.on('click', function () {
    searchBlock.removeClass(searchActiveClass)
    geoBLock.slideUp(300)
    burgerIcon.removeClass(burgerIconActiveClass)
    burger.removeClass(burgerVisibleClass)
    headerShadow.removeClass(shadowActiveClass)
    logo.removeClass(logoSmallClass)
    $('html').removeClass('no-scroll')
  })

  // hide burger by link click
  $('.header__m-burger-menu a').on('click', () => {
    burgerIcon.removeClass(burgerIconActiveClass)
    burger.removeClass(burgerVisibleClass)
    headerShadow.removeClass(shadowActiveClass)
    logo.removeClass(logoSmallClass)
    $('html').removeClass('no-scroll')
  })

  $(document).on('click', '.bvi-link, .header__bvi', function () {
    headerBviBurger()
    headerBlocksPosition()
  })
  window.addEventListener('load', function () {
    headerBviBurger()
    headerBlocksPosition()
  })
}

function headerBlocksPosition() {
  const headerBottom = document.querySelector('.header').offsetHeight
  document.documentElement.style.setProperty('--header-bottom', `${headerBottom}px`)
  const headerTopPartBottom = document.querySelector('.header__top').offsetHeight
  document.documentElement.style.setProperty('--desk-burger-top', `${headerTopPartBottom}px`)

  const pageHeight = document.querySelector('.wrapper').offsetHeight

  const headerShadow = document.querySelector('.header__shadow')
  headerShadow.style.height = `${pageHeight - headerBottom}px`
}

function headerBviBurger() {
  if ($('body').hasClass('bvi-active')) {
    $('.header__burger').css('height', `calc(100vh - ${document.querySelector('.header__top').getBoundingClientRect().bottom}px)`)
  }
}
