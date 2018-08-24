import {Component, OnInit, ViewChild} from '@angular/core';
import {SzamlazasirendService} from '../../../../../../services/eszkoz/projekt/szamlazasirend.service';
import {PenznemService} from '../../../../../../services/torzs/primitiv/penznem.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ZoomSources} from '../../../../../../enums/zoomsources';
import {PenznemZoomParameter} from '../../../../../../dtos/primitiv/penznem/penznemzoomparameter';
import {ErrormodalComponent} from '../../../../../../tools/errormodal/errormodal.component';
import {ProjektService} from "../../../../../../services/eszkoz/projekt/projekt.service";

@Component({
  selector: 'app-projekt-szamlazasirend-szerkesztes',
  templateUrl: './projekt-szamlazasirend-szerkesztes.component.html',
  styleUrls: ['./projekt-szamlazasirend-szerkesztes.component.css']
})
export class ProjektSzamlazasirendSzerkesztesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szamlazasirendservice: SzamlazasirendService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              szamlazasirendservice: SzamlazasirendService,
              private _penznemservice: PenznemService,
              private _projektservice: ProjektService) {
    this.szamlazasirendservice = szamlazasirendservice;
  }

  ngOnInit() {
  }

  onSubmit() {
    this._penznemservice.ZoomCheck(new PenznemZoomParameter(this.szamlazasirendservice.DtoEdited.PENZNEMKOD || 0,
      this.szamlazasirendservice.DtoEdited.PENZNEM || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        if (this.szamlazasirendservice.uj) {
          this.szamlazasirendservice.DtoEdited.PROJEKTKOD = this._projektservice.Dto[this._projektservice.DtoSelectedIndex].PROJEKTKOD;
          return this.szamlazasirendservice.Add(this.szamlazasirendservice.DtoEdited);
        } else {
          return this.szamlazasirendservice.Update(this.szamlazasirendservice.DtoEdited);
        }
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        return this.szamlazasirendservice.Get(res1.Result);
      })
      .then(res2 => {
        if (res2.Error !== null) {
          throw res2.Error;
        }

        if (this.szamlazasirendservice.uj) {
          this.szamlazasirendservice.Dto.unshift(res2.Result[0]);
        } else {
          this.szamlazasirendservice.Dto[this.szamlazasirendservice.DtoSelectedIndex] = res2.Result[0];
        }

        this.eppFrissit = false;
        this.navigal();
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  cancel() {
    this.navigal();
  }
  navigal() {
    if (this.szamlazasirendservice.uj) {
      this._router.navigate(['../szamlazasirend'], {relativeTo: this._route});
    } else {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }

  PenznemZoom() {
    this._penznemservice.ekDto.minta = this.szamlazasirendservice.DtoEdited.PENZNEM || '';
    this._penznemservice.zoomsource = ZoomSources.Szamlazasirend;
    this._penznemservice.zoom = true;
    this._router.navigate(['penznem'], {relativeTo: this._route});
  }
}
