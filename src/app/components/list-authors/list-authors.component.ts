import {Component, OnInit} from '@angular/core';
import {CiteI} from '../../models/Cite';
import {ActivatedRoute} from '@angular/router';
import {Cites} from '../../services/Cites';
import {distinct, map, switchMap, tap, toArray} from 'rxjs/operators';
import {from} from 'rxjs';

@Component({
  selector: 'app-list-authors',
  templateUrl: './list-authors.component.html',
  styleUrls: []
})
export class ListAuthorsComponent implements OnInit {
  authors: { author: string, counter: number }[] = [];
  protected currentPage: number;

  constructor(protected route: ActivatedRoute, public citeService: Cites) { }

  ngOnInit(): void {
    this.citeService.cites$.pipe(
      switchMap(next => from(next)),
      map(next => next.author),
      tap(next => {
        if (!this.authors.find(item => item.author === next)) {
          this.authors.push({author: next, counter: 1});
        } else {
          const index = this.authors.findIndex(item => item.author === next);
          this.authors[index].counter = this.authors[index].counter + 1;
        }
      })
    ).subscribe(next => this.authors.sort((a, b) => {
      const aParts = a.author.split(' ');
      const bParts = b.author.split(' ');
      const aLastname = aParts.length > 1 ? aParts.pop() : aParts.shift();
      const aFirstname = aParts[0];
      const bLastname = bParts.length > 1 ? bParts.pop() : bParts.shift();
      const bFirstname = bParts[0];

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

      return 0;
    }));
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  setCurrentPage(event): void {
    this.currentPage = event;
  }
}
