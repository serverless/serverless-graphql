const cssNext = require('postcss-cssnext');
const postCssReporter = require('postcss-reporter');
const postCssNested = require('postcss-nested');

module.exports = (ctx) => ({
  plugins: [
    cssNext({ // Allow future CSS features to be used, also auto-prefixes the CSS...
      browsers: ['last 2 versions', 'IE > 10'], // ...based on this browser list
    }),
    postCssReporter({ // Posts messages from plugins to the terminal
      clearMessages: true,
    }),
    postCssNested(),
  ],
});
