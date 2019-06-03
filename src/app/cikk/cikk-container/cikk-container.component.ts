import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CikkService} from '../cikk.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';

@Component({
  selector: 'app-cikk-container',
  templateUrl: './cikk-container.component.html',
  styleUrls: ['./cikk-container.component.css']
})
export class CikkContainerComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  cikkservice: CikkService;
  eppFrissit = false;

  constructor(cikkservice: CikkService) {
    this.cikkservice = cikkservice;
  }

  ngOnInit() {
    if (this.cikkservice.GridSettings === undefined || this.cikkservice.ReszletekSettings === undefined) {
      this.eppFrissit = true;
      this.cikkservice.GetGridSettings()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.cikkservice.GridSettings = res.Result;

          return this.cikkservice.GetReszletekSettings();
        })
        .then(res1 => {
          if (res1.Error !== null) {
            throw res1.Error;
          }

          this.cikkservice.ReszletekSettings = res1.Result;

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
