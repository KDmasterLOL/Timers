import { Time } from "./time"

export class Timer {
  start: number = 0
  end: number = 0
  #name: string = ''
  state: 'pause' | 'running' = 'running'
  paused_at = 0
  pause_offset = 0


  constructor(name: string, timeout: Time) {
    this.timeout = timeout; this.name = name
  }
  public get current_time(): number { return (this.state == 'running' ? Date.now() : this.paused_at) - this.pause_offset }
  public get remain_time(): number { return Math.max(this.end - this.current_time, 0) }
  public get name(): string { return this.#name }
  public set name(v: string) { this.#name = v }
  public get timeout(): number { return this.end - this.start }
  public set timeout(value: number) {
    this.start = Date.now(); this.end = this.start + value
    this.reset_state()
  }
  public get progress(): number { return this.timeout == 0 ? 0 : this.remain_time / this.timeout }
  public get expired(): boolean { return this.progress == 0 }
  static get default(): Timer { return new Timer('Default', 10000) }
  pause() {
    if (this.expired || this.state == 'pause') return
    this.paused_at = Date.now(); this.state = 'pause';
  }
  private reset_state() {
    this.paused_at = Date.now()
    this.pause_offset = 0
    this.state = 'pause'
  }
  resume() {
    if (this.state == 'running') return
    this.pause_offset += Date.now() - this.paused_at
    this.state = 'running'
  }
  restart() { this.timeout = this.timeout }
}
