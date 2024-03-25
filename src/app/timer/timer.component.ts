import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ArcProgressComponent } from '../arc-progress/arc-progress.component';
import { Timer } from '../timers.service';
import { time_to_string } from '../time';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [ArcProgressComponent],
  template: `
  <app-arc-progress
    [progress]="current_progress"
    [progress_message]="content"
    [size]="100">
  </app-arc-progress>
`,
})
export class TimerComponent implements OnChanges, AfterViewInit {
  @Input({ required: true }) time!: Timer
  id_interval: NodeJS.Timeout | undefined
  current_progress: number = 0


  constructor(private cd: ChangeDetectorRef) { }
  ngAfterViewInit(): void { if (typeof window !== 'undefined') this.start() }
  public get content(): string { return time_to_string(this.time.remain_time) }

  start() {
    const tick = () => {
      this.current_progress = this.time.progress
      if (this.current_progress != 0) requestAnimationFrame(tick)
      this.cd.detectChanges()
    }
    tick()
    console.log("Timer started")
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (typeof window !== 'undefined') this.start()
  }
}

