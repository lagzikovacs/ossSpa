import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylattetel-egy',
  templateUrl: './bizonylattetel-egy.component.html'
})
export class BizonylattetelEgyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
