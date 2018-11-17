import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {NavfeltoltesService} from '../navfeltoltes.service';

@Component({
  selector: 'app-adoszamellenorzes',
  templateUrl: './adoszamlekerdezes.component.html',
  styleUrls: ['./adoszamlekerdezes.component.css']
})
export class AdoszamlekerdezesComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  eppFrissit = false;
  navexportellenorzesservice: NavfeltoltesService;
  adoszam = '';
  valasz = '';

  constructor(navexportellenorzesservice: NavfeltoltesService  ) {
    this.navexportellenorzesservice = navexportellenorzesservice;
  }

  onSubmit() {
    this.valasz = '';
    this.eppFrissit = true;
    this.navexportellenorzesservice.Adoszamellenorzes(this.adoszam)
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
