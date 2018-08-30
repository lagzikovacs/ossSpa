import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IratDokumentumegyComponent } from './irat-dokumentumegy.component';

describe('IratDokumentumegyComponent', () => {
  let component: IratDokumentumegyComponent;
  let fixture: ComponentFixture<IratDokumentumegyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IratDokumentumegyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IratDokumentumegyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
