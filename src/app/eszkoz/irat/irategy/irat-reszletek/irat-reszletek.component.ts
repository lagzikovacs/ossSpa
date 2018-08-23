import { Component } from '@angular/core';
import {IratService} from '../../../../services/eszkoz/irat/irat.service';

@Component({
  selector: 'app-irat-reszletek',
  templateUrl: './irat-reszletek.component.html',
  styleUrls: ['./irat-reszletek.component.css']
})
export class IratReszletekComponent {
  iratservice: IratService;

  constructor(iratservice: IratService) {
    this.iratservice = iratservice;
  }
}
