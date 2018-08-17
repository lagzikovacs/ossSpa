import { Component } from '@angular/core';
import {FizetesimodService} from '../../../../../services/torzs/primitiv/fizetesimod.service';

@Component({
  selector: 'app-fizetesimod-reszletek',
  templateUrl: './fizetesimod-reszletek.component.html',
  styleUrls: ['./fizetesimod-reszletek.component.css']
})
export class FizetesimodReszletekComponent {
  fizetesimodservice: FizetesimodService;

  constructor(fizetesimodservice: FizetesimodService) {
    this.fizetesimodservice = fizetesimodservice;
  }
}
