import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {LogonService} from '../../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {IratService} from '../../../02 Irat/irat/irat.service';
import {BizonylatService} from '../../../../03 Bizonylatok/bizonylat/bizonylat.service';
import {VagolapService} from '../../../../05 Segedeszkozok/08 Vagolap/vagolap.service';
import {VagolapMode} from '../../../../05 Segedeszkozok/08 Vagolap/vagolapmode';
import {JogKod} from '../../../../common/enums/jogkod';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {ProjektkapcsolatTablaComponent} from '../projektkapcsolat-tabla/projektkapcsolat-tabla.component';
import {IratDto} from '../../../02 Irat/irat/iratdto';
import {BizonylatDto} from '../../../../03 Bizonylatok/bizonylat/bizonylatdto';
import {ProjektKapcsolatDto} from '../projektkapcsolatdto';
import {ProjektKapcsolatParam} from '../projektkapcsolatparam';
import {BizonylatTipusLeiro} from '../../../../03 Bizonylatok/bizonylat/bizonylattipusleiro';
import {BizonylatTipus} from '../../../../03 Bizonylatok/bizonylat/bizonylattipus';
import {ProjektDto} from '../../projekt/projektdto';
import {ProjektkapcsolatEgyMode} from '../projektkapcsolategymode';
import {propCopy} from "../../../../common/propCopy";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projektkapcsolat-list',
  templateUrl: './projektkapcsolat-list.component.html'
})
export class ProjektkapcsolatListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: ProjektkapcsolatTablaComponent;

  @Input() Projektkod = -1;
  @Input() Ugyfelkod = -1;


  Dto = new Array<ProjektKapcsolatDto>();
  DtoSelectedIndex = -1;

  OriginalIrat = new IratDto();
  OriginalBizonylat = new BizonylatDto();
  bizonylatLeiro = new BizonylatTipusLeiro();
  bizonylatTipus = BizonylatTipus.Szamla;

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  bizonylatjog = false;
  iratjog = false;
  ajanlatjog = false;

  egymode = 0;

  projektkapcsolatservice: ProjektkapcsolatService;

  constructor(private _logonservice: LogonService,
              private _iratservice: IratService,
              private _bizonylatservice: BizonylatService,
              private _vagolapservice: VagolapService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              projektkapcsolatservice: ProjektkapcsolatService) {
    this.bizonylatjog = this._logonservice.Jogaim.includes(JogKod[JogKod.BIZONYLATMOD]);
    this.iratjog = this._logonservice.Jogaim.includes(JogKod[JogKod.IRATMOD]);
    this.ajanlatjog = this._logonservice.Jogaim.includes(JogKod[JogKod.AJANLATKESZITES]);

    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  ngOnInit() {
    this.onKereses();
  }

  async onKereses() {
    this.tabla.clearselections();

    this.spinner = true;
    try {
      const res = await this.projektkapcsolatservice.Select(this.Projektkod);
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

  doUjbizonylat() {
    this.tabla.clearselections();
    this.egymode = ProjektkapcsolatEgyMode.UjBizonylat;
    this.tabla.ujtetelstart();
  }

  doUjirat() {
    this.tabla.clearselections();
    this.egymode = ProjektkapcsolatEgyMode.UjIrat;
    this.tabla.ujtetelstart();
  }

  doUjajanlat() {
    this.tabla.clearselections();
    this.egymode = ProjektkapcsolatEgyMode.Ajanlat;
    this.tabla.ujtetelstart();
  }

  doVagolaprol() {
    this._vagolapservice.Mode = VagolapMode.Projekt;
    this.tabla.clearselections();
    this.egymode = ProjektkapcsolatEgyMode.Vagolaprol;
    this.tabla.ujtetelstart();
  }

  onId(i: number) {
    this.DtoSelectedIndex = i;
    if (this.DtoSelectedIndex === -1) {
      return;
    }

    if (this.Dto[this.DtoSelectedIndex].Bizonylatkod !== null) {
      this.egymode = ProjektkapcsolatEgyMode.Egybizonylat;
    }
    if (this.Dto[this.DtoSelectedIndex].Iratkod !== null) {
      this.egymode = ProjektkapcsolatEgyMode.Egyirat;
    }
    this.tabla.egytetelstart();
  }

  onUjutan(dto: ProjektKapcsolatDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }

  onModositasutan(dto: ProjektKapcsolatDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto[this.DtoSelectedIndex]);
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }





  // TODO app-bizonylat-egy eseménye, vszeg később nem kell
  torlesutan() {
    this.tabla.clearselections();
  }


  onLevalasztas(i: number) {
    // this.tabla.nemOk();
    this.DtoSelectedIndex = i;
  }
  onLevalasztasutan(ok: boolean) {
    if (ok) {
      this.tabla.clearselections();

      this.Dto.splice(this.DtoSelectedIndex, 1);
      this.DtoSelectedIndex = -1;
    } else {
      // this.tabla.nemOk();
    }
  }
}
