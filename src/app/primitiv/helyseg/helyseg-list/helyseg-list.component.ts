import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HelysegService} from '../helyseg.service';
import {LogonService} from '../../../logon/logon.service';
import {UgyfelService} from '../../../ugyfel/ugyfel.service';
import {JogKod} from '../../../enums/jogkod';
import {HelysegContainerMode} from '../helysegcontainermode';
import {ZoomSources} from '../../../enums/zoomsources';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {HelysegEgyMode} from '../helysegegymode';
import {UgyfelSzerkesztesMode} from '../../../ugyfel/ugyfelszerkesztesmode';

@Component({
  selector: 'app-helyseg-list',
  templateUrl: './helyseg-list.component.html',
  styleUrls: ['./helyseg-list.component.css']
})
export class HelysegListComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Helység'];

  eppFrissit = false;
  mod = false;
  ti = -1;

  helysegservice: HelysegService;

  constructor(private _logonservice: LogonService,
              helysegservice: HelysegService,
              private ugyfelservice: UgyfelService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.helysegservice = helysegservice;
  }

  ngOnInit() {
    if (this.helysegservice.zoom) {
      this.onKereses();
    }
  }

  onKereses() {
    this.helysegservice.elsokereses = true;
    this.helysegservice.ekDto.rekordtol = 0;

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.helysegservice.Read(this.helysegservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.helysegservice.elsokereses) {
          this.helysegservice.Dto = res.Result;
          this.helysegservice.elsokereses = false;
        } else {
          const buf = [...this.helysegservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.helysegservice.Dto = buf;
        }

        this.eppFrissit = false;

        if (this.helysegservice.zoom) {
          window.scrollTo(0, document.body.scrollHeight);
        }
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  selectforzoom(i: number) {
    if (this.helysegservice.zoomsource === ZoomSources.Ugyfel) {
      this.ugyfelservice.DtoEdited.Helysegkod = this.helysegservice.Dto[i].Helysegkod;
      this.ugyfelservice.DtoEdited.Helysegnev = this.helysegservice.Dto[i].Helysegnev;

      this.stopzoom();
    }
  }
  stopzoom() {
    this.helysegservice.zoom = false;

    this.ugyfelservice.SzerkesztesMode = UgyfelSzerkesztesMode.Blank;
  }

  setClickedRow(i: number) {
    this.helysegservice.DtoSelectedIndex = i;
    this.helysegservice.uj = false;
    this.helysegservice.ContainerMode = HelysegContainerMode.Egy;
    this.helysegservice.EgyMode = HelysegEgyMode.Reszletek;
  }

  uj() {
    this.eppFrissit = true;
    this.helysegservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.helysegservice.uj = true;
        this.helysegservice.DtoEdited = res.Result[0];
        this.helysegservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.helysegservice.ContainerMode = HelysegContainerMode.Uj;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
