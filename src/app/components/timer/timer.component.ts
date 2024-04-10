import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ArcProgressComponent } from '@components/arc-progress/arc-progress.component';
import { Timer, TimersService } from '@services/timers.service';
import { AutosizeDirective } from '@directives/autosize.directive';
import { parse_time, time_to_string } from '@lib/time';

enum Edit {
  None,
  Name,
  Time
}
@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [ArcProgressComponent, AutosizeDirective],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnChanges, AfterViewInit, OnDestroy {
  id_interval: NodeJS.Timeout | undefined
  current_progress: number = 0
  edit_states = Edit
  is_edit: Edit = Edit.None
  @Input({ required: true }) timer!: Timer

  constructor(private cd: ChangeDetectorRef) { }
  ngOnDestroy(): void { if (this.id_interval) clearInterval(this.id_interval) }
  ngAfterViewInit(): void { if (typeof window !== 'undefined') this.start() }

  content: string = ''
  public get timer_timeout(): string { return time_to_string(this.timer.timeout) }

  start() {
    const set_remain_time = () => { this.content = time_to_string(this.timer.remain_time) }
    set_remain_time()
    this.id_interval = setInterval(set_remain_time, 1000)
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
      case Edit.Time: this.timer.timeout = parse_time(target.value); break
      default:
        break
    }
    this.is_edit = Edit.None
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (typeof window !== 'undefined') this.start()
  }
}

