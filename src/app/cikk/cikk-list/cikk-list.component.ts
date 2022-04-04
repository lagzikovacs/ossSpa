import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {CikkService} from '../../01 Torzsadatok/06 Cikk/cikk.service';
import {Szempont} from '../../common/enums/szempont';
import {CikkDto} from '../../01 Torzsadatok/06 Cikk/cikkdto';
import {SzMT} from '../../common/dtos/szmt';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {JogKod} from '../../common/enums/jogkod';
import {ErrorService} from '../../common/errorbox/error.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';
import {environment} from '../../../environments/environment';
import {CikkParameter} from '../../01 Torzsadatok/06 Cikk/cikkparameter';
import {deepCopy} from '../../common/deepCopy';
import {EgyMode} from '../../common/enums/egymode';
import {propCopy} from '../../common/propCopy';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-cikk-list',
  templateUrl: './cikk-list.component.html',
  animations: [rowanimation]
})
export class CikkListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaComponent;

  szurok = ['Megnevezés', 'Id'];
  szempont = 0;
  minta = '';
  up = new CikkParameter(0, environment.lapmeret);
  szempontok = [
    Szempont.Megnevezes, Szempont.Kod
  ];
  elsokereses = true;
  osszesrekord = 0;
  jog = false;
  zoom = false;
  eppFrissit = false;

  Dto = new Array<CikkDto>();
  DtoSelectedIndex = -1;

  egymode = EgyMode.Reszletek;

  @Input() set maszk(value: string) {
    if (value !== undefined) {
      this.minta = value || '';
      this.szempont = 0;
      this.zoom = true;
    }
  }
  @Output() eventSelectzoom = new EventEmitter<CikkDto>();
  @Output() eventStopzoom = new EventEmitter<void>();

  cikkservice: CikkService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              cikkservice: CikkService  ) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.CIKKMOD]);

    this.cikkservice = cikkservice;
  }

  ngOnInit() {
    if (this.zoom) {
      this.onKereses();
    }
  }

  onKereses() {
    this.Dto = new Array<CikkDto>();
    this.DtoSelectedIndex = -1;
    this.osszesrekord = 0;

    this.elsokereses = true;
    this.up.rekordtol = 0;
    this.up.fi = new Array<SzMT>();
    this.up.fi.push(new SzMT(this.szempontok[this.szempont], this.minta));

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.cikkservice.Select(this.up)
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
        this.osszesrekord = res.OsszesRekord;

        this.up.rekordtol += this.up.lapmeret;
        this.eppFrissit = false;

        // if (this.cikkservice.zoom) {
        //   window.scrollTo(0, document.body.scrollHeight);
        // }
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onId(i: number) {
    this.DtoSelectedIndex = i;
    this.egymode = 0;
  }

  doNav(i: number) {
    this.egymode = i;
  }

  doUjtetel() {
    this.tabla.ujtetelstart();
  }
  onUjtetelkesz(dto: CikkDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }
  onModositaskesz(dto: CikkDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto[this.DtoSelectedIndex]);
    }
    this.egymode = 0;
  }
  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.cikkservice.Delete(this.Dto[this.DtoSelectedIndex])
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
      this.egymode = 0;
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
