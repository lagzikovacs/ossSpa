import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FizetesimodService} from '../fizetesimod.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';

@Component({
  selector: 'app-fizetesimod-container',
  templateUrl: './fizetesimod-container.component.html',
  styleUrls: ['./fizetesimod-container.component.css']
})
export class FizetesimodContainerComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  fizetesimodservice: FizetesimodService;
  eppFrissit = false;

  constructor(fizetesimodservice: FizetesimodService) {
    this.fizetesimodservice = fizetesimodservice;
  }

  ngOnInit() {
    if (this.fizetesimodservice.GridSettings === undefined || this.fizetesimodservice.ReszletekSettings === undefined) {
      this.eppFrissit = true;
      this.fizetesimodservice.GetGridSettings()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.fizetesimodservice.GridSettings = res.Result;

          return this.fizetesimodservice.GetReszletekSettings();
        })
        .then(res1 => {
          if (res1.Error !== null) {
            throw res1.Error;
          }

          this.fizetesimodservice.ReszletekSettings = res1.Result;

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
