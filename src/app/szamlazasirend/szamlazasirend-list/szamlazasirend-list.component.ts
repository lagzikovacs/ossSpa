import {Component, OnDestroy, ViewChild} from '@angular/core';
import {SzamlazasirendService} from '../szamlazasirend.service';
import {LogonService} from '../../logon/logon.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {SzamlazasirendContainerMode} from '../szamlazasirendcontainermode';
import {SzamlazasirendEgyMode} from '../szamlazasirendegymode';

@Component({
  selector: 'app-szamlazasirend-list',
  templateUrl: './szamlazasirend-list.component.html'
})
export class SzamlazasirendListComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szamlazasirendservice: SzamlazasirendService;
  eppFrissit = false;
  ti = -1;

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
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
