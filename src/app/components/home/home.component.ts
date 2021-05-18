import {Component, OnInit} from '@angular/core';
import {CiteI} from '../../models/Cite';
import {Cites} from '../../services/Cites';

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
      const today = new Date();
      const firstDayOfYear = new Date(today.getFullYear(), 0, 0);
      const dayOfYear = Math.floor((today.getTime() - firstDayOfYear.getTime()) / 1000 / 60 / 60 / 24);

      this.cite = next[dayOfYear];
    });
  }
}
