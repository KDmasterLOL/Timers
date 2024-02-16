import { KeyValuePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [TimerComponent, NgFor, KeyValuePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  timers: { [key: string]: string }
    = { 'one timer': '00:00:00', 'second timer': '00:00:00' }
  constructor(private formBuilder: FormBuilder) { }
  checkoutForm = this.formBuilder.group({
    name: '',
    time: ''
  })
  update_time(event: Event, key: string) {
    this.timers[key] = (event.target as HTMLInputElement).value
  }
  create_timer() {
    this.timers[this.checkoutForm.value.name ?? "default"] = this.checkoutForm.value.time ?? '00:00:00'
    console.log("Timer created")
  }
}
