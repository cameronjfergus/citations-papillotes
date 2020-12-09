import {BehaviorSubject, EMPTY, from, Observable, of} from 'rxjs';
import {cites} from '../fixtures/data';
import {CiteI} from '../models/Cite';
import {distinct, filter, map, switchMap, tap, toArray} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as rfdc from 'rfdc';

@Injectable()
export class Cites {
  protected originalCites: CiteI[] = [];
  protected cites: BehaviorSubject<CiteI[]> = new BehaviorSubject<CiteI[]>(null);
  public cites$: Observable<CiteI[]> = this.cites.asObservable()
    .pipe(
      filter(value => !!value),
      // this is for a kind of immutability: if something push/pop/shift/... the CiteI[] it won't alter every subcriber that has saved the data
      map(next => rfdc()(next)),
      distinct()
    );
  // local cache for the counter
  protected count = 0;

  public constructor(protected router: ActivatedRoute) {
    cites.pipe(
      tap(next => this.originalCites = next),
      switchMap(() => this.reset())
    ).subscribe();
  }

  public reset(): Observable<CiteI[]> {
    return of(this.originalCites).pipe(
      filter(value => !!value),
      tap(next => this.cites.next(next))
    );
  }

  public search(search: string): Observable<CiteI[]> {
    if (!this.cites.getValue()) {
      return EMPTY;
    }

    return of(this.cites.getValue()).pipe(
      switchMap(next => from(next)),
      filter(item => {
        if (!search) {
          return true;
        }

        return item
          && (
            item.cite.toLowerCase().includes(search.toLowerCase())
            || item.author.toLowerCase().includes(search.toLowerCase())
          );
      }),
      toArray(),
    );
  }

  countSearchFoundCites(): number {
    // if there is a pending Search
    if (this.router.snapshot.queryParams
      && this.router.snapshot.queryParams.q) {
      return this.count;
    }

    if (this.originalCites) {
      this.count = this.originalCites.length;
    }

    return this.count;
  }
}
