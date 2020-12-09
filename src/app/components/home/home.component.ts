import {Component, OnInit} from '@angular/core';
import {CiteI} from '../../models/Cite';
import {combineAll, count, map} from 'rxjs/operators';
import {Cites} from '../../services/Cites';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {
  cite: CiteI;

  constructor(protected citesService: Cites) {
  }

  ngOnInit(): void {
    this.citesService.cites$.subscribe(next => {
      this.cite = next[Math.floor(Math.random() * next.length)];
    });
  }
}
