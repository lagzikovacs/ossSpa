import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {UgyfelService} from '../ugyfel.service';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {UgyfelContainerMode} from '../ugyfelcontainermode';
import {UgyfelEgyMode} from '../ugyfelegymode';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-ugyfel-egy',
  templateUrl: './ugyfel-egy.component.html',
  styleUrls: ['./ugyfel-egy.component.css'],
  animations: [rowanimation]
})
export class UgyfelEgyComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  ugyfelservice: UgyfelService;
  mod = false;
  eppFrissit = false;
  nincsProjekt = false;

  constructor(private _logonservice: LogonService,
              ugyfelservice: UgyfelService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.UGYFELEKMOD]);
    this.ugyfelservice = ugyfelservice;
  }

  vissza() {
    this.ugyfelservice.ContainerMode = UgyfelContainerMode.List;
  }
  reszletek() {
    this.ugyfelservice.EgyMode = UgyfelEgyMode.Reszletek;
  }
  torles() {
    this.ugyfelservice.EgyMode = UgyfelEgyMode.Torles;
  }
  modositas() {
    this.ugyfelservice.uj = false;
    this.ugyfelservice.DtoEdited = Object.assign({}, this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex]);
    this.ugyfelservice.EgyMode = UgyfelEgyMode.Modositas;
  }
  csoport() {
    this.ugyfelservice.uj = false;
    this.ugyfelservice.DtoEdited = Object.assign({}, this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex]);
    this.ugyfelservice.EgyMode = UgyfelEgyMode.Csoport;
  }
  projekt() {
    this.ugyfelservice.EgyMode = UgyfelEgyMode.Projekt;
  }
  ugyfelterlink() {
    this.ugyfelservice.EgyMode = UgyfelEgyMode.UgyfelterLink;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.ugyfelservice.Delete(this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.ugyfelservice.Dto.splice(this.ugyfelservice.DtoSelectedIndex, 1);
        this.ugyfelservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.ugyfelservice.ContainerMode = UgyfelContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  TorlesCancel() {
    this.ugyfelservice.EgyMode = UgyfelEgyMode.Reszletek;
  }

  CsoportOk(selected: number) {
    this.eppFrissit = true;

    this.ugyfelservice.DtoEdited.Csoport = selected;
    this.ugyfelservice.Update(this.ugyfelservice.DtoEdited)
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        return this.ugyfelservice.Get(res1.Result);
      })
      .then(res2 => {
        if (res2.Error !== null) {
          throw res2.Error;
        }

        this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex] = res2.Result[0];

        this.eppFrissit = false;
        this.ugyfelservice.EgyMode = UgyfelEgyMode.Reszletek;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }

  CsoportCancel() {
    this.ugyfelservice.EgyMode = UgyfelEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
