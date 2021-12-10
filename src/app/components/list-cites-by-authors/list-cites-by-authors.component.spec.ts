import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCitesByAuthorsComponent } from './list-cites-by-authors.component';

describe('ListCiteByAuthorsComponent', () => {
  let component: ListCitesByAuthorsComponent;
  let fixture: ComponentFixture<ListCitesByAuthorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCitesByAuthorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCitesByAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
