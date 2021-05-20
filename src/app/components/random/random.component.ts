import {Component, OnInit} from '@angular/core';
import {CiteI} from '../../models/Cite';
import {Cites} from '../../services/Cites';
import {Click} from '../../services/Click';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: [],
})
export class RandomComponent implements OnInit {
  cites: CiteI[];
  cite: CiteI;

  constructor(protected citesService: Cites, protected click: Click) {
  }

  ngOnInit(): void {
    this.citesService.cites$.subscribe(next => {
      this.cites = next;
    });

    this.click.refresh$.subscribe(next => {
      this.cite = this.cites[Math.floor(Math.random() * this.cites.length)];
    });
  }
}
