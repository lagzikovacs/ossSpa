import { Component } from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {BizonylatContainerMode} from '../bizonylatcontainermode';
import {ProjektkapcsolatService} from '../../projekt/bizonylatesirat/projektkapcsolat.service';
import {BizonylatesIratContainerMode} from '../../projekt/bizonylatesirat/bizonylatesiratcontainermode';
import {BizonylatEgyMode} from '../bizonylategymode';
import {BizonylatkifizetesService} from '../bizonylatkifizetes/bizonylatkifizetes.service';
import {BizonylatKifizetesContainerMode} from '../bizonylatkifizetes/bizonylatkifizetescontainermode';
import {BizonylatKapcsolatContainerMode} from '../bizonylatirat/bizonylatkapcsolatcontainermode';
import {BizonylatkapcsolatService} from '../bizonylatirat/bizonylatkapcsolat.service';
import {BizonylatTipus} from '../bizonylattipus';

@Component({
  selector: 'app-bizonylat-egy',
  templateUrl: './bizonylat-egy.component.html',
  styleUrls: ['./bizonylat-egy.component.css']
})
export class BizonylatEgyComponent {
  bizonylatservice: BizonylatService;
  eppFrissit = false;

  constructor(private _projektkapcsolatservice: ProjektkapcsolatService,
              private _bizonylatkifizetesservice: BizonylatkifizetesService,
              private _bizonylatkapcsolatservice: BizonylatkapcsolatService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  modositasenabled(): boolean {
    return this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].BIZONYLATSZAM === null;
  }
  torlesenabled(): boolean {
    return this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].BIZONYLATSZAM === null;
  }
  kibocsatasenabled(): boolean {
    return this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].BIZONYLATSZAM === null;
  }
  kiszallitvaenabled(): boolean {
    return this.bizonylatservice.bizonylatTipus === BizonylatTipus.Megrendeles;
  }
  kifizetesrendbenenabled(): boolean {
    return this.bizonylatservice.bizonylatLeiro.BizonylatTipus === BizonylatTipus.Szamla ||
      this.bizonylatservice.bizonylatLeiro.BizonylatTipus === BizonylatTipus.BejovoSzamla ||
      this.bizonylatservice.bizonylatLeiro.BizonylatTipus === BizonylatTipus.DijBekero ||
      this.bizonylatservice.bizonylatLeiro.BizonylatTipus === BizonylatTipus.ElolegSzamla;
  }
  penztarenabled(): boolean {
    return (this.bizonylatservice.bizonylatLeiro.BizonylatTipus === BizonylatTipus.Szamla ||
      this.bizonylatservice.bizonylatLeiro.BizonylatTipus === BizonylatTipus.BejovoSzamla) &&
      this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].BIZONYLATSZAM !== null &&
      this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].FIZETESIMOD === 'Készpénz';
  }
  stornoenabled(): boolean {
    return this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].BIZONYLATSZAM !== null &&
      !this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].EZSTORNOZOTT &&
      !this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].EZSTORNOZO;
  }

  vissza() {
    this.bizonylatservice.ContainerMode = BizonylatContainerMode.List;
    this._projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.List;
  }
  reszletek() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Reszletek;
  }
  torles() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Torles;
  }
  modositas() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Modositas;
  }
  nyomtatas() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Nyomtatas;
  }
  errol() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Errol;
  }
  kibocsatas() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Kibocsatas;
  }
  penztar() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Penztar;
  }
  storno() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Storno;
  }
  kifizetesrendben() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Kifizetesrendben;
  }
  kiszallitva() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Kiszallitva;
  }
  kifizetes() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Kifizetes;
    this._bizonylatkifizetesservice.ContainerMode = BizonylatKifizetesContainerMode.List;
  }
  irat() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Irat;
    this._bizonylatkapcsolatservice.ContainerMode = BizonylatKapcsolatContainerMode.List;
  }
}
