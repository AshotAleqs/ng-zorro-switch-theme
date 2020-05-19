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
      style.href = '/assets/themes/style.dark.css';
    } else {
      style.href = '/assets/themes/style.compact.css';
    }
  }
}
