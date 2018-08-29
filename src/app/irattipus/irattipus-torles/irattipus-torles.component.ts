import {Component, OnInit, ViewChild} from '@angular/core';
import {IrattipusService} from '../irattipus.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-irattipus-torles',
  templateUrl: './irattipus-torles.component.html',
  styleUrls: ['./irattipus-torles.component.css']
})
export class IrattipusTorlesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  irattipusservice: IrattipusService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              irattipusservice: IrattipusService) {
    this.irattipusservice = irattipusservice;
  }

  ngOnInit() {
    if (this.irattipusservice.DtoSelectedIndex === -1) {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }

  ok() {
    this.eppFrissit = true;
    this.irattipusservice.Delete(this.irattipusservice.Dto[this.irattipusservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.irattipusservice.Dto.splice(this.irattipusservice.DtoSelectedIndex, 1);
        this.irattipusservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this._router.navigate(['../../irattipus-list'], {relativeTo: this._route});
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
