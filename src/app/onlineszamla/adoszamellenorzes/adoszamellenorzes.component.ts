import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {OnlineszamlaService} from '../onlineszamla.service';

@Component({
  selector: 'app-adoszamellenorzes',
  templateUrl: './adoszamellenorzes.component.html'
})
export class AdoszamellenorzesComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  eppFrissit = false;
  navfeltoltesservice: OnlineszamlaService;
  adoszam = '';
  valasz = '';

  constructor(navfeltoltesservice: OnlineszamlaService  ) {
    this.navfeltoltesservice = navfeltoltesservice;
  }

  onSubmit() {
    this.valasz = '';
    this.eppFrissit = true;
    this.navfeltoltesservice.Adoszamellenorzes(this.adoszam)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.valasz = res.Result;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
