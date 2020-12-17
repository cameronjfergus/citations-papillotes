import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Subject} from 'rxjs';
import {debounceTime, map, takeUntil, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('elSearchCite', {static: true}) elSearchCite: ElementRef;
  title = 'Citations';
  isLoading = false;

  // Memory leak prevention: better implementation than an array of Subscription on which we wll loop over (3 steps documented here)
  // #1 the properties that will clear Observable
  protected ngUnsubscribe: Subject<void> = new Subject();

  constructor(protected activatedRouter: ActivatedRoute, protected router: Router) {
  }

  ngOnInit(): any {
    // reset q input when route change
    this.activatedRouter.queryParamMap.subscribe(params => {
      if (!params.get('q')) {
        this.elSearchCite.nativeElement.value = '';

        return;
      }
    });
  }

  // #2 the event on which we will complete the main Observable property
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
      map((event: Event) => (event.currentTarget as HTMLInputElement).value),
      debounceTime(500),
      tap(() => this.isLoading = false),
    ).subscribe(
      next => {
        this.router.navigate(['/search'], { queryParams: {q: next}});
      });
  }
}
