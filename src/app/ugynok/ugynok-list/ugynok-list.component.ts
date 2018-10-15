import {Component, ViewChild} from '@angular/core';
import {FeliratkozasService} from '../ugynok.service';
import {Szempont} from '../../enums/szempont';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {SzMT} from '../../dtos/szmt';
import {FeliratkozasDto} from '../ugynokdto';
import {ProjektDto} from '../../projekt/projekt/projektdto';
import {FeliratkozasContainerMode} from '../ugynokcontainermode';
import {FeliratkozasEgyMode} from '../ugynokegymode';

@Component({
  selector: 'app-feliratkozas-list',
  templateUrl: './ugynok-list.component.html',
  styleUrls: ['./ugynok-list.component.css']
})
export class FeliratkozasListComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Id', 'Lista', 'Név', 'Cím', 'Email', 'Telefonszám'];

  szempontok = [
    Szempont.Kod, Szempont.Lista, Szempont.Nev, Szempont.Telepules, Szempont.Email,
    Szempont.Telefonszam
  ];

  eppFrissit = false;
  feliratkozasservice: FeliratkozasService;

  constructor(feliratkozasservice: FeliratkozasService) {
    this.feliratkozasservice = feliratkozasservice;
  }

  onKereses() {
    this.feliratkozasservice.Dto = new Array<FeliratkozasDto>();
    this.feliratkozasservice.DtoSelectedIndex = -1;
    this.feliratkozasservice.OsszesRekord = 0;

    this.feliratkozasservice.elsokereses = true;
    this.feliratkozasservice.fp.rekordtol = 0;
    this.feliratkozasservice.fp.fi = new Array<SzMT>();

    this.feliratkozasservice.fp.fi.push(new SzMT(this.szempontok[this.feliratkozasservice.szempont], this.feliratkozasservice.minta));

    this.onKeresesTovabb();
  }
  onKeresesTovabb() {
    this.eppFrissit = true;
    this.feliratkozasservice.Select(this.feliratkozasservice.fp)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.feliratkozasservice.elsokereses) {
          this.feliratkozasservice.Dto = res.Result;
          this.feliratkozasservice.elsokereses = false;
        } else {
          const buf = [...this.feliratkozasservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.feliratkozasservice.Dto = buf;
        }
        this.feliratkozasservice.OsszesRekord = res.OsszesRekord;

        this.feliratkozasservice.fp.rekordtol += this.feliratkozasservice.fp.lapmeret;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  setClickedRow(i: number) {
    this.feliratkozasservice.ProjektDto = new Array<ProjektDto>();

    this.feliratkozasservice.DtoSelectedIndex = i;
    this.feliratkozasservice.ContainerMode = FeliratkozasContainerMode.Egy;
    this.feliratkozasservice.EgyMode = FeliratkozasEgyMode.Reszletek;
  }
}
