import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ProjektteendoService} from '../projektteendo.service';
import {LogonService} from '../../logon/logon.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {ProjektteendoContainerMode} from '../projektteendocontainermode';
import {ProjektteendoEgyMode} from '../projekttendoegymode';

@Component({
  selector: 'app-projekt-teendo-list',
  templateUrl: './projekt-teendo-list.component.html',
  styleUrls: ['./projekt-teendo-list.component.css']
})
export class ProjektTeendoListComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektteendoservice: ProjektteendoService;
  eppFrissit = false;
  ti = -1;

  constructor(private _logonservice: LogonService,
              projektteendoservice: ProjektteendoService) {
    this.projektteendoservice = projektteendoservice;
  }

  kereses() {
    this.eppFrissit = true;
    this.projektteendoservice.Kereses()
      .then(res => {
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  setClickedRow(i: number) {
    this.projektteendoservice.DtoSelectedIndex = i;
    this.projektteendoservice.uj = false;
    this.projektteendoservice.ContainerMode = ProjektteendoContainerMode.Egy;
    this.projektteendoservice.EgyMode = ProjektteendoEgyMode.Reszletek;
  }
  uj() {
    this.eppFrissit = true;
    this.projektteendoservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.projektteendoservice.uj = true;
        this.projektteendoservice.DtoEdited = res.Result[0];
        this.projektteendoservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.projektteendoservice.ContainerMode = ProjektteendoContainerMode.Uj;
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
