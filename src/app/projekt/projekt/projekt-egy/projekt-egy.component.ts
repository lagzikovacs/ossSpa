import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {ProjektService} from '../projekt.service';
import {ProjektteendoService} from '../../teendo/projektteendo.service';
import {SzamlazasirendService} from '../../szamlazasirend/szamlazasirend.service';
import {ProjektkapcsolatService} from '../../bizonylatesirat/projektkapcsolat.service';
import {ProjektContainerMode} from '../projektcontainermode';
import {ProjektEgyMode} from '../projektegymode';

@Component({
  selector: 'app-projekt-egy',
  templateUrl: './projekt-egy.component.html',
  styleUrls: ['./projekt-egy.component.css']
})
export class ProjektEgyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektservice: ProjektService;
  eppFrissit = false;

  constructor(private _projektkapcsolatservice: ProjektkapcsolatService,
              private _szamlazasirendservice: SzamlazasirendService,
              private _projektteendoservice: ProjektteendoService,
              projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  vissza() {
    this.projektservice.ContainerMode = ProjektContainerMode.List;
  }
  reszletek() {
    this.projektservice.EgyMode = ProjektEgyMode.Reszletek;
  }
  torles () {
    this.projektservice.EgyMode = ProjektEgyMode.Torles;
  }
  modositas() {
    this.projektservice.uj = false;
    this.projektservice.DtoEdited = Object.assign({}, this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);
    this.projektservice.EgyMode = ProjektEgyMode.Modositas;
  }

  stsz() {
    this.projektservice.uj = false;
    this.projektservice.DtoEdited = Object.assign({}, this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);
    this.projektservice.EgyMode = ProjektEgyMode.Statusz;
  }
  muszakiallapot() {
    this.projektservice.uj = false;
    this.projektservice.DtoEdited = Object.assign({}, this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);
    this.projektservice.EgyMode = ProjektEgyMode.Muszakiallapot;
  }
  inverter() {
    this.projektservice.uj = false;
    this.projektservice.DtoEdited = Object.assign({}, this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);
    this.projektservice.EgyMode = ProjektEgyMode.Inverter;
  }
  napelem() {
    this.projektservice.uj = false;
    this.projektservice.DtoEdited = Object.assign({}, this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);
    this.projektservice.EgyMode = ProjektEgyMode.Napelem;
  }
  iratminta() {
    this.projektservice.EgyMode = ProjektEgyMode.Iratminta;
  }
  bizonylatesirat() {
    this.eppFrissit = true;
    this._projektkapcsolatservice.Select(this.projektservice.Dto[this.projektservice.DtoSelectedIndex].PROJEKTKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this._projektkapcsolatservice.Dto = res.Result;

        this.eppFrissit = false;
        this.projektservice.EgyMode = ProjektEgyMode.Bizonylatesirat;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  szamlazasirend() {
    this.eppFrissit = true;
    this._szamlazasirendservice.Select(this.projektservice.Dto[this.projektservice.DtoSelectedIndex].PROJEKTKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this._szamlazasirendservice.Dto = res.Result;

        this.eppFrissit = false;
        this.projektservice.EgyMode = ProjektEgyMode.Szamlazasirend;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  teendo() {
    this.eppFrissit = true;
    this._projektteendoservice.Select(this.projektservice.Dto[this.projektservice.DtoSelectedIndex].PROJEKTKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this._projektteendoservice.Dto = res.Result;

        this.eppFrissit = false;
        this.projektservice.EgyMode = ProjektEgyMode.Teendo;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}
