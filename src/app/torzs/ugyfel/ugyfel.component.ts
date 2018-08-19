import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {Szempont} from '../../enums/szempont';
import {UgyfelService} from '../../services/torzs/ugyfel.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UgyfelDto} from '../../dtos/torzs/ugyfel/ugyfeldto';
import {SzMT} from '../../dtos/szmt';
import {LogonService} from '../../services/segedeszkosz/logon.service';
import {JogKod} from '../../enums/jogkod';

@Component({
  selector: 'app-ugyfel',
  templateUrl: './ugyfel.component.html',
  styleUrls: ['./ugyfel.component.css']
})
export class UgyfelComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Ügyfél', 'Email'];
  szempontok = [
    Szempont.Nev, Szempont.UgyfelEmail
  ];

  eppFrissit = false;
  mod = false;
  ugyfelservice: UgyfelService;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
              ugyfelservice: UgyfelService  ) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.UGYFELEKMOD]);
    this.ugyfelservice = ugyfelservice;
  }

  onKereses() {
    this.ugyfelservice.Dto = new Array<UgyfelDto>();
    this.ugyfelservice.DtoSelectedIndex = -1;
    this.ugyfelservice.OsszesRekord = 0;

    this.ugyfelservice.elsokereses = true;
    this.ugyfelservice.up.rekordtol = 0;
    this.ugyfelservice.up.fi = new Array<SzMT>();

    this.ugyfelservice.up.fi.push(new SzMT(this.szempontok[this.ugyfelservice.szempont], this.ugyfelservice.minta));

    this.onKeresesTovabb();
  }
  onKeresesTovabb() {
    this.eppFrissit = true;
    this.ugyfelservice.Select(this.ugyfelservice.up)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.ugyfelservice.elsokereses) {
          this.ugyfelservice.Dto = res.Result;
          this.ugyfelservice.elsokereses = false;
        } else {
          const buf = [...this.ugyfelservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.ugyfelservice.Dto = buf;
        }
        this.ugyfelservice.OsszesRekord = res.OsszesRekord;

        this.ugyfelservice.up.rekordtol += this.ugyfelservice.up.lapmeret;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  selectforzoom(i: number) {
    this.setClickedRow(i);
  }
  stopzoom() {
    this.ugyfelservice.zoom = false;
    this._router.navigate(['../blank'], {relativeTo: this._route});
  }

  setClickedRow(i: number) {
    this.ugyfelservice.DtoSelectedIndex = i;
    this.ugyfelservice.uj = false;
    this._router.navigate(['../ugyfelegy'], {relativeTo: this._route});
  }

  onUj() {
    this.eppFrissit = true;
    this.ugyfelservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.ugyfelservice.uj = true;
        this.ugyfelservice.DtoEdited = res.Result[0];
        this.ugyfelservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this._router.navigate(['../ugyfeluj'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}
