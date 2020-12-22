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
      this.cite = next[Math.floor(Math.random() * next.length)];
    });
  }
}
