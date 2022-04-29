window.onload = function () {
  measureCssUnblockTime()
  measureWebfontPerfAndFailures()
	measureImagesVisibleTime();
}

function measureCssUnblockTime() {
  console.log('CSS', 'unblock', measureDuration('css:unblock'))
}

function measureWebfontPerfAndFailures() {
  new Promise(function (resolve, reject) {
    // The classes `wf-active` or `wf-inactive` are added to the <html>
    // element once the fonts are loaded (or error).
    let loaded = /wf-(in)?active/.exec(document.documentElement.className)
    let success = loaded && !loaded[1] // No "in" in the capture group.
    // If the fonts are already done loading, resolve immediately.
    // Otherwise resolve/reject in the active/inactive callbacks, respectively.
    if (loaded) {
      success ? resolve() : reject()
    } else {
      let originalAciveCallback = WebFontConfig.active
      WebFontConfig.inactive = reject
      WebFontConfig.active = function () {
        originalAciveCallback()
        resolve()
      }
      // In case the webfont.js script fails to load, always reject the
      // promise after the timeout amount.
      setTimeout(reject, WebFontConfig.timeout)
    }
  })
    .then(function () {
      console.log('Fonts', 'active', measureDuration('fonts:active'))
    })
    .catch(function () {
      console.error('Error loading web fonts')
    })
}

function measureDuration(mark, opt_reference) {
  let reference = opt_reference || 'responseEnd'
  let name = reference + ':' + mark

  // Clears any existing measurements with the same name.
  performance.clearMeasures(name)

  // Creates a new measurement from the reference point to the specified mark.
  // If more than one mark with this name exists, the most recent one is used.
  performance.measure(name, reference, mark)

  // Gets the value of the measurement just created.
  let measure = performance.getEntriesByName(name)[0]

  // Returns the measure duration.
  return measure.duration
}

/**
 * Calculates the time duration between the responseEnd timing event and when
 * all images are loaded and visible on the page, then logs that value to the
 * console.
 */
function measureImagesVisibleTime() {
  console.log('Images', 'visible', measureDuration('img:visible'));
}
