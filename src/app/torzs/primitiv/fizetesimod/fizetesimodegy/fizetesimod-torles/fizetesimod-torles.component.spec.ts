import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizetesimodTorlesComponent } from './fizetesimod-torles.component';

describe('FizetesimodTorlesComponent', () => {
  let component: FizetesimodTorlesComponent;
  let fixture: ComponentFixture<FizetesimodTorlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizetesimodTorlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizetesimodTorlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
