export default function picTabs() {
  const picTabsBlock = document.querySelector('.pic-tabs')
  if (picTabsBlock) {
    const buttons = [...document.querySelectorAll('.pic-tabs__btn')]
    const buttonActiveClass = 'pic-tabs__btn--active'
    for (const button of buttons) {
      if (!(button.parentNode.className === 'pic-tabs__item')) {
        button.addEventListener('click', function () {
          for (const sibling of this.parentNode.children) {
            if (sibling !== this) sibling.classList.remove(buttonActiveClass)
          }
          this.classList.add(buttonActiveClass)
          const contentBlocks = [...this.parentNode.nextElementSibling.children]
          for (const block of contentBlocks) {
            block.style.display = 'none'
          }
          contentBlocks[indexInParent(this)].style.display = 'block'
        })
      } else {
        button.addEventListener('click', function () {
          this.classList.toggle(buttonActiveClass)
          $(this.nextElementSibling).slideToggle()
        })
      }
    }
  }
}

function indexInParent(node) {
  const children = node.parentNode.children
  let count = 0
  for (const child of children) {
    if (child === node) return count
    if (child.nodeType === 1) count++
  }
  return -1
}
