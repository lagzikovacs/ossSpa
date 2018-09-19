import { Component, OnInit } from '@angular/core';
import {BizonylatService} from "../bizonylat.service";

@Component({
  selector: 'app-bizonylat-kibocsatas',
  templateUrl: './bizonylat-kibocsatas.component.html',
  styleUrls: ['./bizonylat-kibocsatas.component.css']
})
export class BizonylatKibocsatasComponent implements OnInit {
  bizonylatservice: BizonylatService;
  eppFrissit = '';
  bizonylatszam = '';

  constructor(bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  ngOnInit() {
  }

  onSubmit() {}
  cancel() {}
}
