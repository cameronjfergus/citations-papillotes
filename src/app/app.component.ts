import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {fromEvent, Subject} from 'rxjs';
import {debounceTime, map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('elSearchCite', {static: true}) elSearchCite: ElementRef;
  title = 'Citations';
  search: string;

  // Memory leak prevention
  protected ngUnsubscribe: Subject<void> = new Subject();

  ngAfterViewInit(): void {
    fromEvent(
      this.elSearchCite.nativeElement, 'keyup'
    ).pipe(
      takeUntil(this.ngUnsubscribe),
      // tap(() => this.isLoading.next(true)),
      map((event: Event) => {
        return (event.currentTarget as HTMLInputElement).value;
      }),
      debounceTime(500),
      // tap(() => this.isLoading.next(false)),
    ).subscribe(next => {
      this.search = next;
    });
  }
}
