import {Component, OnInit} from '@angular/core';
import {CiteI} from '../../models/Cite';
import {Cites} from '../../services/Cites';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {
  cite: CiteI;

  constructor(protected citesService: Cites, protected title: Title) {
    this.title.setTitle('Citations - Citation du jour')
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
