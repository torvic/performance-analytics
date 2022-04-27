# Measuring Critical Performance Metrics with Google Analytics

## Step 0: Viewing the demo page

To view demo, create a file called `index.html` and write some code. Next, start a local server in the directory you just created. 

## Step 1: Measuring when the CSS is done blocking

* We use [User Timing API](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API).
* Add `<script>` tag immediately following the CSS that stores the current time.
* Create a file named `analytics.js`.
* Load the `analytics.js` script from `index.html`.
