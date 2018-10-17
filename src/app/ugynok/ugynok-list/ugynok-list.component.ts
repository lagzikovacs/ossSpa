import {Component, OnDestroy, ViewChild} from '@angular/core';
import {UgynokService} from '../ugynok.service';
import {Szempont} from '../../enums/szempont';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {SzMT} from '../../dtos/szmt';
import {UgynokDto} from '../ugynokdto';
import {ProjektDto} from '../../projekt/projekt/projektdto';
import {UgynokContainerMode} from '../ugynokcontainermode';
import {UgynokEgyMode} from '../ugynokegymode';

@Component({
  selector: 'app-ugynok-list',
  templateUrl: './ugynok-list.component.html',
  styleUrls: ['./ugynok-list.component.css']
})
export class UgynokListComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Id', 'Ügynök', 'Név', 'Cím', 'Email', 'Telefonszám'];

  szempontok = [
    Szempont.Kod, Szempont.Ugynoknev, Szempont.Nev, Szempont.Cim, Szempont.Email,
    Szempont.Telefonszam
  ];

  eppFrissit = false;
  ugynokservice: UgynokService;

  constructor(ugynokservice: UgynokService) {
    this.ugynokservice = ugynokservice;
  }

  onKereses() {
    this.ugynokservice.Dto = new Array<UgynokDto>();
    this.ugynokservice.DtoSelectedIndex = -1;
    this.ugynokservice.OsszesRekord = 0;

    this.ugynokservice.elsokereses = true;
    this.ugynokservice.fp.rekordtol = 0;
    this.ugynokservice.fp.fi = new Array<SzMT>();

    this.ugynokservice.fp.fi.push(new SzMT(this.szempontok[this.ugynokservice.szempont], this.ugynokservice.minta));

    this.onKeresesTovabb();
  }
  onKeresesTovabb() {
    this.eppFrissit = true;
    this.ugynokservice.Select(this.ugynokservice.fp)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.ugynokservice.elsokereses) {
          this.ugynokservice.Dto = res.Result;
          this.ugynokservice.elsokereses = false;
        } else {
          const buf = [...this.ugynokservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.ugynokservice.Dto = buf;
        }
        this.ugynokservice.OsszesRekord = res.OsszesRekord;

        this.ugynokservice.fp.rekordtol += this.ugynokservice.fp.lapmeret;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  setClickedRow(i: number) {
    this.ugynokservice.ProjektDto = new Array<ProjektDto>();

    this.ugynokservice.DtoSelectedIndex = i;
    this.ugynokservice.ContainerMode = UgynokContainerMode.Egy;
    this.ugynokservice.EgyMode = UgynokEgyMode.Reszletek;
  }
  uj() {
    this.eppFrissit = true;
    this.ugynokservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.ugynokservice.uj = true;
        this.ugynokservice.DtoEdited = res.Result[0];
        this.ugynokservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.ugynokservice.ContainerMode = UgynokContainerMode.Uj;
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
