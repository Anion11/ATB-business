export default function cookiesBanner() {
  if ($('.cookies-banner').length > 0) {
    $('.cookies-banner .cookies-banner__ui-button').on('click', function (event) {
      event.preventDefault()
      $(this).parent('.cookies-banner').slideUp()
    })
  }
}
