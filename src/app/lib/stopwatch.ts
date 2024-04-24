import { Clock } from "./clock"

export class Stopwatch extends Clock {
  override restart(): void { this.start = Date.now() }
  public override get current_time(): number { return (this.state == 'running' ? Date.now() : this.paused_at) - this.start - this.pause_offset }
  constructor(name: string) { super(name, 'stopwatch') }
  public static get default(): Stopwatch { return new Stopwatch('default') }
}
