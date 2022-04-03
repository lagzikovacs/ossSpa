import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {PenznemService} from '../../../01 Torzsadatok/03 Penznem/penznem.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../common/enums/jogkod';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {TablaComponent} from '../../../tools/tabla/tabla.component';
import {environment} from '../../../../environments/environment';
import {EgyszeruKeresesDto} from '../../../common/dtos/egyszerukeresesdto';
import {PenznemDto} from '../../../01 Torzsadatok/03 Penznem/penznemdto';
import {deepCopy} from '../../../tools/deepCopy';
import {EgyMode} from '../../../common/enums/egymode';
import {propCopy} from '../../../tools/propCopy';
import {rowanimation} from '../../../animation/rowAnimation';

@Component({
  selector: 'app-penznem-list',
  templateUrl: './penznem-list.component.html',
  animations: [rowanimation]
})
export class PenznemListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaComponent;

  szurok = ['Pénznem'];
  ekDto = new EgyszeruKeresesDto(0, '', environment.lapmeret);
  elsokereses = true;
  jog = false;
  zoom = false;
  eppFrissit = false;

  Dto = new Array<PenznemDto>();
  DtoSelectedIndex = -1;

  egymode = EgyMode.Reszletek;

  @Input() set maszk(value: string) {
    if (value !== undefined) {
      this.ekDto.minta = value || '';
      this.zoom = true;
    }
  }
  @Output() eventSelectzoom = new EventEmitter<PenznemDto>();
  @Output() eventStopzoom = new EventEmitter<void>();

  penznemservice: PenznemService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              penznemservice: PenznemService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);

    this.penznemservice = penznemservice;
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
    this.eppFrissit = true;
    this.penznemservice.Read(this.ekDto.minta)
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

        this.eppFrissit = false;

        // if (this.penznemservice.zoom) {
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
  onUjtetelkesz(dto: PenznemDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }
  onModositaskesz(dto: PenznemDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto[this.DtoSelectedIndex]);
    }
    this.egymode = 0;
  }
  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.penznemservice.Delete(this.Dto[this.DtoSelectedIndex])
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
