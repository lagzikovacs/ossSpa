import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjektteendoService} from '../projektteendo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-projekt-teendo-torles',
  templateUrl: './projekt-teendo-torles.component.html',
  styleUrls: ['./projekt-teendo-torles.component.css']
})
export class ProjektTeendoTorlesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektteendoservice: ProjektteendoService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              projektteendoservice: ProjektteendoService) {
    this.projektteendoservice = projektteendoservice;
  }

  ngOnInit() {
    if (this.projektteendoservice.DtoSelectedIndex === -1) {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }

  ok() {
    this.eppFrissit = true;
    this.projektteendoservice.Delete(this.projektteendoservice.Dto[this.projektteendoservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.projektteendoservice.Dto.splice(this.projektteendoservice.DtoSelectedIndex, 1);
        this.projektteendoservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this._router.navigate(['../../projektteendo'], {relativeTo: this._route});
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
