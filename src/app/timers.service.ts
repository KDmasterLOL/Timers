import { Injectable } from '@angular/core';

type Timer = { start: number, end: number }

export function parse_time(time: string): number {
  const [hours, minutes, seconds] = time.split(":").map(v => parseInt(v))
  return new Date(0, 0, 0, hours, minutes, seconds, 0).getTime()
}

@Injectable({
  providedIn: 'root'
})
export class TimersService {

  private _timers: { [key: string]: Timer } = {}
  public get timers() { return this._timers }

  add_timer(name: string, offset: number) {
    this._timers[name] = { start: Date.now(), end: Date.now() + offset }
  }

  constructor() {
    this.add_timer("Default", 10000) // Default timer for develop purposes
  }
}
