import { Clock } from "./clock"

export class Stopwatch extends Clock {
  override restart(): void { this.start = Date.now() }
  public override get current_time(): number { return Date.now() - this.start }
  constructor(name: string) { super(name, 'stopwatch') }
  public static get default(): Stopwatch { return new Stopwatch('default') }
}
