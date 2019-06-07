import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CsoportService} from '../csoport.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';

@Component({
  selector: 'app-csoport-container',
  templateUrl: './csoport-container.component.html'
})
export class CsoportContainerComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  csoportservice: CsoportService;
  eppFrissit = false;

  constructor(csoportservice: CsoportService) {
    this.csoportservice = csoportservice;
  }

  ngOnInit() {
    if (this.csoportservice.GridSettings === undefined || this.csoportservice.ReszletekSettings === undefined) {
      this.eppFrissit = true;
      this.csoportservice.GetGridSettings()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.csoportservice.GridSettings = res.Result;

          return this.csoportservice.GetReszletekSettings();
        })
        .then(res1 => {
          if (res1.Error !== null) {
            throw res1.Error;
          }

          this.csoportservice.ReszletekSettings = res1.Result;

          this.eppFrissit = false;
        })
        .catch(err => {
          this.errormodal.show(err);
          this.eppFrissit = false;
        });
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
