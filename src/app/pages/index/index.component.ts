import { Component } from '@angular/core';
import { StopwatchComponent } from '@components/stopwatch/stopwatch.component';
import { TimerComponent } from '@components/timer/timer.component';
import { Stopwatch } from '@lib/stopwatch';
import { Timer } from '@lib/timer';
import { TimersService } from '@services/timers.service';


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [TimerComponent, StopwatchComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  current_edited: string | undefined
  add_timer() { this.timers_service.add_timer(Timer.default) }
  stopwatch: Stopwatch = Stopwatch.default

  constructor(protected timers_service: TimersService) { }
}
