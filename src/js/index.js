import $ from 'jquery'
import 'lazysizes'
import bvi from 'bvi'
import uiRange from '../blocks/_ui/ui-range/ui-range'
import uiSelects from '../blocks/_ui/ui-select/ui-select'
import uiTooltip from '../blocks/_ui/ui-tooltip/ui-tooltip'
import uiInput from '../blocks/_ui/ui-input/ui-input'
import accordion from '../blocks/accordion/accordion'
import banner from '../blocks/banner/banner'
import cookiesBanner from '../blocks/cookies-banner/cookies-banner'
import headerScripts from '../blocks/header/header'
import howGet from '../blocks/how-get/how-get'
import popupScript from '../blocks/popup/popup'
import tabs from '../blocks/tabs/tabs'
import seo from '../blocks/seo/seo'
import switchScripts from '../blocks/switch/switch'
import picTabs from '../blocks/pic-tabs/pic-tabs'
import usefulGoods from '../blocks/useful-goods/useful-goods'
import './_backend'

document.addEventListener('DOMContentLoaded', function () {
  window.bviUpdate = bviUpdate

  uiRange()
  uiSelects()
  uiTooltip()
  uiInput()
  accordion()
  banner()
  cookiesBanner()
  headerScripts()
  howGet()
  picTabs()
  popupScript()
  tabs()
  seo()
  switchScripts()
  usefulGoods()

  // common
  commonExpand()
  commonTableScripts()
  openAccordionByLink()

  window.openAccordion = openAccordion

  // eslint-disable-next-line no-new, no-undef
  new isvek.Bvi()
  $(document).on('click', '.bvi-link, .header__bvi', function () {
    bviUpdate()
  })
})

window.addEventListener('load', bviUpdate)

function bviUpdate() {
  autoHeightTable()

  const bviBody = document.querySelector('.bvi-body')
  if (bviBody) delete bviBody.dataset.bviBuiltelements

  const className = 'bvi-background-image'

  Array.prototype.forEach.call(document.querySelectorAll(`.${className}`), function (node) {
    node.classList.remove(className)
    if (`${window.getComputedStyle(node).background}`.includes('url')) {
      node.classList.add('custom-bvi-background-image')
    } else {
      node.classList.add('custom-bvi-background-colors')
    }
  })

  const bviPanel = document.querySelector('.bvi-panel')
  if (bviPanel) {
    document.documentElement.style.setProperty('--bvi-panel-height', `${bviPanel.offsetHeight}px`)
  }
}

function commonExpand() {
  const expandButtons = [...document.querySelectorAll('[data-expand-btn]')]
  for (const button of expandButtons) {
    button.addEventListener('click', function () {
      const hiddenBlock = document.querySelector(`[data-expand-block="${this.dataset.expandBtn}"]`)
      this.classList.toggle('active')
      this.classList.contains('active')
        ? this.textContent = this.dataset.endText
        : this.textContent = this.dataset.startText
      $(hiddenBlock).slideToggle()
    })
  }
}

function commonTableScripts() {
  if (document.querySelector('.js-table')) {
    autoHeightTable()
    window.addEventListener('resize', autoHeightTable)
    mobileTableAccordion()
  }
}

export default function autoHeightTable() {
  const tables = [...document.querySelectorAll('.js-table')]
  for (const table of tables) {
    const columns = [...table.querySelectorAll('.js-column')]

    const allCeils = [...table.querySelectorAll('.js-ceil')]
    for (const ceil of allCeils) {
      ceil.style.minHeight = 'auto'
    }

    const media = table.dataset.media

    if (window.innerWidth > media) {
      const columnLength = [...columns[0].querySelectorAll('.js-ceil')].length

      for (let index = 0; index < columnLength; index++) {
        const heights = []
        for (const column of columns) {
          heights.push([...column.querySelectorAll('.js-ceil')][index].offsetHeight)
        }
        const maxHeight = `${Math.max(...heights) + 1}px`
        for (const column of columns) {
          [...column.querySelectorAll('.js-ceil')][index].style.minHeight = maxHeight
        }
      }
    }
  }
}

function mobileTableAccordion() {
  const tables = [...document.querySelectorAll('.js-table')]
  for (const table of tables) {
    const media = +table.dataset.media
    const tableAccordionHeads = [...table.querySelectorAll('.js-accordion-head')]
    for (const head of tableAccordionHeads) {
      head.addEventListener('click', function (event) {
        if (window.innerWidth < media && !event.target.closest('.ui-tooltip__btn')) {
          this.classList.toggle('active')
          $(this.nextElementSibling).slideToggle()
        }
      })
    }

    window.addEventListener('resize', function () {
      for (const head of tableAccordionHeads) {
        if (window.innerWidth > media) {
          head.nextElementSibling.style.display = 'block'
        } else {
          head.classList.contains('active')
            ? head.nextElementSibling.style.display = 'block'
            : head.nextElementSibling.style.display = 'none'
        }
      }
    })
  }
}

function openAccordion(element) {
  const target = document.querySelector(element)
  if (target && target.classList.contains('accordion-item')) {
    target.scrollIntoView()
    const head = target.querySelector('.accordion-item__head')
    if (head) head.classList.add('accordion-item__head--active')
    $(target.querySelector('.accordion-item__main')).slideDown()
  }
}

function openAccordionByLink() {
  for (const link of document.querySelectorAll('.js-open-accordion')) {
    link.addEventListener('click', function (event) {
      openAccordion(event.target.getAttribute('href'))
    })
  }
}
