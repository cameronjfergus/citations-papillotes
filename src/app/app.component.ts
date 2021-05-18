import {Component} from '@angular/core';
import {Click} from './services/Click';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(protected click: Click) {}

  public refreshRandom(): void {
    this.click.click();
  }
}
