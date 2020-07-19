import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblylistComponent } from './assemblylist.component';

describe('AssemblylistComponent', () => {
  let component: AssemblylistComponent;
  let fixture: ComponentFixture<AssemblylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssemblylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssemblylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
