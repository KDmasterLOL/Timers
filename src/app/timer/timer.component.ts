import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ArcProgressComponent } from '../arc-progress/arc-progress.component';
import { Timer } from '../timers.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [ArcProgressComponent],
  template: `
  <app-arc-progress [progress]="current_progress" [content]="current_content" [size]="100">
  </app-arc-progress>
`,
})
export class TimerComponent implements OnChanges, AfterViewInit {
  @Input({ required: true }) time!: Timer
  id_interval: NodeJS.Timeout | undefined
  current_progress: number = 0
  current_content: string = ''

  public get remain_time(): number { return Math.max(this.time.end - Date.now(), 0) }
  public get wait_time(): number { return this.time.end - this.time.start }
  public get_progress(): number { return this.remain_time / this.wait_time }
  private parse_time(time: number): { hours: number, minutes: number, seconds: number } {
    const MILISECS_IN_SEC = 1000
    const SEC_IN_MIN = 60
    const MINS_IN_HOUR = 60
    return {
      seconds: Math.floor(time / MILISECS_IN_SEC % SEC_IN_MIN),
      minutes: Math.floor(time / MILISECS_IN_SEC / SEC_IN_MIN % MINS_IN_HOUR),
      hours: Math.floor(time / MILISECS_IN_SEC / SEC_IN_MIN / MINS_IN_HOUR)
    }
  }
  public get content(): string {
    const { hours, minutes, seconds } = this.parse_time(this.remain_time)
    return [hours, minutes, seconds].map(
      x => x.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })).join(':')
  }

  ngAfterViewInit(): void { if (typeof window !== 'undefined') this.start() }

  start() {
    const tick = () => {
      this.current_progress = this.get_progress()
      if (this.current_progress != 0) requestAnimationFrame(tick)
    }
    tick()
    console.log("Timer started")
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (typeof window !== 'undefined') this.start()
  }
}

