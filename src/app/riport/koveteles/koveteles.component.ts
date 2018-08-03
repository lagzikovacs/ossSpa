import {Component, OnDestroy, OnInit} from '@angular/core';
import {RiportService} from '../../services/riport.service';

@Component({
  selector: 'app-koveteles',
  templateUrl: './koveteles.component.html',
  styleUrls: ['./koveteles.component.css']
})
export class KovetelesComponent implements OnInit, OnDestroy {
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
