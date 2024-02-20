import { KeyValuePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

const DEFAULT = {
  TIMER_NAME: "default",
  TIMER_TIME: "00:00:00"
}
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [TimerComponent, NgFor, KeyValuePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  timers: { [key: string]: string }
    = { [DEFAULT.TIMER_NAME]: DEFAULT.TIMER_TIME, "asdfasdfasdfadfsasdf": DEFAULT.TIMER_TIME, "asdfasdfasdfadfsasdfasdfadsf": DEFAULT.TIMER_TIME, "asdfasdfasdfadfsasdfasdfasdfasdfasd": DEFAULT.TIMER_TIME }

  constructor(private formBuilder: FormBuilder) { }
  checkoutForm = this.formBuilder.group({
    name: DEFAULT.TIMER_NAME,
    time: DEFAULT.TIMER_TIME
  })
  has_timer() { return Object.keys(this.timers).includes(this.checkoutForm.value.name || "") }
  onchange(event: Event) { console.log("Change") }
  update_time(event: Event, key: string) {
    this.timers[key] = (event.target as HTMLInputElement).value
  }
  create_timer() {
    this.timers[this.checkoutForm.value.name ?? "default"] = this.checkoutForm.value.time ?? '00:00:00'
    console.log("Timer created")
  }
}
