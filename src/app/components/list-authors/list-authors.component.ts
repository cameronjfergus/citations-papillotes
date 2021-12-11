import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Authors} from '../../services/Cites/Authors';
import {AuthorI} from '../../models/Authors';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-list-authors',
  templateUrl: './list-authors.component.html',
  styleUrls: []
})
export class ListAuthorsComponent implements OnInit {
  authors: AuthorI[] = [];
  protected currentPage: number;
  protected itemsPerPage = 10;

  constructor(
    protected route: ActivatedRoute,
    public authorService: Authors,
    protected title: Title
  ) {
    this.title.setTitle('Citations - Liste des auteurs');
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
