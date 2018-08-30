import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IratTorlesComponent } from './irat-torles.component';

describe('IratTorlesComponent', () => {
  let component: IratTorlesComponent;
  let fixture: ComponentFixture<IratTorlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IratTorlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IratTorlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
