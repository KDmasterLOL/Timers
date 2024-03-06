import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimersService {

  DEFAULT = {
    NAME: "default name of timer",
    TIMEOUT: "00:00:00"
  }
  private timers: { [key: string]: string } = { [this.DEFAULT.NAME]: this.DEFAULT.TIMEOUT }

  public get_timers(): { [key: string]: string } { return this.timers }
  get_timer(name: string) { return this.timers[name] }
  set_timer(name: string, timeout: string) { this.timers[name] = timeout }
  constructor() { }
}
