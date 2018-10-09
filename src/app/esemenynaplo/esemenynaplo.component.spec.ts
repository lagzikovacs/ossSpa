import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsemenynaploComponent } from './esemenynaplo.component';

describe('EsemenynaploComponent', () => {
  let component: EsemenynaploComponent;
  let fixture: ComponentFixture<EsemenynaploComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsemenynaploComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsemenynaploComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
