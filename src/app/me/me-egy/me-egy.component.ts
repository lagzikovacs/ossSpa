import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {MeService} from '../me.service';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {MeContainerMode} from '../mecontainermode';
import {MeEgyMode} from '../meegymode';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-me-egy',
  templateUrl: './me-egy.component.html',
  styleUrls: ['./me-egy.component.css'],
  animations: [rowanimation]
})
export class MeEgyComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  meservice: MeService;
  mod = false;
  eppFrissit = false;

  constructor(private _logonservice: LogonService,
              meservice: MeService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.meservice = meservice;
  }

  vissza() {
    this.meservice.ContainerMode = MeContainerMode.List;
  }
  reszletek() {
    this.meservice.EgyMode = MeEgyMode.Reszletek;
  }
  torles () {
    this.meservice.EgyMode = MeEgyMode.Torles;
  }
  modositas() {
    this.meservice.uj = false;
    this.meservice.DtoEdited = Object.assign({}, this.meservice.Dto[this.meservice.DtoSelectedIndex]);
    this.meservice.EgyMode = MeEgyMode.Modositas;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.meservice.Delete(this.meservice.Dto[this.meservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.meservice.Dto.splice(this.meservice.DtoSelectedIndex, 1);
        this.meservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.meservice.ContainerMode = MeContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  TorlesCancel() {
    this.meservice.EgyMode = MeEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
