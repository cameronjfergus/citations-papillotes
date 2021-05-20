import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BaseUnsubscribeComponent} from '../common/BaseUnsubscribeComponent';
import {Authors} from '../../services/Cites/Authors';
import {AuthorI} from '../../models/Authors';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-list-authors',
  templateUrl: './list-authors.component.html',
  styleUrls: []
})
export class ListAuthorsComponent implements OnInit {
  authors: AuthorI[] = [];
  protected currentPage: number;
  protected itemsPerPage = 10;

  constructor(protected route: ActivatedRoute, public authorService: Authors) {
  }

  ngOnInit(): void {
    this.authorService.authors$.subscribe({
      next: next => {
        this.authors = next;
      },
      complete: () => {
        console.info('ListAuthorsComponent completed');
      }
    });
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
}
