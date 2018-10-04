import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {ProjektService} from '../projekt.service';
import {ProjektContainerMode} from '../projektcontainermode';
import {ProjektEgyMode} from '../projektegymode';
import {ProjektteendoService} from '../../projektteendo/projektteendo.service';
import {SzamlazasirendService} from '../../szamlazasirend/szamlazasirend.service';
import {ProjektkapcsolatService} from '../../bizonylatesirat/projektkapcsolat.service';
import {BizonylatesIratContainerMode} from '../../bizonylatesirat/bizonylatesiratcontainermode';
import {SzamlazasirendContainerMode} from '../../szamlazasirend/szamlazasirendcontainermode';
import {ProjektteendoContainerMode} from '../../projektteendo/projektteendocontainermode';
import {VagolapService} from "../../../vagolap/vagolap.service";

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
              private _vagolapservice: VagolapService,
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
  datumok() {
    this.projektservice.uj = false;
    this.projektservice.DtoEdited = Object.assign({}, this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);
    this.projektservice.EgyMode = ProjektEgyMode.Datumok;
  }
  bizonylatesirat() {
    this.projektservice.EgyMode = ProjektEgyMode.Bizonylatesirat;
    this._projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.List;
  }
  szamlazasirend() {
    this.projektservice.EgyMode = ProjektEgyMode.Szamlazasirend;
    this._szamlazasirendservice.ContainerMode = SzamlazasirendContainerMode.List;
  }
  teendo() {
    this.projektservice.EgyMode = ProjektEgyMode.Teendo;
    this._projektteendoservice.ContainerMode = ProjektteendoContainerMode.List;
  }
  vagolap() {
    // TODO vágólap üzemmód
    this.projektservice.EgyMode = ProjektEgyMode.Vagolap;
  }
}
