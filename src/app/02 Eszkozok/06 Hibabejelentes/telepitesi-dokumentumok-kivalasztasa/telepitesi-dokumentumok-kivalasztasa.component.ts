import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit,
  Output
} from '@angular/core';
import {IratService} from '../../02 Irat/irat/irat.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {HibabejelentesService} from '../hibabejelentes.service';
import {IratDto} from '../../02 Irat/irat/iratdto';
import {HibabejelentesDto} from '../hibabejelentesdto';
import {deepCopy} from '../../../common/deepCopy';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  iratservice: IratService;

  constructor(private _errorservice: ErrorService,
              private _hibabejelentesservice: HibabejelentesService,
              private _cdr: ChangeDetectorRef,
              iratservice: IratService) {
    this.iratservice = iratservice;
  }

  async ngOnInit() {
    this.spinner = true;
    try {
      const res = await this._hibabejelentesservice.SelectTelepitesdokumentumai(this.Projektkod);
      if (res.Error != null) {
        throw res.Error;
      }

      this.iratDto = res.Result;
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  async onZoom(i: number) {
    this.DtoEdited.Iratkod1 = this.iratDto[i].Iratkod;

    this.spinner = true;
    try {
      const res = await this._hibabejelentesservice.Update(this.DtoEdited);
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this._hibabejelentesservice.Get(res.Result);
      if (res1.Error != null) {
        throw res1.Error;
      }

      this.kivalasztva = true;
      this.spinner = false;
      this.eventSzerkeszteskesz.emit(res1.Result[0]);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }
}
