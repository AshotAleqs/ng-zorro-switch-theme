import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'ng-zorro-switch-theme';
  theme = '';



  changeTheme() {

    // the theme to which should be switched
    this.theme = this.theme === 'dark' ? '' : 'dark';



    // theme url to which should be switched
    let themeUrl = './assets/themes/compact.css';

    if (this.theme === 'dark') {
      themeUrl = './assets/themes/dark.css';
    }

    // create new link element
    const newThemeElement = document.createElement('link') as HTMLLinkElement;
    // put the link into the document head
    document.head.appendChild(newThemeElement);

    // add the type to the link element
    newThemeElement.type = 'text/css';
    // add the rel to the link elmenent
    newThemeElement.rel = 'stylesheet';
    // listen the link load event
    newThemeElement.onload = () => {
      // get the theme link element
      const themeElements = document.querySelectorAll('link[theme-link]');
      // get all of the style elements and remove all of theme from the document
      themeElements.forEach(themeElement => {
        // remove the prevoius theme styles from the document when the new theme styles already downloaded
        document.head.removeChild(themeElement);
      });

      // add attribute to the theme link element
      newThemeElement.setAttribute('theme-link', '');
      // remove the listener
      newThemeElement.onload = null;

    };

    newThemeElement.href = themeUrl;


  }





  // some property for small demo
  // ---------------------------------------------------------------------------


  // tslint:disable-next-line: member-ordering
  inputValue?: string;
  // tslint:disable-next-line: member-ordering
  options: string[] = [];

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.options = value ? [value, value + value, value + value + value] : [];
  }
}
