import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteaddComponent } from './favouriteadd.component';

describe('FavouriteaddComponent', () => {
  let component: FavouriteaddComponent;
  let fixture: ComponentFixture<FavouriteaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
