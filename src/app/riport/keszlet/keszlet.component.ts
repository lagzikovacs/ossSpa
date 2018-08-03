import {Component, OnDestroy, OnInit} from '@angular/core';
import {RiportService} from '../../services/riport.service';

@Component({
  selector: 'app-keszlet',
  templateUrl: './keszlet.component.html',
  styleUrls: ['./keszlet.component.css']
})
export class KeszletComponent implements OnInit, OnDestroy {
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
