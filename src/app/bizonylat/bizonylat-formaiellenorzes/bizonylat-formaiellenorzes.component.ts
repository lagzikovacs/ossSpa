import {Component, OnInit, ViewChild} from '@angular/core';
import {BizonylatService} from "../bizonylat.service";
import {ErrormodalComponent} from "../../errormodal/errormodal.component";

@Component({
  selector: 'app-bizonylat-formaiellenorzes',
  templateUrl: './bizonylat-formaiellenorzes.component.html',
  styleUrls: ['./bizonylat-formaiellenorzes.component.css']
})
export class BizonylatFormaiellenorzesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  bizonylatservice: BizonylatService;
  eppFrissit = false;
  result = '';

  constructor(bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice
  }

  ngOnInit() {
    this.eppFrissit = true;
    this.bizonylatservice.SzamlaTartalmiEllenorzese(this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].BIZONYLATKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.result = res.Result;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
}
