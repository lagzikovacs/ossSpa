import {Component, ViewChild} from '@angular/core';
import {SzamlazasirendService} from '../szamlazasirend.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {LogonService} from '../../../logon/logon.service';
import {SzamlazasirendEgyMode} from '../szamlazasirendegymode';
import {SzamlazasirendContainerMode} from '../szamlazasirendcontainermode';

@Component({
  selector: 'app-projekt-szamlazasirend-egy',
  templateUrl: './projekt-szamlazasirend-egy.component.html',
  styleUrls: ['./projekt-szamlazasirend-egy.component.css']
})
export class ProjektSzamlazasirendEgyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szamlazasirendservice: SzamlazasirendService;
  eppFrissit = false;

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
}
