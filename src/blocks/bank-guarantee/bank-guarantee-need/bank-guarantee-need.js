
export default function bankGuaranteeNeed() {
  const buttonMore = [...document.querySelectorAll('.bank-guarantee-need__ui-button')]
  const buttonClose = [...document.querySelectorAll('.bank-guarantee-need__close')]

  for (const button of buttonMore) {
    button.addEventListener('click', function () {
      const parent = button.closest('.bank-guarantee-need__item')
      parent.classList.toggle('active')
    })
  }

  for (const button of buttonClose) {
    button.addEventListener('click', function () {
      const parent = button.closest('.bank-guarantee-need__item')
      parent.classList.toggle('active')
    })
  }
}
