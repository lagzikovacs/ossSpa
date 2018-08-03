import {Component, OnDestroy, OnInit} from '@angular/core';
import {RiportService} from '../../services/riport.service';

@Component({
  selector: 'app-beszerzes',
  templateUrl: './beszerzes.component.html',
  styleUrls: ['./beszerzes.component.css']
})
export class BeszerzesComponent implements OnInit, OnDestroy {
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
