import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FelhasznaloContainerComponent } from './felhasznalo-container.component';

describe('FelhasznaloContainerComponent', () => {
  let component: FelhasznaloContainerComponent;
  let fixture: ComponentFixture<FelhasznaloContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FelhasznaloContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FelhasznaloContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
