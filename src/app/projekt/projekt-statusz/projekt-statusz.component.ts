import {Component, ViewChild} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-projekt-statusz',
  templateUrl: './projekt-statusz.component.html',
  styleUrls: ['./projekt-statusz.component.css']
})
export class ProjektStatuszComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektservice: ProjektService;

  entries = ['(0) Mind', '(1) Ajánlat', '(2) Fut', '(3) Kész', '(4) Pályázatra vár', '(5) Mástól megrendelte', '(6) Döglött',
    '(7) Csak érdeklődött', '(8) Helyszíni felmérést kér', '(9) Kommunikál, van remény', '(10) Még papírozni kell',
    '(11) Elhalasztva', '(12) Passzív', '(13) Felmérés után', '(14) Roadshow-ra jelentkezett'];
  selected = 0;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  change(i) {
    this.selected = i;
    console.log(this.selected);
  }

  onSubmit() {
    this.eppFrissit = true;

    this.projektservice.DtoEdited.STATUSZ = this.selected;
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
