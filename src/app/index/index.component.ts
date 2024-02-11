import { Component } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { IntervalComponent } from '../interval/interval.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [TimerComponent, IntervalComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  time: number = 0.1
  update_time(event: Event) {
    this.time = parseInt((event.target as HTMLInputElement).value)
  }
}
