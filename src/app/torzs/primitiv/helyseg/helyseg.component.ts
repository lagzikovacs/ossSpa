import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {HelysegService} from '../../../services/helyseg.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ZoomSources} from '../../../enums/zoomsources';
import {UgyfelService} from '../../../services/ugyfel.service';

@Component({
  selector: 'app-helyseg',
  templateUrl: './helyseg.component.html',
  styleUrls: ['./helyseg.component.css']
})
export class HelysegComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Helység'];

  eppFrissit = false;
  helysegservice: HelysegService;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              helysegservice: HelysegService,
              private ugyfelservice: UgyfelService) {
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
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  selectforzoom(i: number) {
    if (this.helysegservice.zoomsource === ZoomSources.Ugyfel) {
      this.ugyfelservice.DtoEdited.HELYSEGKOD = this.helysegservice.Dto[i].HELYSEGKOD;
      this.ugyfelservice.DtoEdited.HELYSEGNEV = this.helysegservice.Dto[i].HELYSEGNEV;

      this.stopzoom();
    }
  }
  stopzoom() {
    this.helysegservice.zoom = false;
    this._router.navigate(['../blank'], {relativeTo: this._route});
  }

  setClickedRow(i: number) {
    this.helysegservice.DtoSelectedIndex = i;
    this.helysegservice.uj = false;
    this._router.navigate(['../helysegegy'], {relativeTo: this._route});
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

        this._router.navigate(['../helyseguj'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}
