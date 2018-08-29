import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelysegListComponent } from './helyseg-list.component';

describe('HelysegListComponent', () => {
  let component: HelysegListComponent;
  let fixture: ComponentFixture<HelysegListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelysegListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelysegListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
