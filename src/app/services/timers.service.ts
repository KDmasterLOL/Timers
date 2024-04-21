import { Injectable } from '@angular/core';
import { Stopwatch } from '@lib/stopwatch';
import { Timer } from '@lib/timer';

export type clock = Stopwatch | Timer

@Injectable({ providedIn: 'root' })
export class ClockService {
  private _clocks: clock[] = []
  public get clocks() { return this._clocks }
  add(value: clock) { this.clocks.push(value) }
  get(id: number): clock | undefined { return this._clocks.find((v: clock) => v.id == id) }
  change(old: clock, next: clock) { this._clocks[this._clocks.indexOf(old)] = next }

  constructor() {
    this.add(Timer.default) // Default timer for develop purposes
  }
}
