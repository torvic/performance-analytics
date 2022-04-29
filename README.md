# Measuring Critical Performance Metrics with Google Analytics

## Step 0: Viewing the demo page

To view demo, create a file called `index.html` and write some code. Next, start a local server in the directory you just created. 

## Step 1: Measuring when the CSS is done blocking

* We use [User Timing API](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API).
* Add `<script>` tag immediately following the CSS that stores the current time.
* Create a file named `analytics.js`.
* Load the `analytics.js` script from `index.html`.

## Step 2: Measuring when web fonts are active

* We will use [webfont.js](https://github.com/typekit/webfontloader).
* Update the main document to use `webfont.js`.
* Create a promise  that is resolved once the font is loaded inside the file `analytics.js`.

## Step 3: Measuring when images are visible

download image -> not a good PM (performance)

image visible to the use -> good PM

HANDLE BOTH CASES

image is downloaded -> (is visible) -> it's in the DOM

image is not downloaded -> (is visible) -> 'onload' handler fires

* Adding marks in each image's onload handler

## Step 3: Measuring when JavaScript has finished executing 	

You can determine the point at which all scripts have finished executing by adding a mark in an inline script tag immediately after the last synchronous `<script>` in the DOM.