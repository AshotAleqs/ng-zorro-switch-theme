# NGZorroSwitchTheme

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Description
1. At first you need to install `less-plugin-clean-css` dev dependency by command `npm i less -D less-plugin-clean-css -D`

2. Create `themes` folder in `assets` folder

3. Define `less-compiler.js`
which contains:
```javascript
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
      'primary-color': '#111521',
      'error-color': 'green',
      'text-color': '#fffff1'
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
    ...{
      // for the dark theme
      // you need to add your color variables here
      // you can find the full variables list here
      // https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/scripts/site/_site/doc/theme.less
      'primary-color': '#02cadb',
      'error-color': 'yellow'
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
```
here is the link of the full variables [less variables][1]

 4. Run `node ./less-compiler.js` in the terminal (this command should generate the `dark.css` and `compact.css` files in the `src/assets/themes` folder)

 5. **(optional)** If you want to run `node ./less-compiler.js` every time when you build the project, you can 
replace `"build": "ng build",` with `"build": "ng build && node ./less-compiler.js",` in `package.json` and after you can build your project by `npm run build` command.
 6. add ` <link rel="stylesheet" id="theme-link" href="/assets/themes/compact.css">` into the `head` of your `index.html` file.

 7. Define a function that helps you remove or add the link of the theme into the head. (In my case the function defined in the `app.component.ts` file)
```typescript
// ..........................
export class AppComponent {
  theme = '';
  constructor() {
      setInterval(() => {
         this.changeTheme()
      }, 2000);
  }
 
  changeTheme() {
    this.theme = this.theme === 'dark' ? '' : 'dark';
    const style = document.getElementById('theme-link') as HTMLLinkElement;
    if (this.theme === 'dark') {
      style.href = '/assets/themes/dark.css';
    } else {
      style.href = '/assets/themes/compact.css';
    }
  }
}
```

I hope this can help you easily organize the runtime theme switching.

---

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
