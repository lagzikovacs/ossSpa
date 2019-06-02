import {Component, OnDestroy, ViewChild} from '@angular/core';
import {AfakulcsService} from '../afakulcs.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {AfakulcsContainerMode} from '../afakulcscontainermode';
import {AfakulcsEgyMode} from '../afakulcsegymode';
import {rowanimation} from '../../../animation/rowAnimation';

@Component({
  selector: 'app-afakulcs-egy',
  templateUrl: './afakulcs-egy.component.html',
  styleUrls: ['./afakulcs-egy.component.css'],
  animations: [rowanimation]
})
export class AfakulcsEgyComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  afakulcsservice: AfakulcsService;
  mod = false;
  eppFrissit = false;
  ri = -1;

  constructor(private _logonservice: LogonService,
              afakulcsservice: AfakulcsService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.afakulcsservice = afakulcsservice;
  }

  vissza() {
    this.afakulcsservice.ContainerMode = AfakulcsContainerMode.List;
  }
  reszletek() {
    this.afakulcsservice.EgyMode = AfakulcsEgyMode.Reszletek;
  }
  torles () {
    this.afakulcsservice.EgyMode = AfakulcsEgyMode.Torles;
  }
  modositas() {
    this.afakulcsservice.uj = false;
    this.afakulcsservice.DtoEdited = Object.assign({}, this.afakulcsservice.Dto[this.afakulcsservice.DtoSelectedIndex]);
    this.afakulcsservice.EgyMode = AfakulcsEgyMode.Modositas;
  }

  TorlesOk() {
    this.eppFrissit = true;

    this.afakulcsservice.Delete(this.afakulcsservice.Dto[this.afakulcsservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.afakulcsservice.Dto.splice(this.afakulcsservice.DtoSelectedIndex, 1);
        this.afakulcsservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.afakulcsservice.ContainerMode = AfakulcsContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  TorlesCancel() {
    this.afakulcsservice.EgyMode = AfakulcsEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
