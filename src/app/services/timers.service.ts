import { Injectable } from '@angular/core';
import { Stopwatch } from '@lib/stopwatch';
import { Timer } from '@lib/timer';

export type clock = Stopwatch | Timer

@Injectable({ providedIn: 'root' })
export class ClockService {
  private _clocks: clock[] = []
  public get clocks() { return this._clocks }
  add(value: clock) { this.clocks.push(value); this.save() }
  get(id: number): clock | undefined { return this._clocks.find((v: clock) => v.id == id) }
  change(old: clock, next: clock) { this._clocks[this._clocks.indexOf(old)] = next; this.save() }
  private save() { localStorage.setItem('clocks', JSON.stringify(this._clocks)) }
  private restore() {
    const buff = localStorage.getItem('clocks')
    if (buff) {
      this._clocks = JSON.parse(buff).map((v: any) => {
        if (v.type == 'timer') {
          const t = new Timer(v.name, v.timeout); Object.assign(t, v); return t
        } else {
          const t = new Stopwatch(v.name); Object.assign(t, v); return t
        }
      }
      )
    }
  }

  constructor() {
    if (typeof window !== 'undefined') {
      this.restore()
      window.onbeforeunload = () => { this.save() }
    }

  }
}
