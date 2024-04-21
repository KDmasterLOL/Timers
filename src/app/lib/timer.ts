import { Clock } from "./clock"

export class Timer extends Clock {
  end: number = 0

  constructor(name: string, timeout: number) {
    super(name)
    this.timeout = timeout
  }
  public override get current_time(): number { return (this.state == 'running' ? Date.now() : this.paused_at) - this.pause_offset }
  public get remain_time(): number { return Math.max(this.end - this.current_time, 0) }
  public get timeout(): number { return this.end - this.start }
  public set timeout(value: number) {
    this.start = Date.now(); this.end = this.start + value
    this.reset_running_state()
  }
  public get progress(): number { return this.timeout == 0 ? 0 : this.remain_time / this.timeout }
  public get expired(): boolean { return this.progress == 0 }
  static get default(): Timer { return new Timer('Default', 10000) }
  restart() { this.timeout = this.timeout }
}
