import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IratService} from '../irat.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';

@Component({
  selector: 'app-irat-container',
  templateUrl: './irat-container.component.html'
})
export class IratContainerComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  iratservice: IratService;
  eppFrissit = false;

  constructor(iratservice: IratService) {
    this.iratservice = iratservice;
  }

  ngOnInit() {
    if (this.iratservice.GridSettings === undefined || this.iratservice.ReszletekSettings === undefined) {
      this.eppFrissit = true;
      this.iratservice.GetGridSettings()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.iratservice.GridSettings = res.Result;

          return this.iratservice.GetReszletekSettings();
        })
        .then(res1 => {
          if (res1.Error !== null) {
            throw res1.Error;
          }

          this.iratservice.ReszletekSettings = res1.Result;

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
