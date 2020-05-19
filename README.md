# NGZorroSwitchTheme

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Description

The example is for the project which uses `.less` styles in the project

1. At first you need to install `less-plugin-clean-css` dev dependency by command `npm i less -D less-plugin-clean-css -D`

2. Create the **theme.less** file in `src` folder,
which contains:
```css
@import "../node_modules/ng-zorro-antd/ng-zorro-antd.less";     // this is important


@primary-color : #f5222d;       // and define the variables which are uses in the library
```
The link of the full variables [here][1]

[1]: https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/scripts/site/_site/doc/theme.less

3. Create `themes` folder in `assets` folder

4. Define `less-compiler.js`
which contains:
```javascript
const less = require('less');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const fs = require('fs');
const darkThemeVars = require('ng-zorro-antd/dark-theme');

const appStyles = './src/theme.less';    // this path should be the path of the theme.less file
const themeContent = `@import '${appStyles}';`;

less.render(themeContent, {
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
```

5. Run `node ./less-compiler.js` in the terminal (this command should be generate the `style.dark.css` file in the `src/assets/themes` folder)

6. **(optional)** If you want to run `node ./less-compiler.js` every time when you build the project, you can 
replace `"build": "ng build",` with `"build": "ng build && node ./less-compiler.js",` in `package.json` and after you can build your project by `npm run build` command

7. Define a function that helps you remove or add the link of the theme into the head. (In my case the function defined in the `app.component.ts` file)
```typescript
// .............
export class AppComponent {
  theme = '';
  constructor() {
      setInterval(() => {
         this.changeTheme()
      }, 2000);
  }
 
  changeTheme() {
    this.theme = this.theme === 'dark' ? '' : 'dark';
    if (this.theme === 'dark') {
      const style = document.createElement('link');
      style.type = 'text/css';
      style.rel = 'stylesheet';
      style.id = 'dark-theme';
      style.href = '/assets/themes/style.dark.css';
      document.head.appendChild(style);
    } else {
      const dom = document.getElementById('dark-theme');
      if (dom) {
        dom.remove();
      }
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
