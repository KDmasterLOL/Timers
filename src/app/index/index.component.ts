import { KeyValuePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [TimerComponent, NgFor, KeyValuePipe],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  timers: { [key: string]: string }
    = { 'one timer': '00:00:00', 'second timer': '00:00:00' }
  update_time(event: Event, key: string) {
    this.timers[key] = (event.target as HTMLInputElement).value
  }
}
