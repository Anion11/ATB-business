import 'select2'

export default function uiSelects() {
  const selects = document.querySelectorAll('.ui-select select')
  for (const select of selects) {
    const selectParent = select.parentElement
    $(select).select2({
      minimumResultsForSearch: Number.POSITIVE_INFINITY,
      width: 'auto',
      dropdownAutoWidth: true,
      dropdownParent: selectParent,
      placeholder: select.dataset.placeholder ? select.dataset.placeholder : '',
      closeOnSelect: !select.getAttribute('multiple')
    })
    if (select.getAttribute('multiple') !== null) {
      select.parentElement.querySelector('.select2-search__field').setAttribute('readonly', 'readonly')

      const clearAll = document.createElement('span')
      clearAll.className = 'select2-selection__clear-all'
      select.parentElement.querySelector('.select2-selection--multiple').append(clearAll)
    }

    dispatchCustomEvents(select)

    window.uiSelectSetValue = uiSelectSetValue
    window.uiSelectGetValue = uiSelectGetValue
  }

  $('.currency__ui-select select').on('select2:select', function () {
    const tabItem = '.currency-tabs__item'
    const activeValue = $(this).val()

    $(tabItem).fadeOut(0)
    $(`${tabItem}[id=${activeValue}]`).fadeIn()
  })

  $(document).on('click', '.select2-selection__clear-all', function () {
    const thisSelect = $(this).parents('.ui-select').find('select')
    thisSelect.val('').trigger('change')
    thisSelect.select2('close')
  })
}

function dispatchCustomEvents(select) {
  const changeCustomEvent = new Event('select:change')
  const selectCustomEvent = new Event('select:select')
  const unselectCustomEvent = new Event('select:unselect')
  const clearCustomEvent = new Event('select:clear')

  $(select).on('change', () => select.dispatchEvent(changeCustomEvent))
  $(select).on('select2:select', () => select.dispatchEvent(selectCustomEvent))
  $(select).on('select2:unselect', () => select.dispatchEvent(unselectCustomEvent))
  $(select).on('select2:clear', () => select.dispatchEvent(clearCustomEvent))
}

function uiSelectSetValue(select, value) {
  $(select).val(value).trigger('change')
}

function uiSelectGetValue(select) {
  return $(select).val()
}
