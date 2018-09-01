import {Component, ViewChild} from '@angular/core';
import {SzamlazasirendService} from '../szamlazasirend.service';
import {LogonService} from '../../../services/logon.service';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {SzamlazasirendContainerMode} from '../szamlazasirendcontainermode';
import {SzamlazasirendEgyMode} from '../szamlazasirendegymode';

@Component({
  selector: 'app-projekt-szamlazasirend-list',
  templateUrl: './projekt-szamlazasirend-list.component.html',
  styleUrls: ['./projekt-szamlazasirend-list.component.css']
})
export class ProjektSzamlazasirendListComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szamlazasirendservice: SzamlazasirendService;
  eppFrissit = false;

  constructor(private _logonservice: LogonService,
              szamlazasirendservice: SzamlazasirendService) {
    this.szamlazasirendservice = szamlazasirendservice;
  }

  kereses() {
    this.eppFrissit = true;
    this.szamlazasirendservice.Kereses()
      .then(res => {
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  setClickedRow(i: number) {
    this.szamlazasirendservice.DtoSelectedIndex = i;
    this.szamlazasirendservice.uj = false;
    this.szamlazasirendservice.ContainerMode = SzamlazasirendContainerMode.Egy;
    this.szamlazasirendservice.EgyMode = SzamlazasirendEgyMode.Reszletek;
  }
  uj() {
    this.eppFrissit = true;
    this.szamlazasirendservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.szamlazasirendservice.uj = true;
        this.szamlazasirendservice.DtoEdited = res.Result[0];
        this.szamlazasirendservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.szamlazasirendservice.ContainerMode = SzamlazasirendContainerMode.Uj;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}
