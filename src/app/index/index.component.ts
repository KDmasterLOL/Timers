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
  current_edited: string | undefined

  constructor(private formBuilder: FormBuilder, private _timers: TimersService) {
    this.checkoutForm = this.formBuilder.group({ name: "", time: "00:00:00" })
  }
  public get timers() { return this._timers.timers }
  set_timer() {
    const { name, time: timeout } = this.checkoutForm.value
    this._timers.add_timer(name!, timeout!)
  }
  toggle_edit(index: string) {
    if (this.current_edited == index) this.current_edited = undefined
    else this.current_edited = index
  }
  change_name(key: string, event: Event) {
    this.current_edited = undefined
    console.log(event)
    const target = event.target as HTMLInputElement
    if (target.value != key) {
      // TODO: Implement renaming with service method
    }
  }
  has_timer() { return this._timers.timers[this.checkoutForm.value.name!] != undefined }
  rename_component() {
    console.log('1221')
  }
}
