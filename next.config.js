// const withCSS = require("@zeit/next-css");
// const css = withCSS({
//   cssModules: true,
//   cssLoaderOptions: {
//     importLoaders: 1,
//     localIdentName: "[local]___[hash:base64:5]"
//   }
// });

const withSass = require("@zeit/next-sass");
module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]"
  }
});

// module.exports = {
//   css,
//   scss
// };
