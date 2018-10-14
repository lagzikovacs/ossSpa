import {Component, OnInit, ViewChild} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {BizonylattetelSzerkesztesMode} from '../bizonylattetelszerkesztesmode';
import {BizonylatSzerkesztesMode} from '../bizonylatszerkesztesmode';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';

@Component({
  selector: 'app-bizonylat-tetel-torles',
  templateUrl: './bizonylat-tetel-torles.component.html',
  styleUrls: ['./bizonylat-tetel-torles.component.css']
})
export class BizonylatTetelTorlesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  bizonylatservice: BizonylatService;
  eppFrissit = false;
  megnevezes = '';

  constructor(bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  ngOnInit() {
    this.megnevezes = this.bizonylatservice.ComplexDtoEdited.LstTetelDto[this.bizonylatservice.TetelDtoSelectedIndex].MEGNEVEZES;
  }

  ok() {
    this.eppFrissit = true;
    this.bizonylatservice.ComplexDtoEdited.LstTetelDto.splice(this.bizonylatservice.TetelDtoSelectedIndex, 1);
    this.bizonylatservice.SumEsAfaEsTermekdij(this.bizonylatservice.ComplexDtoEdited)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatservice.ComplexDtoEdited = res.Result[0];

        this.eppFrissit = false;
        this.navigal();
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.List;
    this.bizonylatservice.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;
  }
}
