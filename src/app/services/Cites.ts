import {BehaviorSubject, EMPTY, from, Observable, of} from 'rxjs';
import {cites} from '../fixtures/data';
import {Cite, CiteI} from '../models/Cite';
import {distinct, filter, map, switchMap, take, tap, toArray} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Injectable()
export class Cites {
  protected originalCites: CiteI[] = [];
  protected cites: BehaviorSubject<CiteI[]> = new BehaviorSubject<CiteI[]>(null);
  public cites$: Observable<CiteI[]> = this.cites.asObservable()
    .pipe(
      filter(value => !!value),
      // this is for a kind of immutability: if something push/pop/shift/... the CiteI[] it
      // won't alter every subcriber that has saved the data
      // map(next => rfdc()(next)), // @todo find why it destroy the original object : Cite
      // become a simple object & the proto is not copied
      map(next => {
        return next.map(cite => {
          const newCite = new Cite();
          newCite.setId(cite.getId())
            .setAuthor(cite.getAuthor())
            .setCite(cite.getCite())
            .setTags(cite.getTags());

          return newCite;
        });
      }),
      distinct(),
      take(1) // auto unsubscribe, force complete
    );
  // local cache for the counter
  protected count = 0;

  public constructor(protected router: ActivatedRoute) {
    cites.pipe(
      tap(next => this.originalCites = next),
      tap(next => this.count = next.length),
      switchMap(() => this.reset()),
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
            item.getCite().toLowerCase().includes(search.toLowerCase())
            || item.getAuthor().toLowerCase().includes(search.toLowerCase())
            || item.getTags().includes(search.toLowerCase())
          );
      }),
      toArray(),
    );
  }

  public searchByAuthor(author: string): Observable<CiteI[]> {
    if (!this.cites.getValue()) {
      return EMPTY;
    }

    return of(this.cites.getValue()).pipe(
      switchMap(next => from(next)),
      filter(item => {
        return item
          && item.getAuthor().toLowerCase().includes(author.toLowerCase());
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
