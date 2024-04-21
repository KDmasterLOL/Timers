import { Paused } from "./paused";
import { Named } from "./named";
import { UUID, generate_id } from "./file";

export abstract class Clock extends Paused implements UUID, Named {
  start: number = Date.now()
  constructor(public name: string) { super() }
  id: number = generate_id()
  public abstract get current_time(): number
  abstract restart(): void
}
