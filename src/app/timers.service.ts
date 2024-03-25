import { Injectable } from '@angular/core';
import { parse_time_string } from './time';

export class Timer {
  constructor(public start: number, public end: number) { }
  public get remain_time(): number { return Math.max(this.end - Date.now(), 0) }
  public get wait_time(): number { return this.end - this.start }
  public get progress(): number { return this.wait_time == 0 ? 0 : this.remain_time / this.wait_time }
}

@Injectable({
  providedIn: 'root'
})
export class TimersService {

  private _timers: { [key: string]: Timer } = {}
  public get timers() { return this._timers }
  rename_timer(name: string, next_name: string) {
    this._timers[next_name] = this._timers[name]
    delete this._timers[name]
  }
  add_timer(name: string, offset: number | string) {
    if (typeof (offset) == 'string') offset = parse_time_string(offset)
    this._timers[name] = new Timer(Date.now(), Date.now() + offset)
  }

  constructor() {
    this.add_timer("Default", 10000) // Default timer for develop purposes
  }
}
