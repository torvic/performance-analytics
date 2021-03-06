window.onload = function () {
  measureCssUnblockTime()
  measureWebfontPerfAndFailures()
  measureImagesVisibleTime()
  measureJavaSciptExecutionTime()
}

function measureCssUnblockTime() {
  console.log('CSS', 'unblock', measureDuration('css:unblock'))
  let cssUnblockTime = measureDuration('css:unblock')
  if (cssUnblockTime) {
    ga('send', 'timing', 'CSS', 'unblock', cssUnblockTime)
  }
}

function measureWebfontPerfAndFailures() {
  if (window.__perf) {
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
        let fontsActiveTime = measureDuration('fonts:active')
        if (fontsActiveTime) {
          ga('send', 'timing', 'Fonts', 'active', fontsActiveTime)
        }
      })
      .catch(function () {
        console.error('Error loading web fonts')
        ga('send', 'event', 'Fonts', 'error')
      })
  }
}

function measureDuration(mark, opt_reference) {
  if (window.__perf) {
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
    return Math.round(measure.duration)
  }
}

/**
 * Calculates the time duration between the responseEnd timing event and when
 * all images are loaded and visible on the page, then logs that value to the
 * console.
 */
function measureImagesVisibleTime() {
  console.log('Images', 'visible', measureDuration('img:visible'))
  let imgVisibleTime = measureDuration('img:visible')
  if (imgVisibleTime) {
    ga('send', 'timing', 'Images', 'visible', imgVisibleTime)
  }
}

/**
 * Calculates the time duration between the responseEnd timing event and when
 * all synchronous JavaScript files have been downloaded and executed, then
 * logs that value to the console.
 */
function measureJavaSciptExecutionTime() {
  console.log('JavaScript', 'execute', measureDuration('js:execute'))
  let jsExecuteTime = measureDuration('js:execute')
  if (jsExecuteTime) {
    ga('send', 'timing', 'JavaScript', 'execute', jsExecuteTime)
  }
}
