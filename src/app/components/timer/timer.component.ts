import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ArcProgressComponent } from '@components/arc-progress/arc-progress.component';
import { AutosizeDirective } from '@directives/autosize.directive';
import { AutofocusDirective } from '@directives/autofocus.directive';
import { parse_time, time_to_string } from '@lib/time';
import { Timer } from '@lib/timer';
import { TimeComponent } from '@components/time/time.component';

type edit_state = 'name' | 'time' | undefined
@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [ArcProgressComponent, AutosizeDirective, AutofocusDirective, TimeComponent],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnChanges, AfterViewInit, OnDestroy {
  id_interval: ReturnType<typeof setInterval> | undefined
  current_progress: number = 0
  current_edited: edit_state = undefined
  running: boolean = false
  content: number = 0
  @Input({ required: true }) timer!: Timer

  constructor(private cd: ChangeDetectorRef) { }
  ngOnDestroy(): void { if (this.id_interval) clearInterval(this.id_interval) }
  ngAfterViewInit(): void { if (typeof window !== 'undefined') this.start() }

  public get timer_timeout(): string { return time_to_string(this.timer.timeout) }

  update_remain_time() { this.content = this.timer.remain_time }
  start() {
    this.update_remain_time(); if (!this.id_interval) this.id_interval = setInterval(() => this.update_remain_time(), 1000)

    const tick = () => {
      this.current_progress = this.timer.progress
      if (this.current_progress != 0) requestAnimationFrame(tick)
      this.cd.detectChanges()
    }
    tick()

    console.log("Timer started")
  }


  toggle_edit(edit: edit_state) { this.current_edited = this.current_edited == edit ? undefined : edit }
  change(event: Event) {
    const target = event.target as HTMLInputElement
    switch (this.current_edited) {
      case 'name': this.timer.name = target.value; break
      case 'time': this.timer.timeout = parse_time(target.value); this.start(); break
      default: break
    }
    this.current_edited = undefined
  }
  switch_timer_state() {
    if (this.timer.expired) { this.timer.restart(); this.start(); console.log(this.timer.timeout) }
    else if (this.timer.state == 'running') this.timer.pause()
    else this.timer.resume()
    this.update_remain_time()
  }
  public get toggle_symbol(): string {
    if (this.timer.expired) return '🔁'
    return this.timer.state == 'running' ? '⏸️' : '▶️'
  }
  ngOnChanges(changes: SimpleChanges): void { if (typeof window !== 'undefined') this.start() }
}

