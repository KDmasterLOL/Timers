import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { ClockComponent } from '@components/clock/clock.component';
import { Timer } from '@lib/timer';
import { ClockService, clock } from '@services/timers.service';


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [ClockComponent],
  animations: [
    trigger('animation',
      [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('500ms', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          animate(300, style({ transform: 'translateX(-100%)', opacity: 0 }))
        ])
      ]
    )
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  current_edited: string | undefined
  add() { this.clock_service.add(Timer.default) }
  remove(clock: clock) { this.clock_service.remove(clock) }
  constructor(protected clock_service: ClockService) { }
  get_type(v: clock) { return v instanceof Timer ? 'timer' : 'stopwatch' }
}
