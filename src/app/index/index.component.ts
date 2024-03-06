import { KeyValuePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimersService } from '../timers.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [TimerComponent, NgFor, KeyValuePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  checkoutForm

  constructor(private formBuilder: FormBuilder, private timers: TimersService) {

    const { NAME: name, TIMEOUT: time } = this.timers.DEFAULT
    this.checkoutForm = this.formBuilder.group({ name, time })
  }
  get_timers_name() { return Object.keys(this.get_timers()) }
  get_timers() { return this.timers.get_timers() }
  set_timer() {
    const { name, time: timeout } = this.checkoutForm.value
    this.timers.set_timer(name!, timeout!)
  }
  has_timer() { return this.timers.get_timer(this.checkoutForm.value.name!) != undefined }
  rename_component() {
    console.log('1221')
  }
}
