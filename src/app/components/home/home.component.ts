import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {CiteI} from '../../models/Cite';
import {Cites} from '../../services/Cites';
import {CiteOfTheDay} from '../../tools/CiteOfTheDay.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [],
  providers: [CiteOfTheDay]
})
export class HomeComponent implements OnInit {

  constructor(
    protected citesService: Cites,
    protected title: Title,
    protected citeOfTheDay: CiteOfTheDay
  ) {
    this.title.setTitle('Citations - Citation du jour');
  }
  cite: CiteI;

  ngOnInit(): void {
    this.citesService.cites$.subscribe(next => {


      this.cite = this.citeOfTheDay.getCiteOfTheDay(next);
    });
  }
}
