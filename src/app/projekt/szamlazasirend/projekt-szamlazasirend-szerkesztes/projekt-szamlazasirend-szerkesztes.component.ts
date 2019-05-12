import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SzamlazasirendService} from '../szamlazasirend.service';
import {PenznemService} from '../../../penznem/penznem.service';
import {ZoomSources} from '../../../enums/zoomsources';
import {PenznemZoomParameter} from '../../../penznem/penznemzoomparameter';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {ProjektService} from '../../projekt/projekt.service';
import {SzamlazasirendEgyMode} from '../szamlazasirendegymode';
import {SzamlazasirendContainerMode} from '../szamlazasirendcontainermode';
import {PenznemContainerMode} from '../../../penznem/penznemcontainermode';
import {SzamlazasirendSzerkesztesMode} from '../szamlazasirendszerkesztesmode';

@Component({
  selector: 'app-projekt-szamlazasirend-szerkesztes',
  templateUrl: './projekt-szamlazasirend-szerkesztes.component.html',
  styleUrls: ['./projekt-szamlazasirend-szerkesztes.component.css']
})
export class ProjektSzamlazasirendSzerkesztesComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szamlazasirendservice: SzamlazasirendService;
  eppFrissit = false;

  constructor(szamlazasirendservice: SzamlazasirendService,
              private _penznemservice: PenznemService,
              private _projektservice: ProjektService) {
    this.szamlazasirendservice = szamlazasirendservice;
  }

  ngOnInit() {
  }

  onSubmit() {
    this._penznemservice.ZoomCheck(new PenznemZoomParameter(this.szamlazasirendservice.DtoEdited.Penznemkod || 0,
      this.szamlazasirendservice.DtoEdited.Penznem || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        if (this.szamlazasirendservice.uj) {
          this.szamlazasirendservice.DtoEdited.Projektkod = this._projektservice.Dto[this._projektservice.DtoSelectedIndex].Projektkod;
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
      this.szamlazasirendservice.ContainerMode = SzamlazasirendContainerMode.List;
    } else {
      this.szamlazasirendservice.EgyMode = SzamlazasirendEgyMode.Reszletek;
    }
  }

  PenznemZoom() {
    this._penznemservice.ekDto.minta = this.szamlazasirendservice.DtoEdited.Penznem || '';
    this._penznemservice.zoomsource = ZoomSources.Szamlazasirend;
    this._penznemservice.zoom = true;
    this._penznemservice.ContainerMode = PenznemContainerMode.List;

    this.szamlazasirendservice.SzerkesztesMode = SzamlazasirendSzerkesztesMode.PenznemZoom;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
