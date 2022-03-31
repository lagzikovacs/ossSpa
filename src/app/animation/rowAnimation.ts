import {animate, state, style, transition, trigger} from '@angular/animations';

export const rowanimation = trigger('rowanimation', [
  state('in', style({
    'opacity': '1',
    transform: 'translateX(0)'
  })),
  transition(':enter', [
    style({transform: 'translateX(-300px)', 'opacity': '0'}),
    animate(200)
  ]),
  transition(':leave', [
    animate(200, style({transform: 'translateX(-300px)', 'opacity': '0'}))
  ]),
]);

