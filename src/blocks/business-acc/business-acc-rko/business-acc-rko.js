/* eslint-disable unicorn/prevent-abbreviations */
export default function businessAccRko() {
  const rkoItems = document.querySelectorAll('.business-acc-rko__item')
  if (rkoItems) {
    const isTablet = window.matchMedia('(max-width: 1259px)')
    if (!isTablet.matches) {
      const heights = []
      for (const [index, item] of rkoItems.entries()) {
        const itemHead = item.querySelector('.business-acc-rko__head')
        heights.push(itemHead.offsetHeight)
      }
      const maxHeight = `${Math.max(...heights) + 1}px`
      for (const item of rkoItems) {
        item.querySelector('.business-acc-rko__head').style.minHeight = maxHeight
      }
    }
  }
}
