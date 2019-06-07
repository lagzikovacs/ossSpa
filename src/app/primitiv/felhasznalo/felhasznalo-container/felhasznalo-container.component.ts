import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FelhasznaloService} from '../felhasznalo.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';

@Component({
  selector: 'app-felhasznalo-container',
  templateUrl: './felhasznalo-container.component.html'
})
export class FelhasznaloContainerComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  felhasznaloservice: FelhasznaloService;
  eppFrissit = false;

  constructor(felhasznaloservice: FelhasznaloService) {
    this.felhasznaloservice = felhasznaloservice;
  }

  ngOnInit() {
    if (this.felhasznaloservice.GridSettings === undefined || this.felhasznaloservice.ReszletekSettings === undefined) {
      this.eppFrissit = true;
      this.felhasznaloservice.GetGridSettings()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.felhasznaloservice.GridSettings = res.Result;

          return this.felhasznaloservice.GetReszletekSettings();
        })
        .then(res1 => {
          if (res1.Error !== null) {
            throw res1.Error;
          }

          this.felhasznaloservice.ReszletekSettings = res1.Result;

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
