import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Authors} from '../../services/Cites/Authors';
import {AuthorI} from '../../models/Authors';
import {Title} from '@angular/platform-browser';
import {Device} from '../../tools/Device';

@Component({
  selector: 'app-list-authors',
  templateUrl: './list-authors.component.html',
  styleUrls: [],
  providers: [Device]
})
export class ListAuthorsComponent implements OnInit {
  authors: AuthorI[] = [];
  protected currentPage: number;
  protected itemsPerPage = 13;
  protected sort: 'text'|'total' = 'text';

  constructor(
    protected route: ActivatedRoute,
    public authorService: Authors,
    protected title: Title,
    protected device: Device
  ) {
    this.title.setTitle('Citations - Liste des auteurs');
    if (device.isMobile()) {
      this.itemsPerPage = 8;
    }
  }

  ngOnInit(): void {
    this.sortByAlpha();
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  setCurrentPage(event): void {
    this.currentPage = event;
  }

  getItemsPerPage(): number {
    return this.itemsPerPage;
  }

  sortByAlpha(): void {
    this.sort = 'text';
    this.authorService.authors$.subscribe(next => this.authors = next);
  }

  sortByCount(): void {
    this.sort = 'total';
    this.authorService.authors$.subscribe(next => this.authors = next.sort((a, b) => {
      if (a.getCount() > b.getCount()) {
        return -1;
      }
      if (a.getCount() < b.getCount()) {
        return 1;
      }
      return 0;
    }));
  }

  isSortByText(): boolean {
    return this.sort === 'text';
  }

  isSortByTotal(): boolean {
    return this.sort === 'total';
  }
}
