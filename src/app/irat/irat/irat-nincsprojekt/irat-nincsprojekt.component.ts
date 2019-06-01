import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-irat-nincsprojekt',
  templateUrl: './irat-nincsprojekt.component.html',
  styleUrls: ['./irat-nincsprojekt.component.css']
})
export class IratNincsprojektComponent implements OnDestroy {
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
