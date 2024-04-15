import { Component } from '@angular/core';
import { TimerComponent } from '@components/timer/timer.component';
import { Timer } from '@lib/timer';
import { TimersService } from '@services/timers.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [TimerComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  current_edited: string | undefined
  add_timer() { this.timers_service.add_timer(Timer.default) }

  constructor(protected timers_service: TimersService) { }
}
