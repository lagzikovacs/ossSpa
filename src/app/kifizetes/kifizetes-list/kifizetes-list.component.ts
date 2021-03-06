import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {KifizetesService} from '../kifizetes.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';
import {KifizetesDto} from '../kifizetesdto';
import {EgyMode} from '../../enums/egymode';
import {rowanimation} from '../../animation/rowAnimation';
import {propCopy} from '../../tools/propCopy';
import {BizonylatDto} from '../../bizonylat/bizonylatdto';

@Component({
  selector: 'app-kifizetes-list',
  templateUrl: './kifizetes-list.component.html',
  animations: [rowanimation]
})
export class KifizetesListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaComponent;

  @Input() Bizonylat = new BizonylatDto();

  Dto = new Array<KifizetesDto>();
  DtoSelectedIndex = -1;

  egymode = EgyMode.Reszletek;

  eppFrissit = false;

  bizonylatkifizetesservice: KifizetesService;

  constructor(private _errorservice: ErrorService,
              bizonylatkifizetesservice: KifizetesService) {
    this.bizonylatkifizetesservice = bizonylatkifizetesservice;
  }

  ngOnInit() {
    this.onKereses();
  }

  onKereses() {
    this.tabla.clearselections();

    this.eppFrissit = true;
    this.bizonylatkifizetesservice.Select(this.Bizonylat.Bizonylatkod)
      .then(res => {
        this.eppFrissit = false;

        this.Dto = res.Result;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onId(i: number) {
    this.DtoSelectedIndex = i;
    this.egymode = EgyMode.Reszletek;
  }

  doNav(i: number) {
    this.egymode = i;
  }

  doUjtetel() {
    this.tabla.ujtetelstart();
  }
  onUjtetelkesz(dto: KifizetesDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }
  onModositaskesz(dto: KifizetesDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto[this.DtoSelectedIndex]);
    }
    this.egymode = EgyMode.Reszletek;
  }
  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.bizonylatkifizetesservice.Delete(this.Dto[this.DtoSelectedIndex])
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.Dto.splice(this.DtoSelectedIndex, 1);
          this.DtoSelectedIndex = -1;

          this.eppFrissit = false;
          this.tabla.clearselections();
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.egymode = EgyMode.Reszletek;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
