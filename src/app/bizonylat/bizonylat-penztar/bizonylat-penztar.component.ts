import {Component, OnDestroy, ViewChild} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {BizonylatEgyMode} from '../bizonylategymode';
import {PenztartetelService} from '../../penztartetel/penztartetel.service';
import {PenztartetelDto} from '../../penztartetel/penztarteteldto';
import {BizonylatTipus} from '../bizonylattipus';

@Component({
  selector: 'app-bizonylat-penztar',
  templateUrl: './bizonylat-penztar.component.html'
})
export class BizonylatPenztarComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  bizonylatservice: BizonylatService;
  eppFrissit = false;
  penztarindex = -1;
  penztarkivalasztva = false;
  megjegyzes = '';

  constructor(private _penztartetelservice: PenztartetelService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  penztarvalasztas(i: number) {
    this.penztarindex = i;
    this.penztarkivalasztva = true;
  }

  onSubmit() {
    let Dto: PenztartetelDto;

    this.eppFrissit = true;
    this._penztartetelservice.CreateNew()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        Dto = res.Result[0];

        Dto.Penztarkod = this.bizonylatservice.BizonylatPenztarDto[this.penztarindex].Penztarkod;
        Dto.Datum = this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Bizonylatkelte;
        Dto.Jogcim = this.bizonylatservice.bizonylatTipus === BizonylatTipus.BejovoSzamla ? 'Bejövő számla' : 'Számla';
        Dto.Ugyfelnev = this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Ugyfelnev;
        Dto.Bizonylatszam = this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Bizonylatszam;
        if (this.bizonylatservice.bizonylatTipus === BizonylatTipus.BejovoSzamla) {
          Dto.Kiadas = this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Brutto;
        } else {
          Dto.Bevetel = this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Brutto;
        }
        Dto.Megjegyzes = this.megjegyzes;

        return this._penztartetelservice.Add(Dto);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.bizonylatservice.EgyMode = BizonylatEgyMode.Blank;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  cancel() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Blank;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
