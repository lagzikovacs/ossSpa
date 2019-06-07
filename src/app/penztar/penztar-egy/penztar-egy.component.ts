import {Component, OnDestroy, ViewChild} from '@angular/core';
import {PenztarService} from '../penztar.service';
import {LogonService} from '../../logon/logon.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {JogKod} from '../../enums/jogkod';
import {PenztarContainerMode} from '../penztarcontainermode';
import {PenztarEgyMode} from '../penztaregymode';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-penztar-egy',
  templateUrl: './penztar-egy.component.html',
  animations: [rowanimation]
})
export class PenztarEgyComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  penztarservice: PenztarService;
  mod = false;
  nyitva = false;
  eppFrissit = false;
  ri = -1;

  constructor(private _logonservice: LogonService,
              penztarservice: PenztarService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PENZTARMOD]);
    this.penztarservice = penztarservice;
    this.nyitva = this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex].Nyitva;
  }

  vissza() {
    this.penztarservice.ContainerMode = PenztarContainerMode.List;
  }
  reszletek() {
    this.penztarservice.EgyMode = PenztarEgyMode.Reszletek;
  }
  torles () {
    this.penztarservice.EgyMode = PenztarEgyMode.Torles;
  }
  modositas() {
    this.penztarservice.uj = false;
    this.penztarservice.DtoEdited = Object.assign({}, this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex]);
    this.penztarservice.EgyMode = PenztarEgyMode.Modositas;
  }
  tetelek() {
    this.penztarservice.EgyMode = PenztarEgyMode.Tetelek;
  }
  export() {
    this.penztarservice.EgyMode = PenztarEgyMode.Export;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.penztarservice.Delete(this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.penztarservice.Dto.splice(this.penztarservice.DtoSelectedIndex, 1);
        this.penztarservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.penztarservice.ContainerMode = PenztarContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  TorlesCancel() {
    this.penztarservice.EgyMode = PenztarEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
