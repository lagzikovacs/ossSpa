import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BizonylatkapcsolatService} from '../bizonylatkapcsolat.service';
import {IratService} from '../../irat/irat.service';
import {VagolapService} from '../../vagolap/vagolap.service';
import {VagolapMode} from '../../vagolap/vagolapmode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {IratDto} from '../../irat/iratdto';
import {BizonylatkapcsolatTablaComponent} from '../bizonylatkapcsolat-tabla/bizonylatkapcsolat-tabla.component';
import {BizonylatKapcsolatParam} from '../bizonylatkapcsolatparam';
import {BizonylatKapcsolatDto} from '../bizonylatkapcsolatdto';

@Component({
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

  egyirat_egymode = 15; // dokumentum

  bizonylatkapcsolatservice: BizonylatkapcsolatService;

  constructor(private _iratservice: IratService,
              private _vagolapservice: VagolapService,
              private _errorservice: ErrorService,
              bizonylatkapcsolatservice: BizonylatkapcsolatService) {
    this.bizonylatkapcsolatservice = bizonylatkapcsolatservice;
  }

  ngOnInit() {
    this.onKereses();
  }

  onKereses() {
    this.eppFrissit = true;
    this.tabla.clearselections();
    this.bizonylatkapcsolatservice.Select(this.Bizonylatkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.Dto = res.Result;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onId(i: number) {
    const OldIndex = this.DtoSelectedIndex;

    this.tabla.nemOk();
    this.DtoSelectedIndex = i;

    if (this.DtoSelectedIndex === -1) {
      return;
    }

    this.eppFrissit = true;
    this._iratservice.Get(this.Dto[this.DtoSelectedIndex].Iratkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.OriginalIrat = res.Result[0];
        this.eppFrissit = false;

        if (i !== OldIndex) {
          this.egyirat_egymode = 15;
        } else {
          this.egyirat_egymode = 0;
        }

        this.tabla.iratOk = true;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  // az app-irat-szerkesztes komponenssel dolgoznak
  onUjirat() {
    this.tabla.clearselections();
    this.tabla.ujiratOk = true;
  }
  onUjiratutan(dto: IratDto) {
    if (dto !== null) {
      this.eppFrissit = true;
      this.bizonylatkapcsolatservice.AddIratToBizonylat(new BizonylatKapcsolatParam(
        this.Bizonylatkod, dto.Iratkod))
        .then(res1 => {
          if (res1.Error != null) {
            throw res1.Error;
          }

          return this.bizonylatkapcsolatservice.Get(res1.Result);
        })
        .then(res2 => {
          if (res2.Error != null) {
            throw res2.Error;
          }

          this.Dto.unshift(res2.Result[0]);
          this.eppFrissit = false;
          this.tabla.nemOk();
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.tabla.nemOk();
    }
  }
  onIratSzerkesztesutan(dto: IratDto) {
    if (dto !== null) {
      this.Dto[this.DtoSelectedIndex].Keletkezett = dto.Keletkezett;
      this.Dto[this.DtoSelectedIndex].Targy = dto.Targy;
    }
  }

  onLevalasztas(i: number) {
    this.tabla.nemOk();
    this.DtoSelectedIndex = i;
    this.tabla.levalasztasOk = true;
  }
  onLevalasztasutan(ok: boolean) {
    if (ok) {
      this.tabla.clearselections();

      this.Dto.splice(this.DtoSelectedIndex, 1);
      this.DtoSelectedIndex = -1;
    } else {
      this.tabla.nemOk();
    }
  }

  onVagolaprol() {
    this._vagolapservice.Mode = VagolapMode.Projekt;
    this.tabla.clearselections();
    this.tabla.vagolaprolOk = true;
  }
  onVagolaprolutan(dto: BizonylatKapcsolatDto) {
    this.Dto.unshift(dto);
  }
  onVagolaprolutanvege() {
    this.tabla.nemOk();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
