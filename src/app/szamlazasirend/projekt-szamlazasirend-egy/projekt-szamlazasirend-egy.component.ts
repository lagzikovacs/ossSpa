import {Component, OnDestroy, ViewChild} from '@angular/core';
import {SzamlazasirendService} from '../szamlazasirend.service';
import {SzamlazasirendEgyMode} from '../szamlazasirendegymode';
import {SzamlazasirendContainerMode} from '../szamlazasirendcontainermode';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {LogonService} from '../../logon/logon.service';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-projekt-szamlazasirend-egy',
  templateUrl: './projekt-szamlazasirend-egy.component.html',
  styleUrls: ['./projekt-szamlazasirend-egy.component.css'],
  animations: [rowanimation]
})
export class ProjektSzamlazasirendEgyComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szamlazasirendservice: SzamlazasirendService;
  eppFrissit = false;
  ri = -1;

  constructor(private _logonservice: LogonService,
              szamlazasirendservice: SzamlazasirendService) {
    this.szamlazasirendservice = szamlazasirendservice;
  }

  vissza() {
    this.szamlazasirendservice.ContainerMode = SzamlazasirendContainerMode.List;
  }
  reszletek() {
    this.szamlazasirendservice.EgyMode = SzamlazasirendEgyMode.Reszletek;
  }
  torles () {
    this.szamlazasirendservice.EgyMode = SzamlazasirendEgyMode.Torles;
  }
  modositas() {
    this.szamlazasirendservice.uj = false;
    this.szamlazasirendservice.DtoEdited = Object.assign({}, this.szamlazasirendservice.Dto[this.szamlazasirendservice.DtoSelectedIndex]);
    this.szamlazasirendservice.EgyMode = SzamlazasirendEgyMode.Modositas;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.szamlazasirendservice.Delete(this.szamlazasirendservice.Dto[this.szamlazasirendservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.szamlazasirendservice.Dto.splice(this.szamlazasirendservice.DtoSelectedIndex, 1);
        this.szamlazasirendservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.szamlazasirendservice.ContainerMode = SzamlazasirendContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  TorlesCancel() {
    this.szamlazasirendservice.EgyMode = SzamlazasirendEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
