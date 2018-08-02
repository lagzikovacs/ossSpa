import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';
import {UgyfelService} from '../../../../services/ugyfel.service';
import {UgyfelDto} from '../../../../dtos/ugyfel/ugyfeldto';
import {HelysegService} from '../../../../services/helyseg.service';
import {ZoomSources} from '../../../../enums/zoomsources';

@Component({
  selector: 'app-ugyfel-szerkesztes',
  templateUrl: './ugyfel-szerkesztes.component.html',
  styleUrls: ['./ugyfel-szerkesztes.component.css']
})
export class UgyfelSzerkesztesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  ugyfelservice: UgyfelService;
  eppFrissit = false;
  DtoSelected = new UgyfelDto();

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              ugyfelservice: UgyfelService,
              private _helysegservice: HelysegService) {
    this.ugyfelservice = ugyfelservice;
  }

  ngOnInit() {
    // TODO hibás állapotok kiszűrése

    // this.DtoSelected.KELETKEZETT = moment(this.DtoSelected.KELETKEZETT).format('YYYY-MM_DD');
  }

  onSubmit() {
// TODO dátumok konvertálása
  }
  cancel() {
    if (this.ugyfelservice.uj) {
      this._router.navigate(['../ugyfel'], {relativeTo: this._route});
    } else {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }

  HelysegZoom() {
    this._helysegservice.ekDto.minta = this.ugyfelservice.DtoEdited.HELYSEGNEV;
    this._helysegservice.zoomsource = ZoomSources.Ugyfel;
    this._helysegservice.zoom = true;
    this._router.navigate(['helyseg'], {relativeTo: this._route});
  }
}
