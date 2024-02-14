import { Component } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [TimerComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  time: string = "00:00:00"
  update_time(event: Event) {
    this.time = (event.target as HTMLInputElement).value
  }
}
