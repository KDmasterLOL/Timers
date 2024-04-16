import { Injectable } from '@angular/core';
import { Timer } from '@lib/timer';



@Injectable({ providedIn: 'root' })
export class TimersService {
  private _timers: Timer[] = []
  public get timers() { return this._timers }

  add_timer(timer: Timer) { this.timers.push(timer) }
  get_timer(name: string): Timer | undefined { return this._timers.find((timer: Timer) => timer.name == name) }

  constructor() {
    this.add_timer(Timer.default) // Default timer for develop purposes
  }
}
