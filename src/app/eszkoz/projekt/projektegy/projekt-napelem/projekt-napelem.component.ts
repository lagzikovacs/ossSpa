import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-projekt-napelem',
  templateUrl: './projekt-napelem.component.html',
  styleUrls: ['./projekt-napelem.component.css']
})
export class ProjektNapelemComponent implements OnInit {
  entries = ['-', 'Nincs megrendelve', 'Megrendelve', 'Raktárban', 'Kiszálítva/telepítve', 'Harmadik fél biztosítja'];
  selected = '';
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit() {
  }

  change(entry) {
    this.selected = entry;
    if (this.selected === '-') {
      this.selected = '';
    }
  }
  ok() {

  }
  megsem() {
    this._router.navigate(['../blank'], {relativeTo: this._route});
  }
}
