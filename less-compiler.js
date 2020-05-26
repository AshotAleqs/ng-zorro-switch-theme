const less = require('less');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const fs = require('fs');

// ng zorro defined styles
const basicStyles = `@import './node_modules/ng-zorro-antd/ng-zorro-antd.less';`;
// ng zorro compact theme variables
const compactThemeVars = require('ng-zorro-antd/compact-theme');
// ng zorro dark theme variables
const darkThemeVars = require('ng-zorro-antd/dark-theme');

less.render(`${basicStyles}`, {
  javascriptEnabled: true,
  plugins: [new LessPluginCleanCSS({ advanced: true })],
  modifyVars: {

    ...compactThemeVars,
    ...{
      // for the compact theme
      // you need to add your color variables here
      // you can find the full variables list here
      // https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/scripts/site/_site/doc/theme.less
      'primary-color': '#36ac19',
      'error-color': 'green'
    }
  }
}).then(data => {
  fs.writeFileSync(
    // output path for the theme style
    './src/assets/themes/compact.css',
    data.css
  )
}).catch(e => {
  // log the render error
  console.error(e);
});

less.render(`${basicStyles}`, {
  javascriptEnabled: true,
  plugins: [new LessPluginCleanCSS({ advanced: true })],
  modifyVars: {
    ...darkThemeVars,
    ...compactThemeVars,
    ...{
      // for the dark theme
      // you need to add your color variables here
      // you can find the full variables list here
      // https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/scripts/site/_site/doc/theme.less
      'primary-color': '#02cadb',
      'error-color': 'red'
    }
  }
}).then(data => {
  fs.writeFileSync(
    // output path for the theme style
    './src/assets/themes/dark.css',
    data.css
  )
}).catch(e => {
  // log the render error
  console.error(e);
});