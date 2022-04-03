import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FizetesimodService} from '../../../01 Torzsadatok/02 Fizetesimod/fizetesimod.service';
import {LogonService} from '../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {JogKod} from '../../../common/enums/jogkod';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {TablaComponent} from '../../../tools/tabla/tabla.component';
import {environment} from '../../../../environments/environment';
import {EgyszeruKeresesDto} from '../../../common/dtos/egyszerukeresesdto';
import {FizetesimodDto} from '../../../01 Torzsadatok/02 Fizetesimod/fizetesimoddto';
import {deepCopy} from '../../../tools/deepCopy';
import {EgyMode} from '../../../common/enums/egymode';
import {propCopy} from '../../../tools/propCopy';
import {rowanimation} from '../../../animation/rowAnimation';

@Component({
  selector: 'app-fizetesimod-list',
  templateUrl: './fizetesimod-list.component.html',
  animations: [rowanimation]
})
export class FizetesimodListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaComponent;

  szurok = ['Fizetési mód'];
  ekDto = new EgyszeruKeresesDto(0, '', environment.lapmeret);
  elsokereses = true;
  jog = false;
  zoom = false;
  eppFrissit = false;

  Dto = new Array<FizetesimodDto>();
  DtoSelectedIndex = -1;

  egymode = EgyMode.Reszletek;

  @Input() set maszk(value: string) {
    if (value !== undefined) {
      this.ekDto.minta = value || '';
      this.zoom = true;
    }
  }
  @Output() eventSelectzoom = new EventEmitter<FizetesimodDto>();
  @Output() eventStopzoom = new EventEmitter<void>();

  fizetesimodservice: FizetesimodService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              fizetesimodservice: FizetesimodService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);

    this.fizetesimodservice = fizetesimodservice;
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
    this.fizetesimodservice.Read(this.ekDto.minta)
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

        // if (this.fizetesimodservice.zoom) {
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
  onUjtetelkesz(dto: FizetesimodDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }
  onModositaskesz(dto: FizetesimodDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto[this.DtoSelectedIndex]);
    }
    this.egymode = 0;
  }
  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.fizetesimodservice.Delete(this.Dto[this.DtoSelectedIndex])
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
