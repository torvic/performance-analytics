window.onload = function () {
  measureCssUnblockTime()
}

function measureCssUnblockTime() {
  console.log('CSS', 'unblock', measureDuration('css:unblock'))
}

function measureDuration(mark, opt_reference) {
  var reference = opt_reference || 'responseEnd'
  var name = reference + ':' + mark

  // Clears any existing measurements with the same name.
  performance.clearMeasures(name)

  // Creates a new measurement from the reference point to the specified mark.
  // If more than one mark with this name exists, the most recent one is used.
  performance.measure(name, reference, mark)

  // Gets the value of the measurement just created.
  var measure = performance.getEntriesByName(name)[0]

  // Returns the measure duration.
  return measure.duration
}
