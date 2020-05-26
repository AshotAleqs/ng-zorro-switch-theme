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
    this.theme = this.theme === 'dark' ? '' : 'dark';
    const style = document.getElementById('theme-link') as HTMLLinkElement;
    if (this.theme === 'dark') {
      style.href = '/assets/themes/dark.css';
    } else {
      style.href = '/assets/themes/compact.css';
    }
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
