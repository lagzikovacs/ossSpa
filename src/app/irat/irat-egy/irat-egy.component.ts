import {Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {IratService} from '../irat.service';
import {ProjektkapcsolatService} from '../../projektkapcsolat/projektkapcsolat.service';
import {ProjektService} from '../../projekt/projekt.service';
import {ProjektResult} from '../../projekt/projektresult';
import {VagolapService} from '../../vagolap/vagolap.service';
import {AbuComponent} from '../../tools/abu/abu.component';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../common/enums/jogkod';
import {rowanimation} from '../../animation/rowAnimation';
import {ErrorService} from '../../tools/errorbox/error.service';
import {EgyMode} from '../../common/enums/egymode';
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

  private _egymode = 0;
  @Output() egymodeChange = new EventEmitter<number>();
  @Input() get egymode() { return this._egymode; }
  set egymode(value: number) {
    this._egymode = value;
    this.egymodeChange.emit(this._egymode);
  }

  jog = false;
  eppFrissit = false;

  iratservice: IratService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              iratservice: IratService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.IRATMOD]);

    this.iratservice = iratservice;
  }

  doNav(i: number) {
    this.egymode = i;
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
      this.egymode = 0;
    }
  }

  onModositaskesz(dto: IratDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto);
      this.eventSzerkesztesutan.emit(this.Dto);
    }

    this.egymode = 0;
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
