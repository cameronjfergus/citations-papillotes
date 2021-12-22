import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkCitesByAuthorComponent } from './link-cites-by-author.component';

describe('LinkCitesByAuthorComponent', () => {
  let component: LinkCitesByAuthorComponent;
  let fixture: ComponentFixture<LinkCitesByAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkCitesByAuthorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkCitesByAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
