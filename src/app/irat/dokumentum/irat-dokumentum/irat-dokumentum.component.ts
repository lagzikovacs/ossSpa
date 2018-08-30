import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {DokumentumService} from '../dokumentum.service';
import {IratService} from '../../irat.service';
import {DokumentumDto} from '../../../dtos/dokumentum/dokumentumdto';

@Component({
  selector: 'app-irat-dokumentum',
  templateUrl: './irat-dokumentum.component.html',
  styleUrls: ['./irat-dokumentum.component.css']
})
export class IratDokumentumComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  dokumentumservice: DokumentumService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              dokumentumservice: DokumentumService,
              private _iratservice: IratService) {
    this.dokumentumservice = dokumentumservice;
  }

  ngOnInit() {
    // TODO hibás állapotok kiszűrése

    this.eppFrissit = true;
    this.dokumentumservice.Dto = DokumentumDto[0];
    this.dokumentumservice.Select(this._iratservice.Dto[this._iratservice.DtoSelectedIndex].IRATKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.dokumentumservice.Dto = res.Result;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  setClickedRow(i: number) {
    this.dokumentumservice.DtoSelectedIndex = i;
    this.dokumentumservice.uj = false;
    this._router.navigate(['../dokumentumegy'], {relativeTo: this._route});
  }
  feltoltes() {
    // csak h üres rekordot mutasson
    this.dokumentumservice.DtoEdited = new DokumentumDto();
    this.dokumentumservice.uj = true;
    this._router.navigate(['../dokumentumfeltoltes'], {relativeTo: this._route});
  }
}
