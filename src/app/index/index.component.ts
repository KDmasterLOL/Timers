import { KeyValuePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Timer, TimersService } from '../services/timers.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [TimerComponent, NgFor, KeyValuePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  checkoutForm
  current_edited: string | undefined
  add_timer() { this.timers_service.add_timer(Timer.default) }

  constructor(private formBuilder: FormBuilder, protected timers_service: TimersService) {
    this.checkoutForm = this.formBuilder.group({ name: "", time: "00:00:00" })
  }
  // has_timer() { return this.timers.timers[this.checkoutForm.value.name!] != undefined }
}
