import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';
import {IratService} from '../../../../services/irat.service';
import {IratDto} from '../../../../dtos/irat/iratdto';
import {IrattipusService} from '../../../../services/irattipus.service';

@Component({
  selector: 'app-irat-szerkesztes',
  templateUrl: './irat-szerkesztes.component.html',
  styleUrls: ['./irat-szerkesztes.component.css']
})
export class IratSzerkesztesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  iratservice: IratService;
  eppFrissit = false;
  DtoSelected = new IratDto();

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              iratservice: IratService,
              private _irattipusservice: IrattipusService) {
    this.iratservice = iratservice;
  }

  ngOnInit() {
    // TODO hibás állapotok kiszűrése

    // this.DtoSelected.KELETKEZETT = moment(this.DtoSelected.KELETKEZETT).format('YYYY-MM_DD');
  }

  onSubmit() {
// TODO dátumok konvertálása
  }
  cancel() {
    if (this.iratservice.uj) {
      this._router.navigate(['../irat'], {relativeTo: this._route});
    } else {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }

  IrattipusZoom() {
    this._irattipusservice.ekDto.minta = this.iratservice.DtoEdited.IRATTIPUS;
    this._router.navigate(['irattipus'], {relativeTo: this._route});
  }
}
