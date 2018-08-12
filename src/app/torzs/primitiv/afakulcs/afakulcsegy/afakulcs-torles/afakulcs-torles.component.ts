import {Component, OnInit, ViewChild} from '@angular/core';
import {AfakulcsService} from "../../../../../services/torzs/primitiv/afakulcs.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrormodalComponent} from "../../../../../tools/errormodal/errormodal.component";

@Component({
  selector: 'app-afakulcs-torles',
  templateUrl: './afakulcs-torles.component.html',
  styleUrls: ['./afakulcs-torles.component.css']
})
export class AfakulcsTorlesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  afakulcsservice: AfakulcsService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              afakulcsservice: AfakulcsService) {
    this.afakulcsservice = afakulcsservice;
  }

  ngOnInit() {
    if (this.afakulcsservice.DtoSelectedIndex === -1) {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }

  ok() {
    this.eppFrissit = true;
    this.afakulcsservice.Delete(this.afakulcsservice.Dto[this.afakulcsservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.afakulcsservice.Dto.splice(this.afakulcsservice.DtoSelectedIndex, 1);
        this.afakulcsservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this._router.navigate(['../../afakulcs'], {relativeTo: this._route});
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
