import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import {BizonylatkapcsolatService} from '../bizonylatkapcsolat.service';
import {IratService} from '../../../02 Eszkozok/02 Irat/irat/irat.service';
import {VagolapService} from '../../../05 Segedeszkozok/08 Vagolap/vagolap.service';
import {VagolapMode} from '../../../05 Segedeszkozok/08 Vagolap/vagolapmode';
import {ErrorService} from '../../../common/errorbox/error.service';
import {IratDto} from '../../../02 Eszkozok/02 Irat/irat/iratdto';
import {BizonylatkapcsolatTablaComponent} from '../bizonylatkapcsolat-tabla/bizonylatkapcsolat-tabla.component';
import {BizonylatKapcsolatDto} from '../bizonylatkapcsolatdto';
import {BizonylatkapcsolatEgyMode} from '../bizonylatkapcsolategymode';
import {propCopy} from '../../../common/propCopy';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylatkapcsolat-list',
  templateUrl: './bizonylatkapcsolat-list.component.html'
})
export class BizonylatkapcsolatListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: BizonylatkapcsolatTablaComponent;

  @Input() Bizonylatkod = -1;
  @Input() Ugyfelkod = -1;

  OriginalIrat = new IratDto();

  Dto = new Array<BizonylatKapcsolatDto>();
  DtoSelectedIndex = -1;

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  egymode = 0;

  bizonylatkapcsolatservice: BizonylatkapcsolatService;

  constructor(private _iratservice: IratService,
              private _vagolapservice: VagolapService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              bizonylatkapcsolatservice: BizonylatkapcsolatService) {
    this.bizonylatkapcsolatservice = bizonylatkapcsolatservice;
  }

  ngOnInit() {
    this.onKereses();
  }

  async onKereses() {
    this.tabla.clearselections();

    this.spinner = true;
    try {
      const res = await this.bizonylatkapcsolatservice.Select(this.Bizonylatkod);
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

  doUj() {
    this.tabla.clearselections();
    this.egymode = BizonylatkapcsolatEgyMode.UjIrat;
    this.tabla.ujtetelstart();
  }

  doVagolaprol() {
    this._vagolapservice.Mode = VagolapMode.Bizonylatirat;
    this.tabla.clearselections();
    this.egymode = BizonylatkapcsolatEgyMode.Vagolaprol;
    this.tabla.ujtetelstart();
  }

  onId(i: number) {
    this.DtoSelectedIndex = i;
    if (this.DtoSelectedIndex === -1) {
      return;
    }

    this.egymode = BizonylatkapcsolatEgyMode.Egyirat;
    this.tabla.egytetelstart();
  }

  onUjutan(dto: BizonylatKapcsolatDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }

  onModositasutan(dto: BizonylatKapcsolatDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto[this.DtoSelectedIndex]);
    }
  }

  onLevalasztasutan() {
    this.Dto.splice(this.DtoSelectedIndex, 1);
    this.DtoSelectedIndex = -1;

    this.tabla.clearselections();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
