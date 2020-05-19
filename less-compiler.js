const less = require('less');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const fs = require('fs');
const darkThemeVars = require('ng-zorro-antd/dark-theme');
const compactThemeVars = require('ng-zorro-antd/compact-theme');

const darkTheme = './src/dark-theme.less';
const darkThemeContent = `@import '${darkTheme}';`;

const compactTheme = './src/compact-theme.less';
const compactThemeContent = `@import '${compactTheme}';`;

less.render(darkThemeContent, {
  javascriptEnabled: true,
  plugins: [new LessPluginCleanCSS({ advanced: true })],
  modifyVars: {
    ...darkThemeVars
  }
}).then(data => {
  fs.writeFileSync(
    // output path for the theme style
    './src/assets/themes/style.dark.css',
    data.css
  )
}).catch(e => {
  // log the render error
  console.error(e);
});
less.render(compactThemeContent, {
  javascriptEnabled: true,
  plugins: [new LessPluginCleanCSS({ advanced: true })],
  modifyVars: {
    ...compactThemeVars
  }
}).then(data => {
  fs.writeFileSync(
    // output path for the theme style
    './src/assets/themes/style.compact.css',
    data.css
  )
}).catch(e => {
  // log the render error
  console.error(e);
});