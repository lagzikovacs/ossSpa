import {Component, ViewChild} from '@angular/core';
import {ProjektService} from "../projekt.service";
import {ErrormodalComponent} from "../../../tools/errormodal/errormodal.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-projekt-muszakiallapot',
  templateUrl: './projekt-muszakiallapot.component.html',
  styleUrls: ['./projekt-muszakiallapot.component.css']
})
export class ProjektMuszakiallapotComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektservice: ProjektService;

  entries = ['', 'Nincs elkezdve a kivitelezése', 'Elkezdve a kivitelezése', 'Beüzemelve, hiányos', 'Beüzemelve, átadva'];
  selected = '';
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  change(entry) {
    this.selected = entry;
  }

  onSubmit() {
    this.eppFrissit = true;

    this.projektservice.DtoEdited.MUSZAKIALLAPOT = this.selected;
    this.projektservice.Update(this.projektservice.DtoEdited)
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        return this.projektservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        this.projektservice.Dto[this.projektservice.DtoSelectedIndex] = res1.Result[0];
        this.navigal();
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this.navigal();
  }

  navigal() {
    this._router.navigate(['../blank'], {relativeTo: this._route});
  }
}
