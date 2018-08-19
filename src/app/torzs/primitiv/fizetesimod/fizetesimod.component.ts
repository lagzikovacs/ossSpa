import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {FizetesimodService} from '../../../services/torzs/primitiv/fizetesimod.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LogonService} from '../../../services/segedeszkosz/logon.service';
import {JogKod} from '../../../enums/jogkod';

@Component({
  selector: 'app-fizetesimod',
  templateUrl: './fizetesimod.component.html',
  styleUrls: ['./fizetesimod.component.css']
})
export class FizetesimodComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Fizetési mód'];

  eppFrissit = false;
  mod = false;
  fizetesimodservice: FizetesimodService;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
              fizetesimodservice: FizetesimodService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.fizetesimodservice = fizetesimodservice;
  }

  onKereses() {
    this.fizetesimodservice.elsokereses = true;
    this.fizetesimodservice.ekDto.rekordtol = 0;

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.fizetesimodservice.Read(this.fizetesimodservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.fizetesimodservice.elsokereses) {
          this.fizetesimodservice.Dto = res.Result;
          this.fizetesimodservice.elsokereses = false;
        } else {
          const buf = [...this.fizetesimodservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.fizetesimodservice.Dto = buf;
        }

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
    this.fizetesimodservice.zoom = false;
    this._router.navigate(['../blank'], {relativeTo: this._route});
  }

  setClickedRow(i: number) {
    this.fizetesimodservice.DtoSelectedIndex = i;
    this.fizetesimodservice.uj = false;
    this._router.navigate(['../fizetesimodegy'], {relativeTo: this._route});
  }

  uj() {
    this.eppFrissit = true;
    this.fizetesimodservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.fizetesimodservice.uj = true;
        this.fizetesimodservice.DtoEdited = res.Result[0];
        this.fizetesimodservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this._router.navigate(['../fizetesimoduj'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}
