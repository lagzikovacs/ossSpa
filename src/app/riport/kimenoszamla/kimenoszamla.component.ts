import {Component, OnDestroy, OnInit} from '@angular/core';
import {RiportService} from '../../services/riport.service';

@Component({
  selector: 'app-kimenoszamla',
  templateUrl: './kimenoszamla.component.html',
  styleUrls: ['./kimenoszamla.component.css']
})
export class KimenoszamlaComponent implements OnInit, OnDestroy {
  riportservice: RiportService;
  eppFrissit = false;

  constructor(riportservice: RiportService) {
    this.riportservice = riportservice;
  }

  ngOnInit() {
  }
  submit() {
  }
  ngOnDestroy() {
  }
}
