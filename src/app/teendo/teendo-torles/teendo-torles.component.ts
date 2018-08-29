import {Component, OnInit, ViewChild} from '@angular/core';
import {TeendoService} from '../teendo.service';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-teendo-torles',
  templateUrl: './teendo-torles.component.html',
  styleUrls: ['./teendo-torles.component.css']
})
export class TeendoTorlesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  teendoservice: TeendoService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              teendoservice: TeendoService) {
    this.teendoservice = teendoservice;
  }

  ngOnInit() {
    if (this.teendoservice.DtoSelectedIndex === -1) {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }

  ok() {
    this.eppFrissit = true;
    this.teendoservice.Delete(this.teendoservice.Dto[this.teendoservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.teendoservice.Dto.splice(this.teendoservice.DtoSelectedIndex, 1);
        this.teendoservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this._router.navigate(['../../teendo-list'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this._router.navigate(['../blank'], {relativeTo: this._route});
  }
}
