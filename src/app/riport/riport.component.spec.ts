import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiportComponent } from './riport.component';

describe('RiportComponent', () => {
  let component: RiportComponent;
  let fixture: ComponentFixture<RiportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
