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
  authors: string[] = [];
  protected currentPage: number;

  constructor(protected route: ActivatedRoute, public citeService: Cites) { }

  ngOnInit(): void {
    this.citeService.cites$.pipe(
      switchMap(next => from(next)),
      map(next => next.author),
      distinct(),
      tap(next => this.authors.includes(next) ? null : this.authors.push(next))
    ).subscribe();
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  setCurrentPage(event): void {
    this.currentPage = event;
  }
}
