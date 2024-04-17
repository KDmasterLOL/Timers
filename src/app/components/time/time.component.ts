import { Component, Input } from '@angular/core';
import { split_time, time_to_string } from '@lib/time';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss'
})
export class TimeComponent {
  #time!: number
  hours!: string;
  minutes!: string;
  seconds!: string;
  @Input({ required: true }) set time(number: number) {
    const { hours, minutes, seconds } = split_time(number)
    this.#time = number
    this.hours = String(hours).padStart(2, '0')
    this.minutes = String(minutes).padStart(2, '0')
    this.seconds = String(seconds).padStart(2, '0')
  }
  get time(): number { return this.#time }
  public get content(): string { return time_to_string(this.time) }
}
