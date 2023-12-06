import noUiSlider from 'nouislider'

export default function uiRange() {
  const ranges = document.querySelectorAll('.ui-range')

  for (const range of ranges) {
    const itemRange = range.querySelector('.ui-range-body')
    const inputRange = range.querySelector('.ui-range__inp input')
    const inputRangeHiddenValue = range.querySelector('.ui-range__inp-val')
    const lowerSpan = range.querySelector('.ui-range-value-lower span')
    const upperSpan = range.querySelector('.ui-range-value-upper span')

    let minInp
    let maxInp

    if (inputRange.dataset.min) {
      minInp = Number.parseInt(inputRange.dataset.min, 10)
    } else {
      minInp = 1
      // eslint-disable-next-line no-console
      console.error('Minimum value not found in data attribute, set to default value', inputRange)
    }
    if (inputRange.dataset.max) {
      maxInp = Number.parseInt(inputRange.dataset.max, 10)
    } else {
      maxInp = 2
      // eslint-disable-next-line no-console
      console.error('Maximun value not found in data attribute, set to default value', inputRange)
    }

    noUiSlider.create(itemRange, {
      start: minInp,
      connect: 'lower',
      range: {
        min: minInp,
        max: maxInp
      }
    })

    if (lowerSpan.childNodes.length === 0) {
      lowerSpan.innerHTML = minInp.toLocaleString('ru-RU')
    }
    if (upperSpan.childNodes.length === 0) {
      upperSpan.innerHTML = maxInp.toLocaleString('ru-RU')
    }

    itemRange.noUiSlider.on('update', function (values, handle) {
      const updValue = Math.round(values[handle])
      inputRange.value = updValue.toLocaleString('ru-RU')
      inputRangeHiddenValue.textContent = updValue.toLocaleString('ru-RU')
      const event = new CustomEvent('rangeChange', {
        detail: {
          value: updValue
        }
      })
      inputRange.dispatchEvent(event)
    })

    inputRange.addEventListener('change', function () {
      itemRange.noUiSlider.set(+(this.value).replace(/\s/g, ''))
      dispatchChangeEvent(inputRange)
    })

    inputRange.addEventListener('input', function () {
      this.value = this.value.replace(/[A-Z_a-zЁА-яё]/g, '')
      inputRangeHiddenValue.textContent = this.value
    })

    inputRange.closest('.ui-range__inp').addEventListener('click', function () {
      inputRange.focus()
    })

    setCustomEvents(itemRange, inputRange)
  }

  $(document).on('click', '.bvi-link, .header__bvi', function () {
    bviFix()
  })
  window.addEventListener('load', function () {
    bviFix()
  })

  window.uiRangeUpdateMin = updUiRangeMin
  window.uiRangeUpdateMax = updUiRangeMax
  window.uiRangeUpdateMinMax = updUiRangeMinMax

  window.uiRangeGetValue = uiRangeGetValue
  window.uiRangeSetValue = uiRangeSetValue

  // old names
  window.updUiRangeMin = updUiRangeMin
  window.updUiRangeMax = updUiRangeMax
  window.updUiRangeMinMax = updUiRangeMinMax
}

function bviFix() {
  if ($('body').hasClass('bvi-active')) {
    const noStylesClass = 'bvi-no-styles'
    $('.noUi-connect').addClass(noStylesClass)
    $('.noUi-handle').addClass(noStylesClass)
  }
}

function setCustomEvents(itemRange, inputRange) {
  itemRange.noUiSlider.on('update', () => dispatchUpdateEvent(inputRange))
  itemRange.noUiSlider.on('change', () => dispatchChangeEvent(inputRange))
}

function dispatchUpdateEvent(inputRange) {
  inputRange.dispatchEvent(new Event('range:update'))
}

function dispatchChangeEvent(inputRange) {
  inputRange.dispatchEvent(new Event('range:change'))
}

function updUiRangeMin(rangeInput, value) {
  const instance = rangeInput.closest('.ui-range').querySelector('.ui-range-body')
  const minLimit = instance.closest('.ui-range').querySelector('.ui-range-value-lower span')

  minLimit.textContent = value.toLocaleString('ru')
  instance.noUiSlider.updateOptions(
    {
      range: {
        min: value,
        max: instance.noUiSlider.options.range.max
      }
    },
    true
  )
}

function updUiRangeMax(rangeInput, value) {
  const instance = rangeInput.closest('.ui-range').querySelector('.ui-range-body')
  const maxLimit = instance.closest('.ui-range').querySelector('.ui-range-value-upper span')

  maxLimit.textContent = value.toLocaleString('ru')
  instance.noUiSlider.updateOptions(
    {
      range: {
        min: instance.noUiSlider.options.range.min,
        max: value
      }
    },
    true
  )
}

function updUiRangeMinMax(rangeInput, min, max) {
  updUiRangeMin(rangeInput, min)
  updUiRangeMax(rangeInput, max)
}

function uiRangeGetValue(rangeInput) {
  return rangeInput.closest('.ui-range').querySelector('.ui-range-body').noUiSlider.get()
}

function uiRangeSetValue(rangeInput, value) {
  return rangeInput.closest('.ui-range').querySelector('.ui-range-body').noUiSlider.set(value)
}
