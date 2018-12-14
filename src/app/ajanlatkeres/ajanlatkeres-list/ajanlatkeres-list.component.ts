import {Component, OnDestroy, ViewChild} from '@angular/core';
import {AjanlatkeresService} from '../ajanlatkeres.service';
import {Szempont} from '../../enums/szempont';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {SzMT} from '../../dtos/szmt';
import {AjanlatkeresDto} from '../ajanlatkeresdto';
import {ProjektDto} from '../../projekt/projekt/projektdto';
import {AjanlatkeresContainerMode} from '../ajanlatkerescontainermode';
import {AjanlatkeresEgyMode} from '../ajanlatkeresegymode';
import {JogKod} from '../../enums/jogkod';
import {LogonService} from '../../logon/logon.service';

@Component({
  selector: 'app-ajanlatkeres-list',
  templateUrl: './ajanlatkeres-list.component.html',
  styleUrls: ['./ajanlatkeres-list.component.css']
})
export class AjanlatkeresListComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Id', 'Ügynök', 'Név', 'Cím', 'Email', 'Telefonszám'];

  szempontok = [
    Szempont.Kod, Szempont.Ugynoknev, Szempont.Nev, Szempont.Cim, Szempont.Email,
    Szempont.Telefonszam
  ];

  eppFrissit = false;
  mod = false;
  ajanlatkeresservice: AjanlatkeresService;

  constructor(private _logonservice: LogonService,
              ajanlatkeresservice: AjanlatkeresService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.AJANLATKERESMOD]);
    this.ajanlatkeresservice = ajanlatkeresservice;
  }

  onKereses() {
    this.ajanlatkeresservice.Dto = new Array<AjanlatkeresDto>();
    this.ajanlatkeresservice.DtoSelectedIndex = -1;
    this.ajanlatkeresservice.OsszesRekord = 0;

    this.ajanlatkeresservice.elsokereses = true;
    this.ajanlatkeresservice.fp.rekordtol = 0;
    this.ajanlatkeresservice.fp.fi = new Array<SzMT>();

    this.ajanlatkeresservice.fp.fi.push(new SzMT(this.szempontok[this.ajanlatkeresservice.szempont], this.ajanlatkeresservice.minta));

    this.onKeresesTovabb();
  }
  onKeresesTovabb() {
    this.eppFrissit = true;
    this.ajanlatkeresservice.Select(this.ajanlatkeresservice.fp)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.ajanlatkeresservice.elsokereses) {
          this.ajanlatkeresservice.Dto = res.Result;
          this.ajanlatkeresservice.elsokereses = false;
        } else {
          const buf = [...this.ajanlatkeresservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.ajanlatkeresservice.Dto = buf;
        }
        this.ajanlatkeresservice.OsszesRekord = res.OsszesRekord;

        this.ajanlatkeresservice.fp.rekordtol += this.ajanlatkeresservice.fp.lapmeret;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  setClickedRow(i: number) {
    this.ajanlatkeresservice.ProjektDto = new Array<ProjektDto>();

    this.ajanlatkeresservice.DtoSelectedIndex = i;
    this.ajanlatkeresservice.ContainerMode = AjanlatkeresContainerMode.Egy;
    this.ajanlatkeresservice.EgyMode = AjanlatkeresEgyMode.Reszletek;
  }
  uj() {
    this.eppFrissit = true;
    this.ajanlatkeresservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.ajanlatkeresservice.uj = true;
        this.ajanlatkeresservice.DtoEdited = res.Result[0];
        this.ajanlatkeresservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.ajanlatkeresservice.ContainerMode = AjanlatkeresContainerMode.Uj;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}