import {Component, ViewChild} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {ProjektEgyMode} from "../projektegymode";

@Component({
  selector: 'app-projekt-napelem',
  templateUrl: './projekt-napelem.component.html',
  styleUrls: ['./projekt-napelem.component.css']
})
export class ProjektNapelemComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektservice: ProjektService;

  entries = ['', 'Nincs megrendelve', 'Megrendelve', 'Raktárban', 'Kiszálítva/telepítve', 'Harmadik fél biztosítja'];
  selected = '';
  eppFrissit = false;

  constructor(projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  change(entry) {
    this.selected = entry;
  }

  onSubmit() {
    this.eppFrissit = true;

    this.projektservice.DtoEdited.NAPELEMALLAPOT = this.selected;
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
    this.projektservice.EgyMode = ProjektEgyMode.Reszletek;
  }
}
