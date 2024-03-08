import { Injectable } from '@angular/core';

type Timer = { start: number, end: number }

@Injectable({
  providedIn: 'root'
})
export class TimersService {

  private _timers: { [key: string]: Timer } = {}
  public get timers() { return this._timers }
  private parse_time(time: string): number {
    const [hours, minutes, seconds] = time.split(":").map(v => parseInt(v))
    return new Date(0, 0, 0, hours, minutes, seconds, 0).getTime()
  }

  add_timer(name: string, offset: number | string) {
    if (typeof (offset) == 'string') offset = this.parse_time(offset)
    this._timers[name] = { start: Date.now(), end: Date.now() + offset }
  }

  constructor() {
    this.add_timer("Default", 10000) // Default timer for develop purposes
  }
}
