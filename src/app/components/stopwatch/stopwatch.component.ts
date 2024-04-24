import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { TimeComponent } from '@components/time/time.component';
import { Stopwatch } from '@lib/stopwatch';

@Component({
  selector: 'app-stopwatch',
  standalone: true,
  imports: [TimeComponent],
  templateUrl: './stopwatch.component.html',
  styleUrl: './stopwatch.component.scss'
})
export class StopwatchComponent implements AfterViewInit {
  content: number = 0
  @Input({ required: true }) stopwatch!: Stopwatch
  interval_id: ReturnType<typeof setInterval> | undefined

  update_content() { this.content = this.stopwatch.current_time }
  start() { this.update_content(); if (!this.interval_id) setInterval(() => this.update_content(), 1000) }
  ngAfterViewInit(): void { if (typeof window !== 'undefined') this.start() }
  public get toggle_symbol(): string { return this.stopwatch.state == 'running' ? '⏸️' : '▶️' }

  switch_running_state() {
    if (this.stopwatch.state == 'running') this.stopwatch.pause()
    else this.stopwatch.resume()
    this.update_content()
  }

}
