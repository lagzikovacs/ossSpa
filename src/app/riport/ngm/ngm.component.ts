import {Component, OnDestroy, OnInit} from '@angular/core';
import {RiportService} from '../../services/riport.service';

@Component({
  selector: 'app-ngm',
  templateUrl: './ngm.component.html',
  styleUrls: ['./ngm.component.css']
})
export class NgmComponent implements OnInit, OnDestroy {
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
