import {Component, ViewChild} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {Szempont} from '../../enums/szempont';
import {SzMT} from '../../dtos/szmt';

@Component({
  selector: 'app-bizonylat-list',
  templateUrl: './bizonylat-list.component.html',
  styleUrls: ['./bizonylat-list.component.css']
})
export class BizonylatListComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Id', 'Bizonylatszám', 'Ügyfél'];
  szempontok = [
    Szempont.Kod, Szempont.Bizonylatszam, Szempont.Ugyfel,
  ];

  bizonylatservice: BizonylatService;
  eppFrissit = false;

  constructor(bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  onKereses() {
    this.bizonylatservice.elsokereses = true;
    this.bizonylatservice.bp.rekordtol = 0;
    this.bizonylatservice.bp.fi = new Array();
    this.bizonylatservice.bp.BizonylatTipus = this.bizonylatservice.bizonylatTipus;
    this.bizonylatservice.bp.fi.push(new SzMT(this.szempontok[this.bizonylatservice.szempont], this.bizonylatservice.minta));

    this.onKeresesTovabb();
  }
  onKeresesTovabb() {
    this.eppFrissit = true;
    this.bizonylatservice.Select(this.bizonylatservice.bp)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        console.log(res);
        if (this.bizonylatservice.elsokereses) {
          this.bizonylatservice.Dto = res.Result;
          this.bizonylatservice.elsokereses = false;
        } else {
          const buf = [...this.bizonylatservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.bizonylatservice.Dto = buf;
        }
        this.bizonylatservice.OsszesRekord = res.OsszesRekord;

        this.bizonylatservice.bp.rekordtol += this.bizonylatservice.bp.lapmeret;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  setClickedRow(i: number) {
    // this.projektservice.DtoSelectedIndex = i;
    //
    // const ProjektKod = this.projektservice.Dto[this.projektservice.DtoSelectedIndex].PROJEKTKOD;
    // const UgyfelKod = this.projektservice.Dto[this.projektservice.DtoSelectedIndex].UGYFELKOD;
    //
    // this._projektkapcsolatservice.ProjektKod = ProjektKod;
    // this._projektkapcsolatservice.UgyfelKod = UgyfelKod;
    // this._szamlazasirendservice.ProjektKod = ProjektKod;
    // this._projektteendoservice.ProjektKod = ProjektKod;
    //
    // this.eppFrissit = true;
    // this._projektkapcsolatservice.Kereses()
    //   .then(res => {
    //     return this._szamlazasirendservice.Kereses();
    //   })
    //   .then(res1 => {
    //     return this._projektteendoservice.Kereses();
    //   })
    //   .then(res2 => {
    //     this.projektservice.ContainerMode = ProjektContainerMode.Egy;
    //     this.projektservice.EgyMode = ProjektEgyMode.Bizonylatesirat;
    //     this.projektservice.SzerkesztesMode = ProjektSzerkesztesMode.Blank;
    //
    //     this._projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.List;
    //
    //     this.eppFrissit = false;
    //   })
    //   .catch(err => {
    //     this.eppFrissit = false;
    //     this.errormodal.show(err);
    //   });
  }

  onUj() {
    // this.eppFrissit = true;
    // this.projektservice.CreateNew()
    //   .then(res => {
    //     if (res.Error !== null) {
    //       throw res.Error;
    //     }
    //
    //     this.projektservice.DtoEdited = res.Result[0];
    //     this.projektservice.uj = true;
    //     this.eppFrissit = false;
    //     this.projektservice.ContainerMode = ProjektContainerMode.Uj;
    //     this.projektservice.SzerkesztesMode = ProjektSzerkesztesMode.Blank;
    //   })
    //   .catch(err => {
    //     this.eppFrissit = false;
    //     this.errormodal.show(err);
    //   });
  }
}
