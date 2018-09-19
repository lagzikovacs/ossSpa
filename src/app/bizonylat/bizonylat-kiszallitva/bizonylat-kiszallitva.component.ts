import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from "../../errormodal/errormodal.component";
import {BizonylatService} from "../bizonylat.service";

@Component({
  selector: 'app-bizonylat-kiszallitva',
  templateUrl: './bizonylat-kiszallitva.component.html',
  styleUrls: ['./bizonylat-kiszallitva.component.css']
})
export class BizonylatKiszallitvaComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  bizonylatservice: BizonylatService;
  eppFrissit = false;

  constructor(bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  modositas() {
    this.eppFrissit = true;
    this.bizonylatservice.Kiszallitva(this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.bizonylatservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex] = res1.Result[0];
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}
