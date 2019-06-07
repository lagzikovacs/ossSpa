import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PenznemService} from '../penznem.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';

@Component({
  selector: 'app-penznem-container',
  templateUrl: './penznem-container.component.html'
})
export class PenznemContainerComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  penznemservice: PenznemService;
  eppFrissit = false;

  constructor(penznemservice: PenznemService) {
    this.penznemservice = penznemservice;
  }

  ngOnInit() {
    if (this.penznemservice.GridSettings === undefined || this.penznemservice.ReszletekSettings === undefined) {
      this.eppFrissit = true;
      this.penznemservice.GetGridSettings()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.penznemservice.GridSettings = res.Result;

          return this.penznemservice.GetReszletekSettings();
        })
        .then(res1 => {
          if (res1.Error !== null) {
            throw res1.Error;
          }

          this.penznemservice.ReszletekSettings = res1.Result;

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
