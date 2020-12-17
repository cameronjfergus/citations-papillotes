import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        SearchComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-citations'`, () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-citations');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('angular-citations app is running!');
  });
});
