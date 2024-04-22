export class Paused {
  state: 'pause' | 'running' = 'running'
  paused_at = 0
  pause_offset = 0

  constructor() { }

  pause() {
    if (this.state == 'pause') return
    this.paused_at = Date.now(); this.state = 'pause'
  }

  protected reset_running_state() {
    this.paused_at = Date.now()
    this.pause_offset = 0
    this.state = 'pause'
  }

  resume() {
    if (this.state == 'running') return
    this.pause_offset += Date.now() - this.paused_at
    this.state = 'running'
  }
}
