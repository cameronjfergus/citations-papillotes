import {Component} from '@angular/core';
import {Subscription} from 'rxjs';
import {Click} from '../../services/Click';

@Component({
  template: ''
})
export abstract class BaseNavbarComponent<T = any>
{
  constructor(protected click: Click) {}

  public refreshRandom(): void {
    this.click.click();
  }
}
