import { Component } from '@angular/core';
import {IratService} from '../irat.service';

@Component({
  selector: 'app-irat-container',
  templateUrl: './irat-container.component.html',
  styleUrls: ['./irat-container.component.css']
})
export class IratContainerComponent {
  iratservice: IratService;

  constructor(iratservice: IratService) {
    this.iratservice = iratservice;
  }
}
