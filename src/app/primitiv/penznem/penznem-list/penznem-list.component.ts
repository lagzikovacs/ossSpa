import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {PenznemService} from '../penznem.service';
import {LogonService} from '../../../logon/logon.service';
import {PenztarService} from '../../../penztar/penztar.service';
import {ProjektService} from '../../../projekt/projekt.service';
import {SzamlazasirendService} from '../../../szamlazasirend/szamlazasirend.service';
import {KifizetesService} from '../../../kifizetes/kifizetes.service';
import {BizonylatService} from '../../../bizonylat/bizonylat.service';
import {JogKod} from '../../../enums/jogkod';
import {ZoomSources} from '../../../enums/zoomsources';
import {PenztarSzerkesztesMode} from '../../../penztar/penztarszerkesztesmode';
import {ProjektSzerkesztesMode} from '../../../projekt/projektszerkesztesmode';
import {SzamlazasirendSzerkesztesMode} from '../../../szamlazasirend/szamlazasirendszerkesztesmode';
import {KifizetesSzerkesztesMode} from '../../../kifizetes/kifizetesszerkesztesmode';
import {BizonylatSzerkesztesMode} from '../../../bizonylat/bizonylatszerkesztesmode';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {TablaComponent} from '../../../tools/tabla/tabla.component';
import {environment} from '../../../../environments/environment';
import {EgyszeruKeresesDto} from '../../../dtos/egyszerukeresesdto';
import {PenznemDto} from '../penznemdto';
import {deepCopy} from '../../../tools/deepCopy';


@Component({
  selector: 'app-penznem-list',
  templateUrl: './penznem-list.component.html'
})
export class PenznemListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla') tabla: TablaComponent;

  szurok = ['Pénznem'];
  ekDto = new EgyszeruKeresesDto(0, '', environment.lapmeret);
  elsokereses = true;
  jog = false;
  zoom = false;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

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
              private _spinnerservice: SpinnerService,
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
          this.penznemservice.Dto = res.Result;
          this.elsokereses = false;
        } else {
          const buf = [...this.penznemservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.penznemservice.Dto = buf;
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

  onStartzoom(i: number) {
    this.eventSelectzoom.emit(deepCopy(this.penznemservice.Dto[i]));

    this.onStopzoom();
  }
  onStopzoom() {
    this.zoom = false;

    this.eventStopzoom.emit();
  }

  onId(i: number) {
    this.penznemservice.DtoSelectedIndex = i;
  }

  onUj() {
    this.tabla.ujtetelstart();
  }

  onUjkesz() {
    this.tabla.ujtetelstop();
  }

  onTorlesutan() {
    this.tabla.clearselections();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
