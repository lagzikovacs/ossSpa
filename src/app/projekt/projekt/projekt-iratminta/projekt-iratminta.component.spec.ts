import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektIratmintaComponent } from './projekt-iratminta.component';

describe('ProjektIratmintaComponent', () => {
  let component: ProjektIratmintaComponent;
  let fixture: ComponentFixture<ProjektIratmintaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektIratmintaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektIratmintaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
