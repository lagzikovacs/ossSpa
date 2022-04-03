import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IratService} from '../../irat/irat.service';
import {ProjektkapcsolatService} from '../../projektkapcsolat/projektkapcsolat.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {HibabejelentesService} from '../hibabejelentes.service';
import {IratDto} from '../../irat/iratdto';
import {HibabejelentesDto} from '../hibabejelentesdto';
import {deepCopy} from '../../tools/deepCopy';
import {NumberResult} from '../../common/dtos/numberresult';

@Component({
  selector: 'app-telepitesi-dokumentumok-kivalasztasa',
  templateUrl: './telepitesi-dokumentumok-kivalasztasa.component.html'
})
export class TelepitesiDokumentumokKivalasztasaComponent implements OnInit {
  @Input() Projektkod = 0;

  DtoEdited = new HibabejelentesDto();
  @Input() set DtoOriginal(value: HibabejelentesDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<HibabejelentesDto>();

  iratDto = new Array<IratDto>();

  kivalasztva = false;
  eppFrissit = false;

  iratservice: IratService;

  constructor(private _errorservice: ErrorService,
              private _hibabejelentesservice: HibabejelentesService,
              iratservice: IratService) {
    this.iratservice = iratservice;
  }

  ngOnInit(): void {
    this.eppFrissit = true;
    this._hibabejelentesservice.SelectTelepitesdokumentumai(this.Projektkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.iratDto = res.Result;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onZoom(i: number) {
    this.eppFrissit = true;

    this.DtoEdited.Iratkod1 = this.iratDto[i].Iratkod;

    this._hibabejelentesservice.Update(this.DtoEdited)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this._hibabejelentesservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.kivalasztva = true;
        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res1.Result[0]);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
}
