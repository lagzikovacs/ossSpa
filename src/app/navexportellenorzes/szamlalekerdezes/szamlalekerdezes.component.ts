import {Component, ViewChild} from '@angular/core';
import {NavexportellenorzesService} from "../navexportellenorzes.service";
import {ErrormodalComponent} from "../../errormodal/errormodal.component";

@Component({
  selector: 'app-szamlalekerdezes',
  templateUrl: './szamlalekerdezes.component.html',
  styleUrls: ['./szamlalekerdezes.component.css']
})
export class SzamlalekerdezesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  eppFrissit = false;
  navexportellenorzesservice: NavexportellenorzesService;
  szamlaszam = '';
  valasz = '';

  constructor(navexportellenorzesservice: NavexportellenorzesService  ) {
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
}
