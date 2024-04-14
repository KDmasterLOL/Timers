import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { ArcProgressComponent } from '@components/arc-progress/arc-progress.component';
import { Timer, TimersService } from '@services/timers.service';
import { AutosizeDirective } from '@directives/autosize.directive';
import { AutofocusDirective } from '@directives/autofocus.directive';
import { parse_time, time_to_string } from '@lib/time';

enum Edit {
  None,
  Name,
  Time
}
@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [ArcProgressComponent, AutosizeDirective, AutofocusDirective],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnChanges, AfterViewInit, OnDestroy {
  id_interval: NodeJS.Timeout | undefined
  current_progress: number = 0
  edit_states = Edit
  is_edit: Edit = Edit.None
  running: boolean = false
  @Input({ required: true }) timer!: Timer

  constructor(private cd: ChangeDetectorRef) { }
  ngOnDestroy(): void { if (this.id_interval) clearInterval(this.id_interval) }
  ngAfterViewInit(): void { if (typeof window !== 'undefined') this.start() }

  content: string = ''
  public get timer_timeout(): string { return time_to_string(this.timer.timeout) }

  update_remain_time() { this.content = time_to_string(this.timer.remain_time) }
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


  toggle_edit(edit: Edit) { this.is_edit = this.is_edit == edit ? Edit.None : edit }
  change(event: Event) {
    const target = event.target as HTMLInputElement
    switch (this.is_edit) {
      case Edit.Name: this.timer.name = target.value; break
      case Edit.Time: this.timer.timeout = parse_time(target.value); this.start(); break
      default: break
    }
    this.is_edit = Edit.None
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

