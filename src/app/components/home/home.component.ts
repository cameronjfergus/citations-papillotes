import {Component, OnInit} from '@angular/core';
import {cites} from '../../fixtures/data';
import {CiteI} from '../../models/Cite';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cite: CiteI;

  ngOnInit(): void {
    this.cite = cites[Math.floor(Math.random() * cites.length)];
  }
}
