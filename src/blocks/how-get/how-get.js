export default function howGet() {
  const howGetBlocks = document.querySelectorAll('.how-get')
  for (const howGetBlock of howGetBlocks) {
    const boxes = [...howGetBlock.querySelectorAll('.how-get__box')]
    const lines = [...howGetBlock.querySelectorAll('.how-get__line')]
    const duration = 5000
    const delay = 500
    steps(boxes, lines, 0, duration, delay)
    setInterval(() => {
      steps(boxes, lines, 0, duration, delay)
    }, (duration + delay) * boxes.length)
  }
}

function steps(boxes, lines, index, duration, delay) {
  if (index === boxes.length) {
    return
  }
  const activeElement = boxes[index]
  const activeLine = lines[index]
  activeElement.classList.add('how-get__box--active')
  setTimeout(() => {
    activeElement.classList.remove('how-get__box--active')
    if (index !== boxes.length - 1) {
      activeLine.classList.add('how-get__line--active')
    }
    setTimeout(() => {
      steps(boxes, lines, index + 1, duration, delay)
      if (index !== boxes.length - 1) {
        activeLine.classList.remove('how-get__line--active')
      }
    }, delay)
  }, duration)
}