import {Component, OnInit} from '@angular/core';
import {CiteI} from '../../models/Cite';
import {Cites} from '../../services/Cites';
import {Click} from '../../services/Click';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: [],
})
export class RandomComponent implements OnInit {
  cites: CiteI[];
  cite: CiteI;

  constructor(protected citesService: Cites, protected click: Click, protected title: Title) {
    this.title.setTitle('Citations - Citation aléatoire')
  }

  ngOnInit(): void {
    this.citesService.cites$.subscribe(next => {
      this.cites = next;
    });

    this.click.refresh$.subscribe(next => {
      this.cite = this.cites[Math.floor(Math.random() * this.cites.length)];
    });

    // for a page refresh, no click are thrown from the navbar, so i have to simulate it here : is there a best pattern
    this.click.click()
  }
}
