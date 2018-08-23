import { Component } from '@angular/core';
import {ProjektteendoService} from '../../../../services/eszkoz/projekt/projektteendo.service';

@Component({
  selector: 'app-projekt-teendo',
  templateUrl: './projekt-teendo.component.html',
  styleUrls: ['./projekt-teendo.component.css']
})
export class ProjektTeendoComponent {
  projektteendoservice: ProjektteendoService;

  constructor(projektteendoservice: ProjektteendoService) {
    this.projektteendoservice = projektteendoservice;
  }

  uj() {}

  setClickedRow(i: number) {
    this.projektteendoservice.DtoSelectedIndex = i;
    this.projektteendoservice.uj = false;
    // this._router.navigate(['../irattipusegy'], {relativeTo: this._route});
  }
}
