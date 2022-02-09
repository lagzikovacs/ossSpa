import {Component, Input, OnInit} from '@angular/core';
import {IratService} from '../../irat/irat.service';
import {ProjektkapcsolatService} from '../../projektkapcsolat/projektkapcsolat.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {HibabejelentesService} from '../hibabejelentes.service';
import {IratDto} from '../../irat/iratdto';

@Component({
  selector: 'app-telepitesi-dokumentumok-kivalasztasa',
  templateUrl: './telepitesi-dokumentumok-kivalasztasa.component.html'
})
export class TelepitesiDokumentumokKivalasztasaComponent implements OnInit {
  @Input() Projektkod = 0;

  Dto = new Array<IratDto>();

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

        this.Dto = res.Result;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onZoom(i: number) {
    this.kivalasztva = true;
  }
}
