import {Component, OnDestroy, ViewChild} from '@angular/core';
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
import {PenztarService} from '../../penztar/penztar.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {BizonylatSzerkesztesMode} from '../bizonylatszerkesztesmode';
import {VagolapService} from '../../vagolap/vagolap.service';
import {AbuComponent} from '../../tools/abu/abu.component';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';

@Component({
  selector: 'app-bizonylat-egy',
  templateUrl: './bizonylat-egy.component.html',
  styleUrls: ['./bizonylat-egy.component.css']
})
export class BizonylatEgyComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;
  @ViewChild(AbuComponent) abu: AbuComponent;

  bizonylatservice: BizonylatService;
  eppFrissit = false;
  mod = false;

  constructor(private _logonservice: LogonService,
              private _projektkapcsolatservice: ProjektkapcsolatService,
              private _bizonylatkifizetesservice: BizonylatkifizetesService,
              private _bizonylatkapcsolatservice: BizonylatkapcsolatService,
              private _penztarsevice: PenztarService,
              private _vagolapservice: VagolapService,
              bizonylatservice: BizonylatService) {
    this.mod = this._logonservice.Jogaim.includes(JogKod[JogKod.BIZONYLATMOD]);
    this.bizonylatservice = bizonylatservice;
  }

  modositasenabled(): boolean {
    return this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Bizonylatszam === null;
  }
  torlesenabled(): boolean {
    return this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Bizonylatszam === null;
  }
  kibocsatasenabled(): boolean {
    return this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Bizonylatszam === null;
  }
  kiszallitvaenabled(): boolean {
    return this.bizonylatservice.bizonylatTipus === BizonylatTipus.Megrendeles;
  }
  kifizetesrendbenenabled(): boolean {
    return (this.bizonylatservice.bizonylatTipus === BizonylatTipus.Szamla ||
      this.bizonylatservice.bizonylatTipus === BizonylatTipus.BejovoSzamla ||
      this.bizonylatservice.bizonylatTipus === BizonylatTipus.DijBekero ||
      this.bizonylatservice.bizonylatTipus === BizonylatTipus.ElolegSzamla) &&
      this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Bizonylatszam !== null;
  }
  penztarenabled(): boolean {
    return (this.bizonylatservice.bizonylatTipus === BizonylatTipus.Szamla ||
      this.bizonylatservice.bizonylatTipus === BizonylatTipus.BejovoSzamla) &&
      this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Bizonylatszam !== null &&
      this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Fizetesimod === 'Készpénz';
  }
  stornoenabled(): boolean {
    return this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Bizonylatszam !== null &&
      this.bizonylatservice.bizonylatLeiro.Stornozhato &&
      !this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Ezstornozott &&
      !this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Ezstornozo;
  }
  formaiellenorzesenabled(): boolean {
    return (this.bizonylatservice.bizonylatTipus === BizonylatTipus.Szamla ||
    this.bizonylatservice.bizonylatTipus === BizonylatTipus.BejovoSzamla);
  }
  osnxmlenabled(): boolean {
    return (this.bizonylatservice.bizonylatTipus === BizonylatTipus.Szamla ||
      this.bizonylatservice.bizonylatTipus === BizonylatTipus.BejovoSzamla);
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
    // itt másolat szokott készülni az aktuális rekordról
    // most a complex miatt egyszerűbb újra lekérni

    this.eppFrissit = true;
    this.bizonylatservice.GetComplex(this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Bizonylatkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatservice.ComplexDtoEdited = res.Result[0];

        this.bizonylatservice.uj = false;
        this.eppFrissit = false;
        this.bizonylatservice.EgyMode = BizonylatEgyMode.Modositas;
        this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.List;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
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
    this.eppFrissit = true;
    this._penztarsevice.ReadByCurrencyOpened(this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Penznemkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatservice.BizonylatPenztarDto = res.Result;

        this.bizonylatservice.EgyMode = BizonylatEgyMode.Penztar;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
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
  formaiellenorzes() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Formaiellenorzes;
  }
  osnxml() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.OSNxml;
  }
  vagolap() {
    this._vagolapservice.bizonylatotvagolapra();
    this.abu.Uzenet('A(z) ' + this.bizonylatservice.bizonylatLeiro.BizonylatNev + ' a vágólapra került!');
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
