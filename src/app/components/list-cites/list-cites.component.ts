import {Component, OnInit} from '@angular/core';
import {CiteI} from '../../models/Cite';
import {ActivatedRoute} from '@angular/router';
import {Cites} from '../../services/Cites';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-list-cites',
  templateUrl: './list-cites.component.html',
  styleUrls: ['./list-cites.component.scss']
})
export class ListCitesComponent implements OnInit {
  search: string;
  cites: CiteI[] = [];

  constructor(protected route: ActivatedRoute, public citeService: Cites) { }

  ngOnInit(): void {
    this.citeService.cites$.subscribe((next: CiteI[]) => this.fillCites(next));

    this.route.queryParamMap.subscribe(params => {
      if (!params.get('search')) {
        this.citeService.reset().subscribe();

        return;
      }

      this.search = params.get('search');
      this.citeService.search(this.search).pipe(
        tap(next => this.fillCites(next)),
        tap(next => console.log(next))
      ).subscribe();
    });
  }

  protected fillCites(citesList): void {
    this.cites = [];
    citesList.forEach(cite => this.cites.push(cite));
  }
}
