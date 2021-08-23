import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-page-not-found',
  template: `Lost In Space ?`
})
export class PageNotFoundComponent {
  constructor(protected title: Title) {
    this.title.setTitle('Citations - Page non trouvée')
  }
}
