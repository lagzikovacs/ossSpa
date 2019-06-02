import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TeendoService} from '../teendo.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';

@Component({
  selector: 'app-teendo-container',
  templateUrl: './teendo-container.component.html',
  styleUrls: ['./teendo-container.component.css']
})
export class TeendoContainerComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  teendoservice: TeendoService;
  eppFrissit = false;

  ti = -1;

  constructor(teendoservice: TeendoService) {
    this.teendoservice = teendoservice;
  }

  ngOnInit() {
    if (this.teendoservice.GridSettings === undefined || this.teendoservice.ReszletekSettings === undefined) {
      this.eppFrissit = true;
      this.teendoservice.GetGridSettings()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.teendoservice.GridSettings = res.Result;

          return this.teendoservice.GetReszletekSettings();
        })
        .then(res1 => {
          if (res1.Error !== null) {
            throw res1.Error;
          }

          this.teendoservice.ReszletekSettings = res1.Result;

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
