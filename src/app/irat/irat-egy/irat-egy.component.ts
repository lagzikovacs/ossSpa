import {Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {IratService} from '../irat.service';
import {ProjektkapcsolatService} from '../../projektkapcsolat/projektkapcsolat.service';
import {ProjektService} from '../../projekt/projekt.service';
import {ProjektResult} from '../../projekt/projektresult';
import {VagolapService} from '../../vagolap/vagolap.service';
import {AbuComponent} from '../../tools/abu/abu.component';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {rowanimation} from '../../animation/rowAnimation';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {EgyMode} from '../../enums/egymode';
import {IratDto} from '../iratdto';
import {propCopy} from '../../tools/propCopy';
import {deepCopy} from '../../tools/deepCopy';
import {ProjektDto} from '../../projekt/projektdto';

@Component({
  selector: 'app-irat-egy',
  templateUrl: './irat-egy.component.html',
  animations: [rowanimation]
})
export class IratEgyComponent implements OnDestroy {
  @ViewChild(AbuComponent, {static: true}) abu: AbuComponent;

  Dto = new IratDto();
  @Input() set DtoOriginal(value: IratDto) {
    this.Dto = deepCopy(value);
  }
  @Output() eventSzerkesztesutan = new EventEmitter<IratDto>();
  @Output() eventTorlesutan = new EventEmitter<void>();

  @Input() enTorles = true;
  @Input() enProjekt = true;
  @Input() enUgyfel = true;

  egymode = EgyMode.Dokumentum;

  IratProjektje: ProjektDto;
  nincsProjekt = false;
  jog = false;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  iratservice: IratService;
  projektservice: ProjektService;

  constructor(private _logonservice: LogonService,
              private _projektkapcsolatservice: ProjektkapcsolatService,
              private _vagolapservice: VagolapService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              iratservice: IratService,
              projektservice: ProjektService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.IRATMOD]);
    this.iratservice = iratservice;
    this.projektservice = projektservice;
  }

  doReszletek() {
    this.egymode = EgyMode.Reszletek;
  }
  doTorles() {
    this.egymode = EgyMode.Torles;
  }
  doModositas() {
    this.egymode = EgyMode.Modositas;
  }
  doDokumentum() {
    this.egymode = EgyMode.Dokumentum;
  }
  doFotozaslink() {
    this.egymode = EgyMode.FotozasLink;
  }
  doProjekt() {
    this.eppFrissit = true;
    this._projektkapcsolatservice.SelectByIrat(this.Dto.Iratkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (res.Result.length === 0) {
          this.nincsProjekt = true;
          return new Promise<ProjektResult>((resolve, reject) => { resolve(new ProjektResult()); });
        } else {
          this.nincsProjekt = false;
          return this.projektservice.Get(res.Result[0].Projektkod);
        }
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (!this.nincsProjekt) {
          this.IratProjektje = res1.Result[0];
        }

        this.egymode = EgyMode.Projekt;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  doVagolap() {
    this._vagolapservice.iratotvagolapra(this.Dto);
    this.abu.Uzenet('Az irat a vágólapra került!');
  }

  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.iratservice.Delete(this.Dto)
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.eppFrissit = false;
          this.eventTorlesutan.emit();
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.egymode = EgyMode.Reszletek;
    }
  }

  onModositaskesz(dto: IratDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto);
      this.eventSzerkesztesutan.emit(this.Dto);
    }

    this.egymode = EgyMode.Reszletek;
  }

  onFotozaslinkKesz(dto: IratDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto);
      this.eventSzerkesztesutan.emit(this.Dto);
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
