import {Component, OnInit} from '@angular/core';
import {CiteI} from '../../models/Cite';
import {ActivatedRoute} from '@angular/router';
import {Cites} from '../../services/Cites';
import {tap} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';
import {Device} from '../../tools/Device';

@Component({
  selector: 'app-list-cites',
  templateUrl: './list-cites.component.html',
  styleUrls: [],
  providers: [Device]
})
export class ListCitesComponent implements OnInit {
  q: string;
  cites: CiteI[] = [];
  protected currentPage: number;
  protected itemsPerPage = 12;

  constructor(
    protected route: ActivatedRoute,
    public citeService: Cites,
    protected title: Title,
    protected device: Device
  ) {
    this.title.setTitle('Citations - Liste des citations');
    if (device.isMobile()) {
      this.itemsPerPage = 4;
    }
  }

  ngOnInit(): void {
    this.citeService.cites$.subscribe((next: CiteI[]) => {
        this.fillCites(next);
      });

    this.route.queryParamMap.subscribe(params => {
      if (!params.get('q')) {
        this.citeService.reset().subscribe();

        return;
      }

      this.q = params.get('q');
      this.citeService.search(this.q).pipe(
        tap(next => this.fillCites(next))
      ).subscribe();
    });
  }

  protected fillCites(citesList: CiteI[]): void {
    this.cites = [];
    citesList.forEach(cite => this.cites.push(cite));
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  setCurrentPage(event): void {
    this.currentPage = event;
  }

  getItemsPerPage(): number {
    return this.itemsPerPage;
  }
}
