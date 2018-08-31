import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {ProjektService} from '../projekt.service';
import {SzMT} from '../../../dtos/szmt';
import {Szempont} from '../../../enums/szempont';
import {ProjektContainerMode} from "../projektcontainermode";
import {ProjektEgyMode} from "../projektegymode";
import {ProjektSzerkesztesMode} from "../projektszerkesztesmode";

@Component({
  selector: 'app-projekt-list',
  templateUrl: './projekt-list.component.html',
  styleUrls: ['./projekt-list.component.css']
})
export class ProjektListComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  statuszszurok = [
    '(0) Mind', '(1) Ajánlat', '(2) Fut', '(3) Kész', '(4) Pályázatra vár', '(5) Mástól megrendelte',
    '(6) Döglött', '(7) Csak érdeklődött', '(8) Helyszíni felmérést kér', '(9) Kommunikál, van remény',
    '(10) Még papírozni kell', '(11) Elhalasztva', '(12) Passzív', '(13) Felmérés után', '(14) Roadshow-ra jelentkezett',
  ];
  teendoszurok = ['Mind', 'Teendő', 'Saját teendő', 'Lejárt teendő'];
  szurok = ['Id', 'Ügyfél', 'Ügyfélcím', 'Email', 'Telefon', 'Telepítési cím', 'Keletkezett', 'Műszaki állapot'];

  teendoSzempontok = [
    Szempont.Null, Szempont.CsakHaTeendo,
    Szempont.SajatTeendo, Szempont.CsakHaLejartTeendo
  ];
  szempontok = [
    Szempont.Kod, Szempont.Ugyfel,
    Szempont.UgyfelCim, Szempont.UgyfelEmail, Szempont.UgyfelTelefonszam,
    Szempont.TelepitesiCim, Szempont.Keletkezett, Szempont.MuszakiAllapot
  ];

  eppFrissit = false;
  projektservice: ProjektService;

  constructor(projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  onKereses() {
    this.projektservice.elsokereses = true;
    this.projektservice.pp.rekordtol = 0;
    this.projektservice.pp.statusz = this.projektservice.statuszszempont;
    this.projektservice.pp.fi = new Array();
    if (this.projektservice.teendoszempont !== 0) {
      this.projektservice.pp.fi.push(new SzMT(this.teendoSzempontok[this.projektservice.teendoszempont], ''));
    }
    this.projektservice.pp.fi.push(new SzMT(this.szempontok[this.projektservice.szempont], this.projektservice.minta));

    this.onKeresesTovabb();
  }
  onKeresesTovabb() {
    this.eppFrissit = true;
    this.projektservice.Select(this.projektservice.pp)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.projektservice.elsokereses) {
          this.projektservice.Dto = res.Result;
          this.projektservice.elsokereses = false;
        } else {
          const buf = [...this.projektservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.projektservice.Dto = buf;
        }
        this.projektservice.OsszesRekord = res.OsszesRekord;

        this.projektservice.pp.rekordtol += this.projektservice.pp.lapmeret;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  setClickedRow(i: number) {
    this.projektservice.DtoSelectedIndex = i;
    this.projektservice.ContainerMode = ProjektContainerMode.Egy;
    this.projektservice.EgyMode = ProjektEgyMode.Reszletek;
    this.projektservice.SzerkesztesMode = ProjektSzerkesztesMode.Blank;
  }

  onUj() {
    this.eppFrissit = true;
    this.projektservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.projektservice.DtoEdited = res.Result[0];
        this.projektservice.uj = true;
        this.eppFrissit = false;
        this.projektservice.ContainerMode = ProjektContainerMode.Uj;
        this.projektservice.SzerkesztesMode = ProjektSzerkesztesMode.Blank;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}
