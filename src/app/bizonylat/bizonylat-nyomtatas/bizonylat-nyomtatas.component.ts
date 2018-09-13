import {Component, ViewChild} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {BizonylatEgyMode} from '../bizonylategymode';

@Component({
  selector: 'app-bizonylat-nyomtatas',
  templateUrl: './bizonylat-nyomtatas.component.html',
  styleUrls: ['./bizonylat-nyomtatas.component.css']
})
export class BizonylatNyomtatasComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  bizonylatservice: BizonylatService;

  entries = ['Minta', 'Eredeti', 'Másolat'];
  selected = 'Minta';
  eppFrissit = false;

  constructor(bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  change(entry) {
    this.selected = entry;
  }

  onSubmit() {
    // this.eppFrissit = true;
    //
    // this.bizonylatservice.DtoEdited.INVERTERALLAPOT = this.selected;
    // this.bizonylatservice.Update(this.bizonylatservice.DtoEdited)
    //   .then(res => {
    //     if (res.Error !== null) {
    //       throw res.Error;
    //     }
    //
    //     return this.bizonylatservice.Get(res.Result);
    //   })
    //   .then(res1 => {
    //     if (res1.Error !== null) {
    //       throw res1.Error;
    //     }
    //
    //     this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex] = res1.Result[0];
    //     this.navigal();
    //   })
    //   .catch(err => {
    //     this.errormodal.show(err);
    //     this.eppFrissit = false;
    //   });
  }
  stop() {
  }

  navigal() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Blank;
  }
}
