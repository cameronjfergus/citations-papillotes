import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {CiteI} from '../../models/Cite';
import {distinct, filter, map, skipUntil, switchMap, take, tap, toArray} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Cites} from '../Cites';
import {Author, AuthorI} from '../../models/Authors';

@Injectable()
export class Authors{
  protected authors: BehaviorSubject<AuthorI[]> = new BehaviorSubject<AuthorI[]>(null);
  public authors$: Observable<AuthorI[]> = this.authors.asObservable()
    .pipe(
      filter(value => !!value),
      // this is for a kind of immutability: if something push/pop/shift/... the CiteI[] it won't alter every subcriber that has saved the data
      //map(next => rfdc({proto: true})(next)), // @todo find why it destroy the original object : Author become a simple object & the proto is not copied
      map(next => {
        return next.map(author => {
          return new Author(author.getName(), author.getCount());
        });
      }),
      distinct(),
      take(1) // auto unsubscribe, force complete
    );
  // local cache for the counter
  protected count = 0;

  public constructor(protected citeService: Cites) {
    const authors: AuthorI[] = [];
    const cites: CiteI[] = [];

    citeService.cites$.pipe(
      tap(next => next.forEach(item => cites.push(item))),
      switchMap(next => from(next)),
      map(next => next.author),
      map(next => {
        let author: AuthorI;
        if (authors.find(item => item.getName() === next)) {
          const index = authors.findIndex(item => item.getName() === next);
          authors[index].addCount();
          author = authors[index];
        } else {
          author = new Author(next);
          authors.push(author);
        }

        return author;
      }),
      distinct(),
      skipUntil(citeService.cites$), // prevent going further until cites is not fully loaded
      toArray(), // transform all previous stream into one array
      map(next => {
        return next.sort((a, b) => {
          const aParts = a.getName().split(' ');
          const bParts = b.getName().split(' ');
          const aLastname = aParts.length > 1 ? aParts.pop() : aParts.shift();
          const aFirstname = aParts[0];
          const bLastname = bParts.length > 1 ? bParts.pop() : bParts.shift();
          const bFirstname = bParts[0];

          if (aFirstname && aFirstname.toLowerCase() === 'proverbe') {
            return 1;
          }

          if (aLastname < bLastname) {
            return -1;
          } else if (aLastname > bLastname) {
            return 1;
          } else {
            if (aFirstname < bFirstname) {
              return -1;
            } else if (aFirstname > bFirstname) {
              return 1;
            }

            return 0;
          }
        });
      }),
      take(1) // auto unsubscribe, force complete
    ).subscribe((next) => {
        this.authors.next(next);
      });
  }
}
