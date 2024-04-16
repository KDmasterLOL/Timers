import { Component, Input } from '@angular/core';
import { time_to_string } from '@lib/time';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss'
})
export class TimeComponent {
  @Input({ required: true }) time!: number
  public get content(): string { return time_to_string(this.time) }
}
