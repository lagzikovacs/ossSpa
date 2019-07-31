import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {IrattipusService} from '../irattipus.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {TablaComponent} from '../../../tools/tabla/tabla.component';
import {environment} from '../../../../environments/environment';
import {EgyszeruKeresesDto} from '../../../dtos/egyszerukeresesdto';
import {IrattipusDto} from '../irattipusdto';
import {deepCopy} from '../../../tools/deepCopy';
import {EgyMode} from '../../../enums/egymode';
import {propCopy} from '../../../tools/propCopy';
import {rowanimation} from '../../../animation/rowAnimation';

@Component({
  selector: 'app-irattipus-list',
  templateUrl: './irattipus-list.component.html',
  animations: [rowanimation]
})
export class IrattipusListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaComponent;

  szurok = ['Irattipus'];
  ekDto = new EgyszeruKeresesDto(0, '', environment.lapmeret);
  elsokereses = true;
  jog = false;
  zoom = false;

  Dto = new Array<IrattipusDto>();
  DtoSelectedIndex = -1;

  egymode = EgyMode.Reszletek;

  @Input() set maszk(value: string) {
    if (value !== undefined) {
      this.ekDto.minta = value || '';
      this.zoom = true;
    }
  }
  @Output() eventSelectzoom = new EventEmitter<IrattipusDto>();
  @Output() eventStopzoom = new EventEmitter<void>();

  irattipusservice: IrattipusService;
  spinnerservice: SpinnerService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              spinnerservice: SpinnerService,
              irattipusservice: IrattipusService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);

    this.irattipusservice = irattipusservice;
    this.spinnerservice = spinnerservice;
  }

  ngOnInit() {
    if (this.zoom) {
      this.onKereses();
    }
  }

  onKereses() {
    this.elsokereses = true;
    this.ekDto.rekordtol = 0;

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.spinnerservice.eppFrissit = true;
    this.irattipusservice.Read(this.ekDto.minta)
      .then(res => {
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

        this.spinnerservice.eppFrissit = false;

        // if (this.irattipusservice.zoom) {
        //   window.scrollTo(0, document.body.scrollHeight);
        // }
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
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
  onUjtetelkesz(dto: IrattipusDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }
  onModositaskesz(dto: IrattipusDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto[this.DtoSelectedIndex]);
    }
    this.egymode = EgyMode.Reszletek;
  }
  onTorles(ok: boolean) {
    if (ok) {
      this.spinnerservice.eppFrissit = true;

      this.irattipusservice.Delete(this.Dto[this.DtoSelectedIndex])
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.Dto.splice(this.DtoSelectedIndex, 1);
          this.DtoSelectedIndex = -1;

          this.spinnerservice.eppFrissit = false;
          this.tabla.clearselections();
        })
        .catch(err => {
          this.spinnerservice.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.egymode = EgyMode.Reszletek;
    }
  }

  onStartzoom(i: number) {
    this.eventSelectzoom.emit(deepCopy(this.Dto[i]));

    this.onStopzoom();
  }

  onStopzoom() {
    this.zoom = false;

    this.eventStopzoom.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
