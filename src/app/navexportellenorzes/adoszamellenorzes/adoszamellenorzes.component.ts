import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {NavexportellenorzesService} from '../navexportellenorzes.service';

@Component({
  selector: 'app-adoszamellenorzes',
  templateUrl: './adoszamellenorzes.component.html',
  styleUrls: ['./adoszamellenorzes.component.css']
})
export class AdoszamellenorzesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  eppFrissit = false;
  navexportellenorzesservice: NavexportellenorzesService;
  adoszam = '';
  valasz = '';

  constructor(navexportellenorzesservice: NavexportellenorzesService  ) {
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
}
