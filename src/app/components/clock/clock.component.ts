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
  #clock!: clock
  @Input({ required: true }) set obj(v: clock) {
    this.#clock = v
    this.type = v instanceof Timer ? 'timer' : 'stopwatch'
  }
  public get obj(): clock { return this.#clock }
  type!: 'stopwatch' | 'timer'
  constructor(private clock_service: ClockService) { }
  switch() {
    switch (this.type) {
      case 'timer': this.clock_service.change(this.#clock, Stopwatch.default)
        break;
      case 'stopwatch': this.clock_service.change(this.#clock, Timer.default)
        break
      default:
        break;
    }

  }
}
