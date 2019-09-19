const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withProgressBar = require("next-progressbar");

module.exports = withProgressBar(
  withSass(
    withCSS({
      /* config options here */
    })
  )
);
