import {Component, Input} from '@angular/core';
import {cites} from '../../fixtures/data';
import {CiteI} from '../../models/Cite';

@Component({
  selector: 'app-list-cites',
  templateUrl: './list-cites.component.html',
  styleUrls: ['./list-cites.component.scss']
})
export class ListCitesComponent {
  @Input() search: string;
  cites: CiteI[] = cites;

  constructor() { }

  getCites(): CiteI[] {
    return this.cites.filter(item => {
      if (!this.search) {
        return true;
      }

      return item
        && (
          item.cite.toLowerCase().includes(this.search.toLowerCase())
          || item.author.toLowerCase().includes(this.search.toLowerCase())
        );
    });
  }

  searchFoundCites(): number {
    if (this.cites.length !== this.getCites().length) {
      return this.getCites().length;
    }

    return 0;
  }
}
