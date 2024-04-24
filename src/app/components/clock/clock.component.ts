import { Component, Input } from '@angular/core';
import { StopwatchComponent } from '@components/stopwatch/stopwatch.component';
import { TimerComponent } from '@components/timer/timer.component';
import { Stopwatch } from '@lib/stopwatch';
import { Timer } from '@lib/timer';
import { ClockService, clock } from '@services/timers.service';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [StopwatchComponent, TimerComponent],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss'
})
export class ClockComponent {
  @Input({ required: true }) obj!: clock
  constructor(private clock_service: ClockService) { }
  remove() { this.clock_service.remove(this.obj) }
  switch() {
    switch (this.obj.type) {
      case 'timer': this.clock_service.change(this.obj, Stopwatch.default)
        break;
      case 'stopwatch': this.clock_service.change(this.obj, Timer.default)
        break
      default:
        break;
    }

  }
}
