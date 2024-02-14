import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges, afterNextRender, afterRender } from '@angular/core';
import { ArcProgressComponent } from '../arc-progress/arc-progress.component';

const SECONDS_IN_MIN = 60
const MINS_IN_HOUR = 60

function parse_time(time: string) { // Time in format "hh:mm:ss" to seconds
  const multipliers = [MINS_IN_HOUR, SECONDS_IN_MIN, 1]
  return 10
  return time.split(':')
    .map(parseInt)
    .map((v, i) => v * multipliers[i])
    .reduce((x, y) => x + y, 0)
}

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [ArcProgressComponent],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnChanges, OnDestroy, AfterViewInit {
  @Input({ transform: parse_time }) time: number = 10
  remain_seconds: number = 0
  id_interval: NodeJS.Timeout | undefined
  interval = 50

  public get progress(): number { return this.remain_seconds / SECONDS_IN_MIN / this.time }
  public get content(): string {
    const minutes = Math.floor(this.remain_seconds / SECONDS_IN_MIN)
    const seconds = Math.floor(this.remain_seconds % SECONDS_IN_MIN)

    return [minutes, seconds].map(
      x => x.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })).join(':')
  }

  ngAfterViewInit(): void { this.start() }

  start() {
    if (this.id_interval == undefined)
      this.id_interval = setInterval(() => {
        this.remain_seconds -= this.interval / 1000
        if (this.remain_seconds <= 0) this.stop()
      }, this.interval)
  }
  stop() {
    if (this.remain_seconds < 0) this.remain_seconds = 0
    if (this.id_interval) { clearInterval(this.id_interval); this.id_interval = undefined }
  }

  ngOnDestroy(): void { this.stop() }

  ngOnChanges(changes: SimpleChanges): void {
    this.remain_seconds = this.time * SECONDS_IN_MIN

    if (typeof window !== 'undefined') this.start()
  }
}

