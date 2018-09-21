import {Component, OnInit, ViewChild} from '@angular/core';
import {BizonylatService} from "../bizonylat.service";
import {PenztarService} from "../../penztar/penztar.service";
import {ErrormodalComponent} from "../../errormodal/errormodal.component";

@Component({
  selector: 'app-bizonylat-penztar',
  templateUrl: './bizonylat-penztar.component.html',
  styleUrls: ['./bizonylat-penztar.component.css']
})
export class BizonylatPenztarComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  bizonylatservice: BizonylatService;
  eppFrissit = false;

  constructor(private _penztarsevice: PenztarService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  ngOnInit() {
  }

  penztarvalasztas(i: number) {

  }
}
