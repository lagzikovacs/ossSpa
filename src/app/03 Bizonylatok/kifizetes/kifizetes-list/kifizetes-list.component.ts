import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import {KifizetesService} from '../kifizetes.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {KifizetesDto} from '../kifizetesdto';
import {propCopy} from '../../../common/propCopy';
import {BizonylatDto} from '../../../bizonylat/bizonylatdto';
import {TablaExComponent} from '../../../common/tabla-ex/tabla-ex.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-kifizetes-list',
  templateUrl: './kifizetes-list.component.html'
})
export class KifizetesListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaExComponent;

  @Input() Bizonylat = new BizonylatDto();

  Dto = new Array<KifizetesDto>();
  DtoSelectedIndex = -1;

  uj = false;

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  bizonylatkifizetesservice: KifizetesService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              bizonylatkifizetesservice: KifizetesService) {
    this.bizonylatkifizetesservice = bizonylatkifizetesservice;
  }

  ngOnInit() {
    this.onKereses();
  }

  async onKereses() {
    this.tabla.clearselections();

    this.spinner = true;
    try {
      const res = await this.bizonylatkifizetesservice.Select(this.Bizonylat.Bizonylatkod);
      if (res.Error != null) {
        throw res.Error;
      }

      this.Dto = res.Result;
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  onId(i: number) {
    this.DtoSelectedIndex = i;

    this.uj = false;
    this.tabla.egytetelstart();
  }

  doUjtetel() {
    this.uj = true;
    this.tabla.ujtetelstart();
  }

  onUjtetelkesz(dto: KifizetesDto) {
    if (dto !== undefined) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }

  onTorles() {
    this.Dto.splice(this.DtoSelectedIndex, 1);
    this.DtoSelectedIndex = -1;
    this.tabla.clearselections();
  }

  onModositaskesz(dto: KifizetesDto) {
    propCopy(dto, this.Dto[this.DtoSelectedIndex]);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
