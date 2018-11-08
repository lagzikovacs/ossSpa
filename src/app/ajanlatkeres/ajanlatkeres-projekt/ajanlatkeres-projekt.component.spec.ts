import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjanlatkeresProjektComponent } from './ajanlatkeres-projekt.component';

describe('AjanlatkeresProjektComponent', () => {
  let component: AjanlatkeresProjektComponent;
  let fixture: ComponentFixture<AjanlatkeresProjektComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjanlatkeresProjektComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjanlatkeresProjektComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
