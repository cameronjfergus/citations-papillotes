import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {fromEvent, Subject} from 'rxjs';
import {debounceTime, map, takeUntil, tap} from 'rxjs/operators';
import {CiteI} from './models/Cite';
import {cites} from './fixtures/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('elSearchCite', {static: true}) elSearchCite: ElementRef;
  title = 'Citations';
  search: string;
  cites: CiteI[] = cites;
  isLoading = false;

  // Memory leak prevention: better implementation than an array of Subscription on which we wll loop over (3 steps documented here)
  // #1 the properties that will clear Observable
  protected ngUnsubscribe: Subject<void> = new Subject();

  // #2 the event on whhich we will complete the main Observable property
  ngOnDestroy(): any {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngAfterViewInit(): void {
    fromEvent(
      this.elSearchCite.nativeElement, 'keyup'
    ).pipe(
      // #3 the function that will stop the Observable because of the complete event from Observable property
      takeUntil(this.ngUnsubscribe),
      tap(() => this.isLoading = true),
      map((event: Event) => {
        return (event.currentTarget as HTMLInputElement).value;
      }),
      debounceTime(500),
      tap(() => this.isLoading = false),
    ).subscribe(
      next => {
        this.search = next;
      });
  }

  getCount(): number {
    return this.cites.length;
  }
}
