import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IratNincsprojektComponent } from './irat-nincsprojekt.component';

describe('IratNincsprojektComponent', () => {
  let component: IratNincsprojektComponent;
  let fixture: ComponentFixture<IratNincsprojektComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IratNincsprojektComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IratNincsprojektComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
