/* eslint-disable unicorn/prevent-abbreviations */

export default function pTariffs() {
  correctTable()
  window.addEventListener('resize', correctTable)

  const headsButton = [...document.querySelectorAll('.p-tariffs__wrapper--mobile .p-tariffs__col-head')]
  for (const button of headsButton) {
    button.addEventListener('click', function (event) {
      if (this === event.target) {
        $(this.nextElementSibling).slideToggle()
        this.classList.toggle('p-tariffs__col-head--active')
      }
    })
  }

  $(document).on('click', '.bvi-link, .header__bvi', function () {
    bviUpdate()
  })
}

function bviUpdate() {
  setTimeout(() => {
    correctTable()
  }, 100)
}

function correctTable() {
  const servicesCeils = [...document.querySelectorAll('.p-tariffs__wrapper--desk .p-tariffs__name')]
  const tariffColumns = [...document.querySelectorAll('.p-tariffs__wrapper--desk .p-tariffs__col')]
  const rowsCeilClass = '.p-tariffs__wrapper--desk .p-tariffs__ceil'

  for (const ceil of servicesCeils) {
    ceil.style.height = 'auto'
  }
  const tariffCeils = [...document.querySelectorAll(rowsCeilClass)]
  for (const ceil of tariffCeils) {
    ceil.style.height = 'auto'
  }

  document.querySelector('.p-tariffs__names-head').style.height = 'auto'
  for (const colHead of document.querySelectorAll('.p-tariffs__col-head')) {
    colHead.style.height = 'auto'
  }

  if (window.innerWidth > 1259) {
    for (const [index, servicesCeil] of servicesCeils.entries()) {
      const heights = []
      heights.push(servicesCeil.offsetHeight)
      for (const tariffColumn of tariffColumns) {
        heights.push([...tariffColumn.querySelectorAll(rowsCeilClass)][index].offsetHeight)
      }
      const maxHeight = `${Math.max(...heights) + 1}px`
      servicesCeil.style.height = maxHeight
      for (const tariffColumn of tariffColumns) {
        [...tariffColumn.querySelectorAll(rowsCeilClass)][index].style.height = maxHeight
      }
    }

    const headHeights = []
    headHeights.push(document.querySelector('.p-tariffs__names-head').offsetHeight)
    for (const colHead of document.querySelectorAll('.p-tariffs__col-head')) {
      headHeights.push(colHead.offsetHeight)
    }
    const maxHeadHeight = `${Math.max(...headHeights) + 1}px`
    document.querySelector('.p-tariffs__names-head').style.height = maxHeadHeight
    for (const colHead of document.querySelectorAll('.p-tariffs__col-head')) {
      colHead.style.height = maxHeadHeight
    }
  }
}
