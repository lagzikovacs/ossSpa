import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticioProjektComponent } from './particio-projekt.component';

describe('ParticioProjektComponent', () => {
  let component: ParticioProjektComponent;
  let fixture: ComponentFixture<ParticioProjektComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticioProjektComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticioProjektComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
