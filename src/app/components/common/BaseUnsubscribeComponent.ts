import {Component, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  template: ''
})
export abstract class BaseUnsubscribeComponent<T = any> implements OnDestroy
{
  protected subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
