import {Component, OnInit, ViewChild} from '@angular/core';
import {SzamlazasirendService} from "../szamlazasirend.service";
import {ErrormodalComponent} from "../../tools/errormodal/errormodal.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-projekt-szamlazasirend-torles',
  templateUrl: './projekt-szamlazasirend-torles.component.html',
  styleUrls: ['./projekt-szamlazasirend-torles.component.css']
})
export class ProjektSzamlazasirendTorlesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szamlazasirendservice: SzamlazasirendService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              cikkservice: SzamlazasirendService) {
    this.szamlazasirendservice = cikkservice;
  }

  ngOnInit() {
    if (this.szamlazasirendservice.DtoSelectedIndex === -1) {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }

  ok() {
    this.eppFrissit = true;
    this.szamlazasirendservice.Delete(this.szamlazasirendservice.Dto[this.szamlazasirendservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.szamlazasirendservice.Dto.splice(this.szamlazasirendservice.DtoSelectedIndex, 1);
        this.szamlazasirendservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this._router.navigate(['../../szamlazasirend'], {relativeTo: this._route});
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
