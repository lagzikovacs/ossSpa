import {Component, OnDestroy, ViewChild} from '@angular/core';
import {OnlineszamlaService} from '../onlineszamla.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';

@Component({
  selector: 'app-szamlalekerdezes',
  templateUrl: './szamlalekerdezes.component.html',
  styleUrls: ['./szamlalekerdezes.component.css']
})
export class SzamlalekerdezesComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  eppFrissit = false;
  navexportellenorzesservice: OnlineszamlaService;
  szamlaszam = '';
  valasz = '';

  constructor(navexportellenorzesservice: OnlineszamlaService  ) {
    this.navexportellenorzesservice = navexportellenorzesservice;
  }

  onSubmit() {
    this.valasz = '';
    this.eppFrissit = true;
    this.navexportellenorzesservice.Szamlalekerdezes(this.szamlaszam)
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
