import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {ProjektEgyMode} from '../projektegymode';
import {rowanimation} from '../../../animation/rowAnimation';

@Component({
  selector: 'app-projekt-muszakiallapot',
  templateUrl: './projekt-muszakiallapot.component.html',
  styleUrls: ['./projekt-muszakiallapot.component.css'],
  animations: [rowanimation]
})
export class ProjektMuszakiallapotComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektservice: ProjektService;

  entries = ['', 'Nincs elkezdve a kivitelezése', 'Elkezdve a kivitelezése', 'Beüzemelve, hiányos', 'Beüzemelve, átadva'];
  selected = '';
  eppFrissit = false;

  constructor(projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  ngOnInit() {
    this.selected = this.projektservice.DtoEdited.MUSZAKIALLAPOT || '';
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
    this.projektservice.EgyMode = ProjektEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
