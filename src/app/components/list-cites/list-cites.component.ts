import {Component, Input, OnInit} from '@angular/core';
import {cites} from '../../fixtures/data';
import {CiteI} from '../../models/Cite';
import {ActivatedRoute, Router, RouterState} from '@angular/router';
import {Cites} from '../../services/Cites';

@Component({
  selector: 'app-list-cites',
  templateUrl: './list-cites.component.html',
  styleUrls: ['./list-cites.component.scss']
})
export class ListCitesComponent implements OnInit {
  search: string;
  cites: CiteI[] = cites;

  constructor(protected route: ActivatedRoute, public citeService: Cites) { }

  ngOnInit(): void {
    this.citeService.cites$.subscribe(next => console.log('debug', next));


    this.route.queryParamMap.subscribe(params => {
      if (!params.get('search')) {
        this.citeService.reset();
        return;
      }

      this.search = params.get('search');
      this.citeService.search(this.search);
    });
  }
}
