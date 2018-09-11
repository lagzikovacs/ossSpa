import {Component, ViewChild} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {UjajanlatSzerkesztesMode} from '../ujajanlatszerkesztesmode';
import {UjajanlatContainerMode} from '../ujajanlatcontainermode';
import {CikkService} from '../../../cikk/cikk.service';
import {ZoomSources} from '../../../enums/zoomsources';
import {CikkContainerMode} from '../../../cikk/cikkcontainermode';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';

@Component({
  selector: 'app-projekt-bizonylatesirat-ujajanlat-szerkesztes',
  templateUrl: './projekt-bizonylatesirat-ujajanlat-szerkesztes.component.html',
  styleUrls: ['./projekt-bizonylatesirat-ujajanlat-szerkesztes.component.css']
})
export class ProjektBizonylatesiratUjajanlatSzerkesztesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektkapcsolatservice: ProjektkapcsolatService;
  eppFrissit = false;

  constructor(private _cikkservice: CikkService,
              projektkapcsolatservice: ProjektkapcsolatService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  CikkZoom() {
    this._cikkservice.szempont = 0;
    this._cikkservice.minta =
      this.projektkapcsolatservice.AjanlatParam.AjanlatBuf[this.projektkapcsolatservice.AjanlattetelIndex].CikkNev || '';
    this._cikkservice.zoomsource = ZoomSources.Ajanlat;
    this._cikkservice.zoom = true;
    this._cikkservice.ContainerMode = CikkContainerMode.List;

    this.projektkapcsolatservice.AjanlatSzerkesztesMode = UjajanlatSzerkesztesMode.CikkZoom;
  }

  onSubmit() {
    this.eppFrissit = true;
    this.projektkapcsolatservice.AjanlatCalc(this.projektkapcsolatservice.AjanlatParam)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.projektkapcsolatservice.AjanlatParam = res.Result;

        this.eppFrissit = false;
        this.navigal();
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    this.projektkapcsolatservice.AjanlatSzerkesztesMode = UjajanlatSzerkesztesMode.Blank;
    this.projektkapcsolatservice.AjanlatContainerMode = UjajanlatContainerMode.List;
  }
}
