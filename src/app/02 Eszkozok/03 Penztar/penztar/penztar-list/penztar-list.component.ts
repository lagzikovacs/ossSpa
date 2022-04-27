import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PenztarService} from '../penztar.service';
import {LogonService} from '../../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {JogKod} from '../../../../common/enums/jogkod';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {environment} from '../../../../../environments/environment';
import {PenztarDto} from '../penztardto';
import {propCopy} from '../../../../common/propCopy';
import {EgyszeruKeresesParam} from '../../../../common/dtos/egyszerukeresesparam';
import {TablaExComponent} from '../../../../common/tabla-ex/tabla-ex.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-penztar-list',
  templateUrl: './penztar-list.component.html'
})
export class PenztarListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaExComponent;

  szurok = ['Pénztár'];
  ekDto = new EgyszeruKeresesParam(0, '', environment.lapmeret);
  jog = false;
  uj = false;
  nyitva = false;
  elsokereses = true;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  Dto = new Array<PenztarDto>();
  DtoSelectedIndex = -1;

  penztarservice: PenztarService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              penztarservice: PenztarService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.PENZTARMOD]);

    this.penztarservice = penztarservice;
  }

  ngOnInit() {
    this.onKereses();
  }

  onKereses() {
    this.elsokereses = true;
    this.ekDto.rekordtol = 0;

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  async onKeresesTovabb() {
    this.spinner = true;
    try {
      const res = await this.penztarservice.Read(this.ekDto.minta);
      if (res.Error != null) {
        throw res.Error;
      }

      if (this.elsokereses) {
        this.Dto = res.Result;
        this.elsokereses = false;
      } else {
        const buf = [...this.Dto];
        res.Result.forEach(element => {
          buf.push(element);
        });
        this.Dto = buf;
      }

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

  onUjtetelkesz(dto: PenztarDto) {
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

  onModositaskesz(dto: PenztarDto) {
    propCopy(dto, this.Dto[this.DtoSelectedIndex]);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
