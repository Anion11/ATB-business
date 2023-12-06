import Swiper from 'swiper/bundle'
import autoHeightTable from '../../js'

export default function tabs() {
  const locationHash = window.location.hash
  let tabsSlider
  const tabsHead = '.tabs-head'
  const tabsHeadItem = '.tabs-head__item'
  const tabsHeadItemActive = 'tabs-head__item--active'
  const tabsMainItem = '.tabs-main__item'
  const tabsMainItemActive = 'tabs-main__item--active'

  if ($(tabsHead).length > 0) {
    const tabsNav = document.querySelectorAll(tabsHead)

    for (const item of tabsNav) {
      let tabsSpace
      let tabsSpaceMobile
      let enableOnDesktop = true
      const headSlider = item.querySelector('.swiper')
      if (item.classList.contains('tabs-head--round')) {
        tabsSpace = tabsSpaceMobile = 10
        enableOnDesktop = false
      } else {
        tabsSpace = 40
        tabsSpaceMobile = 20
      }

      tabsSlider = new Swiper(headSlider, {
        spaceBetween: tabsSpaceMobile,
        slidesPerView: 'auto',
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        watchOverflow: true,
        enabled: true,
        freeMode: true,
        breakpoints: {
          767: {
            spaceBetween: tabsSpace,
            enabled: enableOnDesktop
          }
        }
      })

      if (item.classList.contains('tabs-head--outside')) {
        const rightGradientClass = 'tabs-head--outside-right'
        const leftGradientClass = 'tabs-head--outside-left'
        const doubleGradientClass = 'tabs-head--outside-double'

        item.classList.add('tabs-head--outside-right')
        tabsSlider.on('progress', function (swiper, progress) {
          if (progress <= 0) {
            item.classList.add(rightGradientClass)
            item.classList.remove(leftGradientClass)
            item.classList.remove(doubleGradientClass)
          } else if (progress >= 1) {
            item.classList.add(leftGradientClass)
            item.classList.remove(rightGradientClass)
            item.classList.remove(doubleGradientClass)
          } else {
            item.classList.remove(leftGradientClass)
            item.classList.remove(rightGradientClass)
            item.classList.add(doubleGradientClass)
          }
        })
      }
    }
    $(tabsHeadItem).on('click', function (event) {
      if ($(this).find('.tabs-head__link').length === 0 && !$(this).hasClass(tabsHeadItemActive)) {
        const tabGroup = $(this).parents(tabsHead).data('tabs-group')
        $(this).siblings(tabsHeadItem).removeClass(tabsHeadItemActive)
        $(this).addClass(tabsHeadItemActive)
        if (typeof tabGroup !== 'undefined' && tabGroup !== false) {
          const bodyGroup = $(`.tabs-main[data-tabs-group="${tabGroup}"]`)
          bodyGroup.children(tabsMainItem).fadeOut(0).eq($(this).index()).fadeIn()
          if (bodyGroup.children(tabsMainItem).eq($(this).index()).hasClass('js-auto-height-table')) {
            setTimeout(() => {
              autoHeightTable()
            }, 10)
          }
        } else {
          $(this).parents(tabsHead).siblings('.tabs-main').children(tabsMainItem).fadeOut(0).eq($(this).index()).fadeIn()
          if ($(this).parents(tabsHead).siblings('.tabs-main').children(tabsMainItem).eq($(this).index()).hasClass('js-auto-height-table')) {
            setTimeout(() => {
              autoHeightTable()
            }, 10)
          }
        }
        if ($(this).data('banner-img')) {
          const dataValue = $(this).data('banner-img')
          $('.banner__img-item').removeClass('active')
          $(`.banner__img-item[data-tab-img=${dataValue}]`).addClass('active')
        }
      }
    })
  }

  if (locationHash) {
    const _href = locationHash
    tabsSwitchHash(_href)
  }

  window.addEventListener('hashchange', function () {
    const _href = window.location.hash
    tabsSwitchHash(_href)
  })

  function tabsSwitchHash(_href) {
    if ($(`.tabs-head__item${_href}`).length > 0) {
      $(_href).siblings(tabsHeadItem).removeClass(tabsHeadItemActive)
      $(_href).addClass(tabsHeadItemActive)
      $(tabsMainItem).removeClass(tabsMainItemActive).fadeOut(0).eq($(_href).index()).fadeIn()
      tabsSlider.slideTo(($(_href).index()), 300)
      $('html, body').animate({
        scrollTop: `${$(_href).offset().top}px`
      }, 0)
    }
  }

  window.openTabByLink = openTabByLink
}

function openTabByLink(element) {
  const tabTarget = element
  const tabHeadItem = document.querySelector(`.tabs-head__item[data-tab=${tabTarget}]`)
  tabHeadItem.scrollIntoView()
  tabHeadItem.click()
}
