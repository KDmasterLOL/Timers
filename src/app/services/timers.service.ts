import { Injectable } from '@angular/core';
import { parse_time } from '../time';

export class Timer {
  start: number = 0
  end: number = 0
  #name: string = ''

  constructor(name: string, timeout: number | string) {
    if (typeof timeout == 'string') timeout = parse_time(timeout)
    this.timeout = timeout; this.name = name
  }
  public get remain_time(): number { return Math.max(this.end - Date.now(), 0) }
  public get name(): string { return this.#name }
  public set name(v: string) { this.#name = v }
  public get timeout(): number { return this.end - this.start }
  public set timeout(value: number) { this.start = Date.now(); this.end = this.start + value }
  public get progress(): number { return this.timeout == 0 ? 0 : this.remain_time / this.timeout }
  static get default(): Timer { return new Timer('Default', 10000) }
}

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
