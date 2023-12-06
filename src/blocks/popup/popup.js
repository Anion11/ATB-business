import { Fancybox } from '@fancyapps/ui'
import pTariffs from '../p-tariffs/p-tariffs'

export default function popupScript() {
  window.Fancybox = Fancybox
  Fancybox.bind('.js-popup-open', {
    mainClass: 'popup',
    parentEl: document.querySelector('.wrapper'),
    showClass: 'fancybox-fadeIn',
    hideClass: 'fancybox-fadeOut',
    hideScrollbar: true,
    autoFocus: true,
    trapFocus: true,
    dragToClose: false,
    on: {
      done: () => {
        if (document.querySelector('.p-tariffs')) {
          pTariffs()
        }
      }
    }
  })
  Fancybox.defaults.ScrollLock = false

  document.addEventListener('click', function (event) {
    for (let target = event.target; target && target !== this; target = target.parentNode) {
      if (target.matches('.js-close-popup')) {
        Fancybox.close(true)
        break
      }
    }
  }, false)
}
