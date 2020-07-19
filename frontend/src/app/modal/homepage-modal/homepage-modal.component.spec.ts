import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageModalComponent } from './homepage-modal.component';

describe('HomepageModalComponent', () => {
  let component: HomepageModalComponent;
  let fixture: ComponentFixture<HomepageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
