import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeliratkozasProjektComponent } from './feliratkozas-projekt.component';

describe('FeliratkozasProjektComponent', () => {
  let component: FeliratkozasProjektComponent;
  let fixture: ComponentFixture<FeliratkozasProjektComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeliratkozasProjektComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeliratkozasProjektComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
