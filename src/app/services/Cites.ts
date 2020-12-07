import {BehaviorSubject, Observable} from 'rxjs';
import {cites} from '../fixtures/data';
import {CiteI} from '../models/Cite';
import {distinct, filter} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class Cites {
  protected cites: BehaviorSubject<CiteI[]> = new BehaviorSubject(cites);
  public cites$: Observable<CiteI[]> = this.cites.asObservable()
    .pipe(
      filter(value => !!value),
      distinct()
    );

  public reset(): void {
    this.cites.next(cites);
  }

  public search(search: string): void {
    this.cites.next(
      cites.filter(item => {
        if (!this.search) {
          return true;
        }

        return item
          && (
            item.cite.toLowerCase().includes(search.toLowerCase())
            || item.author.toLowerCase().includes(search.toLowerCase())
          );
      })
    );
  }

  countSearchFoundCites(): number {
    if (cites.length !== this.cites.getValue().length) {
      return this.cites.getValue().length;
    }

    return 0;
  }
}
