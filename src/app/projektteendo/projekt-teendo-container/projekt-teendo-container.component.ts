import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProjektteendoService} from '../projektteendo.service';
import {rowanimation} from '../../animation/rowAnimation';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';

@Component({
  selector: 'app-projekt-teendo-container',
  templateUrl: './projekt-teendo-container.component.html',
  animations: [rowanimation]
})
export class ProjektTeendoContainerComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektteendoservice: ProjektteendoService;
  eppFrissit = false;

  constructor(projektteendoservice: ProjektteendoService) {
    this.projektteendoservice = projektteendoservice;
  }

  ngOnInit() {
    if (this.projektteendoservice.GridSettings === undefined || this.projektteendoservice.ReszletekSettings === undefined) {
      this.eppFrissit = true;
      this.projektteendoservice.GetGridSettings()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.projektteendoservice.GridSettings = res.Result;

          return this.projektteendoservice.GetReszletekSettings();
        })
        .then(res1 => {
          if (res1.Error !== null) {
            throw res1.Error;
          }

          this.projektteendoservice.ReszletekSettings = res1.Result;

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
