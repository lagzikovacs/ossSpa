import {Component, OnDestroy} from '@angular/core';
import {AjanlatkeresService} from '../ajanlatkeres.service';

@Component({
  selector: 'app-ajanlatkeres-reszletek',
  templateUrl: './ajanlatkeres-reszletek.component.html',
  styleUrls: ['./ajanlatkeres-reszletek.component.css']
})
export class AjanlatkeresReszletekComponent implements OnDestroy {
  ajanlatkeresservice: AjanlatkeresService;

  constructor(ajanlatkeresservice: AjanlatkeresService) {
    this.ajanlatkeresservice = ajanlatkeresservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
